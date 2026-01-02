/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { Room } from '@/types/general'
import type { PlayerInBattle } from '@/types/player'
import type { CardInBattle } from '@/types/cads'
import { GlobalDeck } from '@/constants/deck'
import { CardBattleStatus } from '@/types/cads'

function useBattle() {
  const [room, setRoom] = useState<Room | null>({
    yourPlayer: { id: Date.now(), name: '' },
  } as unknown as Room)

  const wsRef = useRef<WebSocket | null>(null)
  const pendingMsgsRef = useRef<Array<object>>([])
  const [rooms, setRooms] = useState<Array<Room>>([])
  const [isWsConnected, setIsWsConnected] = useState(false)
  const [connectionId, setConnectionId] = useState<string | undefined>(
    undefined,
  )
  const getRoomById = (id: string) => {
    return rooms.find((r) => r.id === id)
  }

  const navigate = useNavigate()

  const connectWs = (url = import.meta.env.VITE_API_URL ?? '') => {
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    )
      return

    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      setIsWsConnected(true)
      // flush any queued messages
      const pending = pendingMsgsRef.current.splice(0)
      if (
        pending.length &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        for (const m of pending) {
          try {
            wsRef.current.send(JSON.stringify(m))
          } catch (err) {
            console.warn('Error sending flushed message', err)
          }
        }
      }
    }

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data as string)
        const { action } = msg
        switch (action) {
          case 'connected':
            setConnectionId(msg.id)
            break
          case 'rooms_list':
            setRooms(msg.rooms || msg.payload?.rooms || [])
            break
          case 'room_created':
          case 'joined_room':
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN)
              wsRef.current.send(JSON.stringify({ action: 'list_rooms' }))
            break
          case 'state_update': {
            const r = msg.room
            setRooms((prev) => {
              const idx = prev.findIndex((x) => x.id === r.id)
              if (idx === -1) return [r, ...prev]
              const copy = [...prev]
              copy[idx] = r
              return copy
            })
            break
          }
          case 'state': {
            const r = msg.room
            setRooms((prev) => {
              const idx = prev.findIndex((x) => x.id === r.id)
              if (idx === -1) return [r, ...prev]
              const copy = [...prev]
              copy[idx] = r
              return copy
            })
            break
          }
          default:
            break
        }
      } catch {}
    }

    ws.onclose = () => {
      wsRef.current = null
      setIsWsConnected(false)
      setConnectionId(undefined)
    }

    ws.onerror = (err) => {
      console.warn('WebSocket error', err)
    }
  }

  const disconnectWs = () => {
    if (!wsRef.current) return
    wsRef.current.close()
    wsRef.current = null
    setIsWsConnected(false)
    setConnectionId(undefined)
  }

  const sendMessage = (msg: object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(msg))
        return true
      } catch (err) {
        console.warn('sendMessage: failed immediate send, will queue', err)
      }
    }

    pendingMsgsRef.current.push(msg)

    connectWs()
    return false
  }

  const listRooms = () => sendMessage({ action: 'list_rooms' })

  const createRoomWs = (name?: string) => {
    const room = newGame()

    sendMessage({
      action: 'create_room',
      payload: {
        room: { ...room, name: name || `Sala de ${room?.playerOne.name}` },
      },
    })
    navigate({ to: '/battle/$roomId', params: { roomId: room?.id || '' } })
  }

  const joinRoomWs = (roomId: string) => {
    const roomWs = getRoomById(roomId)
    sendMessage({
      action: 'join_room',
      payload: {
        roomId,
        player: {
          ...roomWs?.playerTwo,
          id: room?.yourPlayer?.id,
          name: room?.yourPlayer?.name,
          deck:
            roomWs?.playerTwo?.deck.map((item) => ({
              ...item,
              owner: room?.yourPlayer?.id,
            })) || [],
        },
      },
    })
    navigate({ to: '/battle/$roomId', params: { roomId } })
  }

  const updateState = (roomId: string, roomState: Room) => {
    sendMessage({
      action: 'update_state',
      payload: {
        id: roomId,
        roomId,
        playerOne: roomState?.playerOne,
        playerTwo: roomState?.playerTwo,
        deck: roomState?.deck,
        playerTurnId: roomState?.playerTurnId,
        turn: roomState?.turn,
        lastCardsUsed: roomState?.lastCardsUsed.map((card) => ({
          ...card,
          status: CardBattleStatus.ARENA,
        })),
        cardActive: roomState?.cardActive,
      },
    })
  }

  useEffect(() => {
    return () => disconnectWs()
  }, [])

  const roomWs = getRoomById(room?.id || '')

  useEffect(() => {
    if (roomWs) setRoom({ ...roomWs, yourPlayer: room?.yourPlayer })
  }, [roomWs])

  const createShuffledDeck = () => {
    const shuffledDeck: Array<CardInBattle> = GlobalDeck.map((value) => ({
      value,
      sort: Math.random(),
    }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => ({ ...value, status: CardBattleStatus.DECK }))
    return shuffledDeck
  }

  const newGame = () => {
    if (!room) return
    const a: PlayerInBattle = {
      ...room?.yourPlayer,
      deck: [],
    } as PlayerInBattle
    const b: PlayerInBattle = { deck: [], id: '-', name: 'Oponente' }

    const shuffled = createShuffledDeck()
    const playerOneDeck = shuffled.slice(0, 10).map((card) => ({
      ...card,
      status: CardBattleStatus.BACK,
      owner: a.id,
    }))
    const playerTwoDeck = shuffled.slice(10, 20).map((card) => ({
      ...card,
      status: CardBattleStatus.BACK,
      owner: b.id,
    }))
    const restDeck = shuffled.slice(20)
    setRoom(
      (prev) => ({ ...prev, playerOne: { ...a, deck: playerOneDeck } }) as Room,
    )
    setRoom(
      (prev) => ({ ...prev, playerTwo: { ...b, deck: playerTwoDeck } }) as Room,
    )
    setRoom((prev) => ({ ...prev, deck: restDeck }) as Room)
    setRoom((prev) => ({ ...prev, playerTurnId: a.id }) as Room)

    return {
      playerOne: { ...a, deck: playerOneDeck },
      playerTwo: { ...b, deck: playerTwoDeck },
      deck: restDeck,
      playerTurnId: a.id,
      turn: 1,
      lastCardsUsed: [],
      cardActive: undefined,
      id: Date.now().toString(),
    }
  }

  const drawCard = () => {
    if (!room?.playerOne || !room?.playerTwo || !room) return
    let currentDeck = room.deck
    const drawnCard = currentDeck[0]
    currentDeck = currentDeck.slice(1)
    const currentRoom = {
      ...room,
      deck: currentDeck,
      cardActive: {
        ...drawnCard,
        status: CardBattleStatus.HAND,
        owner:
          room?.playerTurnId === room.playerOne.id
            ? room.playerOne.id
            : room.playerTwo.id,
      },
    }
    setRoom(currentRoom)
    updateState(currentRoom.id, currentRoom)
  }

  const onSelectCard = (player: PlayerInBattle, cardId: string) => {
    if (!room) return
    const { playerOne, playerTurnId, playerTwo, cardActive } = room
    if (!playerOne || !playerTwo || player.id !== playerTurnId) return

    if (!'0123456789'.includes(String(cardActive?.value))) {
      nextTurn(cardActive!)
      return
    }

    const currentDeck = player.deck
    const replacedCard = currentDeck.find((card) => card.id === cardId)
    if (!replacedCard) return
    if (
      replacedCard?.value === cardActive?.value &&
      replacedCard?.status === CardBattleStatus.FRONT
    )
      return
    if (replacedCard?.status !== CardBattleStatus.BACK) {
      nextTurn(cardActive!)
      return
    }

    if (!cardActive) return

    const newPlayerDeck = currentDeck.map((card) =>
      cardId === card?.id
        ? {
            ...cardActive,
            status: CardBattleStatus.FRONT,
            owner: player.id,
          }
        : card,
    )

    const newRoom: Room = {
      ...room,
      cardActive: {
        ...replacedCard,
        status: CardBattleStatus.HAND,
        owner: player.id,
      },
      playerOne:
        player.id === playerOne.id
          ? { ...playerOne, deck: newPlayerDeck }
          : playerOne,
      playerTwo:
        player.id === playerTwo.id
          ? { ...playerTwo, deck: newPlayerDeck }
          : playerTwo,
    }

    setRoom(newRoom)
    updateState(newRoom.id, newRoom)
  }

  const nextTurn = (cardtoLast: CardInBattle) => {
    if (room && room?.playerOne && room?.playerTwo) {
      const currentRoom = room
      currentRoom.playerTurnId =
        currentRoom?.playerTurnId === (currentRoom?.playerOne?.id || '')
          ? currentRoom?.playerTwo?.id || ''
          : currentRoom?.playerOne?.id || ''
      currentRoom.turn = (currentRoom?.turn || 0) + 1
      currentRoom.lastCardsUsed = [
        cardtoLast,
        ...(currentRoom?.lastCardsUsed || []),
      ]

      currentRoom.cardActive = undefined

      setRoom(currentRoom)
      updateState(currentRoom.id, currentRoom)
    }
  }

  useEffect(() => {
    if (
      room &&
      room?.lastCardsUsed &&
      room?.lastCardsUsed.length > 0 &&
      room.cardActive === undefined &&
      '0123456789'.includes(room.lastCardsUsed[0].value)
    ) {
      const lastCard = room.lastCardsUsed[0]
      const actualPlayer =
        room.playerTurnId === room.playerOne?.id
          ? room.playerOne
          : room.playerTwo
      const cardPlayer = actualPlayer?.deck[Number(lastCard.value)]
      if (
        cardPlayer?.status === CardBattleStatus.BACK &&
        actualPlayer?.id === room?.yourPlayer?.id
      ) {
        setRoom({ ...room, cardActive: lastCard })
      }
    }
  }, [room?.lastCardsUsed])

  return {
    playerOne: room?.playerOne,
    playerTwo: room?.playerTwo,
    deck: room?.deck,
    turn: room?.turn,
    lastCardsUsed: room?.lastCardsUsed,
    drawCard,
    cardActive: room?.cardActive,
    onSelectCard,
    nextTurn,
    yourPlayer: room?.yourPlayer,
    setRoom,
    getRoomById,
    // Web Scoket
    rooms,
    isWsConnected,
    connectionId,
    connectWs,
    disconnectWs,
    listRooms,
    createRoomWs,
    joinRoomWs,
    roomId: room?.id,
    playerTurnId: room?.playerTurnId,
  }
}

export default useBattle

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { LayoutGroup, motion } from 'framer-motion'
import {
  BattleBody,
  BattleContainer,
  ContainerCards,
  EmptySlot,
  ParabensContent,
  ParabensOverlay,
  PlayerIndicator,
  Reservedrea,
} from './styles'
import { Title } from '@/global-sx.style'
import Card from '@/containers/card'
import { useBattleContext } from '@/context/BattleContext'
import { CardBattleStatus } from '@/types/cads'
import TurnIndicator from '@/containers/turn-indicator'

function Battle() {
  const { roomId } = useParams({ from: '/battle/$roomId' })
  const navigate = useNavigate()
  const {
    playerOne,
    playerTwo,
    turn,
    setRoom,
    lastCardsUsed,
    drawCard,
    cardActive,
    onSelectCard,
    nextTurn,
    getRoomById,
    rooms,
    listRooms,
    yourPlayer,
    playerTurnId,
  } = useBattleContext()
  const isInverted = yourPlayer?.id === playerTwo?.id
  const isYourTurn = playerTurnId === yourPlayer?.id
  const isPOneTurn = playerOne?.id === playerTurnId
  const isPTwoTurn = playerTwo?.id === playerTurnId

  useEffect(() => {
    const roomFind = getRoomById(roomId)

    if (roomFind) setRoom({ ...roomFind, yourPlayer: yourPlayer })
  }, [roomId, rooms])

  useEffect(() => {
    if (rooms.length === 0) listRooms()
  }, [rooms])

  const pOneWin =
    playerOne?.deck.filter((card) => card.status === CardBattleStatus.BACK)
      .length === 0
  const pTwoWin =
    playerTwo?.deck.filter((card) => card.status === CardBattleStatus.BACK)
      .length === 0

  const getPlayerPositionArea = (isP1Position: boolean) => {
    if (isP1Position && !isInverted) {
      return (
        <>
          <ContainerCards>
            {isPOneTurn && <TurnIndicator />}

            {playerOne?.deck.map((card, index) => {
              if (card.uuid === cardActive?.uuid) return null

              return (
                <Card
                  card={{ ...card }}
                  index={index}
                  key={card.uuid}
                  isHighlighted={
                    '012345679'.includes(String(cardActive?.value)) &&
                    !'+'.includes(String(cardActive?.value)) &&
                    cardActive?.owner === playerOne?.id &&
                    index === Number(cardActive?.value) &&
                    card.status === CardBattleStatus.BACK
                  }
                  onClick={
                    cardActive
                      ? () => onSelectCard(playerOne, card.id)
                      : undefined
                  }
                />
              )
            })}
          </ContainerCards>
          <PlayerIndicator orientation="left">
            {playerOne?.name}
          </PlayerIndicator>
        </>
      )
    } else if (isP1Position && isInverted) {
      return (
        <>
          <ContainerCards>
            {isPTwoTurn && <TurnIndicator />}
            {playerTwo?.deck.map((card, index) => {
              if (card.uuid === cardActive?.uuid) return null
              return (
                <Card
                  card={{ ...card }}
                  index={index}
                  key={card.uuid}
                  isHighlighted={
                    '012345679'.includes(String(cardActive?.value)) &&
                    !'+'.includes(String(cardActive?.value)) &&
                    cardActive?.owner === playerTwo?.id &&
                    index === Number(cardActive?.value) &&
                    card.status === CardBattleStatus.BACK
                  }
                  onClick={
                    cardActive
                      ? () => onSelectCard(playerTwo, card.id)
                      : undefined
                  }
                />
              )
            })}
          </ContainerCards>
          <PlayerIndicator orientation="left">
            {playerTwo?.name}
          </PlayerIndicator>
        </>
      )
    } else if (!isP1Position && isInverted) {
      return (
        <>
          <PlayerIndicator orientation="right">
            {playerOne?.name}
          </PlayerIndicator>
          <ContainerCards>
            {isPOneTurn && <TurnIndicator />}
            {playerOne?.deck.map((card, index) => {
              if (card.uuid === cardActive?.uuid) return null
              return (
                <Card
                  card={{ ...card }}
                  index={index}
                  key={card.uuid}
                  isHighlighted={
                    '012345679'.includes(String(cardActive?.value)) &&
                    !'+'.includes(String(cardActive?.value)) &&
                    cardActive?.owner === playerOne?.id &&
                    index === Number(cardActive?.value) &&
                    card.status === CardBattleStatus.BACK
                  }
                  onClick={
                    cardActive
                      ? () => onSelectCard(playerOne, card.id)
                      : undefined
                  }
                />
              )
            })}
          </ContainerCards>
        </>
      )
    } else {
      return (
        <>
          <PlayerIndicator orientation="right">
            {playerTwo?.name}
          </PlayerIndicator>
          <ContainerCards>
            {isPTwoTurn && <TurnIndicator />}

            {playerTwo?.deck.map((card, index) => {
              if (card.uuid === cardActive?.uuid) return null
              return (
                <Card
                  card={{ ...card }}
                  index={index}
                  key={card.uuid}
                  isHighlighted={
                    '012345679'.includes(String(cardActive?.value)) &&
                    !'+'.includes(String(cardActive?.value)) &&
                    cardActive?.owner === playerTwo?.id &&
                    index === Number(cardActive?.value) &&
                    card.status === CardBattleStatus.BACK
                  }
                  onClick={
                    cardActive
                      ? () => onSelectCard(playerTwo, card.id)
                      : undefined
                  }
                />
              )
            })}
          </ContainerCards>
        </>
      )
    }
  }
  if (pOneWin || pTwoWin) {
    return (
      <ParabensOverlay>
        <ParabensContent>
          <h1>{pOneWin ? playerOne?.name : playerTwo?.name}!</h1>
          <p>venceu a partida 🎉</p>
          <div className="confetti">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  background: [
                    '#FF3B30',
                    '#FF9500',
                    '#FFCC00',
                    '#4CD964',
                    '#5AC8FA',
                    '#007AFF',
                    '#5856D6',
                  ][i % 7],
                  animationDelay: `${Math.random() * 0.6}s`,
                  width: `${6 + Math.random() * 10}px`,
                  height: `${10 + Math.random() * 16}px`,
                }}
              />
            ))}
          </div>
          <button
            onClick={() =>
              navigate({
                to: '/lobby',
              })
            }
          >
            Fechar
          </button>
        </ParabensContent>
      </ParabensOverlay>
    )
  }

  return (
    <LayoutGroup>
      <BattleContainer disableClicks={!isYourTurn}>
        {playerOne?.deck.length === 0 ||
        playerTwo?.id === '-' ||
        !playerOne ||
        !playerTwo ? (
          <Title>Aguardando jogadores</Title>
        ) : (
          <>
            {getPlayerPositionArea(false)}

            <BattleBody>
              <Reservedrea style={{ justifyContent: 'center' }}>
                {lastCardsUsed && lastCardsUsed.length > 0 && (
                  <Card
                    card={lastCardsUsed[0]}
                    isHighlighted={
                      !'012345679'.includes(String(cardActive?.value))
                    }
                    isArenaCard
                    onClick={
                      cardActive && isYourTurn
                        ? () => nextTurn(cardActive)
                        : undefined
                    }
                  />
                )}
                {!lastCardsUsed ||
                  (lastCardsUsed.length === 0 && (
                    <EmptySlot
                      onClick={
                        cardActive ? () => nextTurn(cardActive) : undefined
                      }
                      isHighlighted={
                        !'012345679'.includes(String(cardActive?.value))
                      }
                    />
                  ))}
              </Reservedrea>
              <Reservedrea>
                <Card
                  card={{
                    color: 'blue',
                    id: '--',
                    status: CardBattleStatus.DECK,
                    value: '1',
                  }}
                  onClick={!cardActive && isYourTurn ? drawCard : undefined}
                />
                {cardActive ? (
                  <Card card={cardActive} isHighlighted />
                ) : (
                  <motion.div
                    layout
                    layoutId={'hand-card'}
                    key={'hand-card'}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <EmptySlot
                      style={{
                        width: '100%',
                      }}
                    />
                  </motion.div>
                )}
              </Reservedrea>
            </BattleBody>
            {getPlayerPositionArea(true)}
          </>
        )}
      </BattleContainer>
    </LayoutGroup>
  )
}

export default Battle

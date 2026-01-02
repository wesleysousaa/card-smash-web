import { useEffect, useState } from 'react'
import { BaseContiner, Container } from '../home/style'
import { RoomItem, RoomList } from './style'
import type { ChangeEvent } from 'react'
import { Button, Input, Title } from '@/global-sx.style'
import { useBattleContext } from '@/context/BattleContext'

function Lobby() {
  const { rooms, joinRoomWs, createRoomWs, listRooms } = useBattleContext()
  const [name, setName] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  useEffect(() => {
    if (rooms.length === 0) listRooms()
  }, [rooms])

  return (
    <Container>
      <BaseContiner>
        <Title>Salas</Title>

        <RoomList>
          {rooms.map((room) => (
            <RoomItem onClick={() => joinRoomWs(room.id)}>
              {' '}
              {room.name}{' '}
            </RoomItem>
          ))}
        </RoomList>

        <Title>Nova Sala</Title>
        <Input placeholder="Nome da sala" onChange={handleInputChange} />
        <Button
          onClick={
            name.trim().length > 0 ? () => createRoomWs(name) : undefined
          }
        >
          Criar sala
        </Button>
      </BaseContiner>
    </Container>
  )
}

export default Lobby

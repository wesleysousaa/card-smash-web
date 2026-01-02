import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { BaseContiner, Container } from './style'
import { Button, Input, Title } from '@/global-sx.style'
import { useBattleContext } from '@/context/BattleContext'

function Home() {
  const navigate = useNavigate()
  const { yourPlayer, setRoom } = useBattleContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom((prev) => {
      if (!prev) return null
      return {
        ...prev,
        yourPlayer: {
          ...prev.yourPlayer,
          name: e.target.value,
          id: prev?.yourPlayer.id || '',
        },
      }
    })
  }

  return (
    <Container>
      <BaseContiner>
        <Title>Insira seu nome</Title>
        <Input placeholder="Seu nome aqui" onChange={handleInputChange} />
        <Button
          onClick={
            yourPlayer?.name && yourPlayer.name.trim().length > 0
              ? () =>
                  navigate({
                    to: '/lobby',
                  })
              : undefined
          }
        >
          Ir para a lobby
        </Button>
        <p>by: Galeigo's and tetefane</p>
        <img src="icon.jpeg" width={100}></img>
      </BaseContiner>
    </Container>
  )
}

export default Home

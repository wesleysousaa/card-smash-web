import React, { createContext, useContext } from 'react'
import useBattle from '@/hooks/useBattle'

type UseBattle = ReturnType<typeof useBattle>

const BattleContext = createContext<UseBattle | undefined>(undefined)

export const BattleProvider: React.FC<{
  children: React.ReactNode
  autoConnect?: boolean
  wsUrl?: string
}> = ({ children, autoConnect = false, wsUrl }) => {
  const battle = useBattle()

  React.useEffect(() => {
    if (autoConnect) {
      battle.connectWs(wsUrl)
      battle.listRooms()
    }
    return () => {
      if (autoConnect) battle.disconnectWs()
    }
  }, [autoConnect, wsUrl])

  React.useEffect(() => {
    if (autoConnect) {
      battle.connectWs(wsUrl)
      battle.listRooms()
    }
    return () => {
      if (autoConnect) battle.disconnectWs()
    }
  }, [])

  return (
    <BattleContext.Provider value={battle}>{children}</BattleContext.Provider>
  )
}

export function useBattleContext() {
  const ctx = useContext(BattleContext)
  if (!ctx) throw new Error('Cade o provider?')
  return ctx
}

export default BattleContext

import styled from 'styled-components'
import { CardContainer } from '@/containers/card/styles'

export const BattleContainer = styled.div<{ disableClicks?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: auto;
  height: 100%;
  padding: 0 16px;
  justify-content: center;
  margin: 0 auto;
  ${(props) =>
    props.disableClicks &&
    `
    pointer-events: none;
  `}

  height: 80%;
  align-self: center;
`

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 8px;
  padding: 8px;
  border-radius: 16px;
  padding-bottom: 0;
`

export const BattleBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 30%;
  gap: 23.3%;
`

export const TurnIndicator = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  width: 100%;
  text-align: center;
`

export const Reservedrea = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  max-width: 18%;
  flex: 1;
`

export const CardDrawable = styled(CardContainer)`
  width: 100%;
`

export const EmptySlot = styled.button<{ isHighlighted?: boolean }>`
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  height: 90px;
  overflow: hidden;
  border-width: 3px;
  border-color: #797979ff;
  border-style: dotted;
  content: ' ';
  transition:
    transform 180ms ease,
    border-color 180ms ease;
  ${(props) =>
    props.isHighlighted &&
    `
    cursor: pointer;
    transform: scale(1.1);
    border-color: rgba(255, 0, 0, 0.6);
    `}
`

export const ParabensOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.45);
  animation: fadeIn 280ms ease;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const ParabensContent = styled.div`
  position: relative;
  background: linear-gradient(135deg, #ff7eb3 0%, #ffd27f 100%);
  border-radius: 18px;
  padding: 36px 44px;
  min-width: 320px;
  text-align: center;
  color: #fff;
  box-shadow: 0 14px 50px rgba(0, 0, 0, 0.45);
  transform-origin: center;
  animation: popIn 700ms cubic-bezier(0.22, 0.9, 0.3, 1);
  @keyframes popIn {
    from {
      transform: scale(0.6) rotate(-6deg);
      opacity: 0;
    }
    to {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  h1 {
    font-size: 36px;
    margin: 0 0 6px;
    letter-spacing: 0.6px;
  }
  p {
    margin: 0 0 12px;
    opacity: 0.95;
  }

  .confetti {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .confetti span {
    position: absolute;
    top: -20%;
    width: 8px;
    height: 14px;
    border-radius: 2px;
    opacity: 0.95;
    animation: confettiFall 1200ms linear forwards;
  }

  @keyframes confettiFall {
    0% {
      transform: translateY(-20%) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(140%) rotate(360deg);
      opacity: 0;
    }
  }

  button {
    margin-top: 12px;
    padding: 10px 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
  }
`

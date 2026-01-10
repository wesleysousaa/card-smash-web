import styled, { css, keyframes } from 'styled-components'
import { CardContainer } from '@/containers/card/styles'

export const BattleContainer = styled.div<{ disableClicks?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  gap: 8px;
  padding: 8px;
  border-radius: 16px;
  padding-bottom: 0;
  z-index: 1;
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

const float = keyframes`
  0%   { transform: translateY(0) }
  50%  { transform: translateY(-3px) }
  100% { transform: translateY(0) }
`

export const PlayerIndicator = styled.p<{
  orientation: 'left' | 'right'
}>`
  position: relative;
  display: inline-flex;
  align-items: center;

  color: #fff;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.6px;

  padding: 12px 52px 12px 18px;
  user-select: none;

  animation: ${float} 3.8s ease-in-out infinite;
  transform-style: preserve-3d;

  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.16) 0%,
    rgba(0, 0, 0, 0.22) 100%
  );

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);

  transition:
    transform 220ms cubic-bezier(0.2, 0.9, 0.25, 1),
    box-shadow 220ms ease;

  /* brilho */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      transparent 25%,
      rgba(255, 255, 255, 0.28) 42%,
      rgba(255, 255, 255, 0.45) 50%,
      rgba(255, 255, 255, 0.28) 58%,
      transparent 75%
    );
    transform: translateX(-140%) skewX(-22deg);
  }

  &:hover {
    transform: translateY(-5px) rotateX(9deg);
    box-shadow:
      0 14px 34px rgba(0, 0, 0, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.26);
  }

  ${(props) =>
    props.orientation === 'left'
      ? css`
          align-self: flex-start;

          /* formato recortado */
          border-radius: 0 0 14px 4px;

          background-color: #1e90ff;

          clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%);

          transform: rotateY(6deg);
        `
      : css`
          align-self: flex-end;

          border-radius: 0 4px 14px 0;

          background-color: #dc143c;

          clip-path: polygon(8% 0, 100% 0, 100% 100%, 8% 100%, 0 50%);

          transform: rotateY(-6deg);
        `}
`

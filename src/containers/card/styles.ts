import styled from 'styled-components'

export const CardShadow = styled.div<{
  customWidth?: string
  dropDelay?: number
}>`
  margin-bottom: 12px;
  border-radius: 16px;
  overflow: visible;
  flex-shrink: 0;
  display: inline-block;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
  will-change: transform, box-shadow;
  max-width: ${(props) => props.customWidth || '17%'};
  min-width: ${(props) => props.customWidth || '17%'};
  width: ${(props) => props.customWidth || '17%'};

  /* drop-in animation when element is mounted */
  transform: translateY(-48px);
  opacity: 0;
  animation: dropIn 480ms cubic-bezier(0.2, 0.8, 0.3, 1) both;
  animation-delay: ${(props) =>
    props.dropDelay ? props.dropDelay + 'ms' : '0ms'};

  @keyframes dropIn {
    0% {
      transform: translateY(-48px) rotate(-1.5deg);
      opacity: 0;
    }
    60% {
      transform: translateY(8px) rotate(0.8deg);
      opacity: 1;
    }
    100% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
  }

  /* respect user preference for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
    opacity: 1;
  }
`

export const CardContainer = styled.button<{
  color: string
  isHighlighted?: boolean
  disableClick?: boolean
}>`
  background-color: ${(props) => props.color};
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(0, 0, 0, 0.04) 100%
  );
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  height: 100px;
  overflow: hidden;
  border: ${(props) =>
    props.isHighlighted
      ? '2px solid rgba(255,255,255,0.22)'
      : '1px solid rgba(255,255,255,0.06)'};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border 180ms ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  }

  &:active {
    transform: translateY(-2px) scale(0.99);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.14);
    outline-offset: 3px;
  }

  ${(props) =>
    props.isHighlighted &&
    `
    transform: scale(1.1);
    box-shadow: 0 20px 46px rgba(0,0,0,0.28);
  `}
  ${(props) =>
    props.disableClick &&
    `
    pointer-events: none;
    cursor: default;
    opacity: 0.78;
  `}
`

export const CardTitle = styled.p<{ valueChanged?: boolean }>`
  font-size: 34px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  letter-spacing: 0.6px;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  transition:
    transform 220ms cubic-bezier(0.2, 0.9, 0.25, 1),
    color 220ms ease;

  ${(props) =>
    props.valueChanged &&
    `
    animation: valueChange 420ms cubic-bezier(.2,.9,.25,1) both;
  `}

  @keyframes valueChange {
    0% {
      transform: scale(1);
      color: #ffffff;
      text-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
    }
    30% {
      transform: scale(1.22) translateY(-4px);
      color: #fff8e8;
      text-shadow: 0 8px 22px rgba(255, 255, 255, 0.22);
    }
    65% {
      transform: scale(0.96) translateY(2px);
    }
    100% {
      transform: scale(1) translateY(0);
      color: #ffffff;
      text-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
    }
  }
`

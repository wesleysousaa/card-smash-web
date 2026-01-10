import styled from 'styled-components'

export const CardContainer = styled.button<{
  color: string
  isHighlighted?: boolean
  disableClick?: boolean
}>`
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-6px) rotateX(8deg);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  }
  width: 100%;
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
  height: 60px;
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

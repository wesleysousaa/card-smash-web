import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
`
export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
`

export const Button = styled.button`
  --bg1: #ff6b2d;
  --bg2: #ff9a3c;
  padding: 12px 24px;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  background: linear-gradient(90deg, var(--bg1), var(--bg2), #ffd27a);
  background-size: 200% 100%;
  box-shadow:
    0 6px 18px rgba(255, 107, 45, 0.18),
    inset 0 -3px 6px rgba(0, 0, 0, 0.04);
  transition:
    transform 300ms cubic-bezier(0.2, 0.9, 0.25, 1),
    box-shadow 300ms ease;
  will-change: transform, box-shadow, background-position;
  &:focus {
    outline: none;
    box-shadow: 0 8px 24px rgba(255, 107, 45, 0.22);
    animation: shine 1s linear;
  }
  @keyframes shine {
    0% {
      background-position: 0% 50%;
      transform: translateY(0) scale(1);
    }
    50% {
      background-position: 100% 50%;
      transform: translateY(-3px) scale(1.02);
    }
    100% {
      background-position: 0% 50%;
      transform: translateY(0) scale(1);
    }
  }
`

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  transition:
    box-shadow 240ms cubic-bezier(0.2, 0.9, 0.25, 1),
    border-color 240ms,
    transform 200ms;
  font-size: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 2px 8px rgba(15, 15, 15, 0.04);
  &:focus {
    outline: none;
    border-color: rgba(255, 107, 45, 0.9);
    box-shadow: 0 8px 30px rgba(255, 107, 45, 0.12);
    transform: translateY(-2px);
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }
`

import styled from 'styled-components'

export const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RoomItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`

import styled from 'styled-components'

//Controller related
export const Controller = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  border: 0.05rem solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  width: 2.5rem;
`
export const ControllerImage = styled.i`
  color: ${({ theme }) => theme.accentColor};
  font-size: 2.5rem;
  :hover {
    filter: brightness(115%);
  }
`
//Input related
export const BeforeInput = styled.div`
  display: inline-block;
  position: relative;
  ::before {
    content: '${({ content }) => content}';
    background-color: ${({ theme }) => theme.bgColor};
    border: 0.05rem solid ${({ theme }) => theme.borderColor};
    border-radius: 0.25rem;
    font-family: Verdana;
    font-size: 0.55rem;
    left: 1rem;
    padding: 0.15rem;
    position: absolute;
    top: -22.5%;
  }
`
export const Input = styled.input`
  background-color: ${({ theme }) => theme.bgColor};
  border: 0.05rem solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  color: inherit;
  font-family: inherit;
  height: 1rem;
  margin: 0.15rem;
  overflow-y: hidden;
  padding: 0.75rem;
  resize: none;
  vertical-align: text-bottom;
  :focus {
    outline: none;
  }
`

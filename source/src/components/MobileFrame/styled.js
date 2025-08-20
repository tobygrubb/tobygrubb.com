import styled from 'styled-components/macro'

const Styled = {}

Styled.MobileFrame = styled.div`
  width: 90%;
  margin: 80px auto;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 70px rgba(0, 0, 0, ${(p) => p.shadowOpacity || 0.25});
  border-radius: ${(props) => props.radius}px;

  > * {
    margin: -.1px;
  }

  &::after {
    content: '';
    background: rgba(255, 255, 255, .5);
    height: 4px;
    width: 30%;
    bottom: 15px;
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
    z-index: 1;
  }
}
`

export default Styled

import { css } from 'styled-components/macro'

const _setPositionStyles = positionName => {
  const style = {
    'top-left': css`
      top: 0;
      right: 0;
    `,
    'top-center': css`
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    `,
    'top-right': css`
      top: 0;
      right: 0;
    `,
    'middle-left': css`
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    `,
    'middle-center': css`
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    `,
    'middle-right': css`
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    `,
    'bottom-left': css`
      bottom: 0;
      left: 0;
    `,
    'bottom-center': css`
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    `,
    'bottom-right': css`
      bottom: 0;
      right: 0;
    `,
  }
  return style[positionName]
}

export default _setPositionStyles

import React from 'react'

import Styled from './blocks'

const Text = (
  { value } //eslint-disable-line
) => <Styled.Text>{value}</Styled.Text>

export default React.memo(Text)

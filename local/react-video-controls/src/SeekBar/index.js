import React, { createContext, useContext, useMemo } from 'react'
import Styled from './Styled'
import useControls from './hooks/useControls'
import { VideoCtx } from '../index'

const SeekBarCtx = createContext()
export const MemoizedCtx = createContext()

function ContextMemoizer(props) {
  const { controls, state, ref } = useContext(VideoCtx)

  return useMemo(
    () => (
      <MemoizedCtx.Provider
        value={{
          videoRef: ref,
          setSeeking: controls.setSeeking,
          duration: state.duration,
        }}
      >
        <SeekBarInner {...props} />
      </MemoizedCtx.Provider>
    ),
    [controls.setSeeking, props, ref, state.duration]
  )
}

function SeekBarInner({ children, className }) {
  const { childRef, parentRef } = useControls()
  return (
    <Styled.Bar ref={parentRef} className={className}>
      <SeekBarCtx.Provider value={{ childRef }}>
        {children || <Progress />}
      </SeekBarCtx.Provider>
    </Styled.Bar>
  )
}

function Progress({ className }) {
  const { childRef } = useContext(SeekBarCtx)
  const { state } = useContext(VideoCtx)
  const playedPercent = state.time / state.duration || 0

  return (
    <Styled.Progress
      className={className}
      dragging={state.seeking}
      percent={playedPercent}
      ref={childRef}
    />
  )
}

// SeekBar.propTypes = {}

const SeekBar = ContextMemoizer
SeekBar.Progress = Progress

export default SeekBar

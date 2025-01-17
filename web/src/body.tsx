import React from 'react';
import styled from 'styled-components';
import { B, xid } from './core';
import { Box } from './protocol';
import { Send } from './socket';
import { newCaptureContext } from './ui';
import { Zone } from './zone';

const continueButton: Box = {
  xid: xid(), mode: 'button', index: -1 /* don't capture */, options: [
    { value: 'continue', text: 'Continue', selected: true }
  ]
}

const hasActions = (boxes: Box[]): B => { // recursive
  for (const box of boxes) {
    if (box.items) {
      if (hasActions(box.items)) return true
    } else {
      const { mode } = box
      if (mode === 'button' && box.options.length) return true
      if (mode === 'md' && box.index >= 0) return true
    }
  }
  return false
}

const Container = styled.div`
  padding: 1rem 2rem 2rem;
`

export const Body = (props: { send: Send, boxes: Box[] }) => {
  const
    original = props.boxes,
    canContinue = hasActions(original),
    boxes: Box[] = canContinue ? original : [...original, continueButton],
    context = newCaptureContext(props.send, [])
  return (
    <Container>
      <Zone context={context} boxes={boxes} stack={{}} />
    </Container>
  )
}
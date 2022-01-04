import { FC, ReactNode, useState } from 'react';

interface HoldableProps {
  id: string;
  onClick: (evt: FC) => void;
  onHold: (evt: FC) => void;
  children: ReactNode;
}

const holdTime = 500 // ms
const holdDistance = 3**2 //pixels squared

export default function Holdable({id, onClick, onHold, children}: HoldableProps) {

  const [timer, setTimer] = useState(null)
  const [pos, setPos] = useState([0,0])

  function onPointerDown(evt: any) {
    setPos([evt.clientX, evt.clientY]) // save position for later
    const event = { ...evt } // convert synthetic event to real object
    const timeoutId: any = window.setTimeout(timesup.bind(null, event), holdTime)
    setTimer(timeoutId)
  }

  function onPointerUp(evt: any) {
    if (timer) {
      window.clearTimeout(timer)
      setTimer(null)
      onClick(evt)
    }
  }

  function onPointerMove(evt: any) {
    // cancel hold operation if moved too much
    if (timer) {
      const d = (evt.clientX - pos[0])**2 + (evt.clientY - pos[1])**2
      if (d > holdDistance) {
        setTimer(null)  
        window.clearTimeout(timer)
      }
    }
  }

  function timesup(evt: FC) {
    setTimer(null)
    onHold(evt)
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      id={id}
    >
      {children}
    </div>
  )
}
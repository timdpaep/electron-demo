import React from 'react';
import { useArduino } from '../hooks';
import Button from './Button';

export default function LedToggle() {
  const { setLedColor } = useArduino();
  return (
    <div>
      <Button onClick={() => setLedColor("FFFFFF", "00001")}>Turn On</Button>
      <Button onClick={() => setLedColor("000000", "00001")}>Turn Off</Button>
    </div>
  )
}

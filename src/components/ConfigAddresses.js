import React from 'react';
import { useArduino } from '../hooks';
import Button from './Button';

export default function ConfigAddresses() {
  const { configAddresses } = useArduino();
  return (
    <div>
      <Button onClick={() => configAddresses([1])}>Send Config</Button>
    </div>
  )
}

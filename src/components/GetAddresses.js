import React, { useEffect, useState } from 'react';
import { useElectron } from '../hooks';
import Button from './Button';

export default function GetAddresses() {
  // const { getAddresses } = useArduino();
  const { ipcRenderer } = useElectron();
  const [ addresses, setAddresses ] = useState([]);

  const getAddresses = () => {
    console.log("from here", ipcRenderer.sendSync("getAddresses"));
  };

  // useEffect(() => {
  //   setAddresses(ipcRenderer.sendSync("getAddresses"));
  // }, [ ipcRenderer ]);

  return (
    <div>
      <Button onClick={() => getAddresses()}>get addresses</Button>
    </div>
  )
}

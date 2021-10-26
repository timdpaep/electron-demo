import { useState, useEffect } from 'react';
import { useElectron } from '../hooks';

export default function SerialPorts() {
  const { ipcRenderer } = useElectron();
  const [ ports, setPorts ] = useState([]);

  useEffect(() => {
    setPorts(ipcRenderer.sendSync("listSerialPorts"));
  }, [ ipcRenderer ]);

  return (
    <select>
      {ports && ports.map(port => (<option>{port}</option>))}
    </select>
  )
}

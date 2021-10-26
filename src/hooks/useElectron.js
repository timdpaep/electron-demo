import { useContext } from 'react';
import { ElectronContext } from '../context/electron';

export default function useElectron() {
  // get the electron shizzle from context
  const { ipcRenderer } = useContext(ElectronContext);

  // output the necessary objects
  return { ipcRenderer };
}

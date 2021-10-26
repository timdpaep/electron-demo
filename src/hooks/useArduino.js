import useElectron from './useElectron';

export default function useArduino() {
  // get the electron shizzle from context
  const { ipcRenderer } = useElectron();

  // this will set a led strip color
  const setLedColor = (color, address) => ipcRenderer.send('setLedColor', { color, address });

  // this will config addresses
  const configAddresses = (addresses) => ipcRenderer.send('configAddresses', { addresses });

  // this will get the configured addresses
  const getAddresses = () => ipcRenderer.send('getAddresses');

  // output the necessary objects
  return {
    setLedColor,
    configAddresses,
    getAddresses
  };
}
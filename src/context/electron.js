import * as React from 'react';
const { ipcRenderer } = window.require('electron');

const ElectronContext = React.createContext();

const ElectronProvider = ({children}) => {
  return (
    <ElectronContext.Provider value={{ ipcRenderer }}>
      {children}
    </ElectronContext.Provider>
  );
}

export { ElectronContext, ElectronProvider }
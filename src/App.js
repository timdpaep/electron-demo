import { ElectronProvider } from './context/electron';
import GetAddresses from './components/GetAddresses';

export default function App() {
  return (
    <ElectronProvider>
      <GetAddresses />
    </ElectronProvider>
  );
}

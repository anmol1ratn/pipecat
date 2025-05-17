import {
  RTVIClientAudio,
  RTVIClientVideo,
  useRTVIClientTransportState,
} from '@pipecat-ai/client-react';
import { RTVIProvider } from './providers/RTVIProvider';
import { ConnectButton } from './components/ConnectButton';
import { StatusDisplay } from './components/StatusDisplay';
import { DebugDisplay } from './components/DebugDisplay';
import './App.css';
import { useEffect, useState } from 'react';

function BotVideo() {
  const transportState = useRTVIClientTransportState();
  const isConnected = transportState !== 'disconnected';

  return (
    <div className="bot-container">
      <div className="video-container">
        {isConnected && <RTVIClientVideo participant="bot" fit="cover" />}
      </div>
    </div>
  );
}

function Recording() {
  const transportState = useRTVIClientTransportState(); // Assuming this hook provides the state
  const show = transportState === 'disconnected';

   const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    if (transportState === 'disconnected') {
      const freshUrl = `./recordings/full_conversation_recording.wav?timestamp=${Date.now()}`;
      setAudioSrc(freshUrl);
    } else {
      setAudioSrc(null);
    }
  }, [transportState]);

  return (
    <div>
      {show && audioSrc && (
        <audio controls key={audioSrc}>
          <source src={audioSrc} type="audio/wav" />
        </audio>
      )}
       {show && !audioSrc && (
          <p>Preparing recording...</p>
       )}
    </div>
  );
}

function AppContent() {
  return (
    <div className="app">
      <div className="status-bar">
        <StatusDisplay />
        <ConnectButton />
      </div>

      <div className="main-content">
        <BotVideo />
      </div>

      <Recording />
      <DebugDisplay />
      <RTVIClientAudio />
    </div>
  );
}

function App() {
  return (
    <RTVIProvider>
      <AppContent />
    </RTVIProvider>
  );
}

export default App;

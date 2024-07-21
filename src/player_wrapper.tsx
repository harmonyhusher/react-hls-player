import { Player } from './lib/components/player/player';
import { HlsProvider } from './lib/provider/HlsProvider';

export const PlayerWrapper = () => {
  return (
    <HlsProvider>
      <h1>HLS.js React Player</h1>
      <Player source="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" />
    </HlsProvider>
  );
};

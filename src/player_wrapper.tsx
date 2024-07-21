import { Player } from './lib/components/player/player';
import { ProgressBar } from './lib/components/progress_bar/progress_bar';
import { HlsProvider } from './lib/provider/HlsProvider';

export const PlayerWrapper = () => {
  return (
    <HlsProvider>
      <Player source="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" />
      <ProgressBar />
    </HlsProvider>
  );
};

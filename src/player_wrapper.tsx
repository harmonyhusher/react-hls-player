/* eslint-disable max-len */
import { Player } from './lib/components/player/player';
import { HlsProvider } from './lib/provider/HlsProvider';
import { LayerProvider } from './lib/provider/LayerProvider/layer_provider';

export const PlayerWrapper = () => {
  return (
    <HlsProvider>
      <div style={{ position: 'relative', maxWidth: '50%' }} tabIndex={0}>
        <Player source="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8" />
        <LayerProvider />
      </div>
    </HlsProvider>
  );
};

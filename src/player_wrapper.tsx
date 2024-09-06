/* eslint-disable max-len */
import { Player } from './lib/components/player/player';
import { HlsProvider } from './lib/provider/hls_provider/HlsProvider';
import { LayerProvider } from './lib/provider/layer_provider/layer_provider';

export const PlayerWrapper = () => {
  return (
    <HlsProvider>
      <div style={{ position: 'relative', maxWidth: '50%' }} tabIndex={0}>
        <Player source="https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8" />
        <LayerProvider />
      </div>
    </HlsProvider>
  );
};

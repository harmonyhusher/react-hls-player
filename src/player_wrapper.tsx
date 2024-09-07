/* eslint-disable max-len */
import { Player } from './lib/components/player/player';
import { LoadingLayer } from './lib/layers/loading_layer/loading_layer';
import { HlsProvider } from './lib/provider/hls_provider/HlsProvider';
import { LayerProvider } from './lib/provider/layer_provider/layer_provider';

import cs from './wrapper.module.scss';

export const PlayerWrapper = () => {
  return (
    <HlsProvider>
      <div className={cs.wrapper} style={{ position: 'relative', maxWidth: '100%' }} tabIndex={0}>
        <Player source="https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8" />
        <LoadingLayer>
          <LayerProvider />
        </LoadingLayer>
      </div>
    </HlsProvider>
  );
};

import { createStore, sample } from 'effector';
import Hls from 'hls.js';
import { and } from 'patronum';

import { destroyHls, setDuration, setHlsInstance, setVideoElement } from './events';

interface HLSState {
  hlsInstance: Hls | null;
  videoElement: HTMLVideoElement | null;
}

const $hlsStore = createStore<HLSState>({
  hlsInstance: null,
  videoElement: null,
})
  .on(setHlsInstance, (state, hlsInstance) => ({ ...state, hlsInstance }))
  .on(setVideoElement, (state, videoElement) => ({ ...state, videoElement }))
  .on(destroyHls, (state) => state.hlsInstance?.destroy())
  .reset(destroyHls);

export { $hlsStore, setHlsInstance, setVideoElement, destroyHls };

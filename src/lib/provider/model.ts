import { createEvent, createStore } from 'effector';
import Hls from 'hls.js';

interface HLSState {
  hlsInstance: Hls | null;
  videoElement: HTMLVideoElement | null;
}

const setHlsInstance = createEvent<Hls | null>();
const setVideoElement = createEvent<HTMLVideoElement | null>();
const destroyHls = createEvent<void>();

const $hlsStore = createStore<HLSState>({
  hlsInstance: null,
  videoElement: null,
})
  .on(setHlsInstance, (state, hlsInstance) => ({ ...state, hlsInstance }))
  .on(setVideoElement, (state, videoElement) => ({ ...state, videoElement }))
  .on(destroyHls, (state) => state.hlsInstance?.destroy())
  .reset(destroyHls);

export { $hlsStore, setHlsInstance, setVideoElement, destroyHls };

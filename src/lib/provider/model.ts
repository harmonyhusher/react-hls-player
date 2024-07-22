import { createStore } from 'effector';
import Hls from 'hls.js';

import { destroyHls, setCurrentTime, setHlsInstance, setVideoElement } from './events';

interface IHlsInstance {
  hlsInstance: Hls | null;
}

interface IVideoElement {
  videoElement: HTMLVideoElement | null;
}

const $hlsInstance = createStore<IHlsInstance>({ hlsInstance: null })
  .on(setHlsInstance, (state, hlsInstance) => ({ ...state, hlsInstance }))
  .on(destroyHls, (state) => state.hlsInstance?.destroy())
  .reset(destroyHls);

const $videoElement = createStore<IVideoElement>({ videoElement: null })
  .on(setVideoElement, (_, videoElement) => ({
    videoElement,
  }))
  .on(setCurrentTime, (video, t) => {
    if (video.videoElement) {
      video.videoElement.currentTime = t;
    }
    return { ...video };
  });

export { $hlsInstance, $videoElement, setHlsInstance, setVideoElement, destroyHls };

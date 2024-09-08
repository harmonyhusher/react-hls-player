import { createStore } from 'effector';
import Hls from 'hls.js';

import { destroyHls, setCurrentTime, setHlsInstance, setIsPlayerReady, setIsPlaying, setVideoElement } from './events';

interface IHlsInstance {
  hlsInstance: Hls | null;
}

interface IVideoElement {
  videoElement: HTMLVideoElement | null;
}

interface IPlayerState {
  isPlayerReady: boolean;
  isPlaying: boolean;
}

const $hlsInstance = createStore<IHlsInstance>({ hlsInstance: null })
  .on(setHlsInstance, (state, hlsInstance) => ({ ...state, hlsInstance }))
  .on(destroyHls, (state) => state.hlsInstance?.destroy())
  .reset(destroyHls);

const $videoElement = createStore<IVideoElement>({ videoElement: null })
  .on(setVideoElement, (_, videoElement) => ({
    videoElement,
  }))
  .on(setCurrentTime, ({ videoElement }, t) => {
    if (videoElement) {
      videoElement.currentTime = t;
    }
    return { videoElement };
  });

const $player = createStore<IPlayerState>({ isPlaying: false, isPlayerReady: false })
  .on(setIsPlaying, (state, isPlaying) => {
    return { ...state, isPlaying };
  })
  .on(setIsPlayerReady, (state, isPlayerReady) => {
    return { ...state, isPlayerReady };
  });

export { $hlsInstance, $videoElement, setHlsInstance, setVideoElement, destroyHls, $player };

import React, { useCallback } from 'react';

import { useUnit } from 'effector-react';

import { $hlsInstance, $player, $videoElement, setVideoElement } from '../../provider/hls_provider/model';
import { setCurrentTime, setIsPlayerReady, setIsPlaying } from '../../provider/hls_provider/events';
import { $isDragging, setProgress } from '../../layers/progress_layer/model';

interface IPlayerProps {
  source: string;
}

const Player = ({ source }: IPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const { hlsInstance } = useUnit($hlsInstance);
  const { videoElement } = useUnit($videoElement);
  const [{ isPlayerReady }, setPlayerReady] = useUnit([$player, setIsPlayerReady]);
  useUnit([setVideoElement, setIsPlaying, setProgress]);

  const handleIsPlaying = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleSetProgress = () => {
    videoElement && setProgress(videoElement.currentTime);
  };

  React.useEffect(() => {
    const video = videoRef.current;
    console.log(hlsInstance, video);
    if (video) {
      setVideoElement(video);

      if (hlsInstance) {
        hlsInstance.loadSource(source);
        hlsInstance.attachMedia(video);
      }

      if (videoElement && hlsInstance) {
        setPlayerReady(true);
      }

      video.addEventListener('play', () => {
        handleIsPlaying(true);
      });

      video.addEventListener('pause', () => {
        handleIsPlaying(false);
      });

      videoElement?.addEventListener('timeupdate', handleSetProgress);
    }

    return () => {
      if (hlsInstance && videoElement) {
        hlsInstance.detachMedia();
        videoRef.current = null;
        setVideoElement(null);
      }
    };
  }, [source, hlsInstance, setVideoElement, videoElement, isPlayerReady]);
  console.log(!$player.getState().isPlayerReady, '!$player.getState().isPlayerReady');
  if (!$player.getState().isPlayerReady) {
    return <>Loading</>;
  }

  return <video ref={videoRef} style={{ width: '100%' }} />;
};

export { Player };

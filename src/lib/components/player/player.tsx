import React, { useCallback } from 'react';

import { useUnit } from 'effector-react';

import { $hlsInstance, $videoElement, setVideoElement } from '../../provider/model';
import { setCurrentTime, setIsPlaying } from '../../provider/events';
import { $isDragging, setProgress } from '../../layers/progress_layer/model';

interface IPlayerProps {
  source: string;
}

const Player = ({ source }: IPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const { hlsInstance } = useUnit($hlsInstance);
  const { videoElement } = useUnit($videoElement);
  useUnit([setVideoElement, setIsPlaying, setProgress]);

  const handleIsPlaying = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleSetProgress = () => {
    videoElement && setProgress(videoElement.currentTime);
  };

  React.useEffect(() => {
    const video = videoRef.current;

    if (video) {
      setVideoElement(video);

      if (hlsInstance) {
        hlsInstance.attachMedia(video);
        hlsInstance.loadSource(source);
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
  }, [source, hlsInstance, setVideoElement, videoElement]);

  return <video ref={videoRef} style={{ width: '100%' }} />;
};

export { Player };

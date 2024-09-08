import React, { useCallback } from 'react';

import { useUnit } from 'effector-react';

import { getBuffered } from '../../../shared/helpers/get-buffered';
import { $isDragging, setBuffered, setProgress } from '../../layers/progress_layer/model';
import { setCurrentTime, setIsPlayerReady, setIsPlaying } from '../../provider/hls_provider/events';
import { $hlsInstance, $player, $videoElement, setVideoElement } from '../../provider/hls_provider/model';

interface IPlayerProps {
  source: string;
}

const Player = ({ source }: IPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const { hlsInstance } = useUnit($hlsInstance);
  const { videoElement } = useUnit($videoElement);
  useUnit([setVideoElement, setIsPlaying, setProgress, setIsPlayerReady, setBuffered]);

  const handleIsPlaying = useCallback((playing: boolean) => {
    setIsPlaying(playing);
  }, []);

  const handleSetProgress = () => {
    setProgress(videoElement?.currentTime || 0);
  };

  const handleBuffering = () => {
    if (!videoElement) {
      return;
    }

    const buffered = getBuffered(videoElement);
    setBuffered(buffered);
  };

  React.useEffect(() => {
    const video = videoRef.current;

    if (video) {
      setVideoElement(video);

      if (hlsInstance) {
        hlsInstance.loadSource(source);
        hlsInstance.attachMedia(video);
      }

      video.addEventListener('play', () => {
        handleIsPlaying(true);
      });

      video.addEventListener('pause', () => {
        handleIsPlaying(false);
      });

      video?.addEventListener('timeupdate', handleSetProgress);

      videoElement?.addEventListener('progress', handleBuffering);
    }

    return () => {
      if (hlsInstance && videoElement) {
        hlsInstance.detachMedia();
        videoRef.current = null;
        setVideoElement(null);
      }
    };
  }, [source, hlsInstance, setVideoElement, videoElement]);

  React.useEffect(() => {
    if (videoRef.current && hlsInstance) {
      setIsPlayerReady(true);
    }
  }, [hlsInstance]);

  return <video ref={videoRef} style={{ width: '100%' }} />;
};

export { Player };

import React from 'react';

import { useUnit } from 'effector-react';

import { $hlsInstance, $videoElement, setVideoElement } from '../../provider/model';
import { setCurrentTime } from '../progress_bar/model';
import s from './player.module.scss';

interface IPlayerProps {
  source: string;
}

const Player = ({ source }: IPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const { hlsInstance } = useUnit($hlsInstance);
  const { videoElement } = useUnit($videoElement);
  const [setVideo] = useUnit([setVideoElement]);

  const [setTime] = useUnit([setCurrentTime]);

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime;

    if (currentTime) {
      setTime(currentTime);
    }
  };

  React.useEffect(() => {
    if (videoRef.current) {
      setVideo(videoRef.current);

      if (hlsInstance) {
        hlsInstance.attachMedia(videoRef.current);
        hlsInstance.loadSource(source);
      }
    }

    return () => {
      if (hlsInstance && videoElement) {
        hlsInstance.detachMedia();
        videoRef.current = null;
        setVideo(null);
      }
    };
  }, [source, hlsInstance, setVideo, videoElement]);

  return (
    <video
      className={s.player}
      controls
      onTimeUpdate={handleTimeUpdate}
      ref={videoRef}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export { Player };

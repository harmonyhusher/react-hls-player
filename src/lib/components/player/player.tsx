import React from 'react';

import { useUnit } from 'effector-react';

import { $hlsInstance, $videoElement, setVideoElement } from '../../provider/model';
import s from './player.module.scss';

interface IPlayerProps {
  source: string;
}

const Player = ({ source }: IPlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const { hlsInstance } = useUnit($hlsInstance);
  const { videoElement } = useUnit($videoElement);
  const [setVideo] = useUnit([setVideoElement]);

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
        setVideo(null);
      }
    };
  }, [source, hlsInstance, setVideo, videoElement]);

  return <video className={s.player} controls ref={videoRef} style={{ width: '100%', height: 'auto' }} />;
};

export { Player };

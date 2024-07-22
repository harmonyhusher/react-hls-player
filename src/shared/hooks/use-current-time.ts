import { useUnit } from 'effector-react';
import React from 'react';
import { $videoElement } from '../../lib/provider/model';
import { setCurrentTime } from '../../lib/provider/events';

const useCurrentTime = () => {
  const { videoElement } = useUnit($videoElement);

  const [setTime] = useUnit([setCurrentTime]);

  React.useEffect(() => {
    const getCurrentTime = (event: Event) => {
      setTime((event?.target as HTMLVideoElement)?.currentTime);
    };

    videoElement?.addEventListener('timeupdate', getCurrentTime);

    return () => {
      videoElement?.removeEventListener('timeupdate', getCurrentTime);
    };
  }, []);
};
export { useCurrentTime };

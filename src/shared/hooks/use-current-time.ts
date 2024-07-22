import React from 'react';

import { useUnit } from 'effector-react';

import { setCurrentTime } from '../../lib/provider/events';
import { $videoElement } from '../../lib/provider/model';

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

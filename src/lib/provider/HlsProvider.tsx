import React from 'react';

import { useUnit } from 'effector-react';
import Hls from 'hls.js';

import { useCurrentTime } from '../../shared/hooks/use-current-time';
import { EHLSEvents } from '../../shared/ts/enums';
import { hlsError, setCurrentTime, setDuration } from './events';
import { destroyHls, setHlsInstance } from './model';

interface IHLSProviderProps {
  children: React.ReactNode;
}

export const HlsProvider = ({ children }: IHLSProviderProps) => {
  const [setHls, destroyVideo, setHlsError] = useUnit([setHlsInstance, destroyHls, hlsError]);

  const [setVideoDuration] = useUnit([setDuration, setCurrentTime]);

  useCurrentTime();

  React.useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      setHls(hls);

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error(EHLSEvents.HLS_ERROR, data);
        setHlsError(data);
      });

      hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
        setVideoDuration(data.details.totalduration);
      });
    }
    return () => {
      destroyVideo();
    };
  }, [destroyVideo, setHls, setVideoDuration]);

  return <React.Fragment>{children}</React.Fragment>;
};

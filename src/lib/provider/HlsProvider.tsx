import React from 'react';

import { useUnit } from 'effector-react';
import Hls from 'hls.js';

import { EHLSEvents } from '../../shared/ts/enums';
import { destroyHls, setHlsInstance } from './model';

interface IHLSProviderProps {
  children: React.ReactNode;
}

export const HlsProvider = ({ children }: IHLSProviderProps) => {
  const [setHls, destroyVideo] = useUnit([setHlsInstance, destroyHls]);

  React.useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      setHls(hls);

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error(EHLSEvents.HLS_ERROR, data);
      });
    }
    return () => {
      destroyVideo();
    };
  }, [destroyVideo, setHls]);

  return <React.Fragment>{children}</React.Fragment>;
};

import React from 'react';

import { useUnit } from 'effector-react';
import Hls from 'hls.js';

import { EHLSEvents } from '../../../shared/ts/enums';
import { $hlsInstance, $player, destroyHls, setHlsInstance } from './model';
import { hlsError, setDuration, setIsPlayerReady } from './events';
import { qualityRanges } from '../../../shared/constants/quality-info';
import { setQualities as setLevels, TQualityWidths } from '../../layers/quality_layer/model';
import { getObjectTruthness } from '../../../shared/helpers/get-object-truthness';
interface IHLSProviderProps {
  children: React.ReactNode;
}

export const HlsProvider = ({ children }: IHLSProviderProps) => {
  const [setHls, destroyVideo, setHlsError] = useUnit([setHlsInstance, destroyHls, hlsError]);

  const [hlsInstance] = useUnit([$hlsInstance]);

  const [setVideoDuration, setQualities] = useUnit([setDuration, setLevels]);

  React.useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();

      setHls(hls);

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error(EHLSEvents.HLS_ERROR, data);
        setHlsError(data);
      });

      hls.on(Hls.Events.FRAG_BUFFERED, (e, data) => {
        // console.log(e, data, 'FRAG');
      });

      hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
        setVideoDuration(data.details.totalduration);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const qualities: TQualityWidths = {};

        for (let i = 0; i < data.levels.length; i++) {
          const level = data.levels[i];
          const width = level.width;

          for (const range of qualityRanges) {
            if (width <= range.max && !qualities[range.quality]) {
              qualities[range.quality] = level;
            }
          }
        }

        console.log(qualities);

        if (getObjectTruthness(qualities)) {
          setLevels(qualities);
        }
      });
    }

    return () => {
      destroyVideo();
    };
  }, [destroyVideo, setHls, setVideoDuration]);

  return <div>{Object.keys(hlsInstance).length > 0 && children}</div>;
};

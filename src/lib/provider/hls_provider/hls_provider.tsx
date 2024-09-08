import React from 'react';

import { useUnit } from 'effector-react';
import Hls from 'hls.js';

import { qualityRanges } from '../../../shared/constants/quality-info';
import { getObjectTruthness } from '../../../shared/helpers/get-object-truthness';
import { EHLSEvents } from '../../../shared/ts/enums';
import { setQualities as setLevels, TQualityWidths } from '../../layers/quality_layer/model';
import { hlsError, setDuration, setIsPlayerReady } from './events';
import { $hlsInstance, $player, destroyHls, setHlsInstance } from './model';
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

      // hls.on(Hls.Events.FRAG_LOADED, (e, data) => {
      //   const { loaded = 0 } = data.frag.stats;
      // });

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

        if (getObjectTruthness(qualities)) {
          setQualities(qualities);
        }
      });
    }

    return () => {
      destroyVideo();
    };
  }, [destroyVideo, setHls, setVideoDuration]);

  return <div>{Object.keys(hlsInstance).length > 0 && children}</div>;
};

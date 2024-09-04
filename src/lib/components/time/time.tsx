import { useUnit } from 'effector-react';

import { getFormattedTime } from '../../../shared/helpers/get-formatted-time';
import { $duration, $progress } from '../../layers/progress_layer/model';
import s from './time.module.scss';

const Time = () => {
  const [progress, duration] = useUnit([$progress, $duration]);

  return (
    <div className={s.time}>
      {getFormattedTime(progress)} / {getFormattedTime(duration)}
    </div>
  );
};

export { Time };

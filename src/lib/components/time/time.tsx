import { useUnit } from 'effector-react';

import { getFormattedTime } from '../../../shared/helpers/get-formatted-time';
import { $currentTime, $duration } from '../progress_bar/model';
import s from './time.module.scss';

const Time = () => {
  const [time, duration] = useUnit([$currentTime, $duration]);

  return (
    <div className={s.time}>
      {getFormattedTime(time)} / {getFormattedTime(duration)}
    </div>
  );
};

export { Time };

import { Time } from '../../components';

import cs from './control_layer.module.scss';
import { Button } from '../../../shared/components/button/button';
import { PlayIcon } from '../../../shared/icons/Play';
import { useUnit } from 'effector-react';
import { $player, $videoElement } from '../../provider/hls_provider/model';
import { StopIcon } from '../../../shared/icons/Stop';
import { Seek } from '../../../shared/icons/Seek';
import { $currentTime, $duration, setCurrentTime } from '../progress_layer/model';

const ControlLayer = () => {
  const [{ isPlaying }, video, time, setTime, duration] = useUnit([
    $player,
    $videoElement,
    $currentTime,
    setCurrentTime,
    $duration,
  ]);

  const handlePlay = () => {
    if (isPlaying) {
      video.videoElement?.pause();
    } else {
      video.videoElement?.play();
    }
  };

  const handleSeekTen = (to: 'next' | 'prev') => {
    setTime(time + (to === 'next' ? 10 : -10));
  };

  return (
    <div aria-label="Управление видео" className={cs.control_wrapper}>
      <div aria-label="Кнопки управления видео" className={cs.controls}>
        <Button aria-label={'Перемотать на 10 секунд назад'} icon={<Seek />} onClick={() => handleSeekTen('prev')} />
        <Button
          icon={isPlaying ? <StopIcon /> : <PlayIcon />}
          onClick={handlePlay}
          aria-label={isPlaying ? 'Пауза' : 'Продолжить'}
        />
        <Button
          aria-label={'Перемотать на 10 секунд вперед'}
          icon={<Seek next />}
          onClick={() => handleSeekTen('next')}
        />
      </div>

      <Time />
    </div>
  );
};

export { ControlLayer };

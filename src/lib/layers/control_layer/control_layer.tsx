import { IconSettings } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { Button } from '../../../shared/components/button/button';
import { Fullscreen } from '../../../shared/icons/Fullscreen';
import { PlayIcon } from '../../../shared/icons/Play';
import { Seek } from '../../../shared/icons/Seek';
import { StopIcon } from '../../../shared/icons/Stop';
import { Time } from '../../components';
import { $player, $videoElement } from '../../provider/hls_provider/model';
import { TooltipProvider } from '../../provider/tooltip_provider/tooltip-provider';
import { $currentTime, $duration, setCurrentTime } from '../progress_layer/model';
import { QualityLayer } from '../quality_layer/quality-layer';
import cs from './control_layer.module.scss';

const ControlLayer = () => {
  const [{ isPlaying }, video, time, setTime] = useUnit([
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
        <TooltipProvider text={'Перемотать на 10 секунд назад'} type={'mouseover'}>
          <Button aria-label={'Перемотать на 10 секунд назад'} icon={<Seek />} onClick={() => handleSeekTen('prev')} />
        </TooltipProvider>
        <TooltipProvider text={isPlaying ? 'Пауза' : 'Продолжить'} type={'mouseover'}>
          <Button
            aria-label={isPlaying ? 'Пауза' : 'Продолжить'}
            icon={isPlaying ? <StopIcon /> : <PlayIcon />}
            onClick={handlePlay}
          />
        </TooltipProvider>
        <TooltipProvider text={'Перемотать на 10 секунд вперед'} type={'mouseover'}>
          <Button
            aria-label={'Перемотать на 10 секунд вперед'}
            icon={<Seek next />}
            onClick={() => handleSeekTen('next')}
          />
        </TooltipProvider>
      </div>

      <Time />

      <div aria-label="Кнопки управления видео" className={cs.controls}>
        <TooltipProvider boundary={<QualityLayer />} type={'mouseover'}>
          <Button aria-label={'Перемотать на 10 секунд вперед'} icon={<IconSettings />} />
        </TooltipProvider>
        <TooltipProvider text={'Во весь экран'} type={'mouseover'}>
          <Button aria-label={'Перемотать на 10 секунд вперед'} icon={<Fullscreen />} />
        </TooltipProvider>
      </div>
    </div>
  );
};

export { ControlLayer };

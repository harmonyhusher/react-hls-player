import { useUnit } from 'effector-react';
import { $qualities } from './model';
import cs from './quality-layer.module.scss';
import { useMemo } from 'react';

export const QualityLayer = () => {
  const qualities = useUnit($qualities);

  const existingQualities = useMemo(() => qualities && Object.entries(qualities), [qualities]);

  console.log(qualities, 'qualities');

  return (
    <div tabIndex={0} className={cs.qualities_wrapper}>
      {existingQualities?.map(
        ([name, level]) =>
          level && (
            <p tabIndex={0} className={cs.quality} key={name}>
              {name}
            </p>
          ),
      )}
    </div>
  );
};

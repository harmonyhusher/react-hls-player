import { useUnit } from 'effector-react';
import { $qualities } from './model';
import cs from './quality-layer.module.scss';
import { useMemo } from 'react';
import { Container } from '../../../shared/components/container/container';

export const QualityLayer = () => {
  const qualities = useUnit($qualities);

  const existingQualities = useMemo(() => qualities && Object.entries(qualities), [qualities]);

  return (
    <Container tabIndex={0} className={cs.qualities_wrapper}>
      {existingQualities?.map(
        ([name, level]) =>
          level && (
            <p tabIndex={0} className={cs.quality} key={name}>
              {name}
            </p>
          ),
      )}
    </Container>
  );
};

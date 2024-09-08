import { useMemo } from 'react';

import { useUnit } from 'effector-react';

import { Container } from '../../../shared/components/container/container';
import { $qualities } from './model';
import cs from './quality-layer.module.scss';

export const QualityLayer = () => {
  const qualities = useUnit($qualities);

  const existingQualities = useMemo(() => qualities && Object.entries(qualities), [qualities]);

  return (
    <Container className={cs.qualities_wrapper} tabIndex={0}>
      {existingQualities?.map(
        ([name, level]) =>
          level && (
            <p className={cs.quality} key={name} tabIndex={0}>
              {name}
            </p>
          ),
      )}
    </Container>
  );
};

import React from 'react';

import { ControlLayer } from '../../layers/control_layer/control_layer';
import { ProgressLayer } from '../../layers/progress_layer/progress_layer';
import cs from './layer_provider.module.scss';
import { QualityLayer } from '../../layers/quality_layer/quality-layer';

export const LayerProvider = () => {
  return (
    <div className={cs.layer_provider}>
      <ProgressLayer />
      <ControlLayer />
      <QualityLayer />
    </div>
  );
};

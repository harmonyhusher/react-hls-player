import { ReactNode } from 'react';

import { IconLoader } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { $player } from '../../provider/hls_provider/model';

export const LoadingLayer = ({ children }: { children: ReactNode }) => {
  const { isPlayerReady } = useUnit($player);

  if (!isPlayerReady) {
    return <IconLoader />;
  }

  return <>{children}</>;
};

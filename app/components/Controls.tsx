import React from 'react';

import styles from './Controls.module.css';
import BackgroundControl from './BackgroundControl';
import PaddingControl from './PaddingControl';
import ThemeControl from './ThemeControl';

const Controls: React.FC = () => {
  return (
    <div className={styles.controls}>
      <ThemeControl />
      <BackgroundControl />
      <PaddingControl />
    </div>
  );
};

export default Controls;

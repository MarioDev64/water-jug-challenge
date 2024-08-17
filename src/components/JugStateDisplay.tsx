import React from 'react';
import styles from '../styles/JugStateDisplay.module.css';

interface JugStateDisplayProps {
  states: Array<{ x: number; y: number; explanation: string }>;
}

const JugStateDisplay: React.FC<JugStateDisplayProps> = ({ states }) => {
  return (
    <div className={styles.container}>
      {states.map((state, index) => (
        <div key={index} className={styles.state}>
          <p>Bucket X: {state.x} | Bucket Y: {state.y}</p>
          <p>{state.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default JugStateDisplay;

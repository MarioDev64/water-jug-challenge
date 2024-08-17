import React, { useState } from 'react';
import styles from '../styles/InputForm.module.css';

interface InputFormProps {
  onSolve: (bucketX: number, bucketY: number, amountWantedZ: number) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSolve }) => {
  const [bucketX, setBucketX] = useState<number>(0);
  const [bucketY, setBucketY] = useState<number>(0);
  const [amountWantedZ, setAmountWantedZ] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (bucketX < 1) newErrors.bucketX = 'Bucket X must be greater than 0';
    if (bucketY < 1) newErrors.bucketY = 'Bucket Y must be greater than 0';
    if (amountWantedZ < 1) newErrors.amountWantedZ = 'Amount Z must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSolve(bucketX, bucketY, amountWantedZ);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="bucketX">Bucket X:</label>
        <input
          type="number"
          id="bucketX"
          value={bucketX}
          onChange={(e) => setBucketX(Number(e.target.value))}
          min="1"
          className={styles.input}
        />
        {errors.bucketX && <div className={styles.error}>{errors.bucketX}</div>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bucketY">Bucket Y:</label>
        <input
          type="number"
          id="bucketY"
          value={bucketY}
          onChange={(e) => setBucketY(Number(e.target.value))}
          min="1"
          className={styles.input}
        />
        {errors.bucketY && <div className={styles.error}>{errors.bucketY}</div>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="amountWantedZ">Amount Z:</label>
        <input
          type="number"
          id="amountWantedZ"
          value={amountWantedZ}
          onChange={(e) => setAmountWantedZ(Number(e.target.value))}
          min="1"
          className={styles.input}
        />
        {errors.amountWantedZ && <div className={styles.error}>{errors.amountWantedZ}</div>}
      </div>

      <button type="submit" className={styles.button}>
        Solve
      </button>
    </form>
  );
};

export default InputForm;

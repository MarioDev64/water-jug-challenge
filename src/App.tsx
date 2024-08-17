import React, { useState } from 'react';
import InputForm from './components/InputForm';
import JugStateDisplay from './components/JugStateDisplay';
import Modal from './components/Modal';
import { solveWaterJug } from './utils/solveWaterJug';
import './App.css';

interface JugState {
  x: number;
  y: number;
  explanation: string;
}

const App: React.FC = () => {
  const [states, setStates] = useState<JugState[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSolve = (x: number, y: number, z: number) => {
    setStates([]);
    const result = solveWaterJug(x, y, z);
    if (!result.solution) {
      setModalMessage('No Solution');
      setShowModal(true);
    } else {
      setStates(result.states);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Water Jug Challenge</h1>
      </header>
      <div className="App-content">
        <InputForm onSolve={handleSolve} />
        <JugStateDisplay states={states} />
      </div>
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default App;

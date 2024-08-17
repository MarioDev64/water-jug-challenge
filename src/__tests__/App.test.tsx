import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../App';

describe('Water Jug Challenge', () => {
  test('solves case with Bucket X: 2, Bucket Y: 10, Amount wanted Z: 4', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(screen.getByLabelText('Bucket X:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Bucket Y:'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Amount Z:'), { target: { value: '4' } });

    fireEvent.click(screen.getByText(/Solve/i));

    const expectedSteps = [
      { x: 2, y: 0, explanation: 'Fill bucket X' },
      { x: 0, y: 2, explanation: 'Transfer from bucket X to bucket Y' },
      { x: 2, y: 2, explanation: 'Fill bucket X' },
      { x: 0, y: 4, explanation: 'Transfer from bucket X to bucket Y' },
    ];

    for (const step of expectedSteps) {
      await waitFor(() => {
        const bucketState = `Bucket X: ${step.x} \\| Bucket Y: ${step.y}`;
        expect(screen.getByText(new RegExp(bucketState, 'i'))).toBeInTheDocument();
        expect(screen.getAllByText(step.explanation).length).toBeGreaterThan(0);
      });
    }
  });

  test('solves case with Bucket X: 2, Bucket Y: 100, Amount wanted Z: 96', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(screen.getByLabelText('Bucket X:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Bucket Y:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Amount Z:'), { target: { value: '96' } });

    fireEvent.click(screen.getByText(/Solve/i));

    const expectedSteps = [
      { x: 0, y: 100, explanation: 'Fill bucket Y' },
      { x: 2, y: 98, explanation: 'Transfer from bucket Y to bucket X' },
      { x: 0, y: 98, explanation: 'Empty bucket X' },
      { x: 2, y: 96, explanation: 'Transfer from bucket Y to bucket X' },
    ];

    for (const step of expectedSteps) {
      await waitFor(() => {
        const bucketState = `Bucket X: ${step.x} \\| Bucket Y: ${step.y}`;
        expect(screen.getByText(new RegExp(bucketState, 'i'))).toBeInTheDocument();
        expect(screen.getAllByText(step.explanation).length).toBeGreaterThan(0);
      });
    }
  });

  test('displays "No Solution" when the problem cannot be solved', async () => {
    await act(async () => {
      render(<App />);
    });

    fireEvent.change(screen.getByLabelText('Bucket X:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Bucket Y:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Amount Z:'), { target: { value: '99' } });

    fireEvent.click(screen.getByText(/Solve/i));

    await waitFor(() => {
      expect(screen.getByText(/No Solution/i)).toBeInTheDocument();
    });
  });
});

interface Step {
    x: number;
    y: number;
    explanation: string;
}
  
interface Result {
    solution: boolean;
    states: Step[];
}
  
export function solveWaterJug(xMax: number, yMax: number, target: number): Result {
  const visited = new Set<string>();
  const queue: Step[] = [{ x: 0, y: 0, explanation: 'Start' }];
  const states: Step[] = [];

  while (queue.length > 0) {
    const { x, y, explanation } = queue.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key)) {
      continue;
    }

    states.push({ x, y, explanation });
    visited.add(key);

    if (x === target || y === target) {
      return { solution: true, states };
    }

    const newStates: Step[] = [];

    // Fill X
    if (x < xMax) {
      newStates.push({ x: xMax, y, explanation: 'Fill bucket X' });
    }

    // Fill Y
    if (y < yMax) {
      newStates.push({ x, y: yMax, explanation: 'Fill bucket Y' });
    }

    // Empty X
    if (x > 0) {
      newStates.push({ x: 0, y, explanation: 'Empty bucket X' });
    }

    // Empty Y
    if (y > 0) {
      newStates.push({ x, y: 0, explanation: 'Empty bucket Y' });
    }

    // Transfer from X to Y
    const transferXtoY = Math.min(x, yMax - y);
    if (transferXtoY > 0) {
      newStates.push({
        x: x - transferXtoY,
        y: y + transferXtoY,
        explanation: 'Transfer from bucket X to bucket Y',
      });
    }

    // Transfer from Y to X
    const transferYtoX = Math.min(y, xMax - x);
    if (transferYtoX > 0) {
      newStates.push({
        x: x + transferYtoX,
        y: y - transferYtoX,
        explanation: 'Transfer from bucket Y to bucket X',
      });
    }

    for (const state of newStates) {
      const newKey = `${state.x},${state.y}`;
      if (!visited.has(newKey)) {
        queue.push(state);
      }
    }
  }

  // No solution found
  return { solution: false, states };
}


  
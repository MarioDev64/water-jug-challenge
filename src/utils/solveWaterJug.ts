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
  
      // Possible solutions
      const newStates: Step[] = [
        { x: xMax, y, explanation: 'Fill X' },
        { x, y: yMax, explanation: 'Fill Y' },
        { x: 0, y, explanation: 'Empty X' },
        { x, y: 0, explanation: 'Empty Y' },
        { x: x - Math.min(x, yMax - y), y: y + Math.min(x, yMax - y), explanation: 'Transfer from X to Y' }, // X -> Y
        { x: x + Math.min(y, xMax - x), y: y - Math.min(y, xMax - x), explanation: 'Transfer from Y to X' }, // Y -> X
      ];
  
      for (const state of newStates) {
        const newKey = `${state.x},${state.y}`;
        if (!visited.has(newKey)) {
          queue.push(state);
        }
      }
    }
  
    // If the queue is empty and no solution was found
    return { solution: false, states };
 }
  
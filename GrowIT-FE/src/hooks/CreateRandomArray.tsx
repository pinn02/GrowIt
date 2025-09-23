export function getRandomUniqueArray(length: number, min: number, max: number): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  const result: number[] = []

  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * numbers.length)
    result.push(numbers[idx])
    numbers.splice(idx, 1)
  }

  return result
}

export function getRandomHiringArray(hiredPerson: number[], min: number, max: number): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const result: number[] = [];

  hiredPerson.forEach((hp) => {
    const index = numbers.indexOf(hp);
    if (index !== -1) numbers.splice(index, 1);
  });

  for (let i = 0; i < 3; i++) {
    if (numbers.length === 0) break;
    const idx = Math.floor(Math.random() * numbers.length);
    result.push(numbers[idx]);
    numbers.splice(idx, 1);
  }

  return result;
}
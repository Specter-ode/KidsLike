export function getScoreString(score: number): string {
  const scoreArr: number[] = Array.from('' + score).map(Number);
  const lastNum: number = scoreArr[scoreArr.length - 1];
  const scoreString: string =
    score === 11 || score === 12 ? 'баллов' : lastNum === 1 ? 'балл' : lastNum > 1 && lastNum < 5 ? 'балла' : 'баллов';
  return scoreString;
}

export const getScoreString = (score: number): string => {
  const scoreArr = Array.from('' + score).map(Number);
  const lastNum = scoreArr[scoreArr.length - 1];
  const scoreString =
    score === 11 || score === 12 ? 'баллов' : lastNum === 1 ? 'балл' : lastNum > 1 && lastNum < 5 ? 'балла' : 'баллов';
  return scoreString;
};

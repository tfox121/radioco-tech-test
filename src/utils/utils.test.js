import millisecondsToMinsAndSecs from './millisecondsToMinsAndSecs';

test('millisecondsToMinsAndSeconds converts correctly', () => {
  const milliseconds1 = 66000;
  const result1 = millisecondsToMinsAndSecs(milliseconds1);
  expect(result1).toEqual('1:06');

  const milliseconds2 = 5000;
  const result2 = millisecondsToMinsAndSecs(milliseconds2);
  expect(result2).toEqual('0:05');

  const milliseconds3 = 700000;
  const result3 = millisecondsToMinsAndSecs(milliseconds3);
  expect(result3).toEqual('11:40');
});

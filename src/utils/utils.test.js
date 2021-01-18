import millisecondsToMinsAndSecs from './millisecondsToMinsAndSecs';
import timeAgo from './timeAgo';

test('millisecondsToMinsAndSeconds converts ms correctly', () => {
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

test('timeAgo converts ISO dates to string indicating time ago', () => {
  const isoTime1 = new Date();
  isoTime1.setDate(isoTime1.getDate() - 5);
  const result1 = timeAgo.format(Date.parse(isoTime1));
  expect(result1).toEqual('5 days ago');

  const isoTime2 = new Date();
  isoTime2.setDate(isoTime2.getDate() - 4380);
  const result2 = timeAgo.format(Date.parse(isoTime2));
  expect(result2).toEqual('12 years ago');
});

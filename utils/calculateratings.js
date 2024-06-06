const addNumbers = (obj) => {
  const sum = Object.entries(obj).reduce((acc, [, value]) => {
    acc += value;
    return acc;
  }, 0);
  return sum;
};

const calculatePercentage = (ratings) => {
  const ratingsTotal = addNumbers(ratings);
  const aveRating = [];

  Object.entries(ratings).map(([key, value]) =>
    aveRating.push({ title: key, value: (value / ratingsTotal) * 100 }),
  );

  const sortedRating = aveRating.sort(
    (a, b) => parseInt(b.title, 10) - parseInt(a.title, 10),
  );
  return sortedRating;
};

exports.calculateRating = (array) => {
  // if no review, return
  if (array.length < 1)
    return [
      { title: 5, value: 0 },
      { title: 4, value: 0 },
      { title: 3, value: 0 },
      { title: 2, value: 0 },
      { title: 1, value: 0 },
    ];
  const data = array;

  const starsAverage = data
    .flatMap((review) => review.rating)
    .reduce(
      (acc, cur) => {
        switch (Math.floor(cur)) {
          case 5:
            acc['5'] += 1;
            return acc;
          case 4:
            acc['4'] += 1;
            return acc;
          case 3:
            acc['3'] += 1;
            return acc;
          case 2:
            acc['2'] += 1;
            return acc;
          case 1:
            acc['1'] += 1;
            return acc;
          default:
            return acc;
        }
      },
      {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    );

  const averageRatings = calculatePercentage(starsAverage);

  return averageRatings;
};

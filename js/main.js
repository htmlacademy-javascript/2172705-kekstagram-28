const NAMES = [
  'Павел Позняк',
  'Екатерина Некрылова',
  'Александр Страховенко',
  'Балтика Пивандров',
  'Сигарет Курилов',
  'Евгений Мухоморов'
];

const DESCRIPTIONS = [
  'Чиллю на отдыхе',
  'Кот Кекс спит на диване',
  'Это мы прогуливаем пары',
  'С друзьями решили сдать бутылки',
  'Курим у падоса',
  'Какая шикарная погодка...',
  'Отпуск в Турции',
  'Зоопарк',
  'Голубое небо',
  'Аквариум с рыбками',
  'Вкусный ужин в ресторане',
  'Пошли с друзьями в бар',
  'Играем в волейбол',
  'Соревнование по баскетболу',
  'Пошли качаться в зал',
  'Моя тачка',
  'Синяя птичка',
  'Мой любимый сидр',
  'Бургер в Макухе',
  'Дождь в Иркутске',
  'Вышел прогуляться',
  'Острые крылышки',
  'Любимый вариант завтрака',
  'На пробежке',
  'Пошел выносить мусор'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const POSTS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastIdValue = 0;
  return function () {
    lastIdValue++;
    return lastIdValue;
  };
};

const createRandomValueFromRangeGenerator = (min, max) => {
  const createdValues = [];

  return function () {
    if (createdValues.length === (max - min + 1)) {
      return null;
    }
    let newValue = getRandomInteger(min, max);
    while (createdValues.includes(newValue)) {
      newValue = getRandomInteger(min, max);
    }
    createdValues.push(newValue);

    return newValue;
  };
};

const generateCommentId = createIdGenerator();
const generatePostId = createIdGenerator();
const generateUrlRandomValue = createRandomValueFromRangeGenerator(1, POSTS_COUNT);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.png`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const createPost = () => ({
  id: generatePostId(),
  url: `photos/${generateUrlRandomValue()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 6)}, createComment)
});

const posts = Array.from({length: POSTS_COUNT}, createPost);

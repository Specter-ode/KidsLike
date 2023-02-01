export const items = [
  {
    name: 'email',
    type: 'email',
    pattern:
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    helper: 'example@gmail.com',
    title: 'example@gmail.com',
    label: 'Электронная почта',
  },
  {
    name: 'password',
    type: 'password',
    pattern:
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
    helper: 'от 8 до 40 символов',
    title: 'Пароль должен содержать от 8 до 40 символов.',
    label: 'Пароль',
  },
];

export default class Constants {
  static minSumOfOrder = 400;

  static validation = {
    minNameLength: 1,
    maxNameLength: 50,
    minPasswordLength: 1,
    maxPasswordLength: 100,
    nameRegexp: /^[А-Я]{1}[а-я\-']+$/,
    passwordRegexp: /^[a-zA-Z0-9_\-.]+$/,
    emailRegexp: /^([a-zA-Z0-9_\-.]+)@([\w-]+\.)+([\w]{2,})$/i,
    templatePlaceholderRegexp: new RegExp(this.templatePlaceholder, 'g'),
  };

  static messages = {
    unknownError: 'Что-то пошло не так',
    accountAlreadyExists: 'Юзер уже существует',
    passwordRepeatError: 'Пароль не совпадает с введенным ранее',
    invalidCredentials: 'Невалидные данные учетной записи',
    invalidLetters: 'Поле может содержать только кириллицу и дефис, имя и фамилия должны начинаться с большой буквы.',
    invalidEmail: 'Это невалидный e-mail',
    emptyValueError: 'Поле не может быть пустым',
    invalidLength: ({ min, max }) => `Неверная длина вводимых символов (Должно быть между ${min} и ${max} символами)`,
  }
}

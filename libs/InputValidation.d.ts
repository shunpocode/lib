/**
 * @description Класс для валидации ввода в `input`, доступная валидация: `email`, `password`, `number`
 * @example
 *
 * Validation.email('test@test.hi'); // true
 *
 * Validation.password('12345678', 8) // true
 *
 * Validation.isInteger(123) // true
 * Validation.isInteger('123') // true
 *
 * @Shunpocode
 */
export default class Validation {
    /**
     * @description проверка на правильный email
     * @example
     * Validation.email('test@test.hi'); // true
     *
     * @param {string} str
     *
     * @returns {boolean}
     */
    static email: (str: string) => boolean;
    /**
     *
     * @example
     * Validation.password('12345678', 8) // true
     * Validation.password(12345678, 8) // true
     * @param {string | number} str Строка с паролем
     * @param {string | number} length длина пароля
     * @returns {boolean}
     */
    static password: (str: string | number, length: number | string) => boolean;
    /**
     * @description Является ли числом
     * @param {str | number} str строка для проверки
     * @returns {boolean}
     */
    static isInteger: (str: string | number) => boolean;
}

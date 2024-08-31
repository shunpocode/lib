interface InputConfig {
    target: HTMLElement;
    input: HTMLInputElement;
    callbackType: string[];
}
interface CallbackContext {
    target: HTMLElement;
    input: HTMLInputElement;
    event: Event;
}
type CallbackFunction = (this: CallbackContext, eventType: string) => void;
/**
 * Класс Input управляет фокусом и состоянием DOM-элементов.
 *
 * @class
 * @param {InputConfig} config - Конфигурация класса, включающая целевой элемент, элемент ввода и типы событий.
 * @param {(this: CallbackContext, eventType: string) => void} callback - Функция обратного вызова, вызываемая при указанных событиях.
 */
export default class Input {
    #private;
    private target;
    private input;
    private activeElement;
    /**
     * Конструктор класса Input.
     *
     * @constructor
     * @param {InputConfig} config - Конфигурация для инициализации класса Input.
     * @param {(eventType: string, data: { target: HTMLElement, input: HTMLElement, event: Event }) => void} callback - Функция обратного вызова.
     */
    constructor({ target, input, callbackType }: InputConfig, callback: CallbackFunction);
    /**
     * Устанавливает состояние чекбокса и добавляет/удаляет атрибут `focused`.
     *
     * @param {boolean} state - Новое состояние (true для активного состояния).
     */
    set state(state: boolean);
    /**
     * Возвращает текущее состояние чекбокса.
     *
     * @returns {boolean} - true, если элемент активен, false - если не активен.
     */
    get state(): boolean;
    /**
     * Возвращает текущее значение элемента ввода.
     *
     * @returns {string} - Текущее значение элемента ввода.
     */
    get value(): string;
}
export {};

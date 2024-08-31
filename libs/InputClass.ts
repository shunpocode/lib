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
  private target: HTMLElement;
  private input: HTMLInputElement;
  private activeElement: HTMLElement | null;

  #_state: boolean;

  /**
   * Конструктор класса Input.
   *
   * @constructor
   * @param {InputConfig} config - Конфигурация для инициализации класса Input.
   * @param {(eventType: string, data: { target: HTMLElement, input: HTMLElement, event: Event }) => void} callback - Функция обратного вызова.
   */
  constructor(
    { target, input, callbackType }: InputConfig,
    callback: CallbackFunction
  ) {
    this.target = target;
    this.input = input;
    this.activeElement = null;
    this.#_state = false;

    // Обработчик клика по документу
    document.addEventListener("click", (e: MouseEvent) => {
      if (e.target !== target && e.target !== input) {
        this.activeElement = e.target as HTMLElement;
        this.state = false;
      } else {
        this.activeElement = target;
      }
    });

    // Обработчик клика по целевому элементу
    target.addEventListener("click", (e: MouseEvent) => {
      input.focus();
      if (callbackType.includes("click")) {
        callback.bind({ target, input, event: e })("click");
      }
    });

    // Обработчик фокуса на элементе ввода
    input.addEventListener("focus", (e: Event) => {
      this.state = true;
      if (callbackType.includes("focus")) {
        callback.bind({ target, input, event: e })("focus");
      }
    });

    // Обработчик потери фокуса
    input.addEventListener("blur", (e: Event) => {
      if (this.activeElement !== target) {
        this.state = false;
      }
      if (callbackType.includes("blur")) {
        callback.bind({ target, input, event: e })("blur");
      }
    });

    // Обработчик события ввода
    if (callbackType.includes("input")) {
      input.addEventListener("input", (e: Event) => {
        callback.bind({ target, input, event: e })("input");
      });
    }
  }

  /**
   * Устанавливает состояние чекбокса и добавляет/удаляет атрибут `focused`.
   *
   * @param {boolean} state - Новое состояние (true для активного состояния).
   */
  set state(state: boolean) {
    if (state) {
      this.target.setAttribute("focused", String(state));
    } else {
      this.target.removeAttribute("focused");
    }
    this.#_state = state;
  }

  /**
   * Возвращает текущее состояние чекбокса.
   *
   * @returns {boolean} - true, если элемент активен, false - если не активен.
   */
  get state(): boolean {
    return this.#_state;
  }

  /**
   * Возвращает текущее значение элемента ввода.
   *
   * @returns {string} - Текущее значение элемента ввода.
   */
  get value(): string {
    return this.input.value;
  }
}

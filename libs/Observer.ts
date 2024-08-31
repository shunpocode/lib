export type ObserverItem = {
  observer: any;
  customUpdateFunction: Function | null;
};

/**
 * @exports Observer
 * @description Создаёт наблюдатель в который передаётся значение и уведомляет об этом подпищиков
 *
 * @example
 * const obs = new Observer();
 *
 * ------------------------------------------------------------------
 * @Shunpocode
 * @link http://github.com/Shunpocode
 */

export default class Observer {
  observers: ObserverItem[];

  constructor() {
    this.observers = [];
  }
  /**
   * @description Добавляет нового подпищика и функцию для него
   * @example
   * obs.subscribe(observer, customUpdateFunction(obs, data))
   *
   * @param {any} observer
   * @param {Function} customUpdateFunction Необязательно
   * @returns {(any, any)} `(obs, data) => {}` подпищика и значение переданое в notify
   */
  subscribe(
    observer: any,
    customUpdateFunction: ((observer: any, data: any) => void) | null = null
  ): boolean {
    try {
      this.observers.push({
        observer,
        customUpdateFunction:
          customUpdateFunction !== null
            ? customUpdateFunction || observer.update.bind(observer)
            : null,
      });
      return true;
    } catch (er) {
      return false;
    }
  }
  /**
   * Удаляет подпищика
   * @param {any} observer
   */
  unsubscribe(observer: any): boolean {
    try {
      for (const i in this.observers) {
        if (this.observers[i].observer !== observer) throw "";
      }
      this.observers = this.observers.filter(
        (obs: ObserverItem) => obs.observer !== observer
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * @description Уведомляет подпищиков об изменении
   * @example
   * obs.notify("hello world", (sub, data) => {
   * 	console.log(sub, data);
   * })
   *
   * @param {any} data значение о котором надо уведомить подпищиков
   * @param {Function} sharedFunction необезательная функция кторая будет выполняться для всех подпищиков
   * @param {(any, any)} sharedFunction.return в функцию приходит подпищик и data
   */
  notify(
    data: any,
    sharedFunction: ((observer: any, data: any) => void) | null = null
  ) {
    this.observers.forEach(({ observer, customUpdateFunction }) => {
      if (sharedFunction) {
        sharedFunction(observer, data);
      }
      if (customUpdateFunction) {
        customUpdateFunction(observer, data);
      }
    });
  }
}

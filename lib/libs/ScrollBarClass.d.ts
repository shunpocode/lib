interface ScrollBarInterface {
    scrollBarElement: HTMLElement;
    targetElement: HTMLElement;
}
/**
 * Класс ScrollBar
 * @class
 * @param {Object} options - Объект с параметрами.
 * @param {HTMLElement} options.scrollBarElement - DOM-элемент полосы прокрутки.
 * @param {HTMLElement} options.targetElement - DOM-элемент, для которого будет
 *                                              создана полоса прокрутки.
 *
 * @property {number} scrollBarHeight - высота полосы прокрутки.
 * @property {number} mousePosition - координаты мыши.
 *
 * @method changePosition - изменяет положение полосы прокрутки.
 * @method handleMouseEvent - обработчик события мыши.
 * @method set height - устанавливает высоту полосы прокрутки.
 * @method get scrollBarElement - возвращает DOM-элемент полосы прокрутки.
 * @method get targetElement - возвращает DOM-элемент, для которого
 *                              была создана полоса прокрутки.
 */
export default class ScrollBar {
    #private;
    constructor({ scrollBarElement, targetElement }: ScrollBarInterface);
    scrollBarHeight: number;
    set height(value: string | number);
    changePosition: (maxPosition?: number) => void;
    handleMouseEvent: (e: MouseEvent) => void;
    get scrollBarElement(): HTMLElement;
    get targetElement(): HTMLElement;
}
export {};

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
  #scrollBarElement: HTMLElement;
  #targetElement: HTMLElement;
  #mousePosition: number = 0;

  constructor({ scrollBarElement, targetElement }: ScrollBarInterface) {
    this.#scrollBarElement = scrollBarElement;
    this.#targetElement = targetElement;

    const mouseHandler = this.handleMouseEvent.bind(this);

    this.scrollBarElement.addEventListener("mousedown", (e) => {
      document.body.style.pointerEvents = "none";
      document.body.style.userSelect = "none";
      this.#mousePosition = Number(
        (e.clientY - scrollBarElement.getBoundingClientRect().y).toFixed(0)
      );
      document.addEventListener("mousemove", mouseHandler, { passive: true });
    });

    window.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseHandler);
      document.body.style.pointerEvents = "all";
      document.body.style.userSelect = "all";
      this.#mousePosition = 0;
    });
  }

  scrollBarHeight: number = 0;

  set height(value: string | number) {
    if (value === "auto") {
      setInterval(() => {
        let height =
          this.#targetElement.scrollHeight -
          this.#targetElement.clientHeight -
          this.#targetElement.clientHeight;
        if (height < 50) {
          height = 50;
        } else if (height === this.targetElement.clientHeight) {
          height = 0;
        }
        this.#scrollBarElement.style.height = `${height}px`;
        this.scrollBarHeight = height;
      }, 100);
    }
  }

  changePosition = (maxPosition?: number) => {
    const visibleHeight = this.targetElement.clientHeight;
    const contentHeight = this.targetElement.scrollHeight;
    const scrollTop = this.targetElement.scrollTop;
    const scrollBarDifference =
      this.targetElement.clientHeight - this.scrollBarElement.clientHeight;
    const scrollPercentage =
      (scrollTop / (contentHeight - visibleHeight)) * 100;
    const scrollBarPosition: number =
      (scrollBarDifference / 100) * scrollPercentage;

    if (maxPosition) {
      this.#scrollBarElement.style.transform = `translateY(${
        scrollBarPosition < maxPosition ? scrollBarPosition : maxPosition
      }px)`;
    } else {
      this.#scrollBarElement.style.transform = `translateY(${scrollBarPosition}px)`;
    }
  };

  handleMouseEvent = (e: MouseEvent) => {
    this.#targetElement.scrollTop = e.clientY - this.#mousePosition;
  };

  get scrollBarElement() {
    return this.#scrollBarElement;
  }

  get targetElement() {
    return this.#targetElement;
  }
}

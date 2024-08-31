export default class ScrollBar {
    #scrollBarElement;
    #targetElement;
    #mousePosition = 0;
    constructor({ scrollBarElement, targetElement }) {
        this.#scrollBarElement = scrollBarElement;
        this.#targetElement = targetElement;
        const mouseHandler = this.handleMouseEvent.bind(this);
        this.scrollBarElement.addEventListener("mousedown", (e) => {
            document.body.style.pointerEvents = "none";
            document.body.style.userSelect = "none";
            this.#mousePosition = Number((e.clientY - scrollBarElement.getBoundingClientRect().y).toFixed(0));
            document.addEventListener("mousemove", mouseHandler, { passive: true });
        });
        window.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", mouseHandler);
            document.body.style.pointerEvents = "all";
            document.body.style.userSelect = "all";
            this.#mousePosition = 0;
        });
    }
    scrollBarHeight = 0;
    set height(value) {
        if (value === "auto") {
            setInterval(() => {
                let height = this.#targetElement.scrollHeight -
                    this.#targetElement.clientHeight -
                    this.#targetElement.clientHeight;
                if (height < 50) {
                    height = 50;
                }
                else if (height === this.targetElement.clientHeight) {
                    height = 0;
                }
                this.#scrollBarElement.style.height = `${height}px`;
                this.scrollBarHeight = height;
            }, 100);
        }
    }
    changePosition = (maxPosition) => {
        const visibleHeight = this.targetElement.clientHeight;
        const contentHeight = this.targetElement.scrollHeight;
        const scrollTop = this.targetElement.scrollTop;
        const scrollBarDifference = this.targetElement.clientHeight - this.scrollBarElement.clientHeight;
        const scrollPercentage = (scrollTop / (contentHeight - visibleHeight)) * 100;
        const scrollBarPosition = (scrollBarDifference / 100) * scrollPercentage;
        if (maxPosition) {
            this.#scrollBarElement.style.transform = `translateY(${scrollBarPosition < maxPosition ? scrollBarPosition : maxPosition}px)`;
        }
        else {
            this.#scrollBarElement.style.transform = `translateY(${scrollBarPosition}px)`;
        }
    };
    handleMouseEvent = (e) => {
        this.#targetElement.scrollTop = e.clientY - this.#mousePosition;
    };
    get scrollBarElement() {
        return this.#scrollBarElement;
    }
    get targetElement() {
        return this.#targetElement;
    }
}

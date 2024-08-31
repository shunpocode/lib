export default class Input {
    target;
    input;
    activeElement;
    #_state;
    constructor({ target, input, callbackType }, callback) {
        this.target = target;
        this.input = input;
        this.activeElement = null;
        this.#_state = false;
        document.addEventListener("click", (e) => {
            if (e.target !== target && e.target !== input) {
                this.activeElement = e.target;
                this.state = false;
            }
            else {
                this.activeElement = target;
            }
        });
        target.addEventListener("click", (e) => {
            input.focus();
            if (callbackType.includes("click")) {
                callback.bind({ target, input, event: e })("click");
            }
        });
        input.addEventListener("focus", (e) => {
            this.state = true;
            if (callbackType.includes("focus")) {
                callback.bind({ target, input, event: e })("focus");
            }
        });
        input.addEventListener("blur", (e) => {
            if (this.activeElement !== target) {
                this.state = false;
            }
            if (callbackType.includes("blur")) {
                callback.bind({ target, input, event: e })("blur");
            }
        });
        if (callbackType.includes("input")) {
            input.addEventListener("input", (e) => {
                callback.bind({ target, input, event: e })("input");
            });
        }
    }
    set state(state) {
        if (state) {
            this.target.setAttribute("focused", String(state));
        }
        else {
            this.target.removeAttribute("focused");
        }
        this.#_state = state;
    }
    get state() {
        return this.#_state;
    }
    get value() {
        return this.input.value;
    }
}

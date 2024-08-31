export default class Validation {
    static email = (str) => {
        str = String(str);
        const re = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(str));
    };
    static password = (str, length) => {
        str = String(str);
        if (this.isInteger(length)) {
            return str.length == Number(length);
        }
        else {
            return false;
        }
    };
    static isInteger = (str) => {
        str = String(str);
        const re = /^\d+$/;
        return re.test(str);
    };
}

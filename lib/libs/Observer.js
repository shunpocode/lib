export default class Observer {
    observers;
    constructor() {
        this.observers = [];
    }
    subscribe(observer, customUpdateFunction = null) {
        try {
            this.observers.push({
                observer,
                customUpdateFunction: customUpdateFunction !== null
                    ? customUpdateFunction || observer.update.bind(observer)
                    : null,
            });
            return true;
        }
        catch (er) {
            return false;
        }
    }
    unsubscribe(observer) {
        try {
            for (const i in this.observers) {
                if (this.observers[i].observer !== observer)
                    throw "";
            }
            this.observers = this.observers.filter((obs) => obs.observer !== observer);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    notify(data, sharedFunction = null) {
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

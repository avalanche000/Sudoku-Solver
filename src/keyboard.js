class Keyboard {
    static keys = new Map();
    static downListeners = [];
    static upListeners = [];
    static keyDownListeners = {};
    static keyUpListeners = {};

    static get(key) {
        return !!this.keys.get(key);
    }

    static down(key) {
        this.keys.set(key, true);

        this.downListeners.forEach(func => func(key));

        const listeners = this.keyDownListeners[key];

        if (listeners != null) listeners.forEach(func => func());
    }

    static up(key) {
        this.keys.set(key, true);

        this.upListeners.forEach(func => func(key));

        const listeners = this.keyUpListeners[key];

        if (listeners != null) listeners.forEach(func => func());
    }

    static onDown(func) {
        this.downListeners.push(func);
    }

    static onUp(func) {
        this.upListeners.push(func);
    }

    static onKeyDown(key, func) {
        if (this.keyDownListeners[key] == null) {
            this.keyDownListeners[key] = [func];
        } else {
            this.keyDownListeners[key].push(func);
        }
    }

    static onKeyUp(key, func) {
        if (this.keyUpListeners[key] == null) {
            this.keyUpListeners[key] = [func];
        } else {
            this.keyUpListeners[key].push(func);
        }
    }
}

window.addEventListener("keydown", event => Keyboard.down(event.code));
window.addEventListener("keyup", event => Keyboard.up(event.code));

export default Keyboard;

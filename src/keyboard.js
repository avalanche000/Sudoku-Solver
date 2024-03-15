class Keyboard {
    static keys = new Map();
    static downListeners = [];
    static upListeners = [];
    static keyDownListeners = {};
    static keyUpListeners = {};

    static get(key) {
        return !!this.keys.get(key);
    }

    static keydown(event) {
        this.down(event.code, event);
    }

    static keyup(event) {
        this.up(event.code, event);
    }

    static down(key, event) {
        const firstPress = !this.get(key);

        this.keys.set(key, true);

        this.downListeners.forEach(func => func(key, event, firstPress));

        const listeners = this.keyDownListeners[key];

        if (listeners != null) listeners.forEach(func => func(key, event, firstPress));
    }

    static up(key, event) {
        const firstPress = this.get(key);

        this.keys.set(key, false);

        this.upListeners.forEach(func => func(key, event, firstPress));

        const listeners = this.keyUpListeners[key];

        if (listeners != null) listeners.forEach(func => func(key, event, firstPress));
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

    static onKeysDownMapper(map, func) {
        map.keys().forEach(key => Keyboard.onKeyDown(key, (_, event, firstPress) => func(map.get(key), event, firstPress)));
    }

    static onKeysUpMapper(map, func) {
        map.keys().forEach(key => Keyboard.onKeyUp(key, (_, event, firstPress) => func(map.get(key), event, firstPress)));
    }
}

window.addEventListener("keydown", event => Keyboard.keydown(event));
window.addEventListener("keyup", event => Keyboard.keyup(event));

export default Keyboard;

class Keyboard {
    static keys = new Map();
    static downListeners = {};
    static upListeners = {};

    static get(key) {
        return !!this.keys.get(key);
    }

    static down(key) {
        this.keys.set(key, true);
    }

    static up(key) {
        this.keys.set(key, true);
    }

    static onDown(key, func) {
        if (this.downListeners[key] == null) {
            this.downListeners[key] = [func];
        } else {
            this.downListeners[key].push(func);
        }
    }

    static onUp(key, func) {
        if (this.upListeners[key] == null) {
            this.upListeners[key] = [func];
        } else {
            this.upListeners[key].push(func);
        }
    }
}

window.addEventListener("keydown", event => Keyboard.down(event.code));
window.addEventListener("keyup", event => Keyboard.up(event.code));

export default Keyboard;

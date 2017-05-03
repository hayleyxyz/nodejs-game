const EventEmitter = require('events');

module.exports = class extends EventEmitter {

    constructor() {
        super();

        this.keyState = new Util.Map();

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    isKeyDown(code) {
        return this.keyState.has(code) && this.keyState.get(code);
    }

    onKeyDown(event) {
        this.keyState.set(event.code, true);
    }

    onKeyUp(event) {
        this.keyState.set(event.code, false);
    }

};

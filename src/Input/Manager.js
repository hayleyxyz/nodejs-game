const EventEmitter = require('events');

module.exports = class extends EventEmitter {

    constructor() {
        super();

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    onKeyDown(event) {
        console.log(event);
    }

};

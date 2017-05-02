module.exports = class {

    constructor(game) {
        if(!(game instanceof Game)) {
            throw new TypeError();
        }

        this.game = game;
    }

    get renderer() {
        return this.game.renderer;
    }

    update(deltaTime) {

    }

    draw() {

    }

};

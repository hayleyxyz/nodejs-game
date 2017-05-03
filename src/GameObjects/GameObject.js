module.exports = class {

    constructor(game) {
        if(!(game instanceof Game)) {
            throw new TypeError();
        }

        this.game = game;

        this.components = new GameObjects.Components.Set();
    }

    addComponent(component) {
        this.components.add(component);
    }

    getComponents(type) {
        return this.components.filter(c => c instanceof type);
    }

    getComponent(type) {
        return this.components.find(c => c instanceof type);
    }

    get renderer() {
        return this.game.renderer;
    }

    update(deltaTime) {

    }

    draw(renderer) {

    }

};

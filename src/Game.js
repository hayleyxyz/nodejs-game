const path = require('path');

module.exports = class {

    constructor() {
        this.renderer = new Graphics.Renderer();
        this.renderer.clear();

        this.resources = new Resources.Manager(
            path.join(__dirname, '..', 'resources')
        );

        this.input = new Input.Manager();

        this.gameObjects = new GameObjects.Set(this);

        this.lastTime = performance.now();
        this.tick();
    }

    getGameObject(type) {
        return this.gameObjects.find(c => c instanceof type);
    }

    tick(time) {
        let delta = (time - this.lastTime) / 1000;

        this.update(delta);
        this.draw(this.renderer);

        requestAnimationFrame((t) => this.tick(t));

        this.lastTime = time;
    }

    update(deltaTime) {
        this.gameObjects.forEach(o => o.update(deltaTime));
    }

    draw(renderer) {
        renderer.clear();
        this.gameObjects.forEach(o => o.draw(renderer));
    }

}

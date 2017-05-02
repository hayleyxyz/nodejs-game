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

    tick(time) {
        let delta = (time - this.lastTime);

        this.update(delta);
        this.draw(this.renderer);

        requestAnimationFrame((t) => this.tick(t));

        this.lastTime = time;
    }

    update(deltaTime) {
        this.gameObjects.forEach(o => {
            if(o.update) {
                o.update(deltaTime)
            }
        });
    }

    draw(renderer) {
        renderer.clear();

        //renderer.drawText(new Vector2(100, 100), 'hihi');

        this.gameObjects.forEach(o => {
            if(o.draw) {
                o.draw(renderer);
            }
        });
    }

}

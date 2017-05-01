class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Renderer {

    constructor() {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        document.body.appendChild(this.element);

        this.onResize();

        window.addEventListener('resize', (e) => this.onResize(e));
    }

    get width() {
        return this.element.width;
    }

    get height() {
        return this.element.height;
    }

    clear(fill) {
        this.context.fillStyle = fill ? fill : '#000';
        this.context.fillRect(0, 0, this.width, this.height);
    }

    drawText(position, text) {
        this.context.fillStyle = '#fff';
        this.context.font = '48px serif';
        this.context.fillText(text, position.x, position.y);
    }

    onResize() {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

}

class Game {

    constructor() {
        this.renderer = new Renderer();
        this.renderer.clear();

        this.drawables = new Set();

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
        this.drawables.forEach(d => d.update(deltaTime));
    }

    draw(renderer) {
        renderer.clear();

        renderer.drawText(new Vector2(100, 100), 'hihi');

        this.drawables.forEach(d => d.draw(renderer));
    }

}

class Updatable {

    update(deltaTime) {

    }

}

class Drawable extends Updatable {

    draw(renderer) {

    }

}

class Player extends Drawable {

    draw(renderer) {
        renderer.drawText(new Vector2(200, 200), 'player');
    }

}

let game = new Game();
game.drawables.add(new Player());
console.log(game);

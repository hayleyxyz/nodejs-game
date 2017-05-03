module.exports = class extends GameObjects.GameObject {

    constructor(game) {
        super(game);

        this.addComponent(
            new GameObjects.Components.Position(
                this,
                new Vector2()
            )
        );

        this.speed = 300;
    }

    get position() {
        return this.getComponent(GameObjects.Components.Position).vector;
    }

    update(deltaTime) {
        let position = this.getComponent(GameObjects.Components.Position);
        let move = new Vector2();

        if(this.game.input.isKeyDown('ArrowUp')) {
            move.y -= (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown('ArrowDown')) {
            move.y += (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown('ArrowLeft')) {
            move.x -= (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown('ArrowRight')) {
            move.x += (this.speed * deltaTime);
        }

        position.vector = position.vector.add(
            move.clamp(this.speed * deltaTime)
        );
    }

    draw(renderer) {

    }

};

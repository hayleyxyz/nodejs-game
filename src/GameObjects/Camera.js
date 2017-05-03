module.exports = class extends GameObjects.GameObject {

    constructor(game) {
        super(game);

        this.addComponent(
            new GameObjects.Components.Position(
                this,
                new Vector2()
            )
        );
    }

    update(deltaTime) {

    }

    draw(renderer) {
        
    }

};

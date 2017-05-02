module.exports = class extends GameObjects.GameObject {

    constructor(game) {
        super(game);

        this.sprites = this.game.resources.make(
            Graphics.SpriteSheet,
            'sheets/player/player.json'
        );

        console.log(this.sprites);

        console.log();

        this.position = new Vector2();
    }

    update(deltaTime) {

    }

    draw(renderer) {

    }

};

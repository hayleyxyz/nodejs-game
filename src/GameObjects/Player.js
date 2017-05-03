module.exports = class extends GameObjects.GameObject {

    constructor(game) {
        super(game);

        this.sprites = new Graphics.SpriteSheet(
            this.game.resources.get('sheets/player/player.json'),
            this.game.resources.get('sheets/player/player.png')
        );

        this.position = new Vector2();
    }

    update(deltaTime) {

    }

    draw(renderer) {
        this.game.renderer.drawSpriteSheet(
            this.sprites,
            'player-1.png',
            new Vector2(100, 100)
        );
    }

};

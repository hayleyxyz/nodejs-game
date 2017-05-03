module.exports = class extends GameObjects.GameObject {

    constructor(game) {
        super(game);

        this.keyMap = new Input.KeyMap();

        this.sprites = new Graphics.SpriteSheet(
            this.game.resources.get('sheets/player/player.json'),
            this.game.resources.get('sheets/player/player.png')
        );

        this.addComponent(
            new GameObjects.Components.Position(
                this,
                new Vector2()
            )
        );

        this.speed = 100;
    }

    update(deltaTime) {
        let position = this.getComponent(GameObjects.Components.Position);
        let move = new Vector2();

        if(this.game.input.isKeyDown(this.keyMap.moveUp)) {
            move.y -= (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown(this.keyMap.moveDown)) {
            move.y += (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown(this.keyMap.moveLeft)) {
            move.x -= (this.speed * deltaTime);
        }

        if(this.game.input.isKeyDown(this.keyMap.moveRight)) {
            move.x += (this.speed * deltaTime);
        }

        position.vector = position.vector.add(
            move.clamp(this.speed * deltaTime)
        );
    }

    draw(renderer) {
        let position = this.getComponent(GameObjects.Components.Position);

        renderer.drawSpriteSheet(
            this.sprites,
            'player-1.png',
            position
        );
    }

};

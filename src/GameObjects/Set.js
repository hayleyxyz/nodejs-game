module.exports = class extends Set {

    constructor(game, iterable) {
        super(iterable);
        this.game = game;
    }

    add(value) {
        if(!(value instanceof GameObjects.GameObject)) {
            throw new TypeError();
        }

        super.add(value);
    }

};

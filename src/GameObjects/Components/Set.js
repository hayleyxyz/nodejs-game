module.exports = class extends Util.Set {

    constructor(gameObject, iterable) {
        super(iterable);
        this.gameObject = gameObject;
    }

    add(value) {
        if(!(value instanceof GameObjects.Components.GameComponent)) {
            throw new TypeError();
        }

        super.add(value);
    }

};

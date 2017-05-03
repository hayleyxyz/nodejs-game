module.exports = class {

    constructor(gameObject) {
        if(!(gameObject instanceof GameObjects.GameObject)) {
            throw new TypeError();
        }

        this.gameObject = gameObject;
    }
};

module.exports = class extends GameObjects.Components.Collider {

    constructor(gameObject, rect) {
        super(gameObject);

        if(!(rect instanceof Geometry.Rect)) {
            throw new TypeError();
        }

        this.rect = rect;
    }

};

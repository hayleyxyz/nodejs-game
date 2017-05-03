module.exports = class extends GameObjects.Components.GameComponent {

    constructor(gameObject, vector) {
        super(gameObject);

        this.vector = vector;
    }

    get x() {
        return this.vector.x;
    }

    get y() {
        return this.vector.y;
    }

    set x(value) {
        this.vector.x = value;
    }

    set y(value) {
        this.vector.y = value;
    }

};

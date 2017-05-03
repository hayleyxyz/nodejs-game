module.exports = class extends Geometry.Polygon {

    constructor(x, y, w, h) {
        super();

        this.buildPoints(x, y, w, h);
    }

    get width() {
        let x = this.points.map(p => p.x);
        return Math.max.apply(this, x) - Math.min.apply(this, x);
    }

    get height() {
        let y = this.points.map(p => p.y);
        return Math.max.apply(this, y) - Math.min.apply(this, y);
    }

    buildPoints(x, y, w, h) {
        this.points = [
            new Vector2(x, y),
            new Vector2(x + w, y),
            new Vector2(x + w, y + h),
            new Vector2(x, y + h),
            new Vector2(x, y + 0)
        ];
    }

};

module.exports = class extends Graphics.Polygon {

    constructor(w, h) {
        super();

        this.buildPoints(w, h);
    }

    get width() {
        let x = this.points.map(p => p.x);
        return Math.max.apply(this, x)
    }

    get height() {
        let y = this.points.map(p => p.y);
        return Math.max.apply(this, y)
    }

    buildPoints(w, h) {
        this.points = [
            new Vector2(0, 0),
            new Vector2(w, 0),
            new Vector2(w, h),
            new Vector2(0, h),
            new Vector2(0, 0)
        ];
    }

};
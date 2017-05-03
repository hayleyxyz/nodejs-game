module.exports = class {

    constructor() {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext('2d');
        document.body.appendChild(this.element);

        this.onResize();

        window.addEventListener('resize', (e) => this.onResize(e));
    }

    get width() {
        return this.element.width;
    }

    get height() {
        return this.element.height;
    }

    clear(fill) {
        this.context.fillStyle = fill ? fill : '#000';
        this.context.fillRect(0, 0, this.width, this.height);
    }

    drawText(position, text) {
        this.context.fillStyle = '#fff';
        this.context.font = '48px serif';
        this.context.fillText(text, position.x, position.y);
    }

    drawSpriteSheet(sheet, frameId, position) {
        let frame = sheet.getFrame(frameId);

        this.context.drawImage(
            sheet.image,
            frame.x, frame.y, // sx, sy,
            frame.w, frame.h, // sWidth, sHeight,
            position.x, position.y, // dx, dy,
            frame.w, frame.h // dWidth, dHeight
        );
    }

    drawImage(image, position) {
        this.context.drawImage(
            image,
            position.x,
            position.y
        );
    }

    onResize() {
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;
    }

};

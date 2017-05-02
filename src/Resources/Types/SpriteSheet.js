module.exports = class extends Resources.Types.Type {

    make(content) {
        let data = JSON.parse(content);
        let result = new Graphics.SpriteSheet(data);

        return result;
    }

    get makes() {
        return [
            Graphics.SpriteSheet,
        ];
    }

};

const path = require('path');
const fs = require('fs');

module.exports = class {

    constructor(basePath) {
        this.basePath = basePath;

        this.factories = new Set([
            new Resources.Types.SpriteSheet(),
        ]);
    }

    resolve(name) {
        let file = path.join(this.basePath, name);
        return file;
    }

    readSync(name) {
        return fs.readFileSync(
            this.resolve(name)
        );
    }

    make(type, name) {
        let content = this.readSync(name).toString('utf8');
        let result = null;

        this.factories.forEach(factory => {
            factory.makes.forEach(makesType => {
                if(makesType === type) {
                    result = factory.make(content);
                    return false;
                }
            });
        });

        return result;
    }

};

const fs = require('fs');
const path = require('path');

module.exports = class {

    constructor(manager, filePath) {
        this.manager = manager;
        this.filePath = filePath;
    }

    get name() {
        return this.filePath.replace(
            this.manager.basePath,
            ''
        );
    }

    get url() {
        return './resources' + this.name.replace(/\\/g, '/');
    }

    get dir() {
        return path.dirname(this.filePath);
    }

    readSync() {
        return fs.readFileSync(this.filePath);
    }

    readStringSync() {
        return this.readSync().toString('utf8');
    }

    readJsonSync() {
        return JSON.parse(
            this.readStringSync()
        );
    }

    makeImage() {
        let image = new Image();
        image.src = this.url;
        return image;
    }

    getRelative(relPath) {
        return new Resources.Resource(
            this.manager,
            path.join(this.dir, relPath)
        );
    }

};

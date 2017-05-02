const fs = require('fs');
const path = require('path');

module.exports = class {

    constructor(manager, filePath) {
        this.manager = manager;
        this.filePath = filePath;
    }

    get url() {
        return './resources' + this.filePath.replace(
            this.manager.basePath,
            ''
        )
        .replace('\\', '/');
    }

    dir() {
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

};

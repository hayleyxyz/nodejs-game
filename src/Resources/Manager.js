const path = require('path');
const fs = require('fs');

module.exports = class {

    constructor(basePath) {
        this.basePath = basePath;
    }

    resolve(name) {
        let file = path.join(this.basePath, name);
        return file;
    }

    has(name) {
        let file = this.resolve(name);
        return fs.existsSync(file);
    }

    get(name) {
        if(this.has(name)) {
            let file = this.resolve(name);

            return new Resources.Resource(
                this,
                file
            );
        }
    }

};

const fs = require('fs');
const path = require('path');

module.exports = class {

    constructor() {
        this.cacheRequires = false;
    }

    build(dir) {
        let tree = Object.create(null);
        let entries = fs.readdirSync(dir);
        let build = (f) => this.build(f);

        entries.forEach(entry => {
            let fullPath = path.join(dir, entry);
            let stat = fs.statSync(fullPath);

            if(stat.isDirectory()) {
                Object.defineProperty(tree, entry, {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        let result = build(fullPath);

                        // Overwrite property with computed value
                        Object.defineProperty(this, entry, {
                            value: result,
                        });

                        return result;
                    }
                });
            }
            else if(this.isJavascriptFile(entry)) {
                let className = this.fileToClassName(entry);
                let cacheRequires = this.cacheRequires;

                Object.defineProperty(tree, className, {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        let result = require(fullPath);

                        if(cacheRequires) {
                            Object.defineProperty(this, className, {
                                value: result,
                            });
                        }

                        return result;
                    }
                });
            }
        });

        return tree;
    }

    isJavascriptFile(file) {
        return file.match(/\.js$/i);
    }

    fileToClassName(file) {
        return file.split('.').shift();
    }

};

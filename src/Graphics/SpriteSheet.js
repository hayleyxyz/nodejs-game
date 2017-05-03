const path = require('path');

module.exports = class {

    constructor(descriptorResource, imageResource) {
        this.descriptor = descriptorResource.readJsonSync();

        this.image = new Image();
        this.image.src = imageResource.url;
    }

    getFrame(frameId) {
        return this.descriptor.frames[frameId].frame;
    }

};

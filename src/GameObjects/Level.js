module.exports = class extends GameObjects.GameObject {

    constructor(game, levelResource) {
        super(game);

        if(!(levelResource instanceof Resources.Resource)) {
            throw new TypeError();
        }

        this.descriptor = levelResource.readJsonSync();

        this.tiles = new Util.Map();

        this.descriptor.tilesets.forEach(tileset => {
            let tilesResource = levelResource.getRelative(tileset.source);
            this.loadTileSet(tileset.firstgid, tilesResource);
        });
    }

    get width() {
        return this.descriptor.width;
    }

    get height() {
        return this.descriptor.height;
    }

    loadTileSet(firstGid, tilesResource) {
        let descriptor = tilesResource.readJsonSync();

        for(let index in descriptor.tiles) {
            let desc = descriptor.tiles[index];
            let id = parseInt(index) + firstGid;
            let tileResource = tilesResource.getRelative(desc.image);

            this.tiles.set(
                id,
                tileResource.makeImage()
            );
        }
    }

    getTileImageForCoord(coord) {
        for(let i = 0; i < this.descriptor.layers.length; i++) {
            let layer = this.descriptor.layers[i];
            if(layer.type === 'tilelayer') {
                let id = layer.data[(coord.y * this.width) + coord.x];
                return this.tiles.get(id);
            }
        }
    }

    coordToPosition(coord) {
        return new Vector2(
            coord.x * this.descriptor.tilewidth,
            coord.y * this.descriptor.tileheight
        );
    }

    draw(renderer) {
        let startX = 0;
        let startY = 0;
        let endX = this.width - 1;
        let endY = this.height - 1;

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                let coord = new Vector2(x, y);
                let image = this.getTileImageForCoord(coord);
                let position = this.coordToPosition(coord);

                if(image) {
                    renderer.drawImage(image, position);
                }
            }
        }
    }

};

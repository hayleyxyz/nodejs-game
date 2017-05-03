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

        this.addColliders();
    }

    get width() {
        return this.descriptor.width;
    }

    get height() {
        return this.descriptor.height;
    }

    addColliders() {
        for(let i = 0; i < this.descriptor.layers.length; i++) {
            let layer = this.descriptor.layers[i];
            if(layer.name === 'wall') {
                layer.objects.forEach(obj => {
                    if(obj.polyline) {
                        /* Skip for now */
                    }
                    else {
                        this.addComponent(
                            new GameObjects.Components.BoxCollider(
                                this,
                                new Geometry.Rect(obj.x, obj.y, obj.width, obj.height)
                            )
                        );
                    }
                });
            }
        }
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
        let camera = this.game.getGameObject(GameObjects.Camera);

        let startX = Math.max(
            Math.floor(camera.position.x / this.descriptor.tilewidth),
            0
        );

        let startY = Math.max(
            Math.floor(camera.position.y / this.descriptor.tileheight),
            0
        );

        let endX = Math.min(
            Math.ceil((camera.position.x + this.game.renderer.width) / this.descriptor.tilewidth),
            this.width
        ) - 1;

        let endY = Math.min(
            startY + Math.ceil((camera.position.y + this.game.renderer.height) / this.descriptor.tileheight),
            this.height
        ) - 1;

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                let coord = new Vector2(x, y);
                let image = this.getTileImageForCoord(coord);
                let position = this.coordToPosition(coord).sub(camera.position);

                if(image) {
                    renderer.drawImage(image, position);
                }
            }
        }

        for(let i = 0; i < this.descriptor.layers.length; i++) {
            let layer = this.descriptor.layers[i];
            if(layer.name === 'wall') {
                layer.objects.forEach(obj => {
                    if(obj.polyline) {
                        let points = obj.polyline.map(p => new Vector2(p.x, p.y));
                        renderer.drawPolygon(new Geometry.Polygon(points), new Vector2(obj.x, obj.y));
                    }
                    else {
                        let rect = new Geometry.Rect(obj.width, obj.height);
                        renderer.drawPolygon(rect, new Vector2(obj.x, obj.y));
                    }
                });
            }
        }
    }

};

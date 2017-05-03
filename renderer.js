let start = performance.now();

require('classloader')(
    __dirname + '/src'
);

let game = new Game();

game.gameObjects.add(
    new GameObjects.Level(
        game,
        game.resources.get('levels/level-2/level-2.json')
    )
);

game.gameObjects.add(
    new GameObjects.Player(game)
);

console.log(game);


let end = performance.now();

console.log('Exec time:', end - start);

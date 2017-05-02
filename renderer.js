let start = performance.now();

require('./classloader');

let game = new Game();
game.gameObjects.add(new GameObjects.Player(game));
console.log(game);


let end = performance.now();

console.log(end - start);

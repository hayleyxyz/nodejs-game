const path = require('path');
const ClassLoader = require(path.join(__dirname, 'src', 'ClassLoader.js'));

let classes = new ClassLoader().build(
    path.join(__dirname, 'src')
);

Object.defineProperties(
    global,
    Object.getOwnPropertyDescriptors(classes)
);

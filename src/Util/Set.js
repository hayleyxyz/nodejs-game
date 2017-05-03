module.exports = class extends Set {

    /**
    * Return the first object to make the function evaluate true
    * @arg {function} func A function that takes an object and returns true if it matches
    * @returns {Class?} The first matching object, or undefined if no match
    */
    find(func) {
        for(var item of this.values()) {
            if(func(item)) {
                return item;
            }
        }
        return undefined;
    }

    /**
    * Return all the objects that make the function evaluate true
    * @arg {function} func A function that takes an object and returns true if it matches
    * @returns {Array<Class>} An array containing all the objects that matched
    */
    filter(func) {
        var arr = [];
        for(var item of this.values()) {
            if(func(item)) {
                arr.push(item);
            }
        }
        return arr;
    }

};

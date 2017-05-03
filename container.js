/**
 * Created by oscar.berry on 5/3/2017.
 */

class Binding {

    constructor(value, lazy) {
        this.value = value;
        this.lazy = !!lazy;
    }

    make() {
        if(this.lazy) {
            this.value = this.value();
            this.lazy = false;
        }

        return this.value;
    }

}

module.exports = class {

    constructor() {
        this.bindings = new Map();
    }

    bind(abstract, value) {
        this.bindings.set(abstract, new Binding(value));
    }

    lazy(abstract, value) {
        this.bindings.set(abstract, new Binding(value, true));
    }

    make(abstract) {
        return this.bindings.get(abstract).make();
    }

};
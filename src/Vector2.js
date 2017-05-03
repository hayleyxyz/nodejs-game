module.exports = class {

    constructor(x, y) {
        this.x = x ? x : 0;
        this.y = y ? y: 0;
    }

    static get zero() {
        return new Vector2(0, 0);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    add(/* ... */) {
        return this.arithmetic(arguments, (x, y) => x + y);
    }

    sub(/* ... */) {
        return this.arithmetic(arguments, (x, y) => x - y);
    }

    mul(/* ... */) {
        return this.arithmetic(arguments, (x, y) => x * y);
    }

    div(/* ... */) {
        return this.arithmetic(arguments, (x, y) => x / y);
    }

    arithmetic(args, func) {
        let result = this.clone();

        for(let i = 0; i < args.length; i++) {
            let arg = args[i];

            if(typeof arg === 'number') {
                result.x = func(result.x, arg);
                result.y = func(result.y, arg);
            }
            else if(arg instanceof Vector2) {
                result.x = func(result.x, arg.x);
                result.y = func(result.y, arg.y);
            }
            else {
                throw new TypeError();
            }
        }

        return result;
    }

    clamp(maxLength) {
        if(this.sqrMagnitude > (maxLength * maxLength)) {
            return this.normalized.mul(maxLength);
        }
        else {
            return this.clone();
        }
    }

    get normalized() {
        let magnitude = this.magnitude;
        if(magnitude > 1E-05) {
            return this.div(magnitude);
        }
        else {
            return Vector2.zero;
        }
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get sqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }

};

export class LuminScriptError extends Error {
    constructor(msg) {
        super()
        this.message = msg
    }

    toString() {
        return this.message
    }
}
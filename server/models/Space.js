export default class Space {
    constructor(colour /*: "red" | "yellow" | "empty"*/) {
        this.colour = colour;
    }

    getColour() {
        return this.colour;
    }

    setColour(colour /*: "red" | "yellow"*/) {
        this.colour = colour;
    }
}

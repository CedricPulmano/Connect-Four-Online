export default class Space {
    private colour: "red" | "yellow" | "empty";

    constructor(colour: "red" | "yellow" | "empty") {
        this.colour = colour;
    }

    getColour() {
        return this.colour;
    }

    setColour(colour: "red" | "yellow" | "empty") {
        this.colour = colour;
    }
}

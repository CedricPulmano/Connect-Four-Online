class Space {
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

class Game {
    /*
     *   board[0][5]          board[6][5]
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *        |  |  |  |  |  |  |  |
     *        |--------------------|
     *   board[0][0]          board[6][0]
     */

    constructor() {
        this.currentColour = "red";
        this.WIDTH = 7;
        this.HEIGHT = 6;
        this.board = [];
        for (var i = 0; i < this.WIDTH; i++) {
            this.board[i] = [];
            for (var j = 0; j < this.HEIGHT; j++) {
                this.board[i][j] = new Space("empty");
            }
        }
    }

    addPiece(
        column /*: number, // colour: "red" | "yellow" */
    ) /*: [number, number, "red" | "yellow", boolean] false */ {
        if (this.isFull(column)) {
            return false;
        } else {
            for (let i = this.HEIGHT - 1; i >= 0; i--) {
                if (i === 0) {
                    let currentColour = this.currentColour;
                    this.changePlayer();
                    this.board[column][i].setColour(currentColour);
                    return [column, i, currentColour, this.checkWin(column, i)];
                } else if (this.board[column][i - 1].getColour() !== "empty") {
                    let currentColour = this.currentColour;
                    this.changePlayer();
                    this.board[column][i].setColour(currentColour);
                    return [column, i, currentColour, this.checkWin(column, i)];
                }
            }
        }
        throw new Error("Should not reach here");
    }

    isFull(column /*: number*/) /*: boolean */ {
        return !(this.board[column][this.HEIGHT - 1].getColour() === "empty");
    }

    changePlayer() {
        if (this.currentColour === "red") {
            this.currentColour = "yellow";
        } else if (this.currentColour === "yellow") {
            this.currentColour = "red";
        }
    }

    checkWin(locX /*: number */, locY /*: number */) {
        let colour = this.board[locX][locY].getColour();
        if (colour === "empty") {
            return false;
        }
        return (
            this.checkVerWin(locX, locY, colour) ||
            this.checkHorWin(locX, locY, colour) ||
            this.checkNegWin(locX, locY, colour) ||
            this.checkPosWin(locX, locY, colour)
        );
    }

    checkVerWin(locX /*: number */, locY /*: number */, colour /*: "red" | "yellow" */) /*: boolean */ {
        let counter = 1;
        let i = locY + 1;
        while (i < this.HEIGHT) {
            if (this.board[locX][i].getColour() === colour) {
                counter++;
                i++;
            } else {
                break;
            }
        }
        let j = locX - 1;
        while (j >= 0) {
            if (this.board[locX][j].getColour() === colour) {
                counter++;
                j--;
            } else {
                break;
            }
        }
        return counter >= 4;
    }

    checkHorWin(locX /*: number */, locY /*: number */, colour /*: "red" | "yellow" */) /*: boolean */ {
        let counter = 1;
        let i = locX + 1;
        while (i < this.WIDTH) {
            if (this.board[i][locY].getColour() === colour) {
                counter++;
                i++;
            } else {
                break;
            }
        }
        let j = locX - 1;
        while (j >= 0) {
            if (this.board[j][locY].getColour() === colour) {
                counter++;
                j--;
            } else {
                break;
            }
        }
        return counter >= 4;
    }

    checkNegWin(locX /*: number */, locY /*: number */, colour /*: "red" | "yellow" */) /*: boolean */ {
        let counter = 1;
        let i = locX + 1,
            j = locY - 1;
        while (i < this.WIDTH && j >= 0) {
            if (this.board[i][j].getColour() === colour) {
                counter++;
                i++;
                j--;
            } else {
                break;
            }
        }
        let k = locX - 1,
            l = locY + 1;
        while (k >= 0 && l < this.HEIGHT) {
            if (this.board[k][l].getColour() === colour) {
                counter++;
                k--;
                l++;
            } else {
                break;
            }
        }
        return counter >= 4;
    }

    checkPosWin(locX /*: number */, locY /*: number */, colour /*: "red" | "yellow" */) /*: boolean */ {
        let counter = 1;
        let i = locX + 1,
            j = locY + 1;
        while (i < this.WIDTH && j < this.HEIGHT) {
            if (this.board[i][j].getColour() === colour) {
                counter++;
                i++;
                j++;
            } else {
                break;
            }
        }
        let k = locX - 1,
            l = locY - 1;
        while (k >= 0 && l >= 0) {
            if (this.board[k][l].getColour() === colour) {
                counter++;
                k--;
                l--;
            } else {
                break;
            }
        }
        return counter >= 4;
    }

    render() {
        for (let i = this.HEIGHT - 1; i >= 0; i--) {
            for (let j = 0; j < this.WIDTH; j++) {
                if (this.board[j][i].getColour() === "empty") process.stdout.write("e ");
                else if (this.board[j][i].getColour() === "red") process.stdout.write("r ");
                else if (this.board[j][i].getColour() === "yellow") process.stdout.write("y ");
            }
            console.log();
        }
    }
}

// let game = new Game();

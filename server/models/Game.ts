import Space from "./Space"

export default class Game {

    private WIDTH = 7;
    private HEIGHT = 6;

    private board: Space[][]
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
        this.board = []
        for (var i = 0; i < this.WIDTH; i++) {
            this.board[i] = [];
            for(var j = 0; j < this.HEIGHT; j++) {
                this.board[i][j] = new Space("empty");
            }
        }
        // this.addPiece(2, "yellow");
        // this.addPiece(1, "red")
        // this.addPiece(2, "yellow");
        // this.addPiece(3, "yellow");
        // this.addPiece(3, "red");
        // this.addPiece(3, "yellow");
        // this.addPiece(4, "red");
        // this.addPiece(4, "red");
        // this.addPiece(4, "red");
        // this.addPiece(5, "red");
        // this.addPiece(5, "red");
        // this.addPiece(5, "red");
        // this.addPiece(5, "red");
        // this.addPiece(4, "yellow");
        // this.addPiece(5, "yellow");
        // console.log(this.checkWin(3, 2));
        // this.addPiece(2, "red")
        this.render()
    }

    addPiece(column: number, colour: "red" | "yellow" | "empty"): number[] {
        if (this.isFull(column)) {
            throw new Error("Column full");
        } else {
            for (let i = this.HEIGHT - 1; i >= 0; i--) {
                if (i === 0) {
                    this.board[column][i].setColour(colour);
                    return [column, i]
                } else {
                    if (this.board[column][i - 1].getColour() !== "empty") {
                        this.board[column][i].setColour(colour);
                        return [column, i]
                    }
                }
            }
        }
        throw new Error("Should not reach here");
    }

    isFull(column: number): boolean {
        return !(this.board[column][this.HEIGHT - 1].getColour() === "empty") 
    }

    checkWin(locX: number, locY: number) {
        let colour = this.board[locX][locY].getColour();
        if (colour === "empty") {
            return false;
        }
        return this.checkVerWin(locX, locY, colour) || 
               this.checkHorWin(locX, locY, colour) || 
               this.checkNegWin(locX, locY, colour) || 
               this.checkPosWin(locX, locY, colour);
    }

    checkVerWin(locX: number, locY: number, colour: "red" | "yellow" | "empty"): boolean {
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
        return counter >= 4
    }

    checkHorWin(locX: number, locY: number, colour: "red" | "yellow" | "empty"): boolean {
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
        return counter >= 4
    }

    checkNegWin(locX: number, locY: number, colour: "red" | "yellow" | "empty"): boolean {
        let counter = 1;
        let i = locX + 1, j = locY - 1;
        while (i < this.WIDTH && j >= 0) {
            if (this.board[i][j].getColour() === colour) {
                counter++;
                i++;
                j--;
            } else {
                break;
            }
        }
        let k = locX - 1, l = locY + 1;
        while (k >= 0 && l < this.HEIGHT) {
            if (this.board[k][l].getColour() === colour) {
                counter++;
                k--;
                l++;
            } else {
                break;
            }
        }
        return counter >= 4
    }

    checkPosWin(locX: number, locY: number, colour: "red" | "yellow" | "empty"): boolean {
        let counter = 1;
        let i = locX + 1, j = locY + 1;
        while (i < this.WIDTH && j < this.HEIGHT) {
            if (this.board[i][j].getColour() === colour) {
                counter++;
                i++;
                j++;
            } else {
                break;
            }
        }
        let k = locX - 1, l = locY - 1;
        while (k >= 0 && l >= 0) {
            if (this.board[k][l].getColour() === colour) {
                counter++;
                k--;
                l--;
            } else {
                break;
            }
        }
        return counter >= 4
    }

    render() {
        for (let i = this.HEIGHT - 1; i >= 0; i--) {
            for (let j = 0; j < this.WIDTH; j++) {
                if (this.board[j][i].getColour() === "empty") process.stdout.write('e ' )
                else if (this.board[j][i].getColour() === "red") process.stdout.write('r ' )
                else if (this.board[j][i].getColour() === "yellow") process.stdout.write('y ' )
            }
            console.log();
        }
    }
}

/// <reference path="gameobject.ts" />
/// <reference path="chesspiece.ts" />

class Knight extends ChessPiece {

    public getMoves(from:[number, number] = this.boardPosition): [number, number][] {
        let moves: [number, number][] = []

        for (let i = -2; i < 3; i++) {
            for (let j = -2; j < 3; j++) {
                if ((Math.abs(i) == Math.abs(j)) || (i==0) || (j==0)) {
                    continue; // only combinations of 1 and 2
                }
                let newPos: [number, number] = [from[0] + i, from[1] + j];
                if (Board.getInstance().legalPosition(newPos)) {
                    moves.push(newPos);
                }
            }
        }
        
        return moves;
    }
}

window.customElements.define("knight-component", Knight)
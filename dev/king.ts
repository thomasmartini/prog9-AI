/// <reference path="gameobject.ts" />
/// <reference path="chesspiece.ts" />


class King extends ChessPiece  {

    public getMoves(from:[number, number] = this.boardPosition): [number, number][] {
        let moves: [number, number][] = []

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i==0) && (j==0)) {
                    continue; // always move
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

window.customElements.define("king-component", King)
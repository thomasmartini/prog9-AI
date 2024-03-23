class GameState {
    public kingPos: [number, number];               // position of the king in the game in board coordinates
    public knightPositions: [number, number][];     // position of the knights in the game in board coordinates
    public previousKingPosition: [number, number];

    constructor(kingPos: [number, number], knightPositions: [number, number][]) {
        this.kingPos = kingPos;
        this.knightPositions = knightPositions;
    }

    // return the value of the state and if the state is terminal (game over)
    // higher value is better gamestate for the king (100 is win, -100 is lose)
    public getScore() : [number, boolean] {
        // game over
        for (let z of this.knightPositions) {
            if (Board.samePosition(z, this.kingPos)) {
                return [-100, true];
            }
        }

        // win
        if (this.kingPos[1] == 0) {
            return[100, true];
        } 

        // not over yet, return an evaluation of the gamestate
        // higher number is better for king, lower better for the knights

        // Hint: use the position of the king stored in this.kingPos

        let distance = 50;
        this.knightPositions.forEach((knightPos) => {
            const dx = Math.abs(this.kingPos[0] - knightPos[0]);
            const dy = Math.abs(this.kingPos[1] - knightPos[1]);
            const delta = dx + dy;

            if (delta < distance && delta > 1) distance = delta;
        });
        const score = -50 / distance;
        return [score, false]
    }

    // create a copy of the gamestate (needed by AI to look into the future)
    public copy() : GameState {
        const knightPosCopy  = Object.assign([], this.knightPositions);

        return new GameState(this.kingPos, knightPosCopy)
    }
}
/// <reference path="gameobject.ts" />


abstract class ChessPiece extends GameObject {

    public boardPosition: [number, number];     // position in board-coordinates

    constructor() {
        super(); 

        // pieces have same size as tiles
        this.width = Board.getInstance().getTileSize();
        this.height = Board.getInstance().getTileSize();
    }

    // update position (with animation)
    public setPosition(pos: [number, number]) {
        this.boardPosition = pos;

        this.targetPos = Board.getInstance().boardToScreenPos(this.boardPosition);
    }

    // init position (without animation)
    public initPosition(pos: [number, number]) {
        this.setPosition(pos); 
        this.pos = Board.getInstance().boardToScreenPos(this.boardPosition);
    }

    // every chess piece should implement which moves it can make
    public abstract getMoves(from:[number, number]): [number, number][];
}
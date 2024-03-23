/// <reference path="gameobject.ts" />
/// <reference path="chesspiece.ts" />


class Tile extends ChessPiece {

    public constructor() {
        super()

        this.width = Board.getInstance().getTileSize();
        this.height = Board.getInstance().getTileSize();
        //this.setPosition([0, 0]);
        this.style.backgroundColor = "white";
    }

    public setColor(color:string) {
        this.style.backgroundColor = color;
    }

    public update(){
        super.update()
    }

    public getMoves(): [number, number][] {
        let moves: [number, number][] = []
        return moves;
    }

}

window.customElements.define("tile-component", Tile);
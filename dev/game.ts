/// <reference path="gamestate.ts" />

// TODO: Better chess board graphics
// TODO: Add game over / win / restart game

class Game {
    
    private king:King;                      // the king (=player)
    private knights: Knight[] = [];         // list of knights in the game (=computer/AI)
    private gameOver:boolean = false;
    private gameState:GameState;            // current gameState (=position of king and knights)

    private readonly KNIGHTS: number = 4;   // number of knights

    private playerTurn:boolean = true;      // player has first turn 
 
    constructor() {
        Board.getInstance(); // init board

        // create king for the player and put on middle of bottom row
        this.king = new King();
        this.king.initPosition([Math.floor(Board.getInstance().getSize() / 2), Board.getInstance().getSize() - 1])
  
        // create a list with knights for the AI
        let knightPos: [number, number][] = []
        for(let c = 0; c<this.KNIGHTS; c++){
            let z:Knight = new Knight();
            let pos: [number, number] = [ Math.floor((c / this.KNIGHTS) * Board.getInstance().getSize()),0]
            z.initPosition(pos);
            knightPos.push(pos);
            this.knights.push(z);
        }

        // king and knights are also stored in the gameState for use by the AI 
        // !!! when positions are updated, both the gameState and the gameObject should be updated !!!
        this.gameState = new GameState(this.king.boardPosition, knightPos);

        // register input events
        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e))
        window.addEventListener("touchend", (e) => this.onTouchStart(e as TouchEvent))

        // start gameloop
        this.gameLoop()
    }

    // touch input
    private onTouchStart(e : TouchEvent) {
        let touchobj = e.changedTouches[0]
        this.playerMove(touchobj.clientX, touchobj.clientY)
     }

    // mouse input
    private onWindowClick(e:MouseEvent):void {
        this.playerMove(e.x, e.y);
    }

    // move player to tile after touch/mouse input
    private playerMove(x:number, y:number):void {
        // which tile was clicked?
        let boardPos: [number, number] = Board.getInstance().screenToBoardPos([x, y]);

        // check if knights are still moving
        let moving = false;
        for (let go of this.knights){
            if (go.moving) {
                moving = true;
            }

        }

        // only respond to input during player turn when no knights are moving, and not game over
        if ((this.playerTurn) && (!moving) && (!this.gameOver)) {
            console.log(boardPos);
            let legalMoves: [number, number][] = this.king.getMoves();

            // check if requested move is a legal move
            for(let m of legalMoves) {
                if (Board.samePosition(m, boardPos)) {
                    console.log("legal move");
                    this.king.setPosition(boardPos);
                    this.gameState.kingPos = boardPos;
                    this.playerTurn = false;

                    // check win
                    if (this.gameState.getScore()[1]) {
                        this.gameOver = true;
                    }
                }
            }
        } else {
            console.log("Not player turn, yet");
        }
    }
    
    private gameLoop(){
        // init

        // move king
        this.king.update()

        // move knights
        for (let go of this.knights){
            go.update()

        }

        // AI needs to make a move if it is not the player's turn
        if (!this.playerTurn) {
            
            GameAI.moveKnight(this.king, this.knights, this.gameState);
            this.playerTurn = true;

            // check lose
            if (this.gameState.getScore()[1]) {
                this.gameOver = true;
            }
        }

        // restart gameloop
        requestAnimationFrame(() => this.gameLoop());
    }
} 

console.log("Start AI Chess");
window.addEventListener("load", () => new Game())

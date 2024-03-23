class GameObject extends HTMLElement {

    public div: HTMLElement;
    public pos: [number, number] = [0, 0];          // current position in screen coordinates
    public targetPos: [number, number] = [0, 0];    // target position in screen coordinates
    public speed: [number, number] = [2, 2];        // move speed

    public width:number;
    public height:number;
    public direction:number = 1;
    public moving:boolean = false;                  // is object moving?

    constructor() {
        super();
        document.body.appendChild(this);
    }

    public update():void {
        // set pos to target if within speedrange
        this.moving = false;
        for (let i = 0; i < 2; i++) {
            if (Math.abs(this.targetPos[i] - this.pos[i]) <= this.speed[i]) {
                this.pos[i] = this.targetPos[i];
            } else {
                this.moving = true;
            }
        }

        // move if not at target pos (in chess play style)
        if (this.pos[0] > this.targetPos[0]) {
            this.pos[0] -= this.speed[0]
        } else if (this.pos[0] < this.targetPos[0]) {
            this.pos[0] += this.speed[0]
        } else if (this.pos[1] > this.targetPos[1]) {
            this.pos[1] -= this.speed[1]
        } else if (this.pos[1] < this.targetPos[1]) {
            this.pos[1] += this.speed[1]
        }

        //this.direction = (this.speed[0] < 0) ? 1 : -1;
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";
        this.style.backgroundSize = this.width + "px " + this.height + "px";

        this.style.transform = "translate(" + this.pos[0]+"px, "+ this.pos[1]+"px) scale("+this.direction+",1)"

    }

}
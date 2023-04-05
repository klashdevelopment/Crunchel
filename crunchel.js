class Player {
    element;
    movement = false;
    x = 0;
    y = 0;
    movementOptions = [];
    constructor(element) {
        this.element = element;
    }
    updateX(x) {
        this.x = x;
        this.element.style.top = this.y;
        this.element.style.left = this.x;
    }
    updateY(y) {
        this.y = y;
        this.element.style.top = this.y;
        this.element.style.left = this.x;
    }
    enableMovement(keybinds, options) {
        this.movement = true;
        this.movementOptions.push({
            keybinds,
            options
        });
        this.element.addEventListener("keydown", function(event) {
            switch(event.key) {
                case keybinds.up:
                    event.target.style.top += 30;
                    break;
                case keybinds.down:
                    event.target.style.top -= 30;
                    break;
                case keybinds.left:
                    event.target.style.left += 30;
                    break;
                case keybinds.right:
                    event.target.style.left -= 30;
                    break;
            }
        });
        console.log("Enabled movement on player (id " +this.element.id+")");
    }
}
function crunch(htmlElement) {
    switch(htmlElement.getAttribute('type')) {
        case 'player':
            return new Player(htmlElement);
        case 'collectable':
            return new Collectable(htmlElement);
        default:
            throw new Error("Unknown crunchel element type");
    }
}
var defaultFrames = {
    walkingAnimation: {
        lookingLeft: '/assets/player/ExamplePlayer.png',
        lookingRight: '/assets/player/ExamplePlayer.png',
        lookingUp: '/assets/player/ExamplePlayer.png',
        lookingDown: '/assets/player/ExamplePlayer.png'
    },
    defaultImage: '/assets/player/ExamplePlayer.png'
}

function isOutside(element, container) {
    if(element.getBoundingClientRect().top < container.getBoundingClientRect().top || 
    element.getBoundingClientRect().bottom > container.getBoundingClientRect().bottom || 
    element.getBoundingClientRect().left < container.getBoundingClientRect().left || 
    element.getBoundingClientRect().right > container.getBoundingClientRect().right){
        return true;
    }
    return false;
}

class Player {
    constructor(element, options) {
        this.listeners = {onmovement: []};
        this.element = element;
        this.options = options;
        this.data = {
            collectedPoints: 0
        };
    }

    enableBasicMovement(keys, options, frames=defaultFrames) {
        const speed = options.speed || 10; // default speed is 10 if not provided
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case keys.up:
                    
                    this.callMoveEventListener(keys.up, this, this.element);
                    var newStyle = (parseInt(this.element.style.top || 0) - speed);
                    if(isOutside(this.element, this.element.parentNode)){
                        newStyle = parseInt(this.element.style.left || 0)+speed;
                    }
                    this.element.style.top = `${newStyle}px`;
                    break;
                case keys.down:
                    this.callMoveEventListener(keys.down, this, this.element);
                    var newStyle = (parseInt(this.element.style.top || 0) + speed);
                    if(isOutside(this.element, this.element.parentNode)){
                        newStyle = parseInt(this.element.style.left || 0)-speed;
                    }
                    this.element.style.top = `${newStyle}px`;
                    break;
                case keys.left:
                    this.callMoveEventListener(keys.left, this, this.element);
                    var newStyle = (parseInt(this.element.style.left || 0) - speed);
                    if(isOutside(this.element, this.element.parentNode)){
                        newStyle = parseInt(this.element.style.left || 0)+speed;
                    }
                    this.element.style.left = `${newStyle}px`;
                    break;
                case keys.right:
                    this.callMoveEventListener(keys.right, this, this.element);
                    var newStyle = (parseInt(this.element.style.left || 0) + speed);
                    if(isOutside(this.element, this.element.parentNode)){
                        newStyle = parseInt(this.element.style.left || 0)-speed;
                    }
                    this.element.style.left = `${newStyle}px`;
                    break;
                default:
                    break;
            }
        });
    }

    callMoveEventListener(key, player, element) {
        for(var listener of this.listeners.onmovement) {
            listener({key, crunchTarget: player, target: element});
        }
    }
    addMoveEventListener(callback) {
        this.listeners.onmovement.push(callback);
    }
}

function crunch(element, options) {
    switch(element.getAttribute('type')) {
        case "player":
            return new Player(element, options);
        case "collectable point":
            return new Point(element, options);
        default:
            console.error("unrecognized type: " + element.getAttribute('type'));
    }
}  
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
function isTouching(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    const touching = !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
    );
    return touching;
}
function isTouchingClass(element1, className) {
    const elements2 = document.querySelectorAll(`.${className}`);
  
    for (const element2 of elements2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
  
      if (!(rect1.bottom < rect2.top || rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.left > rect2.right)) {
        return true;
      }
    }
  
    return false;
  }
  

class Player {
    constructor(element, options) {
        this.listeners = {onmovement: [], oncollectpoint: []};
        this.element = element;
        this.options = options;
        this.data = {
            collectedPoints: 0
        };
    }

    enableCoinCollect(coinElement, destroyOnCollect) {
        document.addEventListener('keydown', (event)=>{
            if(isTouching(this.element, coinElement)) {
                this.data.collectedPoints = parseInt(this.data.collectedPoints)+parseInt(coinElement.getAttribute('value'));
                this.callCollectPointListener(coinElement, this);
                if(destroyOnCollect) {
                    coinElement.parentNode.removeChild(coinElement);
                }
            }
        });
    }

    enableBasicMovement(keys, options, frames=defaultFrames) {
        const speed = options.speed || 5;
        document.addEventListener('keydown', (event) => {
            var BACKUP_TOP = this.element.style.top;
            var BACKUP_LEFT = this.element.style.left;
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
            if(isTouchingClass(this.element, "wall_block")) {
                this.element.style.left = `${BACKUP_LEFT}px`;
                this.element.style.top = `${BACKUP_TOP}px`;
            }
        });
    }

    callMoveEventListener(key, player, element) {
        for(var listener of this.listeners.onmovement) {
            listener({key, crunchTarget: player, target: element});
        }
    }
    callCollectPointListener(pointElement, player) {
        for(var listener of this.listeners.oncollectpoint) {
            listener({player, pointElement});
        }
    }
    addCollectPointListener(callback) {
        this.listeners.oncollectpoint.push(callback);
    }
    addMoveEventListener(callback) {
        this.listeners.onmovement.push(callback);
    }
}

function crunch(element, options) {
    switch(element.getAttribute('type')) {
        case "player":
            return new Player(element, options);
        default:
            console.error("unrecognized type: " + element.getAttribute('type'));
    }
}  
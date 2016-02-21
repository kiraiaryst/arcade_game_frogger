//ENEMY CLASS
var Enemy = function(initialEnemyX, initialEnemyY, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = initialEnemyX;
    this.y = initialEnemyY;
    this.speed = speed;
};

//Enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -60;
        this.enSpeed();
    }
    var bugsLeftX = this.x - 50;
    var bugsRightX = this.x + 50;
    var bugsTopY = this.y - 50;
    var bugsBottomY = this.y + 50;
    //COLLISION
    if (player.x > bugsLeftX && player.x < bugsRightX && player.y > bugsTopY && player.y < bugsBottomY) {
        player.resetPlayerPosition();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.enSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
};

//PLAYER CLASS

var playerInitX = 200;
var playerInitY = 400;
var Player = function() {
    this.x = playerInitX;
    this.y = playerInitY;
    this.sprite = 'images/char-horn-girl.png';
    this.checkWall = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    };
};

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 10) {
        this.y = -10;
        this.resetPlayerPosition();
    } else if (this.y > 420) {
        this.y = 420;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayerPosition = function() {
    this.x = playerInitX;
    this.y = playerInitY;
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 25) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 82.5;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    }
};

//Instantiate objects

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}

var player = new Player();

//This listens for key presses and sends the keys to Player.handleInput() method.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
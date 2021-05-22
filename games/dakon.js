var canvas;
var ctx;
var i;

// Holes identifier
// allHoles[7] and allHoles[15] is the Bank Hole
var allHoles = [];

// init function
function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');

    gameBegin();
}

// Game begin
function gameBegin() {
    // Size and placement
    var rads = 20;
    var radb = 30;
    var xh = 100;
    var yh = 50;

    // Creating holes
    for (i = 0; i < 16; i++) {
        if (i < 8) {
            if (i != 7) {
                allHoles.push(new holes(rads, "red", xh, yh, 7));
                allHoles[i].update();
                xh += 50;
            } else {
                // Hole [7] is the enemy Bank hole
                yh = 100;
                allHoles.push(new holes(radb, "red", xh, yh, 0));
                allHoles[i].update();
                xh = 100;
                yh = 150;
            }
        } else {
            if (i != 15) {
                allHoles.push(new holes(rads, "blue", xh, yh, 7));
                allHoles[i].update();
                xh += 50;
            } else {
                // Hole [15] is the our Bank hole
                xh = 50;
                yh = 100;
                allHoles.push(new holes(radb, "blue", xh, yh, 0));
                allHoles[i].update();
            }
        }
    }
}

// Update Area
function updateArea(idx) {
    // What happend every interval 20
    allHoles[idx].update();
}

// One turn
function oneTurn(idx) {
    // One turn function here
    setInterval(updateArea(idx), 20);
}

// Enemy's turn
// enhanced with AI
function enemyTurn(idx) {
    const button = document.querySelectorAll("button");
    button.disabled = true;

    // Enemy's turn function here

    setInterval(updateArea(idx), 20);

    button.disabled = false;
}

// Hole component
function holes(rad, color, x, y, num) {
    this.rad = rad;
    this.x = x;
    this.y = y;
    this.num = num;
    this.oldnum = this.num;

    // Circle shape
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Add num function
    this.addNum = function () {
        this.num += 1;
    }
    // Clear num function
    this.clearNum = function () {
        this.num = 0;
    }
    // Update shape and num
    this.update = function () {
        // Add shape
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Add new text
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        if (this.num < 10) {
            ctx.fillText(this.num, this.x - 5, this.y + 7);
        } else {
            ctx.fillText(this.num, this.x - 12, this.y + 7);
        }
    }
}

// Function for restart
function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allHoles = [];
    gameBegin();
}

// Play function
function tap(idx) {
    // Play one turn here
    oneTurn(idx);
    enemyTurn();
    // allHoles[idx].addNum();
    // allHoles[idx].update();
}
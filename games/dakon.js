var canvas;
var ctx;
var i;
var myVar;
var arrLength;
var newIdx;
const button = document.querySelectorAll(".btn");

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
                xh = 400;
                yh = 150;
            }
        } else {
            if (i != 15) {
                allHoles.push(new holes(rads, "blue", xh, yh, 7));
                allHoles[i].update();
                xh -= 50;
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

// Update num every 1 sec
function updateLoop(idx, i, n) {
    setTimeout(function () {
        arrLength = allHoles.length - 1;
        newIdx = idx + i;
        // Check if list index is running out
        if (newIdx > arrLength) {
            newIdx = newIdx - arrLength - 1;
        }
        allHoles[newIdx].addNum();
        allHoles[newIdx].update();

        i++;
        if (i <= n) {
            updateLoop(idx, i, n);
        } else {
            // Enable button
            for (i = 0; i < button.length; i++) {
                button[i].disabled = false;
            }
        }
    }, 1000);
}

// One turn
function oneTurn(idx) {
    var n = allHoles[idx].num;

    // Disable button
    for (i = 0; i < button.length; i++) {
        button[i].disabled = true;
    }

    // One turn function here
    allHoles[idx].clearNum();
    allHoles[idx].update();
    i = 1;
    updateLoop(idx, i, n);
    // Function end
}

// Enemy's turn
// will enhanced with AI
function enemyTurn() {
    var idx;

    // Enemy's turn function here

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
}
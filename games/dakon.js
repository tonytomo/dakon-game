var canvas;
var ctx;
var i;
var myVar;
var arrLength;
var newIdx;
var hand;

// Time
var time500 = 500;
var time0 = 0;
var setTime;

var dropsound = new Audio('assets/3224__edwin-p-manchester__04.wav')
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

    // Add Turn hand
    hand = new holes(rads, "#414141", 25, 25, 0);
    hand.update();

    // Creating holes
    for (i = 0; i < 16; i++) {
        if (i < 8) {
            if (i != 7) {
                allHoles.push(new holes(rads, "#611414", xh, yh, 7));
                allHoles[i].update();
                xh += 50;
            } else {
                // Hole [7] is the enemy Bank hole
                yh = 100;
                allHoles.push(new holes(radb, "#611414", xh, yh, 0));
                allHoles[i].update();
                xh = 400;
                yh = 150;
            }
        } else {
            if (i != 15) {
                allHoles.push(new holes(rads, "#021f55", xh, yh, 7));
                allHoles[i].update();
                xh -= 50;
            } else {
                // Hole [15] is the our Bank hole
                xh = 50;
                yh = 100;
                allHoles.push(new holes(radb, "#021f55", xh, yh, 0));
                allHoles[i].update();
            }
        }
    }
}

// STOP 1
// Stop 1, if the last seed fall into my empty hole
function changeMyTurn(idx) {
    var sum;
    allHoles[idx].clearNum();
    if (idx == 14) {
        sum = allHoles[0].num + 1;
        allHoles[0].clearNum();
        allHoles[0].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 13) {
        sum = allHoles[1].num + 1;
        allHoles[1].clearNum();
        allHoles[1].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 12) {
        sum = allHoles[2].num + 1;
        allHoles[2].clearNum();
        allHoles[2].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 11) {
        sum = allHoles[3].num + 1;
        allHoles[3].clearNum();
        allHoles[3].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 10) {
        sum = allHoles[4].num + 1;
        allHoles[4].clearNum();
        allHoles[4].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 9) {
        sum = allHoles[5].num + 1;
        allHoles[5].clearNum();
        allHoles[5].update();
        allHoles[15].sumNum(sum);
    }
    if (idx == 8) {
        sum = allHoles[6].num + 1;
        allHoles[6].clearNum();
        allHoles[6].update();
        allHoles[15].sumNum(sum);
    }
    allHoles[idx].update();
    allHoles[15].update();
    // Enemy turn
    enemyTurn();
}
// Stop 1, if the last seed fall into enemy empty hole
function changeEnemyTurn(idx) {
    var sum;
    allHoles[idx].clearNum();
    if (idx == 0) {
        sum = 1 + allHoles[14].num;
        allHoles[14].clearNum();
        allHoles[14].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 1) {
        sum = 1 + allHoles[13].num;
        allHoles[13].clearNum();
        allHoles[13].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 2) {
        sum = 1 + allHoles[12].num;
        allHoles[12].clearNum();
        allHoles[12].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 3) {
        sum = 1 + allHoles[11].num;
        allHoles[11].clearNum();
        allHoles[11].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 4) {
        sum = 1 + allHoles[10].num;
        allHoles[10].clearNum();
        allHoles[10].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 5) {
        sum = 1 + allHoles[9].num;
        allHoles[9].clearNum();
        allHoles[9].update();
        allHoles[7].sumNum(sum);
    }
    if (idx == 6) {
        sum = 1 + allHoles[8].num;
        allHoles[8].clearNum();
        allHoles[8].update();
        allHoles[7].sumNum(sum);
    }
    allHoles[idx].update();
    allHoles[7].update();
    // Enable button
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
    }
}

// My turn
function myTurn(idx) {
    var n = allHoles[idx].num;

    // Number of my kecik
    var sum = 0;
    for (i = 8; i <= 14; i++) {
        sum += allHoles[i].num;
    }

    // Check if all of my lumbung is empty
    if (sum == 0) {
        endCondition();
    }
    else if (n != 0) {
        hand.myColor();
        hand.update();

        // Disable button
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }

        // Set hand
        hand.clearNum();
        hand.sumNum(n);
        hand.update();

        // One turn function here
        allHoles[idx].clearNum();
        allHoles[idx].update();
        i = 1;
        updateMyNum(idx, i, n, time500);
        // Function End
    }
}

// Update num every 1 sec
function updateMyNum(idx, i, n, timer) {
    //Set Timeout every 1 sec
    setTime = setTimeout(function () {
        arrLength = allHoles.length - 1;
        newIdx = idx + i;

        // Check if list index is running out
        if (newIdx > arrLength) {
            newIdx = newIdx - arrLength - 1;
        }

        // Check if list index is enemy's bank
        if (newIdx == 7) {
            i++;
            updateMyNum(idx, i, n + 1, time0);
        } else {
            // Change active hole color
            if (newIdx > 7) {
                if (newIdx != 8) {
                    allHoles[newIdx - 1].myColor();
                    allHoles[newIdx - 1].update();
                } else {
                    allHoles[newIdx - 2].enemyColor();
                    allHoles[newIdx - 2].update();
                }
                allHoles[newIdx].myActiveColor();
                allHoles[newIdx].update();
            } else {
                if (newIdx != 0) {
                    allHoles[newIdx - 1].enemyColor();
                    allHoles[newIdx - 1].update();
                } else {
                    allHoles[15].myColor();
                    allHoles[15].update();
                }
                allHoles[newIdx].enemyActiveColor();
                allHoles[newIdx].update();
            }

            // Add num to hole
            allHoles[newIdx].addNum();
            allHoles[newIdx].update();
            dropsound.play();

            i++;
            if (i <= n) {
                hand.minNum();
                hand.update();
                updateMyNum(idx, i, n, time500);
            } else {
                if (newIdx == 15) {
                    allHoles[newIdx].myColor();
                    allHoles[newIdx].update();
                    // Enable button
                    for (i = 0; i < button.length; i++) {
                        button[i].disabled = false;
                    }
                } else {
                    if (allHoles[newIdx].num > 1) {
                        n = allHoles[newIdx].num;
                        i = 1;
                        allHoles[newIdx].clearNum();
                        allHoles[newIdx].update();
                        hand.clearNum();
                        hand.sumNum(n);
                        hand.update();
                        updateMyNum(newIdx, i, n, time500);
                    } else {
                        if (newIdx > 7) {
                            allHoles[newIdx].myColor();
                            allHoles[newIdx].update();
                            changeMyTurn(newIdx);
                        } else {
                            allHoles[newIdx].enemyColor();
                            allHoles[newIdx].update();
                            enemyTurn();
                        }
                    }
                }
            }
        }
    }, timer);
}

// Enemy turn
// will enhanced with AI
// but for now, we use random
function enemyTurn() {
    var idx = Math.floor(Math.random() * 7);
    var n = allHoles[idx].num;
    while (n == 0) {
        idx = Math.floor(Math.random() * 7);
        n = allHoles[idx].num;
    }

    // Number of enemy kecik
    var sum = 0;
    for (i = 0; i <= 6; i++) {
        sum += allHoles[i].num;
    }

    // Check if all of enemy lumbung is empty
    if (sum == 0) {
        endCondition();
    }
    else if (n != 0) {
        hand.enemyColor();
        hand.update();

        // Set hand
        hand.clearNum();
        hand.sumNum(n);
        hand.update();

        // Enemy's turn function here
        allHoles[idx].clearNum();
        allHoles[idx].update();
        i = 1;
        updateEnemyNum(idx, i, n, time500);
        // Function End
    }
}

// Update num every 1 sec
function updateEnemyNum(idx, i, n, timer) {
    //Set Timeout every 1 sec
    setTime = setTimeout(function () {
        arrLength = allHoles.length - 1;
        newIdx = idx + i;

        // Check if list index is running out
        if (newIdx > arrLength) {
            newIdx = newIdx - arrLength - 1;
        }

        // Check if list index is enemy's bank
        if (newIdx == 15) {
            i++;
            updateEnemyNum(idx, i, n + 1, time0);
        } else {
            // Change active hole color
            if (newIdx > 7) {
                if (newIdx != 8) {
                    allHoles[newIdx - 1].myColor();
                    allHoles[newIdx - 1].update();
                } else {
                    allHoles[7].enemyColor();
                    allHoles[7].update();
                }
                allHoles[newIdx].myActiveColor();
                allHoles[newIdx].update();
            } else {
                if (newIdx != 0) {
                    allHoles[newIdx - 1].enemyColor();
                    allHoles[newIdx - 1].update();
                } else {
                    allHoles[14].myColor();
                    allHoles[14].update();
                }
                allHoles[newIdx].enemyActiveColor();
                allHoles[newIdx].update();
            }

            // Add num to hole
            allHoles[newIdx].addNum();
            allHoles[newIdx].update();
            dropsound.play();

            i++;
            if (i <= n) {
                hand.minNum();
                hand.update();
                updateEnemyNum(idx, i, n, time500);
            } else {
                if (newIdx == 7) {
                    allHoles[newIdx].enemyColor();
                    allHoles[newIdx].update();
                    enemyTurn();
                } else {
                    if (allHoles[newIdx].num > 1) {
                        n = allHoles[newIdx].num;
                        i = 1;
                        allHoles[newIdx].clearNum();
                        allHoles[newIdx].update();
                        hand.clearNum();
                        hand.sumNum(n);
                        hand.update();
                        updateEnemyNum(newIdx, i, n, time500);
                    } else {
                        if (newIdx < 7) {
                            allHoles[newIdx].enemyColor();
                            allHoles[newIdx].update();
                            changeEnemyTurn(newIdx);
                        } else {
                            allHoles[newIdx].myColor();
                            allHoles[newIdx].update();
                            // Enable button
                            for (i = 0; i < button.length; i++) {
                                button[i].disabled = false;
                            }
                        }
                    }
                }
            }
        }
    }, timer);
}

// END CONDITION
function endCondition() {

    // All of the remain kecik go to their bank
    var sum1 = 0;
    for (i = 8; i <= 14; i++) {
        sum1 += allHoles[i].num;
    }
    allHoles[15].sumNum(sum1);

    var sum2 = 0;
    for (i = 0; i <= 6; i++) {
        sum2 += allHoles[i].num;
    }
    allHoles[7].sumNum(sum2);

    // WIN-LOSE CONDITION
    if (allHoles[15].num == allHoles[7].num) {
        // TIE condition
        var end = new holes(60, "#414141", 250, 100, "TIE");
        end.showEnd();
        // Disable button
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }
    else if (allHoles[15].num > allHoles[7].num) {
        // WIN condition
        var end = new holes(60, "#021f55", 250, 100, "YOU WIN");
        end.showEnd();
        // Disable button
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    } else {
        // LOSE condition
        var end = new holes(60, "#611414", 250, 100, "YOU LOSE");
        end.showEnd();
        // Disable button
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }
}

// Hole component
function holes(rad, color, x, y, num) {
    this.rad = rad;
    this.color = color;
    this.x = x;
    this.y = y;
    this.num = num;
    this.oldnum = this.num;

    // Add num function
    this.addNum = function () {
        this.num += 1;
    }
    // Substract num function
    this.minNum = function () {
        this.num -= 1;
    }
    // Clear num function
    this.clearNum = function () {
        this.num = 0;
    }
    // Sum num
    this.sumNum = function (n) {
        this.num += n;
    }

    // Update shape and num
    this.update = function () {
        // Add shape
        ctx.fillStyle = this.color;
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
    // Show end condition
    this.showEnd = function() {
        // Add shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Add new text
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        if (this.num == "TIE") {
            ctx.fillText(this.num, this.x - 15, this.y + 7);
        } 
        else if (this.num == "YOU WIN") {
            ctx.fillText(this.num, this.x - 45, this.y + 7);
        } 
        else if (this.num == "YOU LOSE") {
            ctx.fillText(this.num, this.x - 52, this.y + 7);
        }
    }

    // My turn
    this.myColor = function () {
        this.color = "#021f55";
    }
    // Enemy's turn
    this.enemyColor = function () {
        this.color = "#611414";
    }
    // My turn active
    this.myActiveColor = function () {
        this.color = "#1e4388";
    }
    // Enemy's turn active
    this.enemyActiveColor = function () {
        this.color = "#921f1f";
    }
}

// Stop function
function stop() {
    clearTimeout(setTime);
}

// Function for restart
function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allHoles = [];
    // Enable button
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
    }
    clearTimeout(setTime);
    gameBegin();
}

// Play function
function tap(idx) {
    // Play one turn here
    myTurn(idx);
}
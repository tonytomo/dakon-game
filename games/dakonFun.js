// END CONDITION
// Jika yang mendapat giliran, semua lubang kecilnya kosong
function endCondition() {

    // Semua biji yang masih di wilayahnya menjadi tambahan banknya masing2
    var sum1 = 0;
    var sum2 = 0;

    // Perulangan untuk menambah semua biji yang tersisa ke variable diatas
    // lalu langsung update lubang
    // sehingga semua lubang akan kosong kecuali di bank
    for (i = 0; i <= 6; i++) {
        sum1 += holes[i + 8].num;
        holes[i + 8].clearNum();
        holes[i + 8].update();

        sum2 += holes[i].num;
        holes[i].clearNum();
        holes[i].update();
    }
    // update jumlah biji pada bank
    holes[15].sumNum(sum1);
    holes[15].update();
    holes[7].sumNum(sum2);
    holes[7].update();

    // WIN-LOSE CONDITION
    if (holes[15].num == holes[7].num) {
        // TIE condition
        // SERI
        var end = new Hole(60 * 2, "#414141", 250 * 2, 100 * 2, "TIE");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    }
    else if (holes[15].num > holes[7].num) {
        // WIN condition
        // PLAYER MENANG
        var end = new Hole(60 * 2, "#021f55", 250 * 2, 100 * 2, "BLUE WIN");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    } else {
        // LOSE condition
        // PLAYER KALAH
        var end = new Hole(60 * 2, "#611414", 250 * 2, 100 * 2, "RED WIN");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    }
}

// Fungsi RESTART permainan
function restart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    holes = [];

    // Enable tombol kontrol
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
    }
    clearTimeout(setTime);
    gameBegin();
}

// PvP toggle
function pvpOn() {
    // Get element
    var pvpbtn = document.querySelector("#pvpbtn");
    if (pvpflag == 0) {
        // Merubah text button
        pvpbtn.innerText = "PvP ON";
        pvpbtn.style.backgroundColor = "#021f55";

        // Merubah flag menjadi 1
        // Mode pvp activated
        pvpflag = 1;
    } else {
        // Merubah text button
        pvpbtn.innerText = "PvP OFF";
        pvpbtn.style.backgroundColor = "#353535";

        // Merubah flag menjadi 0
        // Mode pvp deactivated
        pvpflag = 0;
    }

    // Auto restart
    restart();
}

// Fungsi mulai langkah untuk PLAYER
function tap(idx) {
    // Memanggil fungsi giliran PLAYER
    myTurn(idx);
}

// Fungsi mulai langkah untuk PLAYER 2
function tap1(idx) {
    // Memanggil fungsi giliran PLAYER 2
    enemyPTurn(idx);
}
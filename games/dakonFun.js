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

        // Add log
        addLog('--------------');
        addLog('PERMAINAN SERI');
        addLog('--------------');

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    }
    else if (holes[15].num > holes[7].num) {
        // WIN condition
        // PLAYER MENANG
        var end = new Hole(60 * 2, "#1e4388", 250 * 2, 100 * 2, "BLUE WIN");
        end.showEnd();

        // Add log
        addLog('--------------');
        addLog('BIRU MENANG');
        addLog('--------------');

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    } else {
        // LOSE condition
        // PLAYER KALAH
        var end = new Hole(60 * 2, "#921f1f", 250 * 2, 100 * 2, "RED WIN");
        end.showEnd();

        // Add log
        addLog('--------------');
        addLog('MERAH MENANG');
        addLog('--------------');

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }
    }
}

// Fungsi log
function addLog(logs) {
    var rect = document.createElement("li");
    var text = document.createTextNode(logs);

    rect.appendChild(text);
    log.appendChild(rect);
    log.lastChild.scrollIntoView();
}

// Fungsi RESTART permainan
function restart() {
    // Add log
    addLog('____________________');
    addLog('Game restarted!');
    addLog('Biji Awal = ' + biji.value);

    bijiAwal = parseInt(biji.value);

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
    var pvpbtn = document.getElementById('pvpbtn');
    if (pvpflag == 0) {
        // Add log
        addLog('____________________');
        addLog('~ PVP ON ~');

        // Merubah text button
        pvpbtn.innerText = "PvP ON";
        pvpbtn.style.backgroundColor = "#021f55";

        // Merubah flag menjadi 1
        // Mode pvp activated
        pvpflag = 1;
    } else {
        // Add log
        addLog('____________________');
        addLog('~ PVP OFF ~');

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

// Algoritma toggle
function changeMode() {
    // Get element
    var modebtn = document.getElementById('modebtn')
    if (mode == 0) {
        // Add log
        addLog('____________________');
        addLog('@@ BOT MAX @@');

        // Merubah text button
        modebtn.innerText = "MAX";
        modebtn.style.backgroundColor = "#021f55";

        // Ganti mode max index
        mode = 1;
    } else if (mode == 1) {
        // Add log
        addLog('____________________');
        addLog('@@ BOT AI @@');

        // Merubah text button
        modebtn.innerText = "AI";
        modebtn.style.backgroundColor = "#e3d409";

        // Ganti mode optimal (AI)
        mode = 2;
    } else {
        // Add log
        addLog('____________________');
        addLog('@@ BOT RANDOM @@');

        // Merubah text button
        modebtn.innerText = "RANDOM";
        modebtn.style.backgroundColor = "#353535";

        // Ganti mode random index
        mode = 0;
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

// Fungsi toggle log
function logToggle() {
    // Jika log aktif
    if (logs.style.display == "block") {
        logs.style.display = "none";
    } else {
        logs.style.display = "block";
    }
}

// Fungsi clear log
function clearLog() {
    // Menghapus semua child log
    log.innerHTML = "";
}
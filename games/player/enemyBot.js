// Kalau biji terakhir MUSUH ditangan jatuh di lubang kecil di wilayah MUSUH
function changeEnemyTurn(idx) {
    var sum;
    holes[idx].clearNum();
    if (idx == 0) {
        sum = 1 + holes[14].num;
        holes[14].clearNum();
        holes[14].update();
        holes[7].sumNum(sum);
    }
    if (idx == 1) {
        sum = 1 + holes[13].num;
        holes[13].clearNum();
        holes[13].update();
        holes[7].sumNum(sum);
    }
    if (idx == 2) {
        sum = 1 + holes[12].num;
        holes[12].clearNum();
        holes[12].update();
        holes[7].sumNum(sum);
    }
    if (idx == 3) {
        sum = 1 + holes[11].num;
        holes[11].clearNum();
        holes[11].update();
        holes[7].sumNum(sum);
    }
    if (idx == 4) {
        sum = 1 + holes[10].num;
        holes[10].clearNum();
        holes[10].update();
        holes[7].sumNum(sum);
    }
    if (idx == 5) {
        sum = 1 + holes[9].num;
        holes[9].clearNum();
        holes[9].update();
        holes[7].sumNum(sum);
    }
    if (idx == 6) {
        sum = 1 + holes[8].num;
        holes[8].clearNum();
        holes[8].update();
        holes[7].sumNum(sum);
    }
    holes[idx].update();
    holes[7].update();

    hand.clearNum();    // Biji sudah habis
    hand.myColor();     // Ganti warna
    hand.update();      // update tangan

    // Tombol controller enable, GILIRAN PLAYER
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
    }

    // Add log
    addLog('B selesai, NEMBAK +' + sum);
    addLog('MY TURN');
    // Add notif
    addNotif('Giliran P1!');
}

// -----------------------------
//        MODE BOT
// -----------------------------

// Random index
function randIdx() {
    var ran = 0;
    var n = 0;
    // Membuat index buatan random 0-6
    while (n == 0) {
        ran = Math.floor(Math.random() * 7);
        n = holes[ran].num;
    }
    return ran;
}

// Pilih biji paling banyak
function maxIdx() {
    // Berisi index
    var max = 0;
    // Berisi num
    var num = 0;

    // Cek satu per satu
    for (i = 0; i <= 6; i++) {
        if (num < holes[i].num) {
            max = i;    // max = iterasi (index)
            num = holes[i].num;
        }
    }
    return max;
}

// ----------------------
// Pilih biji dengan A1
// ----------------------
function optIdx() {
    var fixidx;
    var lidx = [];
    lidx = findIdx();
    for (var l = 0; l < lidx.length; l++) {
        addLog("isi array = " + lidx[l]);
    }
    if (lidx.length != 0) {
        addLog('ADA YG KE LUMBUNG');
        // Fungsi mencari nilai lumbung terkecil player

        // return random index ke lumbung
        fixidx = Math.floor(Math.random() * lidx.length);
        return lidx[fixidx];
    } else {
        addLog('ENGGAK ADA YG KE LUMBUNG');
        return maxIdx();
    }
}

var lumbung;    // Jumlah isi lumbung
var lflag;      // Flag jika berhenti dilumbung
var papan = []; // Virtual papan

// Fungsi update papan
function updatePapan() {
    for (i = 0; i < 16; i++) {
        if (papan.length != 0) {
            papan[i] = holes[i].num;
        } else {
            papan.push(holes[i].num);
        }
    }
}

// Fungsi mencari array index yang berhenti dilumbung
function findIdx() {
    var allIdx = [];
    var jml;
    lumbung = holes[7].num;
    lflag = 0;

    for (var j = 0; j < 7; j++) {
        updatePapan();
        i = 1;
        jml = papan[j];
        papan[j] = 0;
        var idxtemp = j;
        
        while (jml != 0) {
            var nidx = idxtemp + i;

            while (nidx > 15) {
                nidx -= 16;
            }

            if (nidx == 15) {
                nidx++;
                i++;
                jml++;
            } else {

                papan[nidx]++;

                i++;
                if (i > jml) {
                    if (nidx == 7) {
                        lflag = 1;
                        jml = 0;
                        // selesai di lumbung
                    } else {
                        if (papan[nidx] > 1) {
                            i = 1;
                            jml = papan[nidx];
                            papan[nidx] = 0;
                            idxtemp = nidx;
                            // ambil lagi
                        } else {
                            jml = 0;
                            // selesai
                        }
                    }
                }
            }
        }

        if (lflag == 1) {
            allIdx.push(j);
            lflag = 0;
        }
    }
    return allIdx;
}

//
// GILIRAN MUSUH
// nantinya akan ditambah fitur Kecerdasan Buatan
// Untuk sekarang masih menggunakan acak
//
function enemyTurn() {
    // Seperti PLAYER memilih lubang
    var idx;
    var n = 0; // Jumlah biji pada lubang index

    // Jumlah biji di wilayah MUSUH, tidak termasuk bank
    var sum = 0;
    for (i = 0; i <= 6; i++) {
        sum += holes[i].num;
    }

    // Cek jika jumlah biji di wilayah PLAYER sudah = 0 atau habis
    // Jika habis, PERMAINAN SELESAI
    if (sum == 0) {
        endCondition();
    }
    // Cek jika biji dalam lumbung lebih dari setengah dari total biji
    else if (holes[7].num > bijiAwal * 7 || holes[15].num > bijiAwal * 7) {
        endCondition();
    }
    // Jika tidak,
    else {
        // -----------------------------
        //      CALL ALGORITMA BOT
        // -----------------------------
        if (mode == 0) {
            idx = randIdx();
        } else if (mode == 1) {
            idx = maxIdx();
        } else if (mode == 2) {
            idx = optIdx();
        }
        n = holes[idx].num;

        // Add log
        addLog('B mulai!');
        addLog('B AMBIL= ' + n + ', di= ' + idx);

        // Jika lubang tidak kosong
        if (n != 0) {
            // Mengubah warna tangan menjadi warna MUSUH
            hand.enemyColor();
            hand.update();

            // Mengosongkan dan mengisi kembali tangan dengan biji yang diambil
            hand.clearNum();
            hand.sumNum(n);
            hand.update();

            // Mengosongkan biji pada lubang terpilih setelah diambil
            holes[idx].clearNum();
            holes[idx].update();

            // Iterasi menjadi 1
            i = 1;

            // Mulai langkah peletakan biji
            updateEnemyNum(idx, i, n, timeStep);
        }
    }
}

// Langkah MUSUH setelah mengambil biji dari lubang
function updateEnemyNum(idx, i, n, timer) {
    //Set Timeout setiap detik
    setTime = setTimeout(function () {
        newIdx = idx + i;           // index baru = index + i

        // Cek jika melewati lubang index 15 atau bank PLAYER
        // Index kembali ke 0
        while (newIdx > 15) {
            newIdx -= 16;
        }

        // Cek jika melewati lubang bank PLAYER
        // iterasi ditambah, n ditambah,
        // sehingga langsung melewati bank tanpa meletakan biji
        if (newIdx == 15) {
            newIdx = 0;
            i++;
            n++;

            // Add log
            addLog('B lewat lumbung P1');
        }

        //
        // PENJELASAN TIDAK BEDA
        // DENGAN PLAYER
        //
        // Add log
        addLog('B hand= ' + hand.num + ', idx= ' + newIdx);
        // Add notif
        addNotif('Bot berjalan!');

        // Mengubah warna lubang yang aktif
        if (newIdx > 7) {
            if (newIdx != 8) {
                holes[newIdx - 1].myColor();
                holes[newIdx - 1].update();
            } else {
                holes[7].enemyColor();
                holes[7].update();
            }
            holes[newIdx].myActiveColor();
            holes[newIdx].update();
        } else {
            if (newIdx != 0) {
                holes[newIdx - 1].enemyColor();
                holes[newIdx - 1].update();
            } else {
                holes[14].myColor();
                holes[14].update();
            }
            holes[newIdx].enemyActiveColor();
            holes[newIdx].update();
        }

        // Meletakan biji ke lubang yang dilewati
        holes[newIdx].addNum();
        holes[newIdx].update();

        // Stop sound lalu menyalakan lagi
        dropsound.pause();
        dropsound.currentTime = 0;
        dropsound.play();

        i++;
        if (i <= n || hand.num > 1) {
            hand.minNum();
            hand.update();
            updateEnemyNum(idx, i, n, timeStep);
        } else {
            if (newIdx == 7) {
                // Add log
                addLog('B stop di LUMBUNG');
                // Add notif
                addNotif('Bot ambil lagi!');

                holes[newIdx].enemyColor();
                holes[newIdx].update();
                enemyTurn();
            } else {
                if (holes[newIdx].num > 1) {
                    n = holes[newIdx].num;
                    i = 1;
                    holes[newIdx].clearNum();
                    holes[newIdx].update();
                    hand.clearNum();
                    hand.sumNum(n);
                    hand.update();
                    updateEnemyNum(newIdx, i, n, timeStep);

                    // Add log
                    addLog('B LAGI= ' + n + ', di= ' + newIdx);
                } else {
                    if (newIdx < 7) {
                        holes[newIdx].enemyColor();
                        holes[newIdx].update();
                        changeEnemyTurn(newIdx);
                    } else {
                        holes[newIdx].myColor();
                        holes[newIdx].update();

                        hand.clearNum();    // Biji sudah habis
                        hand.myColor();     // Ganti warna
                        hand.update();      // update tangan

                        // Enable tombol kontrol
                        // GILIRAN PLAYER
                        for (i = 0; i < button.length; i++) {
                            button[i].disabled = false;
                        }
                        // Add log
                        addLog('B selesai, di= ' + newIdx);

                        // Add log
                        addLog('MY TURN');
                        // Add notif
                        addNotif('Giliran P1!');
                    }
                }
            }
        }
    }, timer);
}
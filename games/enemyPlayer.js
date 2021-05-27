// Kalau biji terakhir MUSUH ditangan jatuh di lubang kecil di wilayah MUSUH
function changeEnemyPTurn(idx) {
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

    // Tombol controller enable, GILIRAN PLAYER 1
    // Tombol controller PLAYER 2 disable
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
        button1[i].disabled = true;
    }
}

//
// GILIRAN PLAYER 2
// Setelah menekan tombol kontrol
//
function enemyPTurn(idx) {
    var n = holes[idx].num; // Jumlah biji di lubang terpilih

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
    // Jika lubang tidak kosong
    else if (n != 0) {

        // Disable tombol controller
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }

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
        updateEnemyPNum(idx, i, n, timeStep);
    }
}

// Langkah MUSUH setelah mengambil biji dari lubang
function updateEnemyPNum(idx, i, n, timer) {
    //Set Timeout setiap detik
    setTime = setTimeout(function () {
        arrLength = holes.length;   // Panjang list
        newIdx = idx + i;           // index baru = index + i

        // Cek jika melewati lubang index 15 atau bank PLAYER
        // Index kembali ke 0
        if (newIdx >= arrLength) {
            newIdx = newIdx - arrLength;
        }

        // Cek jika melewati lubang bank PLAYER
        // iterasi ditambah, n ditambah,
        // sehingga langsung melewati bank tanpa meletakan biji
        if (newIdx == 15) {
            i++;
            updateEnemyPNum(idx, i, n + 1, time0);
        }
        //
        // PENJELASAN TIDAK BEDA
        // DENGAN PLAYER
        //
        else {
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
                updateEnemyPNum(idx, i, n, timeStep);
            } else {
                if (newIdx == 7) {
                    holes[newIdx].enemyColor();
                    holes[newIdx].update();
                    // Enable tombol kontrol
                    // PLAYER 2 main lagi
                    for (i = 0; i < button.length; i++) {
                        button1[i].disabled = false;
                    }
                } else {
                    if (holes[newIdx].num > 1) {
                        n = holes[newIdx].num;
                        i = 1;
                        holes[newIdx].clearNum();
                        holes[newIdx].update();
                        hand.clearNum();
                        hand.sumNum(n);
                        hand.update();
                        updateEnemyPNum(newIdx, i, n, timeStep);
                    } else {
                        if (newIdx < 7) {
                            holes[newIdx].enemyColor();
                            holes[newIdx].update();
                            changeEnemyPTurn(newIdx);
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
                                button1[i].disabled = true;
                            }
                        }
                    }
                }
            }
        }
    }, timer);
}
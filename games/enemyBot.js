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
}

//
// GILIRAN MUSUH
// nantinya akan ditambah fitur Kecerdasan Buatan
// Untuk sekarang masih menggunakan acak
//
function enemyTurn() {
    // Membuat index buatan random
    // Seperti PLAYER memilih lubang
    var idx = Math.floor(Math.random() * 7);
    var n = holes[idx].num; // Jumlah biji pada lubang index

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
    // Jika tidak,
    else {
        // Jika lubang yang terpilih dari pengacakan berisi 0 biji
        // Maka akan melakukan pengacakan lagi hingga ada yang isi
        while (n == 0) {
            idx = Math.floor(Math.random() * 7);
            n = holes[idx].num;
        }

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
            updateEnemyNum(idx, i, n + 1, time0);
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
                updateEnemyNum(idx, i, n, timeStep);
            } else {
                if (newIdx == 7) {
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
                        }
                    }
                }
            }
        }
    }, timer);
}
//
// FUNGSI GANTI GILIRAN
// Kalau biji terakhir PLAYER ditangan jatuh di lubang kecil di wilayah PLAYER
//
function changeMyTurn(idx) {
    var sum;
    holes[idx].clearNum();
    // Jika jatuh di lubang ke 1 dari kiri
    if (idx == 14) {
        sum = holes[0].num + 1; // Jumlah biji dengan lubang lawan diseberangnya
        holes[0].clearNum();    // Menghapus biji lubang lawan
        holes[0].update();      // update lubang
        holes[15].sumNum(sum);  // Menambahkan hasil penjumlahan ke bank PLAYER
    }
    // Jika jatuh di lubang ke 2 dari kiri
    if (idx == 13) {
        sum = holes[1].num + 1;
        holes[1].clearNum();
        holes[1].update();
        holes[15].sumNum(sum);
    }
    // Jika jatuh di lubang ke 3 dari kiri
    if (idx == 12) {
        sum = holes[2].num + 1;
        holes[2].clearNum();
        holes[2].update();
        holes[15].sumNum(sum);
    }
    // Jika jatuh di lubang ke 4 dari kiri
    if (idx == 11) {
        sum = holes[3].num + 1;
        holes[3].clearNum();
        holes[3].update();
        holes[15].sumNum(sum);
    }
    // Jika jatuh di lubang ke 5 dari kiri
    if (idx == 10) {
        sum = holes[4].num + 1;
        holes[4].clearNum();
        holes[4].update();
        holes[15].sumNum(sum);
    }
    // Jika jatuh di lubang ke 6 dari kiri
    if (idx == 9) {
        sum = holes[5].num + 1;
        holes[5].clearNum();
        holes[5].update();
        holes[15].sumNum(sum);
    }
    // Jika jatuh di lubang ke 7 dari kiri
    if (idx == 8) {
        sum = holes[6].num + 1;
        holes[6].clearNum();
        holes[6].update();
        holes[15].sumNum(sum);
    }
    holes[idx].update();    // update lubang PLAYER
    holes[15].update();     // update bank PLAYER

    hand.clearNum();    // Biji sudah habis
    hand.enemyColor();  // Ganti warna
    hand.update();      // update tangan

    // Add log
    addLog('P1 selesai, NEMBAK +' + sum);

    // GANTI GILIRAN
    // Flag lawan player atau bot
    if (pvpflag == 1) {
        // Tombol controller PLAYER 2 enable
        for (i = 0; i < button1.length; i++) {
            button1[i].disabled = false;
        }

        // Add log
        addLog('PLAYER 2 TURN');
    } else {
        // BOT

        // Add log
        addLog('BOT TURN');

        setTime =  setTimeout(enemyTurn, 1000);
    }
}

//
// FUNGSI GILIRAN PLAYER
// dipanggil dari menekan tombol kontrol
//
function myTurn(idx) {
    var n = holes[idx].num; // Jumlah biji di lubang terpilih

    // Jumlah biji di wilayah PLAYER, tidak termasuk bank
    var sum = 0;
    for (i = 8; i <= 14; i++) {
        sum += holes[i].num;
    }

    // Cek jika jumlah biji di wilayah PLAYER sudah = 0 atau habis
    // Jika habis, PERMAINAN SELESAI
    if (sum == 0) {
        endCondition(); // Memanggil Fungsi EndCondition()
    }
    // Cek jika biji dalam lumbung lebih dari setengah dari total biji
    else if (holes[7].num > bijiAwal * 7 || holes[15].num > bijiAwal * 7) {
        endCondition();
    }
    // Jika lubang tidak kosong
    else if (n != 0) {
        // Change notif
        addLog('P1 mulai!');
        addLog('P1 AMBIL= ' + n + ', di= ' + idx);

        // Mengubah warna tangan menjadi warna PLAYER
        hand.myColor();
        hand.update();

        // Disable tombol controller
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
            button1[i].disabled = true;
        }

        // Mengisi tangan dengan jumlah biji yang diambil
        hand.clearNum();
        hand.sumNum(n);
        hand.update();

        // Karena biji sudah diambil,
        // lubang menjadi kosong
        holes[idx].clearNum();
        holes[idx].update();

        // Untuk iterasi sejumlah n
        i = 1;

        // Mulai langkah meletakan biji ke lubang selanjutnya
        updateMyNum(idx, i, n, timeStep);
    }
}

// Langkah setelah mengambil biji
function updateMyNum(idx, i, n, timer) {
    // Set Timeout setiap 1 detik
    // setiap detik menjalankan fungsi dibawah
    setTime = setTimeout(function () {
        newIdx = idx + i;           // index baru = index + iterasi

        // Cek jika melewati idx 15 atau bank PLAYER
        // index baru dikurangi panjang list
        // sehingga mulai dari 0,1,...
        while (newIdx > 15) {
            newIdx -= 16;
        }

        // Cek jika melewati bank MUSUH
        // iterasi ditambah, n ditambah,
        // sehingga langsung melewati bank tanpa meletakan biji
        if (newIdx == 7) {
            newIdx++;
            i++;
            n++;

            // Change notif
            addLog('P1 lewat lumbung lawan!');
        }
        // Add log
        addLog('P1 hand= ' + hand.num + ', idx= ' + newIdx);

        // Merubah Warna Lubang yang aktif
        // Jika di wilayah MUSUH menggunakan merah terang
        // di wilayah PLAYER menggunakan biru terang
        // Setelah itu merubah lubang sebelumnya menjadi warna normal
        if (newIdx > 7) {
            if (newIdx != 8) {
                holes[newIdx - 1].myColor();
                holes[newIdx - 1].update();
            } else {
                holes[newIdx - 2].enemyColor();
                holes[newIdx - 2].update();
            }
            holes[newIdx].myActiveColor();
            holes[newIdx].update();
        } else {
            if (newIdx != 0) {
                holes[newIdx - 1].enemyColor();
                holes[newIdx - 1].update();
            } else {
                holes[15].myColor();
                holes[15].update();
            }
            holes[newIdx].enemyActiveColor();
            holes[newIdx].update();
        }

        // Meletakan biji ke lubang yang dilalui
        holes[newIdx].addNum(); // Menambah 1 biji
        holes[newIdx].update(); // update lubang

        // Stop sound lalu menyalakan lagi
        dropsound.pause();
        dropsound.currentTime = 0;
        dropsound.play();

        i++;    // Menambah iterasi setelah meletakan biji

        // Jika iterasi belum lebih dari n
        // Jika biji di tangan lebih dari 1
        if (i <= n || hand.num > 1) {
            hand.minNum();  // karena meletakan biji, biji berkurang dari tangan
            hand.update();  // update isi tangan

            // Lanjut ke lubang berikutnya
            updateMyNum(idx, i, n, timeStep);
        }

        // Jika biji di tangan tinggal 1
        else {
            // Jika biji terakhir diletakan di bank PLAYER
            // maka dapat mengambil biji lagi
            if (newIdx == 15) {
                holes[newIdx].myColor();
                holes[newIdx].update();

                // Add log
                addLog('P1 stop di LUMBUNG');
                addLog('P1 AMBIL LAGI!');

                // Enable tombol kontrol
                for (i = 0; i < button.length; i++) {
                    button[i].disabled = false;
                }
            } else {
                // Jika biji terakhir diletakan di lubang kecil dengan jumlah biji lebih dari 1
                if (holes[newIdx].num > 1) {
                    n = holes[newIdx].num;      // n menjadi biji pada lubang kecil yang baru
                    i = 1;                      // iterasi kembali menjadi 1
                    holes[newIdx].clearNum();   // mengosongkan lubang
                    holes[newIdx].update();     // update lubang
                    hand.clearNum();            // mengosongkan tangan
                    hand.sumNum(n);             // mengambil biji pada lubang yang baru, sehingga masuk ke tangan
                    hand.update();              // update isi tangan

                    // Melanjutkan langkah dengan mengambil isi dari lubang yang baru
                    updateMyNum(newIdx, i, n, timeStep);

                    // Add log
                    addLog('P1 LAGI= ' + n + ', di= ' + newIdx);
                }
                // Jika biji terakhir diletakan di lubang kecil yang kosong
                else {
                    // Jika yang kosong di daerah PLAYER
                    // Maka ambil semua biji dari lubang yg berseberangan,
                    // lalu GANTI GILIRAN
                    if (newIdx > 7) {
                        holes[newIdx].myColor();
                        holes[newIdx].update();
                        changeMyTurn(newIdx);
                    }
                    // daerah MUSUH
                    // Auto GANTI GILIRAN
                    else {
                        holes[newIdx].enemyColor();
                        holes[newIdx].update();

                        hand.clearNum();    // Biji sudah habis
                        hand.enemyColor();  // Ganti warna
                        hand.update();      // update tangan

                        // Add log
                        addLog('P1 selesai, di= ' + newIdx);

                        // GANTI GILIRAN
                        // Flag lawan player atau bot
                        if (pvpflag == 1) {
                            // Add log
                            addLog('PLAYER 2 TURN');

                            // Tombol controller PLAYER 2 enable
                            for (i = 0; i < button1.length; i++) {
                                button1[i].disabled = false;
                            }
                        } else {
                            // BOT

                            // Add log
                            addLog('BOT TURN');

                            setTimeout(enemyTurn, 1000);
                        }
                    }
                }
            }
        }
    }, timer); // Waktu per langkah
}
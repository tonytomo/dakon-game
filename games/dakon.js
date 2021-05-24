var canvas;
var ctx;
var i;          // untuk iterasi
var myVar;
var arrLength;
var newIdx;
var hand;       // Biji yang ada di tangan

var timeStep = 1000;    // Waktu yg dibutuhkan setiap langkah
var time0 = 0;          // Waktu untuk melewati bank lawan
var setTime;            // Timeout kontroler

// Suara meletakan biji
var dropsound = new Audio('assets/3224__edwin-p-manchester__04.wav');

// Selector tombol controller
const button = document.querySelectorAll(".btn");

// List lubang
// holes[7] menjadi bank MUSUH dan holes[15] menjadi bank PLAYER
var holes = [];

//
// FUNGSI YANG PERTAMA DIJALANKAN
//
function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');

    gameBegin();
}
// Game mulai
function gameBegin() {
    // Ukuran dan peletakan
    var rads = 20;
    var radb = 30;
    var xh = 100;
    var yh = 50;

    // Tambah komponen tangan di pojok kiri atas
    hand = new Hole(rads*2, "#414141", 25*2, 25*2, 0);
    hand.update(); // Fungsi untuk menampilkan komponen

    // Tambah komponen lubang kecil dan besar
    for (i = 0; i < 16; i++) {
        if (i < 8) {
            if (i != 7) {
                // Lubang kecil MUSUH idx 0-6
                holes.push(new Hole(rads*2, "#611414", xh*2, yh*2, 7));
                holes[i].update();
                xh += 50;
            } else {
                // idx 7 menjadi bank MUSUH
                yh = 100;
                holes.push(new Hole(radb*2, "#611414", xh*2, yh*2, 0));
                holes[i].update();
                xh = 400;
                yh = 150;
            }
        } else {
            if (i != 15) {
                // Lubang kecil PLAYER idx 8-14
                holes.push(new Hole(rads*2, "#021f55", xh*2, yh*2, 7));
                holes[i].update();
                xh -= 50;
            } else {
                // idx 15 menjadi bank PLAYER
                xh = 50;
                yh = 100;
                holes.push(new Hole(radb*2, "#021f55", xh*2, yh*2, 0));
                holes[i].update();
            }
        }
    }
}

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
    
    // GANTI GILIRAN
    enemyTurn();
}
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
    
    // Tombol controller enable, GILIRAN PLAYER
    for (i = 0; i < button.length; i++) {
        button[i].disabled = false;
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
    // Jika lubang tidak kosong
    else if (n != 0) {

        // Mengubah warna tangan menjadi warna PLAYER
        hand.myColor();
        hand.update();

        // Disable tombol controller
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
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
        arrLength = holes.length;   // Panjang list = 15
        newIdx = idx + i;           // index baru = index + iterasi

        // Cek jika melewati idx 15 atau bank PLAYER
        // index baru dikurangi panjang list
        // sehingga mulai dari 0,1,...
        if (newIdx >= arrLength) {
            newIdx = newIdx - arrLength;
        }

        // Cek jika melewati bank MUSUH
        // iterasi ditambah, n ditambah,
        // sehingga langsung melewati bank tanpa meletakan biji
        if (newIdx == 7) {
            i++;
            // waktu diubah menjadi 0ms
            updateMyNum(idx, i, n + 1, time0);
        } else {
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
            dropsound.play();       // menyalakan sound meletakan

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
                            enemyTurn();
                        }
                    }
                }
            }
        }
    }, timer); // Waktu per langkah
}

// GILIRAN MUSUH
// nantinya akan ditambah fitur Kecerdasan Buatan
// Untuk sekarang masih menggunakan acak
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
        var end = new Hole(60*2, "#414141", 250*2, 100*2, "TIE");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }
    else if (holes[15].num > holes[7].num) {
        // WIN condition
        // PLAYER MENANG
        var end = new Hole(60*2, "#021f55", 250*2, 100*2, "YOU WIN");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    } else {
        // LOSE condition
        // PLAYER KALAH
        var end = new Hole(60*2, "#611414", 250*2, 100*2, "YOU LOSE");
        end.showEnd();

        // Disable tombol kontrol
        for (i = 0; i < button.length; i++) {
            button[i].disabled = true;
        }
    }
}

// Komponen Hole atau lubang
function Hole(rad, color, x, y, num) {
    this.rad = rad;
    this.color = color;
    this.x = x;
    this.y = y;
    this.num = num;
    this.oldnum = this.num;

    // Fungsi menambah isi sejumlah 1
    this.addNum = function () {
        this.num += 1;
    }
    // Fungsi mengurangi isi sejumlah 1
    this.minNum = function () {
        this.num -= 1;
    }
    // Fungsi mengosongkan isi
    this.clearNum = function () {
        this.num = 0;
    }
    // Fungsi menambah isi sejumlah n
    this.sumNum = function (n) {
        this.num += n;
    }

    // Update bentuk dan jumlah isi
    this.update = function () {
        // Membuat bentuk lingkaran
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Membuat tulisan didalam lingkaran
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        if (this.num < 10) {
            ctx.fillText(this.num, this.x - 10, this.y + 14);
        } else {
            ctx.fillText(this.num, this.x - 24, this.y + 14);
        }
    }
    // Fungsi menampilkan kondisi akhir
    this.showEnd = function () {
        // Membuat bentuk lingkaran
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Membuat tulisan didalam lingkaran
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        if (this.num == "TIE") {
            ctx.fillText(this.num, this.x - 30, this.y + 14);
        }
        else if (this.num == "YOU WIN") {
            ctx.fillText(this.num, this.x - 90, this.y + 14);
        }
        else if (this.num == "YOU LOSE") {
            ctx.fillText(this.num, this.x - 104, this.y + 14);
        }
    }

    // Fungsi mengubah warna lubang wilayah PLAYER menjadi normal
    this.myColor = function () {
        this.color = "#021f55";
    }
    // Fungsi mengubah warna lubang wilayah MUSUH menjadi normal
    this.enemyColor = function () {
        this.color = "#611414";
    }
    // Fungsi mengubah warna lubang wilayah PLAYER menjadi Aktif
    this.myActiveColor = function () {
        this.color = "#1e4388";
    }
    // Fungsi mengubah warna lubang wilayah MUSUH menjadi Aktif
    this.enemyActiveColor = function () {
        this.color = "#921f1f";
    }
}

// Fungsi STOP langkah
// tidak bisa berjalan kembali
// Pilihan selanjutnya hanya RESTART
function stop() {
    clearTimeout(setTime);
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

// Fungsi mulai langkah untuk PLAYER
function tap(idx) {
    // Memanggil fungsi giliran PLAYER
    myTurn(idx);
}
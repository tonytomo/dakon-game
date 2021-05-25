var canvas;
var ctx;
var i;          // untuk iterasi
var myVar;
var arrLength;
var newIdx;
var hand;       // Biji yang ada di tangan

var pvpflag = 0; // Flag untuk Player vs player

var bijiAwal = 5; // Biji awal di setiap lubang

var timeStep = 600;    // Waktu yg dibutuhkan setiap langkah
var time0 = 0;          // Waktu untuk melewati bank lawan
var setTime;            // Timeout kontroler

// Suara meletakan biji
var dropsound = new Audio('assets/3224__edwin-p-manchester__04.wav');

// Selector tombol controller
const button = document.querySelectorAll(".btn");
const button1 = document.querySelectorAll(".btn1");

// List lubang
// holes[7] menjadi bank MUSUH dan holes[15] menjadi bank PLAYER
var holes = [];

//
// FUNGSI YANG PERTAMA DIJALANKAN
//
function init() {
    // Menggunakan canvas yang sudah dibuat pada file html
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');  // Membuat context/elemen yang akan ditampilkan dalam canvas

    // Game dimulai
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
    hand = new Hole(rads * 2, "#414141", 25 * 2, 25 * 2, 0);
    hand.update(); // Fungsi untuk menampilkan komponen

    // Tambah komponen lubang kecil dan besar
    for (i = 0; i < 16; i++) {
        if (i < 8) {
            if (i != 7) { 
                // Lubang kecil MUSUH idx 0-6
                holes.push(new Hole(rads * 2, "#611414", xh * 2, yh * 2, bijiAwal));
                holes[i].update();
                xh += 50;
            } else {
                yh = 100;

                // idx 7 menjadi bank MUSUH
                holes.push(new Hole(radb * 2, "#611414", xh * 2, yh * 2, 0));
                holes[i].update();
                xh = 400;
                yh = 150;
            }
        } else {
            if (i != 15) {
                // Lubang kecil PLAYER idx 8-14
                holes.push(new Hole(rads * 2, "#021f55", xh * 2, yh * 2, bijiAwal));
                holes[i].update();
                xh -= 50;
            } else {
                xh = 50;
                yh = 100;

                // idx 15 menjadi bank PLAYER
                holes.push(new Hole(radb * 2, "#021f55", xh * 2, yh * 2, 0));
                holes[i].update();
            }
        }
    }

    // Tombol controller PLAYER 2 disabled
    for (i = 0; i < button1.length; i++) {
        button1[i].disabled = true;
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
        else if (this.num == "BLUE WIN") {
            ctx.fillText(this.num, this.x - 90, this.y + 14);
        }
        else if (this.num == "RED WIN") {
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
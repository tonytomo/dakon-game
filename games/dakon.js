var canvas;
var ctx;
var i;          // untuk iterasi
var myVar;
var arrLength;
var newIdx;
var hand;       // Biji yang ada di tangan

var pvpflag = 0;    // Flag untuk Player vs player
var mode = 0;       // Mode bot
var logflag = 0;    // Untuk toggle log

const biji = document.getElementById('biji');   // Input biji

var bijiAwal = 7; // Biji awal di setiap lubang

var timeStep = 400;    // Waktu yg dibutuhkan setiap langkah
var time0 = 0;          // Waktu untuk melewati bank lawan
var setTime;            // Timeout kontroler

// Color hex code
var blue = "#021e55";
var blueactive = "#1e4388";
var red = "#611414";
var redactive = "#921f1f";

// Suara meletakan biji
var dropsound = new Audio('assets/3224__edwin-p-manchester__04.wav');

// Selector tombol controller
const button = document.querySelectorAll(".btn");
const button1 = document.querySelectorAll(".btn1");

// Selector stat wrapper
const stat = document.getElementById("stat");
// Selector log
const log = document.getElementById('log');
// Selector log wrapper
const logs = document.getElementById("logs");

// Selector rules
const rule = document.getElementById("rule");

// Selector notif
const notif = document.getElementById("notif");

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
                holes.push(new Hole(rads * 2, red, xh * 2, yh * 2, bijiAwal));
                holes[i].update();
                xh += 50;
            } else {
                yh = 100;

                // idx 7 menjadi bank MUSUH
                holes.push(new Hole(radb * 2, red, xh * 2, yh * 2, 0));
                holes[i].update();
                xh = 400;
                yh = 150;
            }
        } else {
            if (i != 15) {
                // Lubang kecil PLAYER idx 8-14
                holes.push(new Hole(rads * 2, blue, xh * 2, yh * 2, bijiAwal));
                holes[i].update();
                xh -= 50;
            } else {
                xh = 50;
                yh = 100;

                // idx 15 menjadi bank PLAYER
                holes.push(new Hole(radb * 2, blue, xh * 2, yh * 2, 0));
                holes[i].update();
            }
        }
    }

    // Tombol controller PLAYER 2 disabled
    for (i = 0; i < button1.length; i++) {
        button1[i].disabled = true;
    }
}
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
        this.color = blue;
    }
    // Fungsi mengubah warna lubang wilayah MUSUH menjadi normal
    this.enemyColor = function () {
        this.color = red;
    }
    // Fungsi mengubah warna lubang wilayah PLAYER menjadi Aktif
    this.myActiveColor = function () {
        this.color = blueactive;
    }
    // Fungsi mengubah warna lubang wilayah MUSUH menjadi Aktif
    this.enemyActiveColor = function () {
        this.color = redactive;
    }
}
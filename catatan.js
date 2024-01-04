const chalk = require('chalk');
const fs = require('fs');

const ambilCatatan = function () {
    const catatan = muatCatatan();
    if (catatan.length === 0) {
        return 'Tidak ada catatan yang tersedia.';
    } else {
        let catatanText = 'Daftar Catatan:\n';
        catatan.forEach((cat, index) => {
            catatanText += `${index + 1}. ${cat.judul}\n`;
        });
        return catatanText;
    }
}


const tambahCatatan = function (judul, isi) {
    const catatan = muatCatatan();
    const catatanGanda = catatan.find(function (note) {
        return note.judul === judul;
    });

    if (!catatanGanda) {
        catatan.push({
            judul: judul,
            isi: isi
        })
        simpanCatatan(catatan);
        console.log('Catatan baru ditambahkan!');
    } else {
        console.log('Judul catatan telah dipakai');
    }
}

const hapusCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul;
    });
    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!'))
        simpanCatatan(catatanUntukDisimpan);
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'))
    }
}

const simpanCatatan = function (catatan) {
    const dataJSON = JSON.stringify(catatan)
    fs.writeFileSync('catatan.json', dataJSON)
}

const muatCatatan = function () {
    try {
        const dataBuffer = fs.readFileSync('catatan.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const bacaSemuaCatatan = function () {
    const catatan = muatCatatan();
    if (catatan.length === 0) {
        console.log(chalk.yellow('Tidak ada catatan yang tersedia.'));
    } else {
        console.log(chalk.blue('Daftar Catatan:'));
        catatan.forEach((cat, index) => {
            console.log(`${index + 1}. ${cat.judul}`);
        });
    }
}

const bacaCatatan = function (judul) {
    const catatan = muatCatatan();
    const catatanDitemukan = catatan.find((note) => note.judul === judul);

    if (catatanDitemukan) {
        console.log(chalk.green.inverse(catatanDitemukan.judul));
        console.log(catatanDitemukan.isi);
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'));
    }
}

module.exports = {
    ambilCatatan: ambilCatatan,
    tambahCatatan: tambahCatatan,
    hapusCatatan: hapusCatatan,
    bacaSemuaCatatan: bacaSemuaCatatan,
    bacaCatatan: bacaCatatan
}

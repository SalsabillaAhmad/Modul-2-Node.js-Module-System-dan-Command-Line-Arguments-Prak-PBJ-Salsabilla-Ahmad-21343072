const chalk = require('chalk');
const validator = require('validator');
const fs = require('fs');
const yargs = require('yargs');
const catatan = require('./catatan.js');

fs.writeFileSync('catatan.txt', 'Nama Saya Salsabilla Ahmad');
fs.appendFileSync('catatan.txt', 'Saya tinggal di Bukittinggi')
// Fungsi untuk menambahkan catatan (Anda harus mengimplementasinya di catatan.js)



const ambilCatatan = require('./catatan.js')
catatan.bacaSemuaCatatan();

const command = process.argv[2]
console.log(process.argv)

if (command === 'tambah') {
    console.log('Tambah Catatan');
} else if (command === 'hapus') {
    console.log('Hapus Catatan');
}

yargs.version('17.7.2');

yargs.command({
    command: 'tambah',
    describe: 'tambah sebuah catatan baru',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        // Panggil fungsi tambahCatatan dari modul catatan.js
        catatan.tambahCatatan(argv.judul, argv.isi);
        console.log('Catatan baru ditambahkan!');
        catatan.bacaSemuaCatatan();
        console.log('Judul: ' + argv.judul);
        console.log('Isi: ' + argv.isi);
    }
});

yargs.parse();

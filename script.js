// --- 1. SELEKTOR ELEMEN HALAMAN ---
const mainMenu = document.getElementById('main-menu');
const sectionLemot = document.getElementById('scenario-lemot');
const sectionLos = document.getElementById('scenario-los');
const halamanPosisi = document.getElementById('halaman-posisi');
const halamanDns = document.getElementById('halaman-dns');

// --- 2. SELEKTOR TOMBOL UTAMA ---
const btnLemot = document.getElementById('btn-lemot');
const btnLos = document.getElementById('btn-los');
const btnHack1 = document.getElementById('btn-hack1');
const btnHack2 = document.getElementById('btn-hack2');

// --- 3. SELEKTOR TOMBOL BACK (KEMBALI) SPESIFIK ---
const backToMenu1 = document.getElementById('back-to-menu1');
const backToMenu2 = document.getElementById('back-to-menu2');
const backToLemot1 = document.getElementById('back-to-lemot1');
const backToLemot2 = document.getElementById('back-to-lemot2');

// --- 4. SELEKTOR FITUR TOGGLE ROUTER ---
const tabHuawei = document.getElementById('tab-huawei');
const tabZte = document.getElementById('tab-zte');
const browserBar = document.getElementById('browser-bar');

// ==========================================
// ALUR INTERAKTIVITAS (BRANCHING NAVIGASI)
// ==========================================

// Menu Utama -> Halaman Lemot
btnLemot.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    sectionLemot.classList.remove('hidden');
});

// Menu Utama -> Halaman Peringatan LOS Merah
btnLos.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    sectionLos.classList.remove('hidden');
});

// Halaman Lemot -> Masuk ke Hack 1 (Posisi Router)
btnHack1.addEventListener('click', () => {
    sectionLemot.classList.add('hidden');
    halamanPosisi.classList.remove('hidden');
});

// Halaman Lemot -> Masuk ke Hack 2 (Ubah DNS)
btnHack2.addEventListener('click', () => {
    sectionLemot.classList.add('hidden');
    halamanDns.classList.remove('hidden');
});

// ==========================================
// LOGIKA TOMBOL KEMBALI (BACK) NATIVE FEEL
// ==========================================

// Dari Halaman Lemot balik ke Menu Utama
backToMenu1.addEventListener('click', () => {
    sectionLemot.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Dari Halaman LOS balik ke Menu Utama
backToMenu2.addEventListener('click', () => {
    sectionLos.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});

// Dari Hack 1 balik ke Diagnosa Lemot
backToLemot1.addEventListener('click', () => {
    halamanPosisi.classList.add('hidden');
    sectionLemot.classList.remove('hidden');
});

// Dari Hack 2 balik ke Diagnosa Lemot
backToLemot2.addEventListener('click', () => {
    halamanDns.classList.add('hidden');
    sectionLemot.classList.remove('hidden');
});

// ==========================================
// LOGIKA TOGGLE LOCALHOST (BATASAN MASALAH)
// ==========================================

// Klik Tab Huawei -> Ubah IP ke Gateway Huawei
tabHuawei.addEventListener('click', () => {
    tabHuawei.classList.add('active');
    tabZte.classList.remove('active');
    browserBar.innerText = '🌐 192.168.100.1'; 
});

// Klik Tab ZTE -> Ubah IP ke Gateway ZTE
tabZte.addEventListener('click', () => {
    tabZte.classList.add('active');
    tabHuawei.classList.remove('active');
    browserBar.innerText = '🌐 192.168.1.1'; 
});
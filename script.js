// --- ELEMEN HALAMAN ---
const mainMenu = document.getElementById('main-menu');
const sectionLemot = document.getElementById('scenario-lemot');
const sectionLos = document.getElementById('scenario-los');
const halamanPosisi = document.getElementById('halaman-posisi');
const halamanLoginRouter = document.getElementById('halaman-login-router');
const halamanDns = document.getElementById('halaman-dns');

// --- TOMBOL NAVIGASI UTAMA ---
const btnLemot = document.getElementById('btn-lemot');
const btnLos = document.getElementById('btn-los');
const btnHack1 = document.getElementById('btn-hack1');
const btnHack2 = document.getElementById('btn-hack2');

// --- TOMBOL BACK (KEMBALI) ---
document.getElementById('back-to-menu1').addEventListener('click', () => resetToHome());
document.getElementById('back-to-menu2').addEventListener('click', () => resetToHome());
document.getElementById('back-to-lemot1').addEventListener('click', () => changePage(halamanPosisi, sectionLemot));
document.getElementById('back-to-lemot3').addEventListener('click', () => changePage(halamanLoginRouter, sectionLemot));
document.getElementById('back-to-login').addEventListener('click', () => changePage(halamanDns, halamanLoginRouter));

// Fungsi Transisi Halaman
function changePage(from, to) {
    from.classList.add('hidden');
    to.classList.remove('hidden');
}

// Fungsi Reset Semua ke Menu Utama
function resetToHome() {
    sectionLemot.classList.add('hidden');
    sectionLos.classList.add('hidden');
    halamanPosisi.classList.add('hidden');
    halamanLoginRouter.classList.add('hidden');
    halamanDns.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

// Alur Klik Menu Utama & Trik
btnLemot.addEventListener('click', () => changePage(mainMenu, sectionLemot));
btnLos.addEventListener('click', () => changePage(mainMenu, sectionLos));
btnHack1.addEventListener('click', () => changePage(sectionLemot, halamanPosisi));
btnHack2.addEventListener('click', () => changePage(sectionLemot, halamanLoginRouter));


// ==========================================
// FITUR 1: SIMULATOR SPEEDTEST (SUDAH DINAMIS & BERTINGKAT)
// ==========================================
const btnRunTest = document.getElementById('btn-run-test');
const speedBar = document.getElementById('speed-bar');
const speedResult = document.getElementById('speed-result');
const testRec = document.getElementById('test-recommendation');

btnRunTest.addEventListener('click', () => {
    btnRunTest.disabled = true;
    btnRunTest.innerText = "Mengecek Sinyal...";
    testRec.classList.add('hidden');
    speedBar.style.width = '0%';
    
    let width = 0;
    speedResult.innerText = "Connecting...";
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // Generate angka acak desimal dari 1.0 sampai 5.0
            const fakeSpeed = parseFloat((Math.random() * 4 + 1).toFixed(1)); 
            
            let status = "";
            let recommendation = "";

            // LOGIKA BERTINGKAT SESUAI HASIL ANGKA
            if (fakeSpeed < 2.0) {
                status = "Sangat Lambat 🛑";
                recommendation = `🔴 <b>Koneksi Kritis (${fakeSpeed} Mbps):</b> Kecepatan drop parah di bawah batas wajar.<br>👉 Langsung eksekusi <b>Trik 2: Ganti Jalur DNS</b> modem kamu!`;
            } else if (fakeSpeed < 4.0) {
                status = "Lambat ⚠️";
                recommendation = `🟡 <b>Koneksi Pas-pasan (${fakeSpeed} Mbps):</b> Sinyal kurang stabil terhalang sesuatu.<br>👉 Coba lakukan <b>Trik 1: Atur Posisi Router</b> untuk hilangkan hambatan fisik.`;
            } else {
                status = "Cukup Oke 🔄";
                recommendation = `🟢 <b>Koneksi Lumayan (${fakeSpeed} Mbps):</b> Speed dapet, tapi respon server agak delay.<br>👉 Disarankan cek <b>Trik 1 & Trik 2</b> biar Wi-Fi kamu makin ngebut maksimal.`;
            }
            
            // Cetak hasil ke layar UI
            speedResult.innerText = `${fakeSpeed} Mbps (${status})`;
            testRec.innerHTML = recommendation;
            testRec.classList.remove('hidden');
            
            btnRunTest.disabled = false;
            btnRunTest.innerText = "Tes Ulang Sinyal";
        } else {
            width += 4;
            speedBar.style.width = width + '%';
        }
    }, 50);
});


// ==========================================
// FITUR 2: INTERACTIVE CHECKLIST SCORE (HACK 1)
// ==========================================
const checkboxes = document.querySelectorAll('.signal-check');
const signalScore = document.getElementById('signal-score');

checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        let currentScore = 0;
        checkboxes.forEach(c => {
            if (c.checked) currentScore += parseInt(c.value);
        });
        
        if (currentScore === 0) {
            signalScore.innerText = "BURUK ❌";
            signalScore.style.color = "#ef4444";
        } else if (currentScore < 100) {
            signalScore.innerText = "CUKUP BAGUS ⚠️";
            signalScore.style.color = "#f59e0b";
        } else {
            signalScore.innerText = "SANGAT SEMPURNA ✅";
            signalScore.style.color = "#10b981";
        }
    });
});


// ==========================================
// FITUR 3: MOCKUP ROUTER LOGIN & TOGGLE GATEWAY (HACK 2)
// ==========================================
const userInp = document.getElementById('router-username');
const passInp = document.getElementById('router-password');
const btnLoginRouter = document.getElementById('btn-login-router');
const btnAutofill = document.getElementById('btn-autofill');

btnAutofill.addEventListener('click', () => {
    userInp.value = "admin";
    passInp.value = "admin";
});

btnLoginRouter.addEventListener('click', () => {
    if (userInp.value.trim() === "admin" && passInp.value.trim() === "admin") {
        changePage(halamanLoginRouter, halamanDns);
        userInp.value = "";
        passInp.value = "";
    } else {
        alert("❌ Salah! Masukan 'admin' untuk username dan password bawaan pabrik.");
    }
});

const tabHuawei = document.getElementById('tab-huawei');
const tabZte = document.getElementById('tab-zte');
const browserBar = document.getElementById('browser-bar');
const loginBrowserBar = document.getElementById('login-browser-bar');

tabHuawei.addEventListener('click', () => {
    tabHuawei.classList.add('active');
    tabZte.classList.remove('active');
    browserBar.innerText = '🌐 Ketik di browser HP: 192.168.100.1';
    loginBrowserBar.innerText = '🌐 192.168.100.1';
});

tabZte.addEventListener('click', () => {
    tabZte.classList.add('active');
    tabHuawei.classList.remove('active');
    browserBar.innerText = '🌐 Ketik di browser HP: 192.168.1.1';
    loginBrowserBar.innerText = '🌐 192.168.1.1';
});
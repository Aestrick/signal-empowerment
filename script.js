// ==========================================
// 1. SELECTOR STATE HALAMAN (SPA MANAGEMENT)
// ==========================================
const mainMenu = document.getElementById('main-menu');
const sectionLemot = document.getElementById('scenario-lemot');
const sectionLos = document.getElementById('scenario-los');
const halamanPosisi = document.getElementById('halaman-posisi');
const halamanLoginRouter = document.getElementById('halaman-login-router');
const halamanDns = document.getElementById('halaman-dns');

// SELECTOR TRIGGER KENDALA
const btnLemot = document.getElementById('btn-lemot');
const btnLos = document.getElementById('btn-los');
const btnHack1 = document.getElementById('btn-hack1');
const btnHack2 = document.getElementById('btn-hack2');

// FUNCTION TRANSISI HALAMAN YANG BENAR & AMAN
function changePage(fromPage, toPage) {
    fromPage.classList.add('hidden');
    toPage.classList.remove('hidden'); // Sembunyikan halaman lama, munculkan halaman baru
}

function resetToDashboard() {
    sectionLemot.classList.add('hidden');
    sectionLos.classList.add('hidden');
    halamanPosisi.classList.add('hidden');
    halamanLoginRouter.classList.add('hidden');
    halamanDns.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

// ROUTING TRIGGER KLIK MENU UTAMA
btnLemot.addEventListener('click', () => changePage(mainMenu, sectionLemot));
btnLos.addEventListener('click', () => changePage(mainMenu, sectionLos));
btnHack1.addEventListener('click', () => changePage(sectionLemot, halamanPosisi));
btnHack2.addEventListener('click', () => changePage(sectionLemot, halamanLoginRouter));

// ATURAN TOMBOL KEMBALI (BACK MANAGEMENT)
document.getElementById('back-to-menu1').addEventListener('click', () => resetToDashboard());
document.getElementById('back-to-menu2').addEventListener('click', () => resetToDashboard());
document.getElementById('back-to-lemot1').addEventListener('click', () => changePage(halamanPosisi, sectionLemot));
document.getElementById('back-to-lemot3').addEventListener('click', () => changePage(halamanLoginRouter, sectionLemot));
document.getElementById('back-to-login').addEventListener('click', () => changePage(halamanDns, halamanLoginRouter));


// ==========================================
// FITUR 1: SIMULATOR DYNAMIC SPEEDTEST (BERTINGKAT)
// ==========================================
const btnRunTest = document.getElementById('btn-run-test');
const speedBar = document.getElementById('speed-bar');
const speedDisplay = document.getElementById('speed-display');
const pingDisplay = document.getElementById('ping-display');
const jitterDisplay = document.getElementById('jitter-display');
const testRecBox = document.getElementById('test-recommendation');

btnRunTest.addEventListener('click', () => {
    btnRunTest.disabled = true;
    btnRunTest.innerText = "Analyzing Packet...";
    testRecBox.classList.add('hidden');
    speedBar.style.width = '0%';
    
    let progress = 0;
    speedDisplay.innerText = "Connecting...";
    pingDisplay.innerText = "Ping: Fetching...";
    jitterDisplay.innerText = "Jitter: Fetching...";
    
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            
            // Mengunci angka simulator lemot (1.0 - 5.0 Mbps) demi keselarasan skenario UCP 2
            const finalSpeed = parseFloat((Math.random() * 4 + 1).toFixed(1));
            const finalPing = Math.floor(Math.random() * 40 + 60); 
            const finalJitter = Math.floor(Math.random() * 15 + 10);
            
            pingDisplay.innerText = `Ping: ${finalPing} ms`;
            jitterDisplay.innerText = `Jitter: ${finalJitter} ms`;
            
            let statusText = "";
            let adviceContent = "";

            if (finalSpeed < 2.0) {
                statusText = "CRITICAL / LEMOT PARAH 🛑";
                adviceContent = `❌ <b>Koneksi Drop Maksimal (${finalSpeed} Mbps):</b> Kecepatan internet di bawah standar operasional.<br>👉 Tindakan: Silakan masuk ke opsi <b>Trik 2: Ganti Jalur DNS</b> sistem modem!`;
            } else if (finalSpeed < 4.0) {
                statusText = "SLOW / LAMBAT ⚠️";
                adviceContent = `🟡 <b>Koneksi Terhambat (${finalSpeed} Mbps):</b> Sinyal penuh tapi bandwidth bocor.<br>👉 Tindakan: Rekomendasi eksekusi <b>Trik 1: Atur Posisi Router</b> sekarang juga.`;
            } else {
                statusText = "FAIR / CUKUP OK 🔄";
                adviceContent = `🟢 <b>Koneksi Lumayan (${finalSpeed} Mbps):</b> Speed memadai, namun respon DNS lambat.<br>👉 Tindakan: Sangat disarankan mengoptimalkan server DNS lewat <b>Trik 2</b> agar lancar.`;
            }
            
            speedDisplay.innerText = `${finalSpeed} Mbps`;
            testRecBox.innerHTML = `<b>Status:</b> ${statusText}<br>${adviceContent}`;
            testRecBox.classList.remove('hidden');
            
            btnRunTest.disabled = false;
            btnRunTest.innerText = "Uji Ulang Jaringan";
        } else {
            progress += 5;
            speedBar.style.width = progress + '%';
        }
    }, 60);
});


// ==========================================
// FITUR 2: INTERACTIVE LIVE RADAR SCORE BAR (HACK 1)
// ==========================================
const checkboxes = document.querySelectorAll('.signal-check-input');
const signalScore = document.getElementById('signal-score');
const scoreFill = document.getElementById('score-fill');

checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        let totalScore = 0;
        checkboxes.forEach(chk => {
            if (chk.checked) totalScore += parseInt(chk.value);
        });
        
        scoreFill.style.width = totalScore + '%';
        
        if (totalScore === 0) {
            signalScore.innerText = "POOR / BURUK ❌";
            signalScore.className = "score-bad";
            scoreFill.style.backgroundColor = "#ef4444"; 
        } else if (totalScore < 100) {
            signalScore.innerText = "MEDIUM / CUKUP ⚠️";
            signalScore.className = "score-medium";
            scoreFill.style.backgroundColor = "#f59e0b"; 
        } else {
            signalScore.innerText = "EXCELLENT / SEMPURNA ✅";
            signalScore.className = "score-good";
            scoreFill.style.backgroundColor = "#10b981"; 
        }
    });
});


// ==========================================
// FITUR 3 & 4: ROUTER INTERFACES, AUTOMATION FILL, & TOGGLE IP
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
        alert("❌ Otoritas Gagal! Gunakan kata sandi default pabrik 'admin' dan 'admin'.");
    }
});

const tabHuawei = document.getElementById('tab-huawei');
const tabZte = document.getElementById('tab-zte');
const browserBar = document.getElementById('browser-bar');
const loginBrowserBar = document.getElementById('login-browser-bar');

tabHuawei.addEventListener('click', () => {
    tabHuawei.classList.add('active');
    tabZte.classList.remove('active');
    browserBar.innerText = '🌐 URL: 192.168.100.1'; 
    loginBrowserBar.innerText = '🌐 IP Gateway: 192.168.100.1';
});

tabZte.addEventListener('click', () => {
    tabZte.classList.add('active');
    tabHuawei.classList.remove('active');
    browserBar.innerText = '🌐 URL: 192.168.1.1'; 
    loginBrowserBar.innerText = '🌐 IP Gateway: 192.168.1.1';
});
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

// FUNCTION TRANSISI HALAMAN YANG AMAN
function changePage(fromPage, toPage) {
    fromPage.classList.add('hidden');
    toPage.classList.remove('hidden');
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
// 2. SIMULATOR DYNAMIC SPEEDTEST WITH SAKELAR SIMULATION
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
            
            // Mengambil status sakelar simulasi putus total
            const cheatDisconnect = document.getElementById('cheat-toggle-disconnect');
            
            let finalSpeed, finalPing, finalJitter, statusText, adviceContent;

            // SCENARIO JIKA SAKELAR AKTIF (ON) -> FORCED TO DROP TO 0.0 MBPS
            if (cheatDisconnect && cheatDisconnect.checked) {
                finalSpeed = 0.0;
                finalPing = "ERR";
                finalJitter = "ERR";
                statusText = "DISCONNECTED / PUTUS TOTAL 🚨";
                adviceContent = `❌ <b>Koneksi Drop Maksimal (${finalSpeed} Mbps):</b> Sinyal Wi-Fi terhubung ke perangkat, namun tidak ada jaringan internet dari pusat.<br>👉 Tindakan: Indikasi kuat kerusakan fisik kabel / massal. Segera periksa menu utama <b>Mati Total (LOS Merah)</b>!`;
            } else {
                // JALUR NORMAL JIKA SAKELAR MATI (OFF) -> SCENARIO UCP 2 WI-FI LEMOT
                finalSpeed = parseFloat((Math.random() * 4 + 1).toFixed(1));
                finalPing = Math.floor(Math.random() * 40 + 60) + " ms";
                finalJitter = Math.floor(Math.random() * 15 + 10) + " ms";
                
                if (finalSpeed < 2.0) {
                    statusText = "CRITICAL / LEMOT PARAH 🛑";
                    adviceContent = `❌ <b>Koneksi Drop Maksimal (${finalSpeed} Mbps):</b> Kecepatan internet di bawah standar operasional.<br>👉 Tindakan: Silakan ganti server DNS modem lewat opsi <b>Trik 2: Ganti Jalur DNS</b>!`;
                } else {
                    statusText = "SLOW / LAMBAT ⚠️";
                    adviceContent = `🟡 <b>Koneksi Terhambat (${finalSpeed} Mbps):</b> Sinyal penuh tapi bandwidth bocor.<br>👉 Tindakan: Rekomendasi eksekusi <b>Trik 1: Atur Posisi Router</b> sekarang juga.`;
                }
            }
            
            // Render data hasil ke UI Layar
            pingDisplay.innerText = `Ping: ${finalPing}`;
            jitterDisplay.innerText = `Jitter: ${finalJitter}`;
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
// 3. INTERACTIVE CHECKLIST SCORE CALCULATOR (HACK 1)
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
            scoreFill.style.backgroundColor = "#ef4444"; 
        } else if (totalScore < 100) {
            signalScore.innerText = "MEDIUM / CUKUP ⚠️";
            scoreFill.style.backgroundColor = "#f59e0b"; 
        } else {
            signalScore.innerText = "EXCELLENT / SEMPURNA ✅";
            scoreFill.style.backgroundColor = "#10b981"; 
        }
    });
});


// ==========================================
// 4. ROUTER INTERFACES, AUTOMATION FILL, & TOGGLE GATEWAY IP
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


// ==========================================
// 5. POPUP MODAL TUTORIAL REAL PICTURE COMPARISON
// ==========================================
const tutorialModal = document.getElementById('tutorial-modal');
const btnOpenTutorial = document.getElementById('btn-open-tutorial');
const btnCloseTutorial = document.getElementById('btn-close-tutorial');
const modalRouterTitle = document.getElementById('modal-router-title');
const modalRouterImg = document.getElementById('modal-router-img');

btnOpenTutorial.addEventListener('click', () => {
    if (tabHuawei.classList.contains('active')) {
        modalRouterTitle.innerText = "Tampilan Asli Router Huawei";
        modalRouterImg.src = "assets/huawei-real.PNG";
    } else {
        modalRouterTitle.innerText = "Tampilan Asli Router ZTE";
        modalRouterImg.src = "assets/zte-real.jpg";
    }
    tutorialModal.classList.remove('hidden');
});

btnCloseTutorial.addEventListener('click', () => {
    tutorialModal.classList.add('hidden');
});
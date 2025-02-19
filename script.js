// Sayfa yüklendikten sonra 3 saniye bekleyip ana içeriği göster
setTimeout(() => {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
}, 3000);

// Kullanıcı ismini girdikten sonra sohbeti başlatacak
document.getElementById('start-btn').addEventListener('click', startChat);

function startChat() {
    const username = document.getElementById('username').value;

    if (username.trim() !== '') {
        localStorage.setItem('username', username); // Kullanıcı ismini localStorage'a kaydediyoruz
        // Giriş ekranını gizleyip kanalları ve sidebar'ı gösteriyoruz
        document.getElementById('name-input').style.display = 'none';
        loadChannels();  // Kanalları yükle
    } else {
        alert("Lütfen isminizi girin.");
    }
}

// Kanalları yükle
function loadChannels() {
    const username = localStorage.getItem('username');
    
    document.getElementById('sidebar').style.display = 'block';  // Sidebar'ı göster
    showChannel('main-menu'); // İlk olarak Ana Menü kanalını göster
}

// Kanal içeriklerini gösterecek fonksiyon
function showChannel(channel) {
    // İlk önce tüm kanalları gizle
    const channels = document.querySelectorAll('.channel');
    channels.forEach(ch => ch.style.display = 'none');
    
    // Seçilen kanalı göster
    const activeChannel = document.getElementById(channel);
    if (activeChannel) {
        activeChannel.style.display = 'block';
    }

    // Kanal içeriğini güncelle
    const content = document.getElementById('channel-content');
    content.innerHTML = `
        <div class="channel" id="main-menu">
            <h2>Programmer By: BLODWHITE</h2>
            <p>Hoş geldin, ${localStorage.getItem('username')}</p>
        </div>
        <div class="channel" id="chat-channel">
            <h2>Chat Kanalı</h2>
            <div class="chat-box">
                <div id="chat"></div>
                <input type="text" placeholder="Mesaj yazın..." id="message-input">
                <button onclick="sendMessage()">Gönder</button>
            </div>
        </div>
        <div class="channel" id="anonymous-channel">
            <h2>Anonim Kanal</h2>
            <p>Burada anonim olarak sohbet edebilirsiniz. İsminiz görünmeyecek.</p>
        </div>
    `;
}

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const chatBox = document.getElementById('chat');
        const username = localStorage.getItem('username');
        chatBox.innerHTML += <p><strong>${username}:</strong> ${message}</p>;
        messageInput.value = ''; // Mesaj kutusunu temizle
    }
}
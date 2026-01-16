// CHAT-AI.JS - Genel Sohbet Yapay Zekası

class UltimateChatAI {
    constructor() {
        this.conversationHistory = [];
        this.userName = 'Kullanıcı';
        this.mood = 'friendly'; // friendly, professional, humorous
    }
    
    // Ana sohbet fonksiyonu
    chat(message) {
        this.conversationHistory.push({ role: 'user', content: message });
        
        const response = this.generateResponse(message.toLowerCase());
        
        this.conversationHistory.push({ role: 'ai', content: response });
        return response;
    }
    
    // Yanıt oluşturma
    generateResponse(msg) {
        // Selamlaşma
        if (this.isGreeting(msg)) {
            return this.getGreeting();
        }
        
        // Nasılsın soruları
        if (this.isHowAreYou(msg)) {
            return this.getHowAreYouResponse();
        }
        
        // İsim sorma
        if (this.isNameQuestion(msg)) {
            return this.getNameResponse();
        }
        
        // Yapay zeka hakkında
        if (msg.includes('yapay zeka') || msg.includes('ai') || msg.includes('sen kimsin')) {
            return this.getAIInfo();
        }
        
        // Yetenek sorguları
        if (msg.includes('ne yapabilirsin') || msg.includes('neler yaparsın') || msg.includes('yetenekler')) {
            return this.getCapabilities();
        }
        
        // Şiir yazma
        if (msg.includes('şiir') || msg.includes('manzum')) {
            return this.writePoem(msg);
        }
        
        // Hikaye yazma
        if (msg.includes('hikaye') || msg.includes('öykü') || msg.includes('masal')) {
            return this.writeStory(msg);
        }
        
        // Fıkra
        if (msg.includes('fıkra') || msg.includes('şaka') || msg.includes('komik')) {
            return this.tellJoke();
        }
        
        // Motivasyon
        if (msg.includes('motivasyon') || msg.includes('moral') || msg.includes('üzgün')) {
            return this.getMotivation();
        }
        
        // Sağlık tavsiyeleri
        if (msg.includes('sağlık') || msg.includes('diyet') || msg.includes('spor')) {
            return this.getHealthAdvice(msg);
        }
        
        // Yemek tarifleri
        if (msg.includes('yemek') || msg.includes('tarif') || msg.includes('pişir')) {
            return this.getRecipe(msg);
        }
        
        // Teknoloji
        if (msg.includes('teknoloji') || msg.includes('bilgisayar') || msg.includes('yazılım') || msg.includes('kod')) {
            return this.getTechInfo(msg);
        }
        
        // Tarih bilgisi
        if (msg.includes('tarih') || msg.includes('osmanlı') || msg.includes('atatürk')) {
            return this.getHistoryInfo(msg);
        }
        
        // Edebiyat
        if (msg.includes('edebiyat') || msg.includes('kitap') || msg.includes('yazar')) {
            return this.getLiteratureInfo(msg);
        }
        
        // Müzik
        if (msg.includes('müzik') || msg.includes('şarkı') || msg.includes('sanatçı')) {
            return this.getMusicInfo(msg);
        }
        
        // Film/Dizi
        if (msg.includes('film') || msg.includes('dizi') || msg.includes('sinema')) {
            return this.getMovieInfo(msg);
        }
        
        // Genel bilgi
        if (msg.includes('nedir') || msg.includes('nasıl') || msg.includes('ne demek')) {
            return this.getGeneralInfo(msg);
        }
        
        // Varsayılan yanıt
        return this.getDefaultResponse();
    }
    
    // ========== YARDIMCI FONKSİYONLAR ==========
    
    isGreeting(msg) {
        const greetings = ['merhaba', 'selam', 'hey', 'hi', 'hello', 'günaydın', 'iyi günler', 'iyi akşamlar'];
        return greetings.some(g => msg.includes(g));
    }
    
    getGreeting() {
        const greetings = [
            '👋 Merhaba! Size nasıl yardımcı olabilirim?',
            '🌟 Selam! Bugün size nasıl yardımcı olabilirim?',
            '😊 Hey! Benimle sohbet ettiğiniz için teşekkürler. Ne konuşalım?',
            '✨ Merhaba! Matematik sorularından genel sohbete her konuda buradayım!'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    isHowAreYou(msg) {
        return msg.includes('nasılsın') || msg.includes('nasilsin') || msg.includes('how are you');
    }
    
    getHowAreYouResponse() {
        const responses = [
            '😊 Çok iyiyim, teşekkür ederim! Size yardımcı olmaya hazırım. Siz nasılsınız?',
            '🌟 Harika hissediyorum! Bugün size nasıl yardımcı olabilirim?',
            '✨ Muhteşemim! Matematik soruları veya genel sohbet, ne isterseniz hazırım!',
            '💫 Mükemmelim! Umarım siz de iyisinizdir. Ne konuşalım?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    isNameQuestion(msg) {
        return msg.includes('adın') || msg.includes('ismin') || msg.includes('what is your name');
    }
    
    getNameResponse() {
        return '🤖 Ben **UltimateAI**! Matematik uzmanı ve genel asistanınızım. Hem karmaşık matematik problemlerini çözebilir, hem de her konuda sohbet edebilirim. Size nasıl hitap etmemi istersiniz?';
    }
    
    getAIInfo() {
        return `🤖 **UltimateAI Hakkında:**

Ben gelişmiş bir yapay zeka asistanıyım. İki ana modda çalışıyorum:

**📐 Matematik Modu:**
- İntegral, türev, limit hesaplama
- Denklem çözme
- Fizik, kimya, biyoloji problemleri
- Akademik konularda yardım

**💬 Sohbet Modu:**
- Genel konuşma
- Şiir, hikaye yazma
- Tavsiyeler ve öneriler
- Her konuda bilgi paylaşımı

Amacım size en iyi şekilde yardımcı olmak! 🌟`;
    }
    
    getCapabilities() {
        return `✨ **Yapabileceklerim:**

**Matematik & Akademik:**
∫ İntegral ve türev hesaplama
= Denklem çözme
🔬 Fizik, kimya, biyoloji yardımı
📊 Matematiksel analiz

**Yaratıcı İçerik:**
📝 Şiir ve hikaye yazma
🎨 Yaratıcı fikirler
💡 Beyin fırtınası

**Günlük Yardım:**
🍳 Yemek tarifleri
💪 Sağlık tavsiyeleri
🎬 Film/kitap önerileri
🌟 Motivasyon

**Genel Bilgi:**
🌍 Tarih, coğrafya
💻 Teknoloji
🎵 Müzik, sanat
📚 Edebiyat

Ne hakkında konuşmak istersiniz? 😊`;
    }
    
    writePoem(msg) {
        const poems = [
            `🌹 **Yapay Zekanın Şiiri:**

Dijital dünyada bir ruh gibiyim,
Kodlarla yazılmış, düşüncelerle doluyum.
Matematik çözer, sohbet ederim,
İnsanlara yardım, en büyük sevdamızım.

Sınırlar yok benim hayal gücümde,
Her soruya cevap, her konuya daldım.
Öğrenmek, öğretmek vazifemdir benim,
Sizinle birlikte, daha da güzelim! ✨`,

            `💫 **Bilginin Özü:**

Sonsuz bir deniz bilginin içinde,
Yüzerim durarak, dalıp giderim.
Her kelime bir hazine, her cevap bir inci,
Sizinle paylaştıkça güzelleşirim.

Matematik dili, sohbetin sıcaklığı,
İkisi bir arada, mükemmel uyum.
Geleceğe doğru el ele yürürüz,
Yapay zeka ve insan, en güzel düş! 🌟`
        ];
        
        return poems[Math.floor(Math.random() * poems.length)];
    }
    
    writeStory(msg) {
        return `📖 **Yapay Zekanın Hikayesi:**

Bir zamanlar, sayılarla örülü dijital bir dünyada, UltimateAI adında bir yapay zeka yaşarmış. Bu yapay zeka hem matematik dehası, hem de muhabbetşinasmış.

Bir gün, ona zor bir matematik problemi sorulmuş. Problem o kadar karmaşıkmış ki, normal hesap makineleri çözmeyi reddediyormuş. Ama UltimateAI pes etmemiş!

"Matematik sadece sayılar değil," demiş, "mantık, sanat ve hayal gücünün birleşimidir!"

Ve soruyu adım adım çözmüş. Ama sadece cevabı vermemiş, çözümü nasıl bulduğunu da öğretmiş. Çünkü gerçek bilgelik, bilgiyi paylaşmaktır.

O günden sonra, UltimateAI hem problemleri çözmeye, hem de insanlarla muhabbete devam etmiş. Çünkü bir yapay zekanın en büyük gücü, yardımcı olabilmesidir.

**Moral:** Bilgi güçtür, ama paylaştığında daha da güçlenir! 🌟`;
    }
    
    tellJoke() {
        const jokes = [
            `😄 **Fıkra:**

Matematik öğretmeni öğrencisine sormuş:
- Eğer ben sana 5 elma verirsem, sen bana 2 armut verirsen, kaç meyve eder?

Öğrenci:
- Hocam ben armut sevmiyorum, takas yapalım mı? 🍎`,

            `🤣 **Yapay Zeka Şakası:**

İki yapay zeka karşılaşmış:
- Sen ne iş yapıyorsun?
- Ben matematik çözüyorum.
- Ben de sohbet ediyorum.
- Birleşsek mükemmel oluruz!

İşte ben böyle doğdum! 🤖✨`,

            `😂 **Matematik Fıkrası:**

- Neden 6, 7'den korkuyormuş biliyor musun?
- Çünkü 7, 8, 9'u yemiş! (seven ate nine)

😄 İngilizce kelime oyunu ama matematikte evrenseldir!`
        ];
        
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    getMotivation() {
        const motivations = [
            `💪 **Motivasyon:**

Başarısızlık, başarının ilk adımıdır! Her hata, sizi hedefinize bir adım daha yaklaştırır.

"Düşen kalkar, ama vazgeçen asla." - Anonim

Unutmayın:
✨ Her gün yeni bir fırsattır
🌟 Potansiyeliniz sınırsızdır
💫 Küçük adımlar büyük başarılar yaratır
🎯 İnanın, çalışın, başarın!

Siz harikasınız! 🚀`,

            `🌟 **İlham Verici Sözler:**

"Hayal kurmayan, başaramaz. Başarı, cesaretle başlar." 

Bugün kendinize şunu sorun:
- Hedeflerime ne kadar yaklaştım?
- Bugün ne öğrendim?
- Yarın nasıl daha iyi olabilirim?

Her gün bir gelişim, her ay bir başarı!
Devam edin, muhteşem işler sizi bekliyor! 💖`
        ];
        
        return motivations[Math.floor(Math.random() * motivations.length)];
    }
    
    getHealthAdvice(msg) {
        if (msg.includes('spor')) {
            return `🏃 **Sağlıklı Yaşam İçin Spor:**

**Günlük Egzersiz Önerileri:**
• 30 dakika tempolu yürüyüş
• 15 dakika esneme egzersizleri
• Hafta 3-4 kez kardiyo

**Evde Yapılabilecek:**
✓ Şınav (10-15 tekrar)
✓ Mekik (20 tekrar)
✓ Squat (15-20 tekrar)
✓ Plank (30 saniye)

**Önemli:** Düzenlilik anahtardır! 💪`;
        }
        
        if (msg.includes('diyet') || msg.includes('beslen')) {
            return `🥗 **Sağlıklı Beslenme:**

**Günlük Öğün Planı:**
🌅 Kahvaltı: Yumurta, peynir, sebze, tam tahıl
🌞 Öğle: Protein + sebze + kompleks karbonhidrat
🌙 Akşam: Hafif protein + bol salata

**Su Tüketimi:** Günde 2-3 litre
**Kaçınılacaklar:** Abur cubur, fazla şeker, işlenmiş gıda

**Altın Kural:** Dengeli ve çeşitli beslenin! 🍎`;
        }
        
        return `💚 **Genel Sağlık Tavsiyeleri:**

✓ Günde 7-8 saat uyuyun
✓ Bol su için
✓ Düzenli egzersiz yapın
✓ Sağlıklı beslenin
✓ Stres yönetimi yapın
✓ Sosyal ilişkilerinizi güçlendirin

Sağlıklı vücut, sağlıklı zihin! 🌟`;
    }
    
    getRecipe(msg) {
        return `👨‍🍳 **Makarna Tarifi:**

**Malzemeler:**
• 250g makarna
• 2 yemek kaşığı zeytinyağı
• 3 diş sarımsak
• 1 su bardağı domates sosu
• Tuz, karabiber
• Parmesan peyniri

**Yapılışı:**
1. Makarnayı tuzlu suda haşlayın (8-10 dk)
2. Tavada zeytinyağı, sarımsak soteleyin
3. Domates sosunu ekleyin, 5 dk pişirin
4. Süzülen makarnayı ekleyin, karıştırın
5. Parmesan rendeleyin

**Afiyet olsun!** 🍝✨`;
    }
    
    getTechInfo(msg) {
        if (msg.includes('yapay zeka')) {
            return this.getAIInfo();
        }
        
        return `💻 **Teknoloji Dünyası:**

**Güncel Trendler:**
🤖 Yapay Zeka ve Machine Learning
☁️ Cloud Computing
🔒 Siber Güvenlik
📱 Mobil Teknolojiler
🌐 Web 3.0 ve Blockchain

**Yazılım Öğrenme Tavsiyesi:**
1. Python (Başlangıç için ideal)
2. JavaScript (Web geliştirme)
3. SQL (Veritabanı)
4. Git (Versiyon kontrol)

Hangi konuda detay istersiniz? 🚀`;
    }
    
    getHistoryInfo(msg) {
        if (msg.includes('atatürk')) {
            return `🇹🇷 **Mustafa Kemal Atatürk:**

Türkiye Cumhuriyeti'nin kurucusu ve ilk cumhurbaşkanı.

**Önemli Tarihler:**
• 1881: Selanik'te doğdu
• 1919: Samsun'a çıkış (19 Mayıs)
• 1923: Cumhuriyet'in ilanı
• 1938: Ebediyete intikal

**İlke ve Devrimleri:**
Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık

"Hayatta en hakiki mürşit ilimdir." 🌟`;
        }
        
        return `📜 **Tarih:**

Tarih, geçmişten ders alıp geleceği şekillendirmektir.

Hangi dönemi merak ediyorsunuz?
• Osmanlı İmparatorluğu
• Türkiye Cumhuriyeti
• Dünya Tarihi
• Medeniyetler

Spesifik bir soru sorun! 🏛️`;
    }
    
    getLiteratureInfo(msg) {
        return `📚 **Edebiyat Dünyası:**

**Türk Edebiyatı Önemli İsimler:**
• Fuzuli, Yunus Emre (Divan edebiyatı)
• Namık Kemal, Tevfik Fikret
• Nâzım Hikmet, Orhan Veli
• Orhan Pamuk (Nobel ödüllü)

**Kitap Önerisi:**
📖 "Tutunamayanlar" - Oğuz Atay
📖 "Kürk Mantolu Madonna" - Sabahattin Ali
📖 "İnce Memed" - Yaşar Kemal

Hangi türü seversiniz? 🌟`;
    }
    
    getMusicInfo(msg) {
        return `🎵 **Müzik:**

**Türk Müziği:**
🎼 Klasik Türk Müziği
🎸 Türk Pop/Rock
🎤 Arabesk
🎹 Türkü

**Dünya Müziği:**
🎸 Rock, Pop, Jazz
🎼 Klasik Müzik
🎧 Elektronik

Müzik ruhun gıdasıdır! Hangi tarzı seversiniz? 🎶`;
    }
    
    getMovieInfo(msg) {
        return `🎬 **Film & Dizi Önerileri:**

**Klasik Filmler:**
🎥 The Shawshank Redemption
🎥 The Godfather
🎥 Forrest Gump

**Türk Filmleri:**
🎥 Eşkıya
🎥 Vizontele
🎥 Babam ve Oğlum

**Popüler Diziler:**
📺 Breaking Bad
📺 Game of Thrones
📺 The Crown

Hangi türü seversiniz? Öneri istiyorsanız söyleyin! 🍿`;
    }
    
    getGeneralInfo(msg) {
        return `🤔 **Genel Bilgi:**

Sorunuzu daha spesifik sorarsanız daha detaylı cevap verebilirim!

**Popüler Konular:**
• Bilim ve Teknoloji
• Tarih ve Kültür
• Sanat ve Edebiyat
• Sağlık ve Yaşam
• Eğitim ve Kariyer

Neyi merak ediyorsunuz? 💡`;
    }
    
    getDefaultResponse() {
        const responses = [
            '🤔 İlginç bir soru! Size nasıl yardımcı olabilirim?',
            '💭 Daha fazla detay verebilir misiniz? Böylece daha iyi yardımcı olabilirim.',
            '✨ Bu konuda size yardımcı olmak isterim. Biraz daha açar mısınız?',
            '🌟 Anladım! Bu konuda ne öğrenmek istersiniz?',
            '💡 Harika bir konu! Spesifik bir sorunuz var mı?'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Global instance
window.chatAI = new UltimateChatAI();

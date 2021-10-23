# Veri Tabanı Üzerine Kaydedilen Konum Bilgilerinin Heroku App Yardımı İle Görselleştirilmesi

## Giriş

Android Studio aracılığı ile PostgreSQL veritabanına kaydedilen konum verilerinin, Heroku App platformu yardımı ile görselleştirilmesi bu projenin amacıdır.
Android Studio ile alınan konum verileri belirli öznitelikler ile birlikte PostgreSQL veritabanına kaydedilir. Bu öznitelikler; noktanın konumu, lokasyon ismi, kaydeden kişi, minibüs ismi ve kayıt tarihidir.
Konum geometrisi ilgili lokasyonun enlem ve boylam değeri alınarak veritabanına kaydedilir. Lokasyonu tanımlanacak nokta için EPSG4326 projeksiyonu ve WGS84 elipsoiti baz alınır.
Heroku App platformu ise PostgreSQL veritabanında kaydedilen noktaların OSM(OpenStreetMap) üzerinde gösterimi için kullanılır. Burada Heroku App platformunun kullanım amacı, Postgres ve PostGIS yapılarını destekleyen bir uygulama olmasının yanı sıra JavaScript ile geliştirilen web tabanlı uygulamayı internete servis etme (deploy) işlemini gerçekleştiriyor olmasıdır.
Yapılan bu projede geliştirilen uygulama git servisinde mevcut olup Heroku App ile entegre edilmiştir.

## Kullanılacak Uygulamalar

### PostgreSQL

Android Studio ile alınan konum verilerinin tutulacağı uygulama olarak PostgreSQL veritabanı kullanılır. PostgreSQL yüklemek için link takip edilebilir: (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
PostgreSQL kurulumu için verilen sayfadan ilerlenebilir:  [Install PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/)


### Visual Studio Code

Farklı dillerde kod düzenlemelerini, tek bir arayüzde düzenleme işlemleri için Visual Studio Code tercih edilen bir uygulamadır. Ayrıca kod geliştirmek, yazılan kodu çalıştırmak ve hata ayıklama (debug) işlevlerinin sağlanabilirliği açısından oldukça elverişli bir uygulamadır. Visual Studio Code uygulaması verilen link aracılığı ile indirilebilir: [Download Visual Studio Code](https://code.visualstudio.com/Download)


### Node JS

Node.js, web tarayıcılarına ihtiyaç duyulmadan asenkron olarak çalışabilen, açık kaynaklı bir platformdur. Node JS ortamının tercih edilme sebeplerinden biri de JavaScript server side uygulamaların yazımına olanak sağlamasıdır. Node JS indirmek için bağlantı verilmiştir: [Download Node JS](https://nodejs.org/en/download/).


### Git

Bir versiyon kontrol sistemi olan Git; geliştirilen bir proje üzerinde yapılan değişikliklerin düzenlenmesini, kaydedilmesini ve bu işlemleri internet üzerinde bir depoda (repository) tutulmasını gerçekleştirebilen bir sistemdir. Geliştirilen proje üzerinde yapılan düzenlemelerin takip edilerek, geriye dönüşün kolay olmasını sağlamasının yanı sıra birden çok geliştiricinin birlikte çalışmasına da imkan veren bir sistem olduğu için kullanılır. Verilen link takip edilerek indirilebilir: [here](https://git-scm.com/downloads/)





## WEB Arayüzü

Web arayüzü oluşturmak için yapılması gereken adımlar sırası ile şu şekildedir:

### Heroku hesabı oluşturmak:

Heroku hesabı verilen link ile gerçekleştirilebilir: [Heroku sign up](https://signup.heroku.com/login?redirect-url=https%3A%2F%2Fid.heroku.com%2Foauth%2Fauthorize%3Fclient_id%3Dd2ef2b24-e72c-4adf-8506-28db2218547d%26response_type%3Dcode%26scope%3Dglobal%252Cplatform%26state%3DSFMyNTY.g3QAAAACZAAEZGF0YW0AAAAxaHR0cHM6Ly9kYXNoYm9hcmQuaGVyb2t1LmNvbS9hdXRoL2hlcm9rdS9jYWxsYmFja2QABnNpZ25lZG4GANL7onluAQ.eDiBIjGpk8wBx82K2Ej2tBwAitNPBGNQoMMDLoySy78)

Sign up sayfasında istenen bilgiler girildikten sonra vermiş olduğunuz email hesabınıza bir onaylama maili gelecektir. Gelen maildeki link takip edilerek giriş yapıldıktan sonra Postgres veritabanı ile ilişkilendirilen bir Heroku App oluşturulması gerekmektedir. Bu işlem için gerekli adımlar aşağıda verilmiştir:

**1.** Oluşturulan Heroku hesabına giriş yapıldıktan sonra, "New" butonuna basılır ve ardından "Create New App" opsiyonu seçilir.

**2.** "Create New App" seçildikten sonra kullanıcıdan bazı bilgiler istenir. Bu bilgiler şu şekilde doldurulmalıdır:
- App ismi özgün (unique) olacak şekilde verilmelidir.
- "United States" veya "Europe" olarak verilen bölge seçenekleri tercihe bağlı olarak seçilebilir.

**3.** Kurulum için gerekli olan bu bilgiler girildikten sonra Heroku App oluşturulmuş olur. Oluşturulan Heroku App verilen görseldeki gibi bulunabilir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/dashboard_img.png" alt="Sublime's custom image"/>
</p>

**4.** Heroku ile PostgreSQL veritabanı oluşturmak için ilk olarak "Resources" butonu seçilir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/resources_img.png" alt="Sublime's custom image"/>
</p>

**5.** "Add-ons"  bölümüne "Heroku Postgres" yazılır. Sonrasında ise bağlantıyı tamamlamak için "Submit Order Form" işaretlenir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/add_ons_img.png" alt="Sublime's custom image"/>
</p>

**6.** Oluşturulan PostgreSQL veritabanı bilgilerine ulaşmak için, "Data" butonuna basılır. Sonrasında ise "Settings" bölmesinde yer alan "Database Credentials"  başlığı altında ilgili veritabanı ile ilgili bilgilere ulaşılabilir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/credentials_img.png" alt="Sublime's custom image"/>
</p>


### Heroku-PostgreSQL Bağlantısı:

Heroku-PostgreSQL bağlantısı oluşturmak için, PostgreSQL veritabanlarını yönetmek amacıyla pgAdmin4 uygulaması tercih edilmiştir. Bağlantı için yapılması gereken adımlar şu şekilde özetlenibilir:

**1.** "Servers" başlığına sağ tık yapılarak yeni bir server oluşturulur.
**2.** Server oluşturmak için gelen arayüz aşağıdaki gibidir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/general_img.jpg" alt="Sublime's custom image"/>
</p> 

"Connection" sekmesinin altında istenen bilgiler, bir önceki başlıkta "Database Credentials" bölmesinden alınan veritabanı bilgileri kullanılarak doldurulur. İstenen bilgilerin arasında yer alan "Password" için "Save Password" seçeneği işaretlenmesi; uygulamaya sonraki girişlerde şifre girişi yapılmaması amacıyla verimli olacaktır.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/connection_img.jpg" alt="Sublime's custom image"/>
</p>

"Advanced" sekmesi altında yer alan "DB Restriciton" başlığı ise "Heroku Database Name" ile doldurulmalıdır.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/advanced_img.jpg" alt="Sublime's custom image"/>
</p>

### Tablo Oluşturmak:

Oluşturulan veritabanında verilerin kaydedileceği bir tablo, "Schemas" başlığı altındaki "Tables" seçeneğinden "Create" işaretlenerek oluşturulabilir. Verilerin öznitelik bilgilerinin kaydı için "Column" ve "Data Type" seçenekleri şu şekilde girilebilir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/table_img.jpg" alt="Sublime's custom image"/>
</p>

### Visual Studio Code 

Geliştirilecek web arayüzü için gerekli olan kodlar Visual Studio Code uygulaması kullanılarak düzenlenir. VSC ile yeni bir proje yaratmak için öncelikle, bilgisayarınızda yeni bir boş klasör oluşturmanız gerekir. Sonrasında ise oluşturulan klasör VSC ile açılır.
Node JS kurulumu için VSC'de "Terminal" bölmesi altından yeni bir terminal açılır.

- İlk olarak açılan terminalde **npm init** yazılır. **package.json** dosyası oluşturmak için terminal bir kaç soru yöneltecektir. Bu sorular enter tuşuna basılarak geçilmelidir. Bu işlemler sonucunda **package.json** birtakım metaveriler ile birlikte oluştuurlmuş olur.
Oluşturulan **package.json** aşağıda verilen görsel gibi olmalıdır:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/package_img.jpg" alt="Sublime's custom image"/>
</p>


### JavaScript kodu için gerekli kurulumlar:

**1. Express JS Modulü**

Express modülü, web siteleri geliştiirlirken uygulanabilirlik açısından kolaylık ve hızlılık sağlaması için tercih edilen bir sunucu temelidir. İçerdiği HTTP yardımcı araçları ve katmanları, güçlü bir uygulama kurmak açısından önem teşkil eder.
Bu modül ile istek (request) ve yanıtlar (response) yönetilir. Express JS modülü kurmak için; terminale **npm install express --save** komutu yazılır ve ardından enter tuşuna basılır.

**2. File System Modülü**

File System modülü (FS Modülü); tüm dosya okuma, yazma, izin verme gibi işlemleri gerçekleştirmeye yarayan fonksiyonları içeren bir modüldür. FS modülünün kurulumu için terminale **npm install express --save** komutunun yazılması gerekir.

**3. Bluebird Modülü**

Bluebird, yenilikçi özelliklere ve performansa odaklanan tam donanımlı bir kütüphanedir. Bu modülün kurulumu için terminalde **npm install bluebird --save** komutunun çalıştırılması gereklidir.

**4. Pg-Promise Modulü**

Pg-Promise, Node JS için bir PostgreSQL arayüzüdür. Kurulum için terminalde **npm install pg-promise --save** komutunun çalıştırılmalıdır.

Gerekli modüllerün kurulumundan sonra **package.json** dosyası aşağıdaki gibi güncellenmiş olacaktır: 

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/update_package_img.jpg" alt="Sublime's custom image"/>
</p>

### **Android Studio**


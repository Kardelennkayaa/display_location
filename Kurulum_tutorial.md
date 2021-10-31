# Veri Tabanı Üzerine Kaydedilen Konum Bilgilerinin Heroku App Yardımı İle Görselleştirilmesi

## Giriş

Android Studio aracılığı ile PostgreSQL veritabanına kaydedilen konum verilerinin, Heroku App platformu yardımı ile görselleştirilmesi bu projenin amacıdır.
Android Studio ile alınan konum verileri belirli öznitelikler ile birlikte PostgreSQL veritabanına kaydedilir. Bu öznitelikler; noktanın konumu, lokasyon ismi, kaydeden kişi, minibüs ismi ve kayıt tarihidir.
Konum geometrisi ilgili lokasyonun enlem ve boylam değeri alınarak veritabanına kaydedilir. Lokasyonu tanımlanacak nokta için EPSG4326 projeksiyonu ve WGS84 elipsoiti baz alınır.
Heroku App platformu ise PostgreSQL veritabanında kaydedilen noktaların OSM(OpenStreetMap) üzerinde gösterimi için kullanılır. Burada Heroku App platformunun kullanım amacı, Postgres ve PostGIS yapılarını destekleyen bir uygulama olmasının yanı sıra JavaScript ile geliştirilen web tabanlı uygulamayı internete servis etme (deploy) işlemini gerçekleştiriyor olmasıdır.
Yapılan bu projede geliştirilen uygulama git servisinde mevcut olup Heroku App ile entegre edilmiştir.

## Kullanılacak Uygulamalar

### PostgreSQL

Android Studio ile alınan konum verilerinin tutulacağı uygulama olarak PostgreSQL veritabanı kullanılır. PostgreSQL yüklemek için link takip edilebilir: [PostgreSQL download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
PostgreSQL kurulumu için verilen sayfadan ilerlenebilir:  [PosgreSQL Kurulumu](https://www.postgresqltutorial.com/install-postgresql/)


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

### Veritabanı Bağlantısı

PostgreSQL üzerinde oluşturulan veritabanı ile bağlantı kurabilmek için Visual Studio Code üzerinde **appConfig.js** dosyası oluşturulmalıdır. Bunun için "New File" butonuna basılarak dosya adı  **appConfig.js** olarak tanımlanmalıdır.
Oluşturulan **appConfig.js** dosyası aşağıdaki gibi olmalıdır:


 var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'database_name',
    user: 'postgres',
    password: 'postgres'
    }
    }
    
    var connectionString = "postgres_connectionString";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }


Burada **host, database, user, password ve connectionString** parametreleri; **Heroku Database Credentials** bölümünden alınna veritabanı bilgileri ile doldurulmalıdır. Bu parametreler PostgreSQL veritabanı ile bağlantıyı sağlamaktadır.

Sonrasında ise veritabanında olan verilere ulaşmak için **database.js** dosyası oluşturulmalıdır. Veritabanından alınan verilerin web üzerinde görselleştirilmesi yapılacaktır. **database.js** dosyası aşağıdaki gibi olmalııdr:

const fs = require('fs');
var promise = require('bluebird');
var CONFIG = require('./appConfig');
var pgp = require('pg-promise')(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

module.exports = {
       getAllLocations: getAllLocations
};

var options = {
    promiseLib: promise
};

function getAllLocations(cb) {
      DATABASE_PGB.any('SELECT recorder_name as recorder, recorder_gender as gender, public_transit as transit, ST_X(geom) as longitude, ST_Y(geom) as latitude from location_data')
      .then(function (data) {
         cb(null, data);})
       .catch(function (err) {
          cb(err)});
}`

Tanımlanan **database.js** dosyasında PostgreSQL veritabanı üzerinden veri çekmek için **select** komutu kullanılır. **select** komutu ile veri alabilmek için ise daha önce PostgreSQL veritabanı üzerinde oluşturmuş olduğumuz tablonun ismi ve tablo içeriğinde eklediğimiz öznitelik adları bulunmalıdır.
Tablo içinde bulunan geometrik verilerin **latitude** ve **longitude** değerini alabilmek için ise **ST_X ve ST_Y** metodları kullanılır.

PostgreSQL veritabanı bağlantısı kurulduğuna göre web sitesi hazırlamak için **index.html** dosyası oluşturulmalıdır. Bu dosya şu şekildedir:

`<html lang="en">
<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 4px 2px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #FDF5E6;
}

    .button {
  border: none;
  color: white;
  padding: 14px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 17px;
  margin: 4px 2px;
  cursor: pointer;
}

.button1 {background-color: #BA55D3;} 
.button2 {background-color: #BA55D3;} 
</style>
<title>Display Location</title>
</head>
<body>
    <body>
    <div class="topnav">
        <button id="home" class="button button1" onClick="window.location.reload();">Home</button>
        <button id="recorder" class="button button2" onClick="getButton_id()">Recorder</button>
    </div>
    <div id="mapdiv"></div>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script>
        function getButton_id()
        {
            alert(event.srcElement.id);
        }
    </script>   
    <script>
       
        $.getJSON('/api/data', function(data) {
            console.log(data[0].recorder);
            console.log(data[0].gender);
            console.log(data[0].transit);
            console.log(data[0].longitude);
            console.log(data[0].latitude);
            
            var veri1=data[0].longitude;
            var veri2=data[0].latitude;

            map = new OpenLayers.Map("mapdiv");
            map.addLayer(new OpenLayers.Layer.OSM());
            
            var point;
            var length=data.length;
            var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
            //TODO - data haritaya ekleme işlemi
            for (point = 0; point < data.length; point++) {
                
            var rec=data[point].recorder;
            var gen=data[point].gender;
            var tra=data[point].transit;
            var lon=data[point].longitude;
            var lat=data[point].latitude;
            
            var lonLat = new OpenLayers.LonLat(lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                                                                map.getProjectionObject() // to Spherical Mercator Projection
                                                                )
            var zoom=10;
        
            var markers = new OpenLayers.Layer.Markers("Markers");
            var marker_colour = new OpenLayers.Layer.Markers("Markers");
            
        if (tra=='Dolmus') {
                marker_colour = 'https://cdn-icons-png.flaticon.com/512/1165/1165961.png';
        } else if(tra=='Bus'){ marker_colour='https://cdn-icons-png.flaticon.com/512/30/30979.png'}
        else{marker_colour = 'https://cdn-icons-png.flaticon.com/128/3202/3202926.png'}
            markers.addMarker(new OpenLayers.Marker(lonLat))
                
            map.setCenter(lonLat,zoom)
                
        var feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point( lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        {description:'Latitude: '+lat+'<br>Longitude: '+lon+'<br>Recorder: '+rec+'<br>Recorder Gender: '+gen+'<br>Transit Type: '+tra},
        {externalGraphic: marker_colour, graphicHeight: 25, graphicWidth: 25, graphicXOffset:-20, graphicYOffset:-30 }
        );

        vectorLayer.addFeatures(feature);
        map.addLayer(vectorLayer);
                
            var controls = {
              selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
            };

            function createPopup(feature) {
              feature.popup = new OpenLayers.Popup.FramedCloud("pop",
                  feature.geometry.getBounds().getCenterLonLat(),
                  null,
                  '<div class="markerContent">'+feature.attributes.description+'</div>',
                  null,
                  true,
                  function() { controls['selector'].unselectAll(); }
              );
             
              map.addPopup(feature.popup);
            }

            function destroyPopup(feature) {
              feature.popup.destroy();
              feature.popup = null;
            }

            map.addControl(controls['selector']);
            controls['selector'].activate();

            }

        });
           
        
    </script>
    
  </body>
  </html>
  
Burada altlık harita için **OpenLayers** kullanılmıştır. Ayrıca **Jquery** kütüphanesinin kullanılma amacı da veritabanına **select** komutu ile gönderilmiş olunan sorguların yanıtını almaktır. 
Ayrıca güvenlik politikası, web sayfasını **HTTPS** protokolü olarak çalıştırabilmek için eklenmiştir. Hazırlanan **index.html** kodu ile veritabanından alınan konum verileri öznitelikleri ile birlikte OpenLayers haritası üzerinde görselleştirilmiştir. 
Burada verilerin ulaşım aracı bilgisi, otobüs ya da dolmuş olmasına göre sınıflandırılmıştır ve bu bilgiye özel iconlar ile ilgili konumu üzerinde gösterilmiştir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/visualize_data.jpg"/>
</p>

**index.html** dosyası oluşturulduktan sonra tasarlanan websitesinin NodeJS aracılığı ile yayınlanabilmesi için **index.js** dosyası hazırlanmalıdır. Oluşturulan dosya şu şekilde olmalıdır:

var express = require('express');
var fs = require('fs');
var DATABASE = require('./database.js');
var app = express();
app.get('/', function (req, res, next) {
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
res.writeHead(200, { 'Content-Type': 'text/html' });

var myReadStream = fs.createReadStream(__dirname + '/index.html',
'utf8')
myReadStream.pipe(res);
});
app.use('/api/data', function (req, res) {
DATABASE.getAllLocations(function (err, data) {

if (err) {
res.sendStatus(500);

} else {
res.send(data);
}
})
});
app.listen(process.env.PORT || 4000, function(){
console.log("Express server listening on port %d in %s mode",
this.address().port, app.settings.env);
});

**index.js** kodu, hazırlanan **index.html** kodunu okur ve bu koda göre bir cevap gönderir. Kod içeriği ve veritabanı bağlantılarında bir yanlışlık olmadığı durumda, **index.js** kodu ile websitesi yayınlanmış olur.

Tasarlanan websitesi kodunun çalıştırılması için Visual Studio Code üzerinde bulunan **Terminal** sekmesinden **New Terminal** seçeneği seçilerek gelen terminal üzerine **node index.js** yazılır ve enter tuşuna bsılır.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/node_terminal.jpg"/>
</p>

Oluşturulan websitesini ziyaret etmek için verilen link kullanılabilir [localhost](http://localhost:4000/).
Veritabanından çekilen veriler aşağıdaki gibi görüntülenir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/display_end.jpg"/>
</p>


### Projeyi Heroku platformuna **Deploy** etme 

Heroku, hazırlanan websitesini açık kaynak olarak sunmak için kullanılan bir platformdur. Bu amacı gerçekleştirmek için öncelikle oluştuurlan kodlar Github arayüzüne yüklenmeli ve ardından Heroku-Github bağlantısı sağlanmalıdır.
Uygulanması gereken adımlar şu şekildedir:

**1.** Kişisel Github hesabı açılmalı ve ardından **New** butonuna basarak yeni bir repository oluşturulmalıdır.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/github_new.jpg"/>
</p>

**2.** **Repository name** tanımlanmalı ve ardından **Create repository** butonuna basılmalıdır.
**3.** Hazırlanan kodları Github arayüzüne yüklemek için **cmd (Command Prompt** açılmalı ve bilgisayarınızda ilgili projenin bulunduğu yola gidilmelidir. Ardından aşağıdaki komut yazılmalıdır:
- `git init`


Bu komuttan sonra, ilgili projede bulunan dosyaların yüklenilmesi için verilen kod yazılmalıdır:
- git add .


Github uygulamasında yükleme yapılırken **commit** girilmesi gerekir. **commit** bilgisi isteğe bağlı bir yorum olabilir:
- git commit -m "your commit"


Github'da oluşturulan repository ile bağlantı sağlayabilmek için aşağıdaki komut girilmelidir:
-  git remote add origin repositoryLink

Oluşturulan repository linki şu şekilde bulunabilir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/repository_link.png"/>
</p>

Burada mor kutu içerisinde belirtilen linki kopyalanarak **repositoryLink** olarak verilen alana yazılmalıdır.

Hazırlanan proje dosyasını Github üzerine **push** etmek için aşağıdaki komut yazılabilir:
- git push -u origin master

Burada **master** olarak verilen isim, oluşturduğunuz repositoryde bulunan **branch** ismidir.İstenildiği takdirde farklı bir **branch** oluşturularak ilgili proje push edilebilir.

İlgili komutlar çalıştırıldıktan sonra Github arayüzünde proje dosyaları görüntülenebilir.

**4.** Heroku'da oluşturulan proje açılır ve  **Deploy** sekmesi altında bulunan **Github** seçilir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/heroku_deploy.png"/>
</p>

**5.** Github bağlantısı için ilgili repository ismi verilir. Bu aşamada **Automatic Deploys** ve **Manual Deploy** olarak verilen iki adet deploy seçeneği mevcuttur. **Manuel Deploy** seçeneğinden projenin bulunduğu branch ismi seçilerek **Deploy Branch** butonuna basılır.
Heroku ve Github arasındaki bağlantı sağlandıktan sonra **View** butonu ile, tasarlanan websitesine erişilebilir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/deploy_display.jpg"/>
</p>


### **Android Studio**


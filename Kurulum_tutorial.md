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
PostgreSQL kurulumu yapılırken aşağıda verilen adımlarda, belirtilen seçenekler PostGIS uzantısı için işaretlenmelidir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/spatial_.png"/>
</p>

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/create_spatial_ss.png"/>
</p>


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
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/postgre_table.png" alt="Sublime's custom image"/>
</p>


Oluşturduğunuz tabloya örnek bir veri girişi şu şekilde yapılmalıdır:

```
INSERT INTO public.minibus_stations(
	recorder, gender, age, transit_type, destination, geom, date)
	VALUES ('test_rec2', 'male', '22', 'Dolmush', 'Beytepe', ST_SetSRID( ST_Point(32.72823692028502,39.84361890532323), 4326), 'Fri Dec 03 11:59:15 GMT+03:00 2021');
```  
Verilen örnekte girilen lokasyon EPSG:4326 projeksiyonu baz alınarak tabloya eklenmiştir. Örnekte formatı verilen veri girişinde tablo ismi 'minibus_stations' olarak girilmiştir. Farklı bir isim girilerek tablo oluşturulmuşsa bu değer komutta değiştirilmelidir. Örnekte verilen değişkenleri değiştirerek siz de kendi verinizi aynı formatta girebilirsiniz.
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

File System modülü (FS Modülü); tüm dosya okuma, yazma, izin verme gibi işlemleri gerçekleştirmeye yarayan fonksiyonları içeren bir modüldür. FS modülünün kurulumu için terminale **npm install fs --save** komutunun yazılması gerekir.

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


 ```javascript
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
  ```


Burada **host, database, user, password ve connectionString** parametreleri; **Heroku Database Credentials** bölümünden alınan veritabanı bilgileri ile doldurulmalıdır. Bu parametreler PostgreSQL veritabanı ile bağlantıyı sağlamaktadır.

Sonrasında ise veritabanında olan verilere ulaşmak için **database.js** dosyası oluşturulmalıdır. Veritabanından alınan verilerin web üzerinde görselleştirilmesi yapılacaktır. **database.js** dosyası aşağıdaki gibi olmalııdr:

```javascript
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
}
 ```

Tanımlanan **database.js** dosyasında PostgreSQL veritabanı üzerinden veri çekmek için **select** komutu kullanılır. **select** komutu ile veri alabilmek için ise daha önce PostgreSQL veritabanı üzerinde oluşturmuş olduğumuz tablonun ismi ve tablo içeriğinde eklediğimiz öznitelik adları bulunmalıdır.
Tablo içinde bulunan geometrik verilerin **latitude** ve **longitude** değerini alabilmek için ise **ST_X ve ST_Y** metodları kullanılır.

PostgreSQL veritabanı bağlantısı kurulduğuna göre web sitesi hazırlamak için **index.html** dosyası oluşturulmalıdır. Bu dosya şu şekildedir:

 ```html
<html lang="en">
<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
      margin: 10px 10px;
      font-family: Arial, Helvetica, sans-serif;
      background-color: #FDF5E6;
    }
    .map {
        width: 100%;
        height:100%;
        position:fixed;
      }
   
    .button1 {
        background-color: #BA55D3;
        color: white;
        padding: 16px 20px;
        border: 2px solid #FDF5E6;
        cursor: pointer;
    } 
    .open-button {
        background-color: #BA55D3;
        color: white;
        padding: 16px 20px;
        border: 2px solid #FDF5E6 ;
        cursor: pointer;
        position:fixed
        }
    #container{
        display:inline-block;
        position:relative
    }
    .recorder_options {
        background-color: #BA55D3;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        }
    .form-popup {
        position: relative;
        display: none;
     }
    
    
</style>
<title>Display Location</title>
</head>
<body>
        <div class="map" id="mapdiv"></div>
        <div id="container">
            <button id="home" class="button1" onClick="window.location.reload();">Home</button>
            <button class="open-button" onclick="selectBy_recorder('recorder_options')">Select by Recorder</button><br>
        </div><br>
        <div class="form-popup" id="open_entry">
          <br><select id="recorder_options">
          </select><br>
          <br><input class="SubmitButton" type="button" value="Submit" onclick="submit_recorder()" />
        </div>
         
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script>

        $.getJSON('/api/data', function(data) {
            console.log(data[0].recorder);
            console.log(data[0].gender);
            console.log(data[0].age);
            console.log(data[0].transit);
            console.log(data[0].destination);
            console.log(data[0].longitude);
            console.log(data[0].latitude);
            console.log(data[0].date);
            
            var veri1=data[0].longitude;
            var veri2=data[0].latitude;

            map = new OpenLayers.Map("mapdiv");
            map.addLayer(new OpenLayers.Layer.OSM());
            
            var point;
            var length=data.length;
            vectorLayer = new OpenLayers.Layer.Vector("Overlay");
            //TODO - data haritaya ekleme işlemi
            var list_rec = [];
            for (point = 0; point < data.length; point++) {
                
            var rec=data[point].recorder;
            var gen=data[point].gender;
            var ag=data[point].age;
            var tra=data[point].transit;
            var dest=data[point].destination;
            var lon=data[point].longitude;
            var lat=data[point].latitude;
            var dt=data[point].date;
            list_rec.push(rec);

            lonLat = new OpenLayers.LonLat(lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                                                                map.getProjectionObject() // to Spherical Mercator Projection
                                                                )
            var zoom=10;
        
            markers = new OpenLayers.Layer.Markers("Markers");
            marker_colour = new OpenLayers.Layer.Markers("Markers");
            
        if (tra=='Dolmush' || tra == 'Dolmuş') {
                marker_colour = 'https://cdn-icons-png.flaticon.com/512/1165/1165961.png';
        } else if(tra=='Bus' || tra=='Otobüs'){ marker_colour='https://cdn-icons-png.flaticon.com/512/30/30979.png'}
        else if(tra=='Tren' || tra=='Train'){ marker_colour='https://cdn-icons-png.flaticon.com/512/335/335045.png'}
        else if(tra=='Tramvay' || tra=='Streetcar'){ marker_colour='https://cdn-icons-png.flaticon.com/512/82/82281.png'}
        else{marker_colour = 'https://cdn-icons-png.flaticon.com/128/3202/3202926.png'}
            markers.addMarker(new OpenLayers.Marker(lonLat))
                
            map.setCenter(lonLat,zoom)
                
        feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point( lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        {description:'Recorder: '+rec+'<br>Gender: '+gen+'<br>Transit Type: '+tra+'<br>Age: '+ag+'<br>Destination: '+dest+'<br>Date: '+dt+'<br>Latitude: '+lat+'<br>Longitude: '+lon},
        {externalGraphic: marker_colour, graphicHeight: 25, graphicWidth: 25, graphicXOffset:-10, graphicYOffset:-10 }
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
     
            var unique_rec = [];
            $.each(list_rec, function(i, el){
            if($.inArray(el, unique_rec) === -1) unique_rec.push(el);
            });
            //alert(unique_rec);
            var select = document.getElementById("recorder_options");
            for(index in unique_rec) {
                select.options[select.options.length] = new Option(unique_rec[index], unique_rec[index]);
            }
            

        });
        </script>
        <script>
            
    function submit_recorder()
    { 
      markers.clearMarkers(new OpenLayers.Marker(lonLat));
      vectorLayer.removeFeatures(feature);
      map.removeLayer(vectorLayer);
        
    
    var recorder_name = document.getElementById('recorder_options').value

    $.getJSON('/api/data', function(data) {
    console.log(data[0].recorder);
    console.log(data[0].gender);
    console.log(data[0].transit);
    console.log(data[0].longitude);
    console.log(data[0].latitude);
    
    var veri1=data[0].longitude;
    var veri2=data[0].latitude;
    
    var point;
    var length=data.length;
    vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    x=0;   
    for (point = 0; point < data.length; point++) {
        
    var rec=data[point].recorder;
    var gen=data[point].gender;
    var ag=data[point].age;
    var tra=data[point].transit;
    var dest=data[point].destination;
    var lon=data[point].longitude;
    var lat=data[point].latitude;
    var dt=data[point].date;
      
    
    
    if (recorder_name==rec){
        lonLat = new OpenLayers.LonLat(lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                                                        map.getProjectionObject() // to Spherical Mercator Projection
                                                        )
        var zoom=10;  
        

        markers = new OpenLayers.Layer.Markers("Markers");
        marker_colour = new OpenLayers.Layer.Markers("Markers");
        if (tra=='Dolmush' || tra == 'Dolmuş') {
                marker_colour = 'https://cdn-icons-png.flaticon.com/512/1165/1165961.png';
        } else if(tra=='Bus' || tra=='Otobüs'){ marker_colour='https://cdn-icons-png.flaticon.com/512/30/30979.png'}
        else if(tra=='Tren' || tra=='Train'){ marker_colour='https://cdn-icons-png.flaticon.com/512/335/335045.png'}
        else if(tra=='Tramvay' || tra=='Streetcar'){ marker_colour='https://cdn-icons-png.flaticon.com/512/82/82281.png'}
        else{marker_colour = 'https://cdn-icons-png.flaticon.com/128/3202/3202926.png'}
        markers.addMarker(new OpenLayers.Marker(lonLat))
        map.setCenter(lonLat,zoom)
        feature = new OpenLayers.Feature.Vector(
        new OpenLayers.Geometry.Point( lon,lat ).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
        {description:'Recorder: '+rec+'<br>Gender: '+gen+'<br>Transit Type: '+tra+'<br>Age: '+ag+'<br>Destination: '+dest+'<br>Date: '+dt+'<br>Latitude: '+lat+'<br>Longitude: '+lon},
        {externalGraphic: marker_colour, graphicHeight: 25, graphicWidth: 25, graphicXOffset:-10, graphicYOffset:-10 }
        );
        vectorLayer.addFeatures(feature);
        map.addLayer(vectorLayer);
        x=1;
        } 
        
        
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
    if (x==0) {
        alert("Recorder not found!")
    }
    document.getElementById('rname').value=null;
    });
   }
  </script>
  <script>
      function selectBy_recorder() {
          document.getElementById("open_entry").style.display = "block";
        }
 </script>
  </body>
  </html>
   ```
  
Burada altlık harita için **OpenLayers** kullanılmıştır. Ayrıca **Jquery** kütüphanesinin kullanılma amacı da veritabanına **select** komutu ile gönderilmiş olunan sorguların yanıtını almaktır. 
Ayrıca güvenlik politikası, web sayfasını **HTTPS** protokolü olarak çalıştırabilmek için eklenmiştir. Hazırlanan **index.html** kodu ile veritabanından alınan konum verileri öznitelikleri ile birlikte OpenLayers haritası üzerinde görselleştirilmiştir. 

Oluşturulan web arayüzünde; verilerin ulaşım aracı bilgisi, otobüs ya da dolmuş olmasına göre belirli bir icon ile sembolize edilmiştir. Ayrıca veriyi niteleyen icona basılarak da veri ile ilgili öznitelik bilgilerine erişilebilir. 


Arayüzde **Home** ve **Select by Recorder** olarak iki adet buton bulunmaktadır. **Select by Recorder** butonu yardımı ile veritabanına konum gönderen kullanıcılar liste halinde ekrana gelir.Listeden bir recorder seçilerek girilen ismin kaydettiği veriler gözlemlenebilir. Bir diğer buton olan **Home** butonu ile de arayüz tekrar yüklenerek veritabanında kayıtlı olan tüm verilere erişilebilir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/visualize_data.jpg"/>
</p>

**index.html** dosyası oluşturulduktan sonra tasarlanan websitesinin NodeJS aracılığı ile yayınlanabilmesi için **index.js** dosyası hazırlanmalıdır. Oluşturulan dosya şu şekilde olmalıdır:

```javascript
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
 ```

  
**index.js** kodu, hazırlanan **index.html** kodunu okur ve bu koda göre bir cevap gönderir. Kod içeriği ve veritabanı bağlantılarında bir yanlışlık olmadığı durumda, **index.js** kodu ile websitesi yayınlanmış olur.

Tasarlanan websitesi kodunun çalıştırılması için Visual Studio Code üzerinde bulunan **Terminal** sekmesinden **New Terminal** seçeneği seçilerek gelen terminal üzerine **node index.js** yazılır ve enter tuşuna bsılır.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/node_terminal.jpg"/>
</p>

Oluşturulan websitesini ziyaret etmek için [verilen link](http://localhost:4000/) kullanılabilir.
Veritabanından çekilen veriler aşağıdaki gibi görüntülenir:

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/display_end.jpg"/>
</p>

Projeyi Heroku platformuna deploy etmeden önce, **package.json** dosyası güncellenmesi gerekir. Güncelleme işlemi için aşağıda örneği verilen satır, dosyaya eklenebilir.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/start_node.png"/>
</p>


### Projeyi Heroku platformuna **Deploy** etme 

Heroku, hazırlanan websitesini açık kaynak olarak sunmak için kullanılan bir platformdur. Bu amacı gerçekleştirmek için öncelikle oluşturulan kodlar Github arayüzüne yüklenmeli ve ardından Heroku-Github bağlantısı sağlanmalıdır.
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

Burada mor kutu içerisinde belirtilen link kopyalanarak **repositoryLink** olarak verilen alana yazılmalıdır.

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
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/location_images/display_deploy.jpg"/>
</p>


### **Android Studio**

Android platformu için yazılım hazırlamayı en kolay hale getiren program olduğu için bu çalışmada android studio kullanacağız. Android studio içerisinde bulundurduğu AVD Manager ile kodu sanal telefon üzerinde test etmemizi kolaylaştırarak ek program kullanmamıza gerek kalmayan bir uygulamadır.

### Android Studio Kurulumu ###

İlk olarak [buradaki linkten](https://developer.android.com/studio) adresine giderek işletim sistemimize uygun olan Android Studio versiyonunu indiriyoruz.

İndirdikten sonra [buradaki linkten](https://www.youtube.com/watch?v=JDE_nTviig8) adımları takip ederek Android Studio kurulumunu tamamlayabilirsiniz.

### Projenin Oluşturulması

Projemizi yapmaya new project seçeneğini seçerek başlıyoruz. Karşımıza gelen ilk ekranda "Phone and Tablet seçeneği ile "Empty Activity" seçeneklerini seçerek Next tuşuna tıklıyoruz.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_1.png"/>
</p>

Sonraki adımda ise projemizin ismini belirliyoruz.

- Name: Projenin Adı

- Package Name: Uygulamının paket adı. (com.example kısmından sonra otomatik olarak projenin adını alır.)

- Save Location: Projenin kaydedileceği yer

- Language: Kodlamanın yapılcağı programlama dili. (Biz bu uygulamada Java yı kullanacağız.)

- Minimum SDK: Bu kısımda uygulamamızın destekleyeceği en düsük android sürümünü belirliyoruz. (Biz API 23 kullanıyoruz.)

- "Using legeacy android.support library" seçeneğini işaretliyerek, en son versiyon android servislerini kullanacağız.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_2.png"/>
</p>


Bu adımları tamamladıktan sonra "Finish" butonuna tıklayarak projemize giriş yapıyoruz.

Projemizin yüklenmesi bilgisayarın durumuna göre 5 dakika kadar sürebilir. Proje yüklendikten sonra ekranımzıda MainActivity.java ve activity_main.xml adında 2 farklı dosya açılacak. Android studio da xml dosyaları tasarım, java dosalarını kodlama kısmı için kullanacağız.

Projeye başlamadan önce "Konum" ve "İnternet" gibi özellikleri alabilmemiz için izin isteği oluşturmamız gerekmektedir. Bunun için uygulamamızda sol üstte app --> manifests
dosyasının içindeki "AndroidManifests.xml" dosyasını açıyoruz. Burada "package" ın altına gerekli izinleri ekliyoruz.

```
    <uses-permission android:name="com.google.android.things.permission.MANAGE_GNSS_DRIVERS" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_15.png"/>
</p>


İzinleri ekledikten sonra Gradle Scripts --> build.gradle (Project: Dolmush) içine

```
allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url 'https://maven.google.com'
        }
        mavenCentral() // Warning: this repository is going to shut down soon
    }
}
```

komutunu ekliyoruz ve sağ üstten "Sync Now" a tıklıyoruz.

Bu aşamadan sonra Gradle Scripts --> build.gradle (Module: Dolmush.app) içine

```
    implementation 'com.google.android.gms:play-services-maps:17.0.1'
    implementation 'org.postgresql:postgresql:42.2.5.jre7'
    implementation 'com.google.android.gms:play-services-location:18.0.0'
    implementation 'com.google.android.gms:play-services-auth:19.2.0'
    implementation 'com.github.bumptech.glide:glide:4.12.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.12.0'
```

Bu sayede gerekli kütüphaneleri uygulamamıza eklemiş olduk.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_16.png"/>
</p>


Projemizin ilk adımı olarak anasayfamızın layout düzenini activity_main.xml dosyası üzerinde yapacağız. Bunu yapmadan önce uygulamamızın daha kullanışlı olabilmesi için farklı dil desteklerini kullanacağız. Ekranımızın sol kısmında res --> values -- >>
strings.xml dosyasını açıyoruz. Dosyayı açtığımız zaman sağ üst kısımda "Open Editor" seçeneğini seçiyoruz.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_3.png"/>
</p>


Translations Editors sayfası açılınca burad Dünya İşaretine tıklayarak "Türkçe" seçeneğini seçiyoruz ve çıkan uyarıya "add" diyoruz.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_4.png"/>
</p>


Bu aşamadan sonra elimizde iki adet string dosyası olacak. Bu string dosyaları telefonun dilini otomatik olarak algılayarak ona göre uygulamayı çalıştıracak. 

"strings.xml" klasörü bu yapıda olacak.

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Dolmush</string>
    <string name="start_button">Start the Trip</string>
    <string name="location_button">Start the Trip</string>
    <string name="finish_button">Finish the Trip</string>
    <string name="Latitude">Latitude</string>
    <string name="Longitude">Longitude</string>
    <string name="Country_Name">Country Name:</string>
    <string name="Locality">Locality:</string>
    <string name="Address">Address:</string>
    <string name="signout">Sign Out</string>
    <string name="name">Name</string>
    <string name="surname">Surname</string>
    <string name="email">E-mail</string>
    <string name="id">ID</string>
    <string name="ToastMessageOne">User already Signed-in</string>
    <string name="ToastMessageTwo">Service Started</string>
    <string name="ToastMessage3">Name can not be empty</string>
    <string name="ToastMessage4">Surname can not be empty</string>
    <string name="ToastMessage5">Choose at Least One</string>
    <string name="ToastMessage6">Route can not be empty </string>
    <string name="ToastMessage7">Now you can start the trip </string>
    <string name="NotificationHead">Dolmush</string>
    <string name="NotificationText">Dolmush runs in the background</string>
    <string name="Age">How Old Are You?</string>
    <string name="Age1">12-18</string>
    <string name="Age2">19-25</string>
    <string name="Age3">26-32</string>
    <string name="Age4">33+</string>
    <string name="todo">TODO</string>
    <string name="welcome">Welcome to Dolmush</string>
    <string name="lets_start">Lets Start</string>
    <string name="male">Male</string>
    <string name="female">Female</string>
    <string name="next">Next</string>
    <string name="transport">Which means of transportation do you prefer to use?</string>
    <string name="transit">Choose a transit</string>
    <string name="hint">Where are you going?</string>
    <string name="welcome_back">Welcome</string>
    <string name="bus">Bus</string>
    <string name="dolmush">Dolmush</string>
    <string name="train">Train</string>
    <string name="streetcar">Streetcar</string>
    <string name="finish">Finish</string>
    <string name="wait">Please Wait</string>
    <string name="empty"></string>
</resources>
```

"strings.xml (tr - rTR)" klasörü bu yapıda olacak.

```
xml<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Dolmuş</string>
    <string name="start_button">Yolculuğa Başla</string>
    <string name="location_button">Yolculuğa Başla</string>
    <string name="finish_button">Yolculuğu Bitir</string>
    <string name="id">ID</string>
    <string name="email">E-posta</string>
    <string name="name">İsim</string>
    <string name="signout">Çıkış Yap</string>
    <string name="Address">Adres:</string>
    <string name="Locality">Mekan:</string>
    <string name="Country_Name">Ülke Adı:</string>
    <string name="Latitude">Enlem</string>
    <string name="Longitude">Boylam</string>
    <string name="ToastMessageOne">Tekrar Hoşgeldiniz</string>
    <string name="ToastMessageTwo">Yolculuk Başladı</string>
    <string name="todo">TODO</string>
    <string name="welcome">Dolmuşa Hoşgeldiniz</string>
    <string name="lets_start">Hadi Başlayalım</string>
    <string name="surname">Soyisim</string>
    <string name="ToastMessage3">Lütfen İsim Giriniz</string>
    <string name="ToastMessage4">Lütfen Soyadı Giriniz</string>
    <string name="Age">Kaç Yaşındasın?</string>
    <string name="Age1">12-18</string>
    <string name="Age2">19-25</string>
    <string name="Age3">26-32</string>
    <string name="Age4">32+</string>
    <string name="next">Sonraki</string>
    <string name="male">Bay</string>
    <string name="female">Bayan</string>
    <string name="transport">Hangi Ulaşım Araçlarını Kullanmayı Tercih Ediyorsun?</string>
    <string name="bus">Otobüs</string>
    <string name="dolmush">Dolmuş</string>
    <string name="train">Tren</string>
    <string name="streetcar">Tramvay</string>
    <string name="finish">Bitir</string>
    <string name="ToastMessage5">En Az Birini Seçiniz</string>
    <string name="transit">Ulaşım Aracını Seçiniz</string>
    <string name="hint">Nereye Gidiyorsun?</string>
    <string name="welcome_back">Hoşgeldin</string>
    <string name="ToastMessage6">Lütfen Güzergah Giriniz</string>
    <string name="ToastMessage7">Şimdi Yolculuğu Başlatabilirsin</string>
    <string name="NotificationHead">Dolmuş</string>
    <string name="NotificationText">Bize Destek Olduğunuz İçin Teşekkürler</string>
    <string name="wait">Cevaplarınız Kaydediliyor Lütfen Bekleyiniz</string>
    <string name="empty">"  "</string>
</resources>
```
String yapımızı oluşturduktan sonra butonlarda kullanmak için bir "lets_start_button" adında bir xml dosyası oluşturacağız. Bunun için "drawable" klasörüne sağ tıklayarak
"Drawable Resource File" seçeneğini seçiyoruz. Dosyamızın adını verdikten sonra "OK" tuşuna tıklayarak dosyamızı oluşturuyoruz.

"lets_start_button.xml" dosyası:

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle" >
    <corners
        android:radius="30dp"
        />
    <solid
        android:color="#9F5252"
        />
    <padding
        android:left="0dp"
        android:top="0dp"
        android:right="0dp"
        android:bottom="0dp"
        />
    <size
        android:width="270dp"
        android:height="60dp"
        />
    <stroke
        android:width="3dp"
        android:color="#8A6D64"
        />
</shape>
```
Anasayfamızda kullanacağımız materyalleri hazırladıktan sonra activity_main.xml dosyasını hazırlamaya başlıyoruz. Burada yaptığımız ana tasarımı hazırlayacağız.
activity_main.xml dosyamızın tasarımını kod üzerinden yapacağız. Bunun için activity_main dosyamızı açtıktan sonra sağ üst kısımda buluna "Code", "Split" ve "Design" seçeneklerinde "Code" olanı kullanacağız.

"activity_main.xml" dosyamız bu şekilde olacak.

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="349dp"
        android:layout_height="148dp"
        android:fontFamily="@font/bungee_shade"
        android:gravity="center"
        android:text="@string/welcome"
        android:textColor="#9F5252"
        android:textSize="14sp"
        android:textStyle="bold"
        app:autoSizeMaxTextSize="36sp"
        app:autoSizeTextType="uniform"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.072" />

    <Button
        android:id="@+id/button3"
        android:layout_width="227dp"
        android:layout_height="65dp"
        android:background="@drawable/lets_start_button"
        android:fontFamily="@font/montserrat_bold"
        android:text="@string/lets_start"
        android:textAllCaps="false"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.896" />

    <EditText
        android:id="@+id/editTextTextPersonName"
        android:layout_width="243dp"
        android:layout_height="82dp"
        android:ems="10"
        android:fontFamily="@font/peralta"
        android:hint="@string/name"
        android:importantForAutofill="no"
        android:inputType="textPersonName"
        android:textColorHint="@color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.394" />

    <EditText
        android:id="@+id/editTextTextPersonName2"
        android:layout_width="247dp"
        android:layout_height="82dp"
        android:ems="10"
        android:fontFamily="@font/peralta"
        android:hint="@string/surname"
        android:importantForAutofill="no"
        android:inputType="textPersonName"
        android:textColorHint="@color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.512"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.579" />

    <RadioGroup
        android:id="@+id/radioGroup2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.71000004">

        <RadioButton
            android:id="@+id/radioButton3"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:checked="true"
            android:fontFamily="@font/peralta"
            android:minHeight="48dp"
            android:text="@string/male"
            tools:ignore="TouchTargetSizeCheck,TextContrastCheck" />

        <RadioButton
            android:id="@+id/radioButton4"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:fontFamily="@font/peralta"
            android:minHeight="48dp"
            android:text="@string/female" />
    </RadioGroup>


</androidx.constraintlayout.widget.ConstraintLayout>
```
Bu aşamadan sonra "Design" kısmına baktığımız zaman

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_6.png"/>
</p>


Bu şekilde bi tasarıma sahip olmamız gerekir. Tasarım kısmını bitirdikten sonra kodlama aşamasına geçiyoruz. Kodlama kısmında java programlama dilini kullanacağımızı projemizi oluştururken seçmiştik.

MainActivity.java dosyamız bu düzende olacak:

```
package com.example.dolmush;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    String prevStarted = "yes";

    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences sharedpreferences = getSharedPreferences(getString(R.string.app_name), Context.MODE_PRIVATE);
        if (!sharedpreferences.getBoolean(prevStarted, false)) {
            SharedPreferences.Editor editor = sharedpreferences.edit();
            editor.putBoolean(prevStarted, Boolean.TRUE);
            editor.apply();
        } else {
            moveToOtherActivity();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        Button lets_start_button = findViewById(R.id.button3);

        EditText name = findViewById(R.id.editTextTextPersonName);
        EditText surname = findViewById(R.id.editTextTextPersonName2);

        RadioGroup radioGroup = findViewById(R.id.radioGroup2);

        lets_start_button.setOnClickListener(v -> {

            if (name.getText().toString().trim().length() == 0){
                Toast.makeText(getApplicationContext(), R.string.ToastMessage3, Toast.LENGTH_SHORT).show();
            }else if (surname.getText().toString().trim().length() == 0){
                Toast.makeText(getApplicationContext(), R.string.ToastMessage4, Toast.LENGTH_SHORT).show();
            }else {

                int ID = radioGroup.getCheckedRadioButtonId();
                RadioButton radioButton = findViewById(ID);

                String sex =  radioButton.getText().toString();
                String personName = name.getText().toString();
                String personSurname = surname.getText().toString();

                SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(MainActivity.this);
                SharedPreferences.Editor editor = settings.edit();
                editor.putString("personName", personName);
                editor.putString("personSurname", personSurname);
                editor.putString("sex", sex);
                editor.apply();

                Intent intent = new Intent(this,Age.class);
                startActivity(intent);

            }
        });

    }

    public void moveToOtherActivity(){

        Intent intent = new Intent(this,Journey.class);
        startActivity(intent);
    }

    @Override
    public void onBackPressed() {

    }
}
```

Bu sayfanın tasarımını yaptıktan sonra ikinci sayfamız olan "age.xml" layoutunu oluşturuyoruz. Layoutu oluşturmadan önce bu sayfada kullanacağımız buton tasarım dosyasını 
"lets_start_button" kısmında yapığımız gibi oluşturuyoruz.

"next_button.xml" dosyası bu şekilde olacak:

```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle" >
    <corners
        android:radius="110dp"
        />
    <solid
        android:color="#9F5252"
        />
    <padding
        android:left="0dp"
        android:top="0dp"
        android:right="0dp"
        android:bottom="0dp"
        />
    <size
        android:width="180dp"
        android:height="45dp"
        />
    <stroke
        android:width="3dp"
        android:color="#878787"
        />
</shape>
```

"next_button.xml" dosyasını oluşturduktan sonra "age.xml" dosyasını oluşturuyoruz.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_7.png"/>
</p>


<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_8.png"/>
</p>


Dosyamızı oluşturduktan sonra dosya yapısının bu şekilde olması gerekiyor.

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <RadioGroup
        android:id="@+id/radioGroup"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <RadioButton
            android:id="@+id/radioButton10"
            android:layout_width="179dp"
            android:layout_height="55dp"
            android:checked="true"
            android:text="@string/Age1"
            tools:ignore="TextContrastCheck" />

        <RadioButton
            android:id="@+id/radioButton11"
            android:layout_width="179dp"
            android:layout_height="55dp"
            android:text="@string/Age2"
            tools:ignore="DuplicateSpeakableTextCheck" />

        <RadioButton
            android:id="@+id/radioButton12"
            android:layout_width="179dp"
            android:layout_height="55dp"
            android:text="@string/Age3" />

        <RadioButton
            android:id="@+id/radioButton13"
            android:layout_width="179dp"
            android:layout_height="55dp"
            android:text="@string/Age4" />

    </RadioGroup>

    <TextView
        android:id="@+id/textView2"
        android:layout_width="239dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:text="@string/Age"
        android:textColor="#9F5252"
        app:autoSizeMaxTextSize="36sp"
        app:autoSizeTextType="uniform"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.161" />

    <Button
        android:id="@+id/button"
        android:layout_width="170dp"
        android:layout_height="48dp"
        android:background="@drawable/next_button"
        android:text="@string/next"
        android:textAllCaps="false"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.877" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Bu aşamadan sonra "Design" kısmının bu şekildeki gibi olması gerekiyor.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_9.png"/>
</p>


age sayfamızın tasarımını tamamladıktan sonra java kısmına geçebiliriz. Bunun için app --> java --> com.example.dolmush klasörüne sağ tıklayarak New --> Java Class
seçeneğini seçiyoruz. Java dosyamızın adını "Age" yazarak enter tuşuna basıyoruz.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_10.png"/>
</p>

"Age.java"

```
package com.example.dolmush;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class Age extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.age);

        Button next_button = findViewById(R.id.button);

        RadioGroup radioGroup = findViewById(R.id.radioGroup);

        next_button.setOnClickListener(v -> {

            int ID = radioGroup.getCheckedRadioButtonId();
            RadioButton radioButton = findViewById(ID);
            String age =  radioButton.getText().toString();

            SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(Age.this);
            SharedPreferences.Editor editor = settings.edit();
            editor.putString("age", age);
            editor.apply();

            Intent intent = new Intent(Age.this,Transport.class);
            startActivity(intent);

        });

    }
}
```

"transport.xml" dosyasını oluşturuyoruz.

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView3"
        android:layout_width="342dp"
        android:layout_height="127dp"
        android:gravity="center"
        android:text="@string/transport"
        android:textColor="#9F5252"
        app:autoSizeMaxTextSize="48dp"
        app:autoSizeTextType="uniform"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.492"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.057" />

    <CheckBox
        android:id="@+id/radioButton"
        android:layout_width="188dp"
        android:layout_height="59dp"
        android:text="@string/dolmush"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.361" />

    <CheckBox
        android:id="@+id/radioButton2"
        android:layout_width="188dp"
        android:layout_height="59dp"
        android:text="@string/bus"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.483" />

    <CheckBox
        android:id="@+id/radioButton5"
        android:layout_width="188dp"
        android:layout_height="59dp"
        android:text="@string/train"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.596" />

    <CheckBox
        android:id="@+id/radioButton6"
        android:layout_width="188dp"
        android:layout_height="59dp"
        android:text="@string/streetcar"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.708" />

    <Button
        android:id="@+id/button4"
        android:layout_width="170dp"
        android:layout_height="48dp"
        android:background="@drawable/next_button"
        android:text="@string/finish"
        android:textAllCaps="false"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.877" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

"transport.xml" in tasarımının bu şekilde gözükmesi gerekiyor.

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_12.png"/>
</p>


Transport isminde bir java dosyası açıyoruz.

```
package com.example.dolmush;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Transport extends AppCompatActivity {

    Integer port = 5432;
    String host = "ec2-44-197-142-172.compute-1.amazonaws.com";
    String database = "dc8e8es3dfs8tj";
    String user = "wnoomsxmhltgdl";
    String pass = "444c9828fb61d52829262ee9d02ac48501f5c1b84d7884d31b973660ae8e5025";
    String url = "jdbc:postgresql://%s:%d/%s";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.transport);

        Button finish = findViewById(R.id.button4);

        CheckBox checkBox_dolmush = findViewById(R.id.radioButton);
        CheckBox checkBox_bus = findViewById(R.id.radioButton2);
        CheckBox checkBox_train = findViewById(R.id.radioButton5);
        CheckBox checkBox_streetcar = findViewById(R.id.radioButton6);

        finish.setOnClickListener(v -> {

            if (!checkBox_dolmush.isChecked() && !checkBox_bus.isChecked() && !checkBox_train.isChecked() && !checkBox_streetcar.isChecked()){
                Toast.makeText(getApplicationContext(), R.string.ToastMessage5, Toast.LENGTH_SHORT).show();
            }else {

                ProgressDialog progressDialog = new ProgressDialog(Transport.this);
                progressDialog.setMessage(getString(R.string.wait));
                progressDialog.show();

                List<String> transportList = new ArrayList<>();

                if (checkBox_dolmush.isChecked()){
                    transportList.add(checkBox_dolmush.getText().toString());
                }
                if (checkBox_bus.isChecked()){
                    transportList.add(checkBox_bus.getText().toString());
                }
                if (checkBox_train.isChecked()){
                    transportList.add(checkBox_train.getText().toString());
                }
                if (checkBox_streetcar.isChecked()){
                    transportList.add(checkBox_streetcar.getText().toString());
                }

                String transports = String.valueOf(transportList);

                SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(Transport.this);
                String personName = settings.getString("personName", "0");
                String personSurname = settings.getString("personSurname", "0");
                String sex = settings.getString("sex", "0");
                String age = settings.getString("age", "0");

                this.url = String.format(this.url, this.host, this.port, this.database);

                Thread thread = new Thread(() -> {
                    try {

                        Class.forName("org.postgresql.Driver");
                        Connection connection = DriverManager.getConnection(url, user, pass);
                        Statement stmt = connection.createStatement();
                        stmt.executeUpdate("INSERT INTO users(name, surname, gender, age, transport) VALUES ('" + personName + "'," + " '" + personSurname + "', '" + sex + "', '" + age + "', '" + transports + "')");
                        stmt.close();

                    } catch (Exception e) {

                        System.out.print(e.getMessage());
                        e.printStackTrace();
                    }
                });
                thread.start();
                try {
                    thread.join();
                } catch (Exception e) {
                    e.printStackTrace();
                }

                Intent intent = new Intent(Transport.this,Journey.class);
                startActivity(intent);
            }

        });
    }
}
```

Son layoutumuz olan "journey.xml" dosyasını oluşturuyoruz. Bu layoutta hacettepe logosu kullandığımız için bunu indirip res klasörünün içerisine atmanız gerekiyor.
github üzerinden bunu indirebilirsiniz

github-link

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_13.png"/>
</p>


```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button2"
        android:layout_width="226dp"
        android:layout_height="60dp"
        android:background="@drawable/lets_start_button"
        android:text="@string/location_button"
        android:textAllCaps="false"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.47"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.897" />

    <Spinner
        android:id="@+id/spinner2"
        android:layout_width="191dp"
        android:layout_height="53dp"
        android:tag="@string/Age1"
        app:layout_constraintBottom_toTopOf="@+id/button2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView4"
        app:layout_constraintVertical_bias="0.0"
        tools:ignore="SpeakableTextPresentCheck" />

    <TextView
        android:id="@+id/textView4"
        android:layout_width="236dp"
        android:layout_height="36dp"
        android:gravity="center"
        android:text="@string/transit"
        android:textColor="#1B1919"
        android:textSize="16sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.637" />

    <TextView
        android:id="@+id/textView5"
        android:layout_width="184dp"
        android:layout_height="42dp"
        android:gravity="center"
        android:text="@string/welcome_back"
        android:textColor="#000000"
        android:textSize="16sp"
        android:textStyle="bold"
        app:autoSizeMaxTextSize="24sp"
        app:autoSizeTextType="uniform"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.07"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.023" />

    <EditText
        android:id="@+id/editTextTextPersonName3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="@string/hint"
        android:importantForAutofill="no"
        android:inputType="textPersonName"
        android:minHeight="48dp"
        android:textColor="#000000"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/textView4"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.815"
        tools:ignore="TextContrastCheck" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="162dp"
        android:layout_height="129dp"
        android:contentDescription="@string/empty"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.191"
        app:srcCompat="@mipmap/mipmap_hacettepe" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

<p align="center">
  <img src="https://github.com/Kardelennkayaa/display_location/blob/master/Ekran Görüntüleri/Screenshot_14.png"/>
</p>


"Journey.java" dosyasını oluşturuyoruz.

```
package com.example.dolmush;

import android.Manifest;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public class Journey extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    String[] transportTypes = { "Dolmuş",
            "Otobüs",
            "Tren",
            "Tramvay"
    };

    String transport;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.journey);

        Button start_button = findViewById(R.id.button2);

        TextView welcome = findViewById(R.id.textView5);

        EditText editText = findViewById(R.id.editTextTextPersonName3);

        SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(Journey.this);
        String personName = settings.getString("personName", "0");

        String welcome_str = getString(R.string.welcome_back) + " " + personName;

        welcome.setText(welcome_str);

        Spinner spinner = findViewById(R.id.spinner2);
        spinner.setOnItemSelectedListener(this);

        ArrayAdapter arrayAdapter = new ArrayAdapter(this, android.R.layout.simple_spinner_item, transportTypes);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);

        start_button.setOnClickListener(v -> {

            if (editText.getText().toString().trim().length() == 0){
                Toast.makeText(getApplicationContext(), R.string.ToastMessage6, Toast.LENGTH_SHORT).show();
            }else if (ActivityCompat.checkSelfPermission(Journey.this
                    , Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                if (start_button.getText().toString().equals(getResources().getString(R.string.start_button))){
                    start_button.setText(R.string.finish_button);

                    String destination = editText.getText().toString();

                    SharedPreferences.Editor editor = settings.edit();
                    editor.putString("destination", destination);
                    editor.apply();


                    Intent intent = new Intent(getApplicationContext(),MyService.class);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        startForegroundService(intent);
                    } else {
                        startService(intent);
                    }
                } else if (start_button.getText().toString().equals(getResources().getString(R.string.finish_button))){
                    start_button.setText(R.string.start_button);

                    Toast.makeText(this, R.string.ToastMessageTwo, Toast.LENGTH_SHORT).show();

                    Intent intent = new Intent(getApplicationContext(),MyService.class);
                    stopService(intent);


                }
            } else {
                ActivityCompat.requestPermissions(Journey.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44);
                Toast.makeText(getApplicationContext(), R.string.ToastMessage7, Toast.LENGTH_SHORT).show();
            }

        });

    }

    @Override
    public void onBackPressed() {

    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

        transport = transportTypes[position];

        SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(Journey.this);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString("transitTypes", transport);
        editor.apply();

    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }
}
```

Son javadosyası olarak "MyService.java" dosyasını oluşturuyoruz.

```
package com.example.dolmush;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.preference.PreferenceManager;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.CancellationToken;
import com.google.android.gms.tasks.OnTokenCanceledListener;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class MyService extends Service {

    private static final int ID_SERVICE = 101;
    FusedLocationProviderClient fusedLocationProviderClient;

    Connection connection;

    Integer port = 5432;
    String host = "ec2-44-197-142-172.compute-1.amazonaws.com";
    String database = "dc8e8es3dfs8tj";
    String user = "wnoomsxmhltgdl";
    String pass = "444c9828fb61d52829262ee9d02ac48501f5c1b84d7884d31b973660ae8e5025";
    String url = "jdbc:postgresql://%s:%d/%s";
    String latitude, longitude;

    Timer timer = new Timer();

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onCreate() {
        super.onCreate();

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        String channelId = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ? createNotificationChannel(notificationManager) : "";
        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, channelId);
        Notification notification = notificationBuilder.setOngoing(true)
                .setSmallIcon(R.mipmap.mipmap_hacettepe)
                .setCategory(NotificationCompat.CATEGORY_SERVICE)
                .setContentTitle(getString(R.string.NotificationHead))
                .setContentText(getString(R.string.NotificationText))
                .build();

        startForeground(ID_SERVICE, notification);

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        Toast.makeText(this, R.string.ToastMessageTwo, Toast.LENGTH_SHORT).show();
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                getLocation();
            }
        };
        timer.schedule(timerTask, 0, 60000);

        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            stopForeground(true);
        }

        timer.cancel();
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private String createNotificationChannel(NotificationManager notificationManager){
        String channelId = "my_service_channel_id";
        String channelName = "My Foreground Service";
        NotificationChannel channel = new NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH);
        channel.setImportance(NotificationManager.IMPORTANCE_NONE);
        channel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        notificationManager.createNotificationChannel(channel);
        return channelId;
    }

    private void getLocation() {

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;

        }

        fusedLocationProviderClient.getCurrentLocation(105, new CancellationToken() {
            @Override
            public boolean isCancellationRequested() {
                return false;
            }

            @NonNull
            @Override
            public CancellationToken onCanceledRequested(@NonNull OnTokenCanceledListener onTokenCanceledListener) {
                return null;

            }
        }).addOnCompleteListener(task -> {

            Location location = task.getResult();
            if (location != null) {

                try {

                    Geocoder geocoder = new Geocoder(MyService.this
                            , Locale.getDefault());

                    List<Address> addresses = geocoder.getFromLocation(
                            location.getLatitude(), location.getLongitude(), 1
                    );

                    latitude = Double.toString(addresses.get(0).getLatitude());
                    longitude = Double.toString(addresses.get(0).getLongitude());

                    connect();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void connect() {

        this.url = String.format(this.url, this.host, this.port, this.database);

        Thread thread = new Thread(() -> {
            try {

                SharedPreferences settings = PreferenceManager.getDefaultSharedPreferences(MyService.this);
                String personName = settings.getString("personName", "0");
                String personSurname = settings.getString("personSurname", "0");
                String transitType = settings.getString("transitTypes", "0");
                String destination = settings.getString("destination", "0");

                String PersonName = personName + " " +  personSurname;

                String sex = settings.getString("sex", "0");
                String age = settings.getString("age", "0");

                Date date = new Date();
                Class.forName("org.postgresql.Driver");
                connection = DriverManager.getConnection(url, user, pass);
                Statement stmt = connection.createStatement();
                stmt.executeUpdate("INSERT INTO datas(recorder, gender, age, transit_type, destination, geom, date) VALUES" +
                        " ('" + PersonName + "', '" + sex + "' , '" + age + "', '" + transitType +
                        "', '" + destination + "' ,ST_SetSRID(ST_MakePoint("+ longitude +","+ latitude +"),4326), '" + date + "')");
                stmt.close();

            } catch (Exception e) {

                System.out.print(e.getMessage());
                e.printStackTrace();
            }
        });
        thread.start();
        try {
            thread.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```









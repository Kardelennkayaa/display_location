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
        height:92%;
        position:fixed
      }
   

    .button1 {
        background-color: #BA55D3;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
    } 
    .open-button {
        background-color: #BA55D3;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        }
    #container{
        display:inline-block;
    }
    
    .form-popup {
        position: fixed;
        display: none;
        border: 4px solid #FDF5E6 ;
     }
    
    
</style>
<title>Display Location</title>
</head>
<body>
    <div class="map" id="mapdiv">  
        <div id="container">
            <button id="home" class="button button1" onClick="window.location.reload();">Home</button>
            <button class="open-button" onclick="selectBy_recorder()">Select by Recorder</button><br>
        </div><br>
        <br><select id="recorder_options">
        </select><br>
        <br><input class="SubmitButton" type="button" value="Submit" onclick="submit_recorder()" />
           <div class="form-popup" id="open_entry">
            <label for="rname">Recorder name:<br></label><br>
            <input type="text" id="rname" name="rname"><br>
            <button onclick="submit_recorder()">Submit</button>
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
          document.getElementById("recorder_options").style.display = "block";
        }
 </script>
  </body>
  </html>

           
        

   ```
  
Burada altlık harita için **OpenLayers** kullanılmıştır. Ayrıca **Jquery** kütüphanesinin kullanılma amacı da veritabanına **select** komutu ile gönderilmiş olunan sorguların yanıtını almaktır. 
Ayrıca güvenlik politikası, web sayfasını **HTTPS** protokolü olarak çalıştırabilmek için eklenmiştir. Hazırlanan **index.html** kodu ile veritabanından alınan konum verileri öznitelikleri ile birlikte OpenLayers haritası üzerinde görselleştirilmiştir. 

Oluşturulan web arayüzünde; verilerin ulaşım aracı bilgisi, otobüs ya da dolmuş olmasına göre belirli bir icon ile sembolize edilmiştir. Ayrıca veriyi niteleyen icona basılarak da veri ile ilgili öznitelik bilgilerine erişilebilir. 


Arayüzde **Home** ve **Select by Recorder** olarak iki adet buton bulunmaktadır. **Select by Recorder** butonu yardımı ile spesifik bir **Recorder** ismi yazılarak, belirtilen kişinin kaydettiği veriler görselleştirilebilir. Bir diğer buton olan **Home** butonu ile de arayüz tekrar yüklenerek veritabanında kayıtlı olan tüm verilere erişilebilir.

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

İndirdikten sonra .[bu linkteki](-------------------) adımları takip ederek Android Studio kurulumunu tamamlayabilirsiniz.

### Projenin Oluşturulması

Projemizi yapmaya new project seçeneğini seçerek başlıyoruz. Karşımıza gelen ilk ekranda "Phone and Tablet seçeneği ile "Empty Activity" seçeneklerini seçerek Next tuşuna tıklıyoruz.

ss-1

*Sonraki adımda ise projemizin ismini belirliyoruz.

-Name: Projenin Adı
+Package Name: Uygulamının paket adı. (com.example kısmından sonra otomatik olarak projenin adını alır.)
-Save Location: Projenin kaydedileceği yer
+Language: Kodlamanın yapılcağı programlama dili. (Biz bu uygulamada Java yı kullanacağız.)
-Minimum SDK: Bu kısımda uygulamamızın destekleyeceği en düsük android sürümünü belirliyoruz. (Biz API 23 kullanıyoruz.)
+"Using legeacy android.support library" seçeneğini işaretliyerek, en son versiyon android servislerini kullanacağız.

SS-2

Bu adımları tamamladıktan sonra "Finish" butonuna tıklayarak projemize giriş yapıyoruz.

Projemizin yüklenmesi bilgisayarın durumuna göre 5 dakika kadar sürebilir. Proje yüklendikten sonra ekranımzıda MainActivity.java ve activity_main.xml adında 2 farklı dosya açılacak. Android studio da xml dosyaları tasarım, java dosalarını kodlama kısmı için kullanacağız. Projemizin ilk adımı olarak anasayfamızın layout düzenini activity_main.xml dosyası üzerinde yapacağız. Bunu yapmadan önce uygulamamızın daha kullanışlı olabilmesi için farklı dil desteklerini kullanacağız. Ekranımızın sol kısmında res --> values -- >>
strings.xml dosyasını açıyoruz. Dosyayı açtığımız zaman sağ üst kısımda "Open Editor" seçeneğini seçiyoruz.

ss-3

Translations Editors sayfası açılınca burad Dünya İşaretine tıklayarak "Türkçe" seçeneğini seçiyoruz ve çıkan uyarıya "add" diyoruz.

ss-4

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





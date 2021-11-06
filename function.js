
var x=0;
function submit_recorder()
{   
    
    markers.clear();
    vectorLayer.clear();
    if (x == 0) {
        document.getElementById('rname').classList.add("change");
        x = 1;
    } else {
        document.getElementById('rname').classList.remove("change");
        x = 0;
        window.location.reload();
        submit_recorder();
    }
    var recorder_name = document.getElementById('rname').value

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
    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    //TODO - data haritaya ekleme işlemi
    for (point = 0; point < data.length; point++) {
        
    var rec=data[point].recorder;
    var gen=data[point].gender;
    var tra=data[point].transit;
    var lon=data[point].longitude;
    var lat=data[point].latitude;
      
    
    
    if (recorder_name==rec){
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
});
}
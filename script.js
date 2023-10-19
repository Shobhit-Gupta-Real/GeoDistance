let CURRENT_LOCATION = null;
let A=null;
let B=null;

function main(){
    let geolocation=null;
    if(window.navigator && window.navigator.geolocation){
        geolocation = window.navigator.geolocation;
    }
    if(geolocation){
        geolocation.watchPosition(onLocationUpdate, onError,{
            enableHighAccuracy: true,
            maximumAge: 1000
        })
    }else{
        alert('Cannot access the location')
    }
}

function onLocationUpdate(event){
    CURRENT_LOCATION = event.coords;
    document.getElementById("loc").innerHTML=
    "Your Location:<br>Lat: "+CURRENT_LOCATION.latitude+
    "<br>Lon: "+CURRENT_LOCATION.longitude;
}
function onError(err){
    alert('cannot access the location'+err);
}

function setA(){
    A= CURRENT_LOCATION;
    updateInfo();
}

function setB(){
    B= CURRENT_LOCATION;
    updateInfo();
}

function updateInfo(){
    if(A!=null){
        document.getElementById("aBtn").innerHTML=A.latitude+"<br>"+A.longitude;
    }
    if(B!=null){
        document.getElementById("bBtn").innerHTML=B.latitude+"<br>"+B.longitude;
    }
    if(A!=null && B!=null){
        let dist = getDistance(A,B);
        document.getElementById("info").innerHTML=
        "Distance: "+dist+" meters";
    }
}

function latlontoxyz(latlon, R){
    const xyz = {x:0, y:0, z:0}
    xyz.y = Math.sin(degtorad(latlon.latitude))*R;
    const r = Math.cos(degtorad(latlon.latitude))*R;
    xyz.x=Math.sin(degtorad(latlon.longitude))*r;
    xyz.z=Math.cos(degtorad(latlon.longitude))*r;
    return xyz; 
}

function degtorad(angle){
    return angle*Math.PI/180;
}

function euclidean(xyz1, xyz2){
    return Math.sqrt((xyz1.x-xyz2.x)*(xyz1.x-xyz2.x)+
    (xyz1.y-xyz2.y)*(xyz1.y-xyz2.y)+
    (xyz1.x-xyz2.z)*(xyz1.x-xyz2.z));
};

function getDistance(A, B){
    const R = 6371000;
    const xyz1 = latlontoxyz(A, R);
    const xyz2 = latlontoxyz(B, R);
    const eucldist = euclidean(xyz1, xyz2);
    return eucldist;
}
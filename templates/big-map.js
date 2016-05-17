function showAround(me) {
    var map = "map = new google.maps.Map(document.getElementById('bigMap'), {center: " + me + ", zoom: 16});";
    var marker = "var marker = new google.maps.Marker({ position: " + me + ", map: map});";

    var notes = Notes.find({});
    var notesCount = notes.count();
    var markersAround = "";
    var i = 0;

    notes.forEach(function(note) {
        var loc = "{lat: " + note.geo.lat + ", lng: " + note.geo.lon + "}";
        var str = "var str" + i + " = '<h6><a href=\"/view/" + note._id + "\">" + note.title + "</a></h6>';";
        var win = "var win" + i + " = new google.maps.InfoWindow({content: str" + i + "});";
        var mrk = "var mrk" + i + " = new google.maps.Marker({ position: " + loc + ", map: map, title: '" + note.title + "'});"
        var lst = "mrk" + i + ".addListener('click', function() {win" + i + ".open(map, mrk" + i + ")});";

        markersAround += str + win + mrk + lst;
        i++;
    });

    console.log(markersAround);

    $(".main-container").append("<script> var map; function initMap() {" + map + marker + markersAround + "}</script>");
    $(".main-container").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBN1SRvtQWGX3rklQsttdw6WI-Rb8bg6u8&callback=initMap' async defer></script>");
}

if (Meteor.isClient) {
    Template.bigMap.onRendered(function() {
        this.autorun(function () {

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    me = "{lat: " + position.coords.latitude + ", lng: " + position.coords.longitude + "}";
                    showAround(me);
                });
            } else {
                me = "{lat: 40.7128, lng: -74.0059}";
                showAround(me);
            }

        });
    });

    Template.bigMap.events({
        'click #plus': function() {
            Router.go("/new");
        }
    });
}

if (Meteor.isClient) {

    Template.showNote.events({
        'click #world': function() {
            Router.go("/");

        }
    });

    Template.showNote.onRendered(function() {
        this.autorun(function () {
            var data = Template.currentData();
            if (data) {
                var lat = data.geo.lat;
                var lon = data.geo.lon;
                var t = colorSchemes[data.colorScheme].t;
                var d = colorSchemes[data.colorScheme].d;

                var location = "{lat: " + lat + ", lng: " + lon + "}";
                var map = "map = new google.maps.Map(document.getElementById('map'), {center: " + location + ", zoom: 16});";
                var marker = "var marker = new google.maps.Marker({ position: " + location + ", map: map});";

                $("h1").css("background-color", t);
                $("p").css("background-color", d);

                $(".main-container").append("<script> var map; function initMap() {" + map + marker + "}</script>");
                $(".main-container").append("<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBN1SRvtQWGX3rklQsttdw6WI-Rb8bg6u8&callback=initMap' async defer></script>");

                var wikiContents = document.getElementById('wiki');
                wikiContents.innerHTML = wikiContents.innerHTML.wiki2html();

            }
        });
    });
}

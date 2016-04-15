if (Meteor.isClient) {

    function generateKey() {
        var i;
        var key = "";
        var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (i = 0; i < 15; i++)
            key += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        return key;
    }

    Template.addNote.events({
        'submit form': function () {
            event.preventDefault();

            var title = $("#title").val().trim();
            var description = $("#description").val().trim();

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    Meteor.call("addNote", title, description, {"lat": lat, "lon": lon}, generateKey());
                });
            }
            else {
                Meteor.call("addNote", title, description, {"lat": 0, "lon": 0}, generateKey());
            }
        }
    });

}

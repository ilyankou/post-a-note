Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    notes: function () {
      return Notes.find({});
    }
  });

  Template.newNote.events({
    'submit form': function () {
      event.preventDefault();

      var title = $("#title").val().trim();
      var description = $("#description").val().trim();
      var lat, lon;

      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              Meteor.call("addNote", title, description, {"lat": lat, "lon": lon});

          });
      }
      else {
            Meteor.call("addNote", title, description, {"lat": 0, "lon": 0});
      }

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Meteor.methods({
    addNote: function(title, description, geo) {
        Notes.insert({
            title: title,
            description: description,
            file: "",
            createdAt: new Date(),
            geo: geo,
        });
    }
});

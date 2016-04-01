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
      Meteor.call("addNote", title, description);

      console.log(title);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Meteor.methods({
    addNote: function(title, description) {
        Notes.insert({
            title: title,
            description: description,
            file: "",
            createdAt: new Date(),
            geo: "",
        });
    }
});

if (Meteor.isClient) {

    Template.editNote.events({
      'submit form': function () {
        event.preventDefault();

        var title = $("#title").val().trim();
        var description = $("#description").val().trim();
        var showLocation = 1;

        Meteor.call("updateNote", this._id, title, description, showLocation);
        Router.go("/view/" + this._id);
      }

  });

}

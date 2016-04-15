if (Meteor.isClient) {

Template.showAll.helpers({
   notes: function() {
       return Notes.find({});
   }
});

}

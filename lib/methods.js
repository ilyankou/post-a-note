Meteor.methods({
    addNote: function(title, description, geo, key) {
        Notes.insert({
            title: title,
            description: description,
            date: new Date(),
            geo: geo,
            showLocation: 1,
            key: key
        });
    },

    updateNote: function(id, title, description, showLocation) {
        Notes.update(id, {
            $set: {
                title: title,
                description: description,
                showLocation: showLocation
            }
        });
    }
});

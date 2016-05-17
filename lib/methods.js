Meteor.methods({
    addNote: function(title, description, geo, colorScheme, key) {
        var id = Notes.insert({
            title: title,
            description: description,
            date: new Date(),
            geo: geo,
            showLocation: 1,
            key: key,
            colorScheme: colorScheme
        });

        return id;
    },

    updateNote: function(id, title, description, colorScheme) {
        Notes.update(id, {
            $set: {
                title: title,
                description: description,
                colorScheme: colorScheme
            }
        });
    }
});

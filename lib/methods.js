Meteor.methods({
    addNote: function(title, description, geo, colorScheme, key) {
        var id = Notes.insert({
            title: title,
            description: description,
            date: new Date(),
            lastAccessed: new Date(),
            geo: geo,
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
                colorScheme: colorScheme,
                lastAccessed: new Date()
            }
        });
    }
});

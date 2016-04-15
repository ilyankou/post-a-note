Router.configure({
    layoutTemplate: "layout",
});

Router.route("/", {
    template: "addNote"
});

Router.route("/new", {
    template: "addNote"
});

Router.route("/showAll");

Router.route("/view/:id", {
    template: "showNote",

    data: function() {
        return Notes.findOne({ "_id" : this.params.id });
    }
});

Router.route("/edit/:key", {
    template: "editNote",

    data: function() {
        return Notes.findOne({ "key" : this.params.key });
    }
});

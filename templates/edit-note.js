colorSchemes = {
    'standard': {'t': "#7bc8a4", 'd': "#93648d"},
    'move-up': {'t': "#340926", 'd': "#EFC31F"},
    'dano-red': {'t': "#D03958", 'd': "#E3D5B8"},
    'woods': {'t': "#1A3C3D", 'd': "#84A174"},
    'more-than-enough': {'t': "#665178", 'd': "#A9CDC3"},
    'dano-aqua': {'t': "#95D1C5", 'd': "#E3D5B8"},
    'last-summer': {'t': "#EFE700", 'd': "#004E72"},
    'casual-tuesday': {'t': "#9DE7A0", 'd': "#DAE2C1"},
    'baby-talk': {'t': "#26DEBC", 'd': "#E98B7D"},
    'vanilla-peace': {'t': "#9AA4FE", 'd': "#E0EA90"},
    'dawn-watch': {'t': "#003A54", 'd': "#325D6F"},
    'octopod-hotel': {'t': "#F1EADC", 'd': "#1493A5"},
    'dynamo': {'t': "#E42369", 'd': "#CEFFBD"},
    'young-alice': {'t': "#25B38F", 'd': "#FABED6"},
    'pavlov': {'t': "#DDE91E", 'd': "#E64572"},
    'see-me': {'t': "#26DEBC", 'd': "#CC4686"},
    'velvet': {'t': "#B00029", 'd': "#EC6348"}
}

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

if (Meteor.isClient) {
    String.prototype.replaceAt = function(index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }

    function inc(a) {
        switch (a.toLowerCase()) {
            case '0': return '1'; break;
            case '1': return '2'; break;
            case '2': return '3'; break;
            case '3': return '4'; break;
            case '4': return '5'; break;
            case '5': return '6'; break;
            case '6': return '7'; break;
            case '7': return '8'; break;
            case '8': return '9'; break;
            case '9': return 'a'; break;
            case 'a': return 'b'; break;
            case 'b': return 'c'; break;
            case 'c': return 'd'; break;
            case 'd': return 'e'; break;
            default : return 'f'; break;
        }
    }

    function longEnough() {
        if (($("#description").val().trim().length > 10) &&
            ($("#title").val().trim().length > 2)) {
                return 1;
            }
        return 0;
    }

    Template.editNote.onRendered(function() {
        var placeholderColors = "<style>";

        $.each(colorSchemes, function(color, data) {
            var li = "<li class='" + color + "'>";
            li += "<div class='color-picker-title' style='background-color: " + data.t + "'></div>";
            li += "<div class='color-picker-description' style='background-color: " + data.d + "'></div>";
            li += "</li>";
            $("#color-picker").append(li);

            var t = data.t;
            var d = data.d;

            for (var i = 1; i <= 6; i++) {
                t = t.replaceAt(i, inc(t.charAt(i)));
                d = d.replaceAt(i, inc(d.charAt(i)));
            }

            placeholderColors += "#title." + color + "::-webkit-input-placeholder {color:" + t + ";}";
            placeholderColors += "#description." + color + "::-webkit-input-placeholder {color:" + d + ";}";
        });

        $("body").append(placeholderColors);

        var carousel = $("#color-picker");
        carousel.itemslide({start: 8});

        $("#color-picker li").click(function() {
            var scheme = $(this).attr("class").split(' ')[0];
            var t = colorSchemes[scheme].t;
            var d = colorSchemes[scheme].d;

            $(".title").css("background-color", t);
            $(".description").css("background-color", d);

            $.each(colorSchemes, function(scheme, data) {
                $("#title, #description").removeClass(scheme);
            });

            $("#title, #description").addClass(scheme);
        });

        $("#color-picker li.baby-talk").click();

        $(window).resize(function() {
            carousel.reload();
        });

        $("#description, #title").keyup(function() {
            if (longEnough()) {
                $("#post-button").attr("disabled", false);
            } else {
                $("#post-button").attr("disabled", true);
            }
        });

    });

    function generateKey() {
        var i;
        var key = "";
        var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (i = 0; i < 30; i++)
            key += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        return key;
    }

    Template.editNote.events({
        'click #world': function() {
            Router.go("/");
        },

        'submit form': function () {
            event.preventDefault();

            var title = $("#title").val().trim();
            var description = $("#description").val().trim();
            var colorScheme = $(".itemslide-active").attr("class").split(' ')[0];

            Meteor.call("updateNote", this._id, title, description, colorScheme);
            Router.go("/view/" + this._id);
        }
    });

}

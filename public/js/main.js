$('document').ready(function() {

    console.log('test gc')

    function show(word) {
        return function() {
            console.log(word)
            var selector = "a[href$='" + word + "'] > span"
            $(selector).addClass('active')
            var section = '#' + word
            $(section)
                .css("display", "flex")
                .hide()
                .fadeIn(500)
        }
    }

    function leave(word) {
        return function() {
            var selector = "a[href$='" + word + "'] > span"
            $(selector).removeClass('active')
            var section = '#' + word
            $(section).hide()
        }
    }

    var routes = {
        '/network': {
            on: show('network'),
            after: leave('network')
        },
        '/token': {
            on: show('token'),
            after: leave('token')
        },
        '/platform': {
            on: show('platform'),
            after: leave('platform')
        },
        '/e-residence': {
            on: show('e-residence'),
            after: leave('e-residence')
        },
        '/join': {
            on: show('join'),
            after: leave('join')
        },
        '/docs': {
            on: show('docs'),
            after: leave('docs')
        },
        '/home': {
            on: show('home'),
            after: leave('home')
        },
        '*': function(argument) {
            console.log('redirect trash');
            router.setRoute('home')
        }
    };

    var router = Router(routes);

    router.init();
    router.setRoute('home');

    $(window).on('scroll', function() {
        console.log('scroll Fired');
    });

});
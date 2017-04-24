$(function(){
    $(".rp-circle").qtip({
    content: {
        text: 'Modal plugin element'
    },
    position: {
        'target': 'mouse'
    },
    events: {
        render: function(event, api) {
            // Grab the overlay element
            var elem = api.elements.overlay;
        }
    }
    });
});
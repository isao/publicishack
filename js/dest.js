function getThumbs(pics) {

    function destinationsCb(yqlresp) {
    	renderThumbs(yqlresp.query.results.size);
    	scrollView();
    }

    YUI().use('yql', function (Y) {
        if(pics) {
            renderThumbs(pics);
            scrollView();
        } else {
        	Y.YQL(qry1, destinationsCb);
        }
    });
};

function renderThumbs(pics) {
    YUI().use('handlebars', 'node-base', function(Y) {
        var tmpl = Y.one('#items-hb').getHTML(),
            hand = Y.Handlebars.compile(tmpl),
            out = hand({squares: pics});

        Y.one("#thumbs").setHTML(out);
    });
}

function scrollView() {
	YUI().use('scrollview', function(Y) {
        var sv = new Y.ScrollView({
                id: 'yui-sv',
                srcNode: '#thumbs',
                width: 1020,
                flick: {axis: 'x', minDistance: 12, minVelocity: 0.3}
            });
    
        sv.render();
    
        // Prevent default image drag behavior
        sv.get('contentBox').delegate('mousedown', function(e) {
            e.preventDefault();
        }, 'img');
    });
}

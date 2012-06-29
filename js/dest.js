function getThumbs(pics) {

    function destinationsCb(yqlresp) {
        renderThumbs(yqlresp.query.results.size);
        scrollView();
        thumbClicks();
    }

    YUI().use('yql', function (Y) {
        var qry = 'select source from flickr.photos.sizes where photo_id in (select id from flickr.photos.search(1) where woe_id in (select woeid from geo.places(1) where text in ("Acapulco","Accra","Amsterdam","Antigua","Athens","Atlanta","Bangkok","Barcelona","Beijing","Belize City","Bermuda","Berlin","Boston","Brussels","Budapest","Buenos Aires","Busan","Cabo San Lucas","Cancun","Copenhagen","Dubai","Dusseldorf","Frankfurt","Freeport","Guam","Guayaquil","Hong Kong","Honolulu","Istanbul","Johannesburg","Kingston","Lagos","London","Las Vegas","Los Angeles","Madrid","Malaga","Managua","Manchester","Manila","Miami","Milan","Minneapolis","Mumbai","Nagoya","Nassau Bahamas","New York","Nice","Osaka","Koror Palau","Paris","Pisa","Port of Spain","Portland","Prague","Quito","Rio de Janeiro","Rome","Saipan","Salt Lake City","San Diego","San Francisco","San Jose","San Juan","San Pedro Sula","San Salvador","Santiago","Santo Domingo","Sao Paulo","Seattle","Seoul","Shanghai","Shannon","Singapore Singapore","Stockholm","Sydney","Taipei","Tel Aviv","Tokyo","Grand Turk","Venice","Washington DC","Zurich")) and sort="interestingness-desc" and min_taken_date = "2000-01-01 00:00:00" and api_key="5b7b21a3d44ed659e13410edee783a3b") and api_key="5b7b21a3d44ed659e13410edee783a3b" and label="Large"';
        if(pics) {
            renderThumbs(pics);
            scrollView();
            thumbClicks();
        } else {
            Y.YQL(qry, destinationsCb);
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

function thumbClicks() {
    YUI().use('node-event-delegate', function (Y) {

        Y.one('#thumbs').delegate('click', function() {
            var src = this.get('src'),
                file = encodeURI(src);//.replace(/^.*[\\\/]/, '');
            
            Y.one('a.next').set('href', 'hotel.html?file=' + file);
            Y.one('div.foo').set('innerHTML', '<img src=' + src + ' width="670" height="455">');
            
        }, 'img');

    });
}

function fetchLocation(file) {
	var qry = 'select * from flickr.photos.info where photo_id=@filename and api_key="5b7b21a3d44ed659e13410edee783a3b"';

    Y.YQL(qry, function(r) {
        town = r.query.results.photo.location.locality.content;
        country = r.query.results.photo.location.country.content;
        fetchHotels(town,country);
    }, param);
}

function fetchHotels(town, country) {
        console.log(town+", "+country);
        var tc = encodeURIComponent(town+", "+country),
            qry = 'select * from html where url="http://nodeunblocker.com/proxy/http://www.tripadvisor.com/Search?q='+tc+'" and xpath = "//div[@class=\'sizedThumb\']/img"';

        Y.YQL(qry, function(r) {
            //console.log(r.query.results.img);
            for (var x=0;x<r.query.results.img.length;x++) {
                hotel = r.query.results.img[x].alt;
                var imgsrc = r.query.results.img[x].src;
                imgsrc = "http://"+imgsrc.split("http://")[2];
 
                if (imgsrc.indexOf("ProviderThumbnails") > -1) {
                    imgsrc = imgsrc.substr(0,imgsrc.indexOf(".jpg"));
                    imgsrc = imgsrc + "large.jpg";
                } else if (imgsrc.indexOf("photo-t") > -1) {
                    imgsrc = imgsrc.replace("photo-t","photo-s");
                }
                console.log(hotel);
                console.log(imgsrc);
            }
        });
    }

var pics = [
        {"source":"http://farm5.staticflickr.com/4088/5073443550_815cf3fe96_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6019/6277690839_6a89ced673_s.jpg"},
        {"source":"http://farm1.staticflickr.com/227/549869910_c60ef2b85f_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5220/5386422302_1a9b1b8021_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7057/7110708847_be6d688d15_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6207/6137618758_1a588bcd0d_s.jpg"},
        {"source":"http://farm5.staticflickr.com/4076/4877731525_a6150d5432_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6125/5993566040_cbc0761c6a_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5225/5655640104_656fab73d2_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6010/5966646370_059e5e61de_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5121/5329032378_221f11f210_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6011/5980878371_5a90e63e61_s.jpg"},
        {"source":"http://farm5.staticflickr.com/4127/5051650193_c9822f376b_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6069/6148147391_a5f73327e1_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6030/5968941345_cacd2efcba_s.jpg"},
        {"source":"http://farm4.staticflickr.com/3615/4011354393_fdea176a43_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5241/5292620662_50123bb64d_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7215/7308177568_69f2c8011c_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7161/6746470271_1cee0d6241_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5041/5279489281_efaf4b8316_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7060/6883868131_ab2697aa99_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7061/6801487870_667bd85c0d_s.jpg"},
        {"source":"http://farm1.staticflickr.com/88/249761536_2e74aef49f_s.jpg"},
        {"source":"http://farm5.staticflickr.com/4003/4517193235_0bcf8782bb_s.jpg"},
        {"source":"http://farm9.staticflickr.com/8014/7164504085_16c767a85f_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7073/7276356312_19b73eea30_s.jpg"},
        {"source":"http://farm6.staticflickr.com/5246/5352088356_7f627e0858_s.jpg"},
        {"source":"http://farm4.staticflickr.com/3463/3797206611_9e8f2ec53b_s.jpg"},
        {"source":"http://farm7.staticflickr.com/6092/6333806872_9e209a6400_s.jpg"},
        {"source":"http://farm8.staticflickr.com/7005/6387335995_56184a6e82_s.jpg"}
    ],
    qry1 = 'select source from flickr.photos.sizes where photo_id in (select id from flickr.photos.search(1) where woe_id in (select woeid from geo.places(1) where text in ("Acapulco","Accra","Amsterdam","Antigua","Athens","Atlanta","Bangkok","Barcelona","Beijing","Belize City","Bermuda","Berlin","Boston","Brussels","Budapest","Buenos Aires","Busan","Cabo San Lucas","Cancun","Copenhagen","Dubai","Dusseldorf","Frankfurt","Freeport","Guam","Guayaquil","Hong Kong","Honolulu","Istanbul","Johannesburg","Kingston","Lagos","London","Las Vegas","Los Angeles","Madrid","Malaga","Managua","Manchester","Manila","Miami","Milan","Minneapolis","Mumbai","Nagoya","Nassau Bahamas","New York","Nice","Osaka","Koror Palau","Paris","Pisa","Port of Spain","Portland","Prague","Quito","Rio de Janeiro","Rome","Saipan","Salt Lake City","San Diego","San Francisco","San Jose","San Juan","San Pedro Sula","San Salvador","Santiago","Santo Domingo","Sao Paulo","Seattle","Seoul","Shanghai","Shannon","Singapore Singapore","Stockholm","Sydney","Taipei","Tel Aviv","Tokyo","Grand Turk","Venice","Washington DC","Zurich")) and sort="interestingness-desc" and min_taken_date = "2000-01-01 00:00:00" and api_key="5b7b21a3d44ed659e13410edee783a3b") and api_key="5b7b21a3d44ed659e13410edee783a3b" and label="Large"',
    qry2 = 'select * from flickr.photos.info where photo_id=@filename and api_key="5b7b21a3d44ed659e13410edee783a3b"';

// YUI().use('node-event-delegate', 'yql', function (Y) {
//    
//     function afterDestYql(r) {
//    	    Y.Array.each(r.query.results.size, function(item) {
//    	    	pics.push({thumb:item.source});
//    	    });
//    	    console.log(pics);
//     }
// 
//     Y.YQL(qry1, afterDestYql);
// });

YUI().use('handlebars', 'node-base', function(Y) {
    var tmpl = Y.one('#items-hb').getHTML(),
        hand = Y.Handlebars.compile(tmpl),
        out = hand({squares: pics /*pics.slice(0, 9)*/});

    Y.one("#thumbs").setHTML(out);
});

YUI().use('scrollview', function(Y) {
    var sv = new Y.ScrollView({
            id: 'yui-sv',
            srcNode: '#thumbs',
            width: 1020,
            flick: {axis: 'x', minDistance: 12, minVelocity: 0.3,}
        });

    sv.render();

    // Prevent default image drag behavior
    sv.get('contentBox').delegate('mousedown', function(e) {
        e.preventDefault();
    }, 'img');
});

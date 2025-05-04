const map = new maplibregl.Map({
    container: 'map',
    style: 'https://raw.githubusercontent.com/gtitov/basemaps/refs/heads/master/positron-nolabels.json',
    center: [40, 55],
    zoom: 3
});

map.on("load", () => {
    map.addSource("cities", {
        type: "geojson",
        data: 'http://127.0.0.1:5000/cities/2018'
    })

    map.addLayer({
        id: 'cities-layer',
        source: 'cities',
        type: "circle",
        paint: {
            "circle-stroke-width": 1,
            "circle-stroke-color": "#FFF",
            'circle-color': [
                'interpolate', ['linear'],
                ['get', 'total_points'],
                50, '#d7191c',
                150, '#ffffbf',
                250, '#1a9641'
            ],
            "circle-opacity": 0.8,
            // "circle-radius": [
            //     "match",
            //     ["get", "group_name"],
            //     "Малый город", 3,
            //     "Средний город", 6,
            //     'Большой город', 6,
            //     'Крупный город', 8,
            //     'Крупнейший город', 12,
            //     0 // остальные
            // ]
        }
    })
})

map.on("click")
// fetch("http://127.0.0.1:5000/cities/2018")
//     .then((response) => response.json())
//     .then((json) => console.log(json))
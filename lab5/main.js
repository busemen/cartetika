const map = new maplibregl.Map({
    container: 'map',
    style: 'https://raw.githubusercontent.com/gtitov/basemaps/refs/heads/master/positron-nolabels.json',
    center: [51, 0],
    zoom: 4
})

map.on("load", () => {
    map.addSource('grid', {
        type: "vector",
        url: "http://localhost:3000/grid",
    })
    map.addLayer({
        id: "grid-layer",
        source: "grid",
        "source-layer": "grid",
        type: "fill",
        paint: {}
    })
    map.addSource('oikonyms', {
        type: "vector",
        tiles: ["http://localhost:3000/oikonyms/{z}/{x}/{y}"],
    })

    map.addLayer({
        id: "oikonyms-layers",
        source: "oikonyms",
        "source-layer": "oikonyms",
        type: "circle",
        paint: {
            "circle-color": "rgb(174, 60, 60)"
        }
    })
})
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://raw.githubusercontent.com/gtitov/basemaps/refs/heads/master/positron-nolabels.json',
    center: [51, 0],
    zoom: 4
})

map.on("load", () => {
    map.addSource('countries', {
        type: 'geojson',
        data: './data/countries.geojson',
        attribution: 'Natural Earth'
    })

    map.addLayer({
        id: 'countries-layer',
        source: 'countries',
        type: 'fill',
        paint: {
            'fill-color': 'lightgray'
        }
    })

    map.addSource('rivers', {
        type: 'geojson',
        data: './data/rivers.geojson'
    })

    map.addLayer({
        id: 'rivers-layer',
        source: 'rivers',
        type: 'line',
        paint: {
            'line-color': '#00BFFF'
        }
    })

    map.addSource('lakes', {
        type:'geojson',
        data:'./data/lakes.geojson'
    })

    map.addLayer({
        id: 'lakes-layer',
        source: 'lakes',
        type: 'fill',
        paint: {
            'fill-color': 'rgb(118, 180, 247)'
        }
    })

    map.addLayer({
        id: 'lakes-layer-bound',
        source: 'lakes',
        type: 'line',
        paint: {
            'line-width': 2, 
            'line-color': 'rgb(100, 100, 255)'
        }
    })
    map.addSource('cities', {
        type: 'geojson',
        data: './data/cities.geojson'
    })

    map.addLayer({
        id: 'cities-layer',
        source: 'cities',
        type: 'circle',
        paint: {
            // 'circle-color': 'rgb(123, 12, 234)',
            'circle-color': ['match', ['get', 'NAME'], 'Moscow', 'red', 'blue'],
            'circle-radius': 3
        },
        filter: ['>', ['get', 'POP_MAX'], 1000000]

    })

    map.on("click", ['countries-layer'], (e) =>{
        // console.log(e)
        // console.log(e.features)
        new maplibregl.Popup()
            .setLngLat(e.lngLat) // установим на координатах объекта
            .setHTML('<p>' + "Population:" + e.features[0].properties.POP_EST+ '</p>') // заполним  текстом из атрибута с именем объекта
            .addTo(map); // добавим на карту
    })
    
    map.on('mouseenter', 'countries-layer', () => {
        map.getCanvas().style.cursor = 'crosshair'
    })

    map.on('mouseleave', 'countries-layer', () => {
        map.getCanvas().style.cursor = ''
    })
})
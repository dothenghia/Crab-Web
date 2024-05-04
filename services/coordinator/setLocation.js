

function setStartLocation(longitude, latitude) {
    window.map.flyTo({
        center: [longitude, latitude],
        zoom: 17,
        easing(t) {
            return t;
        }
    });

    const mk = document.createElement('div');
    mk.className = `marker point-marker`;
    mk.id = `start-marker`;
    mk.innerHTML = `<img src="/assets/coordinator/start-point.svg" alt="start"/>`

    window.map._markers.forEach(marker => {
        if (marker._element.id == 'start-marker') {
            marker.remove();
        }
    })

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([longitude, latitude])
        .addTo(window.map);
}

function setEndLocation(longitude, latitude) {
    window.map.flyTo({
        center: [longitude, latitude],
        zoom: 17,
        easing(t) {
            return t;
        }
    });

    const mk = document.createElement('div');
    mk.className = `marker point-marker`;
    mk.id = `end-marker`;
    mk.innerHTML = `<img src="/assets/coordinator/end-point.svg" alt="end"/>`

    window.map._markers.forEach(marker => {
        if (marker._element.id == 'end-marker') {
            marker.remove();
        }
    })

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([longitude, latitude])
        .addTo(window.map);
}

function setStartPickLocation(longitude, latitude) {
    window.map.flyTo({
        center: [longitude, latitude],
        zoom: 17,
        easing(t) {
            return t;
        }
    });

    const mk = document.createElement('div');
    mk.className = `marker point-marker`;
    mk.id = `search-marker`;
    mk.innerHTML = `<img src="/assets/coordinator/pin.png" alt="search"/>`

    window.map._markers.forEach(marker => {
        if (marker._element.id == 'search-marker') {
            marker.remove();
        }
    })

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([longitude, latitude])
        .addTo(window.map);

    window.map.on('move', (e) => {
        let newCenter = window.map.getCenter();
        marker.setLngLat([newCenter.lng, newCenter.lat]);
    })
}

function setEndPickLocation(longitude, latitude) {
    window.map.flyTo({
        center: [longitude, latitude],
        zoom: 17,
        easing(t) {
            return t;
        }
    });

    const mk = document.createElement('div');
    mk.className = `marker point-marker`;
    mk.id = `search-marker`;
    mk.innerHTML = `<img src="/assets/coordinator/pin.png" alt="search"/>`

    window.map._markers.forEach(marker => {
        if (marker._element.id == 'search-marker') {
            marker.remove();
        }
    })

    var marker = new mapboxgl.Marker(mk)
        .setLngLat([longitude, latitude])
        .addTo(window.map);

    window.map.on('move', (e) => {
        let newCenter = window.map.getCenter();
        marker.setLngLat([newCenter.lng, newCenter.lat]);
    })
}

export { setStartLocation, setEndLocation, setStartPickLocation, setEndPickLocation };

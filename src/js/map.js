export function setupMap(map, [x, y]) {
    map.setView([x, y], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([x,y]).addTo(map);

    L.control.zoom({
        position: "bottomleft",
    }).addTo(map);
}

// ====== Import function services
import searchLocation from '../../services/coordinator/searchLocation.js';
import { setStartLocation, setEndLocation } from "../../services/coordinator/setLocation.js";
import createLocation from '../../services/coordinator/createLocation.js';

// ====== Import UI components
import SearchContentList from '../../components/coordinator/SearchContentList.js'

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;
const mapboxToken = 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ'

const main = {
    // ====== Hàm Khởi tạo các State
    init: function () {
        window.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v11', // style URL
            center: [mylongitude, mylatitude],
            accessToken: mapboxToken,
            zoom: 16
        }).addControl(
            new mapboxgl.NavigationControl({ showCompass: true }),
            'bottom-right'
        )

        this.isSettingStartLocation = false;
        this.distance = 0;
    },


    // ====== Handle search location events
    searchLocationHandler: async function () {
        let sidebarSearchContent = document.getElementById('sidebar-search-content');

        document.getElementById('customerStartButton').onclick = async function () {
            this.isSettingStartLocation = true;
            let startLocation = document.getElementById('customerStartInput').value;
            let locationList = await searchLocation(startLocation);

            document.getElementById('confirm-path-button').classList.add('d-none');
            document.getElementById('confirm-start-button').classList.add('d-none');
            document.getElementById('confirm-end-button').classList.add('d-none');

            sidebarSearchContent.innerHTML = SearchContentList(locationList, this.isSettingStartLocation);
        }

        document.getElementById('customerEndButton').onclick = async function () {
            this.isSettingStartLocation = false;
            let endLocation = document.getElementById('customerEndInput').value;
            let locationList = await searchLocation(endLocation);

            document.getElementById('confirm-path-button').classList.add('d-none');
            document.getElementById('confirm-start-button').classList.add('d-none');
            document.getElementById('confirm-end-button').classList.add('d-none');

            sidebarSearchContent.innerHTML = SearchContentList(locationList, this.isSettingStartLocation);
        }

        document.getElementById('confirm-start-button').onclick = async function () {
            let newCenter = window.map.getCenter();
            document.getElementById('customerStartInput').setAttribute('data-longitude', newCenter.lng);
            document.getElementById('customerStartInput').setAttribute('data-latitude', newCenter.lat);

            let startlatitude = document.getElementById('customerStartInput').getAttribute('data-latitude');
            let startlongitude = document.getElementById('customerStartInput').getAttribute('data-longitude');
            setStartLocation(startlongitude, startlatitude);

            window.map._markers.forEach(marker => {
                if (marker._element.id == 'search-marker') {
                    marker.remove();
                }
            })

            document.getElementById('customerStartInput').value = await createLocation(startlongitude, startlatitude);

            document.getElementById('confirm-start-button').classList.add('d-none');
        }

        document.getElementById('confirm-end-button').onclick = async function () {
            let newCenter = window.map.getCenter();
            document.getElementById('customerEndInput').setAttribute('data-longitude', newCenter.lng);
            document.getElementById('customerEndInput').setAttribute('data-latitude', newCenter.lat);

            let endlatitude = document.getElementById('customerEndInput').getAttribute('data-latitude');
            let endlongitude = document.getElementById('customerEndInput').getAttribute('data-longitude');
            setEndLocation(endlongitude, endlatitude);

            window.map._markers.forEach(marker => {
                if (marker._element.id == 'search-marker') {
                    marker.remove();
                }
            })

            document.getElementById('customerEndInput').value = await createLocation(endlongitude, endlatitude);

            document.getElementById('confirm-end-button').classList.add('d-none');
            document.getElementById('confirm-path-button').classList.remove('d-none')
        }


        document.getElementById('confirm-path-button').onclick = function () {
            let startlatitude = document.getElementById('customerStartInput').getAttribute('data-latitude');
            let startlongitude = document.getElementById('customerStartInput').getAttribute('data-longitude');
            let endlatitude = document.getElementById('customerEndInput').getAttribute('data-latitude');
            let endlongitude = document.getElementById('customerEndInput').getAttribute('data-longitude');

            var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + startlongitude + ',' + startlatitude + ';' + endlongitude + ',' + endlatitude + '?steps=true&geometries=geojson&access_token=' + mapboxToken;

            // Xóa đường đi hiện tại (nếu có)
            if (window.map.getLayer('route')) {
                window.map.removeLayer('route');
            }
            if (window.map.getSource('route')) {
                window.map.removeSource('route');
            }

            // Vẽ đường đi trên bản đồ
            fetch(directionsRequest)
                .then(response => response.json())
                .then(data => {
                    var route = data.routes[0].geometry;
                    var distance = data.routes[0].distance;
                    console.log(distance);

                    window.map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: { type: 'Feature', geometry: route }
                        },
                        layout: { 'line-join': 'round', 'line-cap': 'round' },
                        paint: { 'line-color': '#00B14F', 'line-width': 8 }
                    });
                })
                .catch(err => {
                    console.log(err);
                });

            sidebarSearchContent.innerHTML = '';
            document.getElementById('confirm-path-button').classList.add('d-none')
        }
    },

    start: async function () {
        this.init();
        await this.searchLocationHandler();
    }
}

main.start();
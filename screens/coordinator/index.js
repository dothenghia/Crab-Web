
import searchLocation from '../../services/coordinator/searchLocation.js';

// MapBox Initialization
var mylongitude = 106.682667;
var mylatitude = 10.762886;

const main = {
    // ====== Hàm Khởi tạo các State
    init: function() {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [mylongitude, mylatitude],
            accessToken: 'pk.eyJ1IjoiYmFyb2xvaSIsImEiOiJjbG8ybW1ucHcwOTZjMnF0ZGFqdXpwemUwIn0._gUBQBWHcx7zDxxK6UEUbQ',
            zoom: 16
        }).addControl(
            new mapboxgl.NavigationControl({ showCompass: true }),
            'bottom-right'
        )
    },


    // ====== Render các Component và thẻ Root của Trang chủ
    renderHomePage: function() {
        // document.getElementById('main').innerHTML = `
        //     <div class="sidebar-root">
        //     </div>
        // `
    },


    // ====== Handle search location events
    searchLocationHandler: async function() {
        document.getElementById('customerStartButton').onclick = async function() {
            let startLocation = document.getElementById('customerStartInput').value;
            let locationList = await searchLocation(startLocation);
            console.log(locationList);
        }
        document.getElementById('customerEndButton').onclick = async function() {
            let endLocation = document.getElementById('customerEndInput').value;
            let locationList = await searchLocation(endLocation);
            console.log(locationList);
        }
    },

    start: async function() {
        this.init();
        this.renderHomePage();
        await this.searchLocationHandler();
    }
}

main.start();
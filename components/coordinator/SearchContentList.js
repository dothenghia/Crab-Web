
import { setStartLocation, setEndLocation, setStartPickLocation, setEndPickLocation } from "../../services/coordinator/setLocation.js";

export default function SearchContentList(locationList, isSettingStartLocation) {

    function ChooseFromMap() {
        if (isSettingStartLocation) {
            let startLocation = document.getElementById('customerStartInput').value;

            fetch(`https://nominatim.openstreetmap.org/search?q=${startLocation}&format=json&limit=1`)
                .then(response => response.json())
                .then(data => {
                    if (data.length == 0) { alert('Không tìm thấy địa chỉ'); return; }
                    data = data[0];

                    document.getElementById('confirm-start-button').classList.remove('d-none');
                    setStartPickLocation(data.lon, data.lat);
                })
        }
        else {
            let endLocation = document.getElementById('customerEndInput').value;

            fetch(`https://nominatim.openstreetmap.org/search?q=${endLocation}&format=json&limit=1`)
                .then(response => response.json())
                .then(data => {
                    if (data.length == 0) { alert('Không tìm thấy địa chỉ'); return; }
                    data = data[0];

                    document.getElementById('confirm-end-button').classList.remove('d-none');
                    setEndPickLocation(data.lon, data.lat);
                })
        }
    }
    window.ChooseFromMap = ChooseFromMap;

    return `
        <div class="divider"></div>
        <div class="sidebar-search-location" onclick="ChooseFromMap()">
            <svg width="22" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3L20 21L13 17.2105L6 21L13 3Z" fill="#0D6EFD" stroke="#0D6EFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p>Choose from map</p>
        </div>
        <div class="sidebar-search-list">
            ${
                locationList.length != 0
                ?
                locationList.map(location => `
                    ${SearchContentItem(location, isSettingStartLocation)}
                `).join('')
                :
                `<p class="text-center">Not found in database system</p>`
        }
        </div>
    `;
}

function SearchContentItem(location, isSettingStartLocation) {

    let locationInformation = {
        IDDiaChi: location.IDDiaChi,
        TenDiaChi: location.TenDiaChi,
        KinhDo: location.KinhDo,
        ViDo: location.ViDo,
    }

    function HandleSearchItem(location) {
        let { IDDiaChi, TenDiaChi, KinhDo, ViDo } = JSON.parse(decodeURIComponent(location));

        if (isSettingStartLocation) {
            document.getElementById('customerStartInput').value = TenDiaChi;
            document.getElementById('customerStartInput').setAttribute('data-longitude', KinhDo);
            document.getElementById('customerStartInput').setAttribute('data-latitude', ViDo);
            document.getElementById('customerStartInput').setAttribute('data-idlocation', IDDiaChi);
            setStartLocation(KinhDo, ViDo);
        }
        else {
            document.getElementById('customerEndInput').value = TenDiaChi;
            document.getElementById('customerEndInput').setAttribute('data-longitude', KinhDo);
            document.getElementById('customerEndInput').setAttribute('data-latitude', ViDo);
            document.getElementById('customerEndInput').setAttribute('data-idlocation', IDDiaChi);
            setEndLocation(KinhDo, ViDo);

            document.getElementById('confirm-path-button').classList.remove('d-none')
        }
    }
    window.HandleSearchItem = HandleSearchItem;

    return `
        <div class="sidebar-search-item" onclick="HandleSearchItem('${encodeURIComponent(JSON.stringify(locationInformation))}')">
            <p>${location.TenDiaChi}</p>
        </div>
    `;
}

import { setStartLocation , setEndLocation } from "../../services/coordinator/setLocation.js";

export default function SearchContentList(locationList, isSettingStartLocation) {

    return `
        <div class="divider"></div>
        <div class="sidebar-search-location">
            <svg width="22" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3L20 21L13 17.2105L6 21L13 3Z" fill="#0D6EFD" stroke="#0D6EFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p>Choose from map</p>
        </div>
        <div class="sidebar-search-list">
            ${locationList.map(location => `
                ${SearchContentItem(location, isSettingStartLocation)}
            `).join('')}
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
            document.getElementById('customerStartInput').setAttribute('data-id', IDDiaChi);
            document.getElementById('customerStartInput').setAttribute('data-longitude', KinhDo);
            document.getElementById('customerStartInput').setAttribute('data-latitude', ViDo);
            setStartLocation(KinhDo, ViDo);
        }
        else {
            document.getElementById('customerEndInput').value = TenDiaChi;
            document.getElementById('customerEndInput').setAttribute('data-id', IDDiaChi);
            document.getElementById('customerEndInput').setAttribute('data-longitude', KinhDo);
            document.getElementById('customerEndInput').setAttribute('data-latitude', ViDo);
            setEndLocation(KinhDo, ViDo);

            document.getElementById('confirm-path-button').classList.remove('invisible')
        }
    }
    window.HandleSearchItem = HandleSearchItem;

    return `
        <div class="sidebar-search-item" onclick="HandleSearchItem('${encodeURIComponent(JSON.stringify(locationInformation))}')">
            <p>${location.TenDiaChi}</p>
        </div>
    `;
}
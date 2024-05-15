
// ====== Import function services
import getLocations from '../../services/admin/getLocations.js';

let table = document.getElementById('my-table');


// ====== Render table
function renderTable(items) {
    table.innerHTML = `
        <tr>
            <th>No</th>
            <th class='left-td'>Address name</th>
            <th>Longtitude</th>
            <th>Latitude</th>
        </tr>
        ${items.map((item, index) => renderRow(item, index)).join('')}
    `
}

// ====== Render row
function renderRow(item, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td class='left-td'>${item.TenDiaChi}</td>
            <td>${item.KinhDo.toFixed(6)}</td>
            <td>${item.ViDo.toFixed(6)}</td>
        </tr>
    `
}

getLocations()
    .then(data => {
        renderTable(data);
    })

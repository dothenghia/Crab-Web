
// ====== Import function services
import getVehicles from '../../services/admin/getVehicles.js';

let table = document.getElementById('my-table');


// ====== Render table
function renderTable(items) {
    table.innerHTML = `
        <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Slot</th>
            <th>Price (0-5km)</th>
            <th>Price (5-10km)</th>
            <th>Price (>10km)</th>
        </tr>
        ${items.map((item, index) => renderRow(item, index)).join('')}
    `
}

// ====== Render row
function renderRow(item, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.IDLoaiXe}</td>
            <td>${item.TenLoaiXe}</td>
            <td>${item.SoChoNgoi}</td>
            <td>${item.GiaCuoc1}</td>
            <td>${item.GiaCuoc2}</td>
            <td>${item.GiaCuoc3}</td>
        </tr>
    `
}

getVehicles()
    .then(data => {
        renderTable(data);
    })


// ====== Import function services
import getCustomers from '../../services/admin/getCustomers.js';

let table = document.getElementById('my-table');


// ====== Render table
function renderTable(items) {
    table.innerHTML = `
        <tr>
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Type</th>
        </tr>
        ${items.map((item, index) => renderRow(item, index)).join('')}
    `
}

// ====== Render row
function renderRow(item, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.IDKhachVangLai}</td>
            <td>${item.HoTen}</td>
            <td>${item.SDT}</td>
            <td>${item.Loai}</td>
        </tr>
    `
}

getCustomers()
    .then(data => {
        renderTable(data);
    })

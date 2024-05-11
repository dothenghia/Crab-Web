
// ====== Import function services
import getDrivers from '../../services/admin/getDrivers.js';

let driversTable = document.getElementById('drivers-table');


// ====== Render drivers table
function renderDriversTable(drivers) {
    driversTable.innerHTML = `
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Car Type</th>
            <th>Rating</th>
        </tr>
        ${drivers.map((driver, index) => renderDriverRow(driver, index)).join('')}
    `
}

// ====== Render driver row
function renderDriverRow(driver, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${driver.HoTen}</td>
            <td>${driver.SDT}</td>
            <td>${driver.Email}</td>
            <td>${driver.TenLoaiXe}</td>
            <td>${driver.ChatLuong}/5.0</td>
        </tr>
    `
}

getDrivers()
    .then(drivers => {
        renderDriversTable(drivers);
    })

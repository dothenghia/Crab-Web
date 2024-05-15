
// ====== Import function services
import getRevenue from '../../services/admin/getRevenue.js';

let revenueTable = document.getElementById('revenue-table');


// ====== Render revenue table
function renderRevenuesTable(revenues) {
    revenueTable.innerHTML = `
        <tr>
            <th>No</th>
            <th>Booking ID</th>
            <th>Booking Type</th>
            <th>Car Type</th>
            <th>Price (đ)</th>
        </tr>
        ${revenues.map((revenue, index) => renderRevenueRow(revenue, index)).join('')}
    `
}

// ====== Render revenue row
function renderRevenueRow(revenue, index) {
    const vehicleMapping = {
        1: 'Bike',
        2: 'Small',
        3: 'Medium',
        4: 'Large',
    }

    return `
        <tr>
            <td>${index + 1}</td>
            <td>${revenue.ID}</td>
            <td>${revenue.HinhThucDatXe}</td>
            <td>${vehicleMapping[revenue.IDLoaiXe]}</td>
            <td>${revenue.GiaTien.toLocaleString('vi-VN')}đ</td>
        </tr>
    `
}

getRevenue()
    .then(revenues => {
        renderRevenuesTable(revenues);
    })



export default function VehicleContentList(vehicleList) {
    let distance = document.getElementById('confirm-booking-button').getAttribute('data-distance');

    let roundedDistance = (distance / 1000).toFixed(2);

    return `
        <div class="divider"></div>
        <div class="sidebar-vehicle-distance">
            <h3>Distance: ${roundedDistance} km</h3>
        </div>

        ${
            vehicleList.map(vehicle => VehicleContentItem(vehicle, distance/1000)).join('')
        }
    `
}

function VehicleContentItem(vehicle, distance) {
    let vehicleImages = {
        "Bike": "../../assets/coordinator/bike.png",
        "Small": "../../assets/coordinator/small.png",
        "Medium": "../../assets/coordinator/medium.png",
        "Large": "../../assets/coordinator/large.png",
    }

    let totalPrice = 0;
    if (distance <= 5) {
        totalPrice = distance * vehicle.GiaCuoc1;
    } else if (distance <= 10) {
        totalPrice = distance * vehicle.GiaCuoc1 + (distance - 5) * vehicle.GiaCuoc2;
    } else {
        totalPrice = distance * vehicle.GiaCuoc1 + 5 * vehicle.GiaCuoc2 + (distance - 10) * vehicle.GiaCuoc3;
    }

    // Làm tròn giá tiền và loại bỏ phần lẻ
    totalPrice = Math.floor(totalPrice);


    function HandleVehicleItem(event) {
        const selectedItem = event.currentTarget;

        const activeItem = document.querySelector('.sidebar-vehicle-item.active');
        if (activeItem && activeItem !== selectedItem) {
            activeItem.classList.remove('active');
        }

        selectedItem.classList.toggle('active');

        let confirmButton = document.getElementById('confirm-booking-button');
        confirmButton.setAttribute('data-idloaixe', selectedItem.getAttribute('data-idloaixe'));
        confirmButton.setAttribute('data-gia', selectedItem.getAttribute('data-gia'));
        confirmButton.classList.remove('d-none');
    }
    window.HandleVehicleItem = HandleVehicleItem;

    return `
        <div class="sidebar-vehicle-item" onclick="HandleVehicleItem(event)" data-idloaixe="${vehicle.IDLoaiXe}" data-gia="${totalPrice}">
            <div class="item-left">
                <img src="${vehicleImages[vehicle.TenLoaiXe]}" alt="${vehicle.TenLoaiXe}">

                <h3>${vehicle.TenLoaiXe}</h3>
                <p>${vehicle.SoChoNgoi} slot</p>
            </div>
            <div class="item-right">
                ${totalPrice.toLocaleString('vi-VN')}đ
            </div>
        </div>
    `
}

import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import generateId from "./generateId.js";

async function createBooking() {
    try {
        let IDChuyenXe = generateId();
        let IDDiaChiDon = document.getElementById('customerStartInput').getAttribute('data-idlocation');
        let IDDiaChiDen = document.getElementById('customerEndInput').getAttribute('data-idlocation');
        let HinhThucDatXe = "tongdai";
        let IDKhachHang = "";
        let IDKhachVangLai = generateId();
        let IDTaiXe = "";
        let IDLoaiXe = document.getElementById('confirm-booking-button').getAttribute('data-idloaixe');
        let GiaTien = document.getElementById('confirm-booking-button').getAttribute('data-gia');
        GiaTien = parseInt(GiaTien);
        let IDTongDai = "1";
        let ThoiDiemBatDau = ""
        let ThoiDiemKetThuc = ""

        // console.log('IDDiaChiDon:', IDDiaChiDon);
        // console.log('IDDiaChiDen:', IDDiaChiDen);
        // console.log('IDLoaiXe:', IDLoaiXe);
        // console.log('GiaTien:', GiaTien);

        const chuyenXeRef = await addDoc(collection(db, "ChuyenXe"), {
            IDChuyenXe,
            IDDiaChiDon,
            IDDiaChiDen,
            HinhThucDatXe,
            IDKhachHang,
            IDKhachVangLai,
            IDTaiXe,
            IDLoaiXe,
            GiaTien,
            IDTongDai,
            ThoiDiemBatDau,
            ThoiDiemKetThuc
        });

        let HoTen = document.getElementById('customerNameInput').value;
        let SDT = document.getElementById('customerPhoneInput').value;

        const khachHangRef = await addDoc(collection(db, "KhachVangLai"), {
            IDKhachVangLai,
            HoTen,
            SDT
        });

        alert("Đặt xe thành công");
        return "success";
    }
    catch (error) {
        console.error('Create Booking : ', error);
        return "";
    }
}

export default createBooking;
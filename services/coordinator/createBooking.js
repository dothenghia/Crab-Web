
import { db } from "../firebase.js";
import { collection, addDoc, doc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import generateId from "./generateId.js";

async function createBooking() {
    try {
        let IDKhachVangLai = generateId();
        let HoTen = document.getElementById('customerNameInput').value;
        let SDT = document.getElementById('customerPhoneInput').value;

        const khachHangRef = await addDoc(collection(db, "KhachVangLai"), {
            IDKhachVangLai,
            HoTen,
            SDT
        });


        let IDChuyenXe = generateId();
        let IDDiaChiDon = document.getElementById('customerStartInput').getAttribute('data-idlocation');
        let IDDiaChiDen = document.getElementById('customerEndInput').getAttribute('data-idlocation');
        let HinhThucDatXe = "tongdai";
        let IDKhachHang = "";
        let IDTaiXe = "";
        let IDLoaiXe = document.getElementById('confirm-booking-button').getAttribute('data-idloaixe');
        let GiaTien = document.getElementById('confirm-booking-button').getAttribute('data-gia');
        GiaTien = parseInt(GiaTien);
        let IDTongDai = "1";
        let ThoiDiemBatDau = ""
        let ThoiDiemKetThuc = ""

        const diaChiDonQuery = query(collection(db, "DiaChi"), where("IDDiaChi", "==", IDDiaChiDon));
        const diaChiDonSnapshot = await getDocs(diaChiDonQuery);
        let DiaChiDonId = "";
        diaChiDonSnapshot.forEach((doc) => {
            DiaChiDonId = doc.id;
        });
        let DiaChiDon = doc(db, "DiaChi", DiaChiDonId);

        const diaChiDenQuery = query(collection(db, "DiaChi"), where("IDDiaChi", "==", IDDiaChiDen));
        const diaChiDenSnapshot = await getDocs(diaChiDenQuery);
        let DiaChiDenId = "";
        diaChiDenSnapshot.forEach((doc) => {
            DiaChiDenId = doc.id;
        });
        let DiaChiDen = doc(db, "DiaChi", DiaChiDenId);


        let KhachHang = khachHangRef

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
            ThoiDiemKetThuc,
            DiaChiDon,
            DiaChiDen,
            KhachHang
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
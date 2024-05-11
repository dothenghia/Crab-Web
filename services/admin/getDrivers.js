
import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getDrivers() {
    try {
        const driverCollection = collection(db, "TaiXe");
        const querySnapshot = await getDocs(driverCollection);

        const results = [];
        for (const doc of querySnapshot.docs) {
            const driverData = doc.data();

            const xeRef = driverData.Xe;

            // Lấy thông tin về xe từ tham chiếu trong trường "Xe" của tài xế
            const xeDoc = await getDoc(xeRef);
            const xeData = xeDoc.data();

            // Lấy tham chiếu đến loại xe từ trường "LoaiXe" trong thông tin xe
            const loaiXeRef = xeData.LoaiXe;

            // Lấy thông tin về loại xe từ tham chiếu trong trường "LoaiXe"
            const loaiXeDoc = await getDoc(loaiXeRef);
            const loaiXeData = loaiXeDoc.data();

            // Lấy tên loại xe từ thông tin loại xe
            const tenLoaiXe = loaiXeData.TenLoaiXe;

            // Thêm thông tin tên loại xe vào kết quả
            results.push({
                ...driverData,
                TenLoaiXe: tenLoaiXe
            });
        }

        return results;
    } catch (error) {
        console.error('Get Drivers : ', error);
        return [];
    }
}

export default getDrivers;

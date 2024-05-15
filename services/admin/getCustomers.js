
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getCustomers() {
    try {
        const customerCollection = collection(db, "KhachVangLai");
        const customerCollection2 = collection(db, "KhachHang");

        const querySnapshot = await getDocs(customerCollection);
        const querySnapshot2 = await getDocs(customerCollection2);

        const results = [];

        querySnapshot2.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data, ID: data.IDKhachHang, Loai: 'Thành viên' });
        });

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data, ID: data.IDKhachVangLai, Loai: 'Vãng lai' });
        });

        return results;
    }
    catch (error) {
        console.error('Get customers : ', error);
        return [];
    }
}

export default getCustomers;
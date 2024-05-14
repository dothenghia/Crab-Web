
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getCustomers() {
    try {
        const customerCollection = collection(db, "KhachVangLai");

        const querySnapshot = await getDocs(customerCollection);

        const results = [];
        results.push(
            {
                IDKhachVangLai: '1',
                HoTen: 'Thế Nghĩa Đỗ',
                SDT: '0906050403',
                Loai: 'Thành viên'
            },
            {
                IDKhachVangLai: '2',
                HoTen: 'Hanh Nhi',
                SDT: '0908123456',
                Loai: 'Thành viên'
            }
        )

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({ ...data, Loai: 'Vãng lai' });
        });

        return results;
    }
    catch (error) {
        console.error('Get customers : ', error);
        return [];
    }
}

export default getCustomers;
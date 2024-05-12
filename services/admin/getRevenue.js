
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getRevenue() {
    try {
        const revenueCollection = collection(db, "ChuyenXe");

        const querySnapshot = await getDocs(revenueCollection);

        const results = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Lấy ID của document và thêm vào field ID
            const id = doc.id;
            results.push({ ...data, ID: id });
        });

        results.sort((a, b) => a.IDChuyenXe - b.IDChuyenXe);

        return results;
    } catch (error) {
        console.error('Get Revenue : ', error);
        return [];
    }
}

export default getRevenue;

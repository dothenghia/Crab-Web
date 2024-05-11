
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getRevenue() {
    try {
        const revenueCollection = collection(db, "ChuyenXe");

        const querySnapshot = await getDocs(revenueCollection);

        const results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });

        results.sort((a, b) => a.IDChuyenXe - b.IDChuyenXe);

        return results;
    } catch (error) {
        console.error('Get Revenue : ', error);
        return [];
    }
}

export default getRevenue;

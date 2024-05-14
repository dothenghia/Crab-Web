
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getLocations() {
    try {
        const locationCollection = collection(db, "DiaChi");

        const querySnapshot = await getDocs(locationCollection);

        const results = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Lấy ID của document và thêm vào field ID
            const id = doc.id;
            results.push({ ...data, ID: id });
        });

        return results;
    }
    catch (error) {
        console.error('Get locations : ', error);
        return [];
    }
}

export default getLocations;
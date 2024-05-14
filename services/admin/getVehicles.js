
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getVehicles() {
    try {
        const vehicleCollection = collection(db, "LoaiXe");

        const querySnapshot = await getDocs(vehicleCollection);

        const results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });

        results.sort((a, b) => a.IDLoaiXe - b.IDLoaiXe);

        return results;
    }
    catch (error) {
        console.error('Get Vehicles : ', error);
        return [];
    }
}

export default getVehicles;
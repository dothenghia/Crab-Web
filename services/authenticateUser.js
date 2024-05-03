
import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function authenticateUser(username, password) {
    try {
        if (username === 'admin') {
            const adminCollection = collection(db, "Admin");
            const q = query(adminCollection, where("TenTaiKhoan", "==", username), where("MatKhau", "==", password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null;
            }
            else {
                return 'admin';
            }
        }
        else if (username === 'coordinator') {
            const coordinatorCollection = collection(db, "TongDai");
            const q = query(coordinatorCollection, where("TenTaiKhoan", "==", username), where("MatKhau", "==", password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null;
            }
            else {
                return 'coordinator';
            }
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Authenticate User : ', error);
        return null;
    }
}

export default authenticateUser;
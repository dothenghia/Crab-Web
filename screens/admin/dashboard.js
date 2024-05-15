
import { db } from "../../services/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function getTotal() {
    try {
        const tripCollection = collection(db, "ChuyenXe");
        const querySnapshot = await getDocs(tripCollection);

        let sum = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.GiaTien) {
                sum += data.GiaTien;
            }
        });

        let total = document.getElementById('total');
        total.innerHTML = 'Total Revenue : ' + sum.toLocaleString('vi-VN') + 'đ';
    }
    catch (error) {
        console.error('Get trips : ', error);
    }
}

getTotal();

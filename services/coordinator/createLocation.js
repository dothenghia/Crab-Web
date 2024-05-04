
import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import reverseGeocoding from "./reverseGeocoding.js";
import generateId from "./generateId.js";

async function createLocation(longitude, latitude) {
    try {
        const locationData = await reverseGeocoding(longitude, latitude);

        let IDDiaChi = generateId();
        let TenDiaChi = locationData.name + ', ' + locationData.phuong + ', ' + locationData.quan + ', ' + locationData.thanhpho + ', ' + locationData.quocgia;
        let KinhDo = parseFloat(longitude);
        let ViDo = parseFloat(latitude);
        let TenDiaChiArray = TenDiaChi.toLowerCase().split(', ').flatMap(word => word.split(' '));

        console.log('TenDiaChi:', TenDiaChi);

        // Upload dữ liệu vào collection DiaChi
        const diaChiRef = collection(db, "DiaChi");
        await addDoc(diaChiRef, {
            IDDiaChi: IDDiaChi,
            TenDiaChi: TenDiaChi,
            KinhDo: KinhDo,
            ViDo: ViDo,
            TenDiaChiArray: TenDiaChiArray
        });

        return { TenDiaChi , IDDiaChi };
    }
    catch (error) {
        console.error('Update Location : ', error);
        return "";
    }
}

export default createLocation;

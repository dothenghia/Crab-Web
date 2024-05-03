
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

async function searchLocation(location) {
    try {
        const locationCollection = collection(db, "DiaChi");

        // Chia chuỗi location thành các từ riêng biệt
        const keywords = location.toLowerCase().split(" ");

        // Tạo một mảng chứa các truy vấn where cho mỗi từ khóa
        const queries = keywords.map(keyword => {
            return query(locationCollection, where("TenDiaChiArray", "array-contains", keyword));
        });

        // Thực hiện từng truy vấn và thu thập tên của các tài liệu được tìm thấy
        const documentNamesPromises = queries.map(async query => {
            const querySnapshot = await getDocs(query);
            return querySnapshot.docs.map(doc => doc.id);
        });

        // Đợi tất cả các promises hoàn thành và thu thập tên của các tài liệu
        const documentNamesArrays = await Promise.all(documentNamesPromises);

        // Kết hợp tất cả các tên tài liệu vào một mảng duy nhất
        const allDocumentNames = documentNamesArrays.flat();

        // Tạo một truy vấn tổng hợp sử dụng điều kiện 'in' với tất cả các tên tài liệu đã thu thập được
        const combinedQuery = query(locationCollection, where('__name__', 'in', allDocumentNames));

        // Thực hiện truy vấn tổng hợp
        const querySnapshot = await getDocs(combinedQuery);

        // Lặp qua từng document trong querySnapshot và lưu trữ kết quả vào một mảng
        const results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });

        // Trả về mảng kết quả
        return results;
    }
    catch (error) {
        console.error('Search Location : ', error);
        return [];
    }
}

export default searchLocation;

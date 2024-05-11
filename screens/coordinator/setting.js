
import { db } from "../../services/firebase.js";
import { collection, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

const form = document.querySelector('.reset-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Lấy giá trị từ các trường input
    const password = document.getElementById('password').value;
    const hashedPassword = hashPassword(password);
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra xác thực mật khẩu cũ
    const coordinatorDocRef = doc(db, 'TongDai', 'ueVRRrWdWA17uqEJ7lWR');
    const coordinatorDocSnapshot = await getDoc(coordinatorDocRef);
    const coordinatorData = coordinatorDocSnapshot.data();

    if (coordinatorData.MatKhau !== hashedPassword) {
        alert('Incorrect current password.');
        return;
    }

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
    }

    // Cập nhật mật khẩu mới
    try {
        await updateDoc(coordinatorDocRef, {
            MatKhau: hashPassword(newPassword)
        });

        alert('Password updated successfully.');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password.');
    }
});


import authenticateUser from './services/authenticateUser.js'

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const hashedPassword = hashPassword(password);

    let role = await authenticateUser(username, hashedPassword)

    if (role === 'admin') {
        window.location.href = './screens/admin/dashboard.html';
    }
    else if (role === 'coordinator') {
        window.location.href = './screens/coordinator/index.html';
    }
    else {
        alert('Invalid username or password');
    }
});
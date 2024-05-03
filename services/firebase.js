
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";


// ========== Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDMiDXgYH3Gmkh7a8JCc_60PSim5HVvz8",
    authDomain: "crabdb-2e161.firebaseapp.com",
    projectId: "crabdb-2e161",
    storageBucket: "crabdb-2e161.appspot.com",
    messagingSenderId: "878428566453",
    appId: "1:878428566453:web:6fc6bd7932f85e48d3dffc"
};

// ========== Initialize Firebase 
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

// export { db, storage };
export { db };
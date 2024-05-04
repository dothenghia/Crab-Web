
function generateId() {
    // Lấy ngày tháng năm và thời gian hiện tại
    let currentDate = new Date();
    let day = currentDate.getDate().toString().padStart(2, '0');
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    let year = currentDate.getFullYear().toString();
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');
    // let milliseconds = currentDate.getMilliseconds();
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

export default generateId;
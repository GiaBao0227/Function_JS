/**
  * 1. Lớp đầu vào (Input Layer)
      - Tên khách hàng: Người dùng nhập tên khách hàng.
      - Số KW tiêu thụ: Người dùng nhập số lượng điện tiêu thụ tính bằng KW.
  * 2. Lớp xử lý (Processing Layer)
      - Tính toán tiền điện dựa trên quy tắc bậc thang:
          + 50 KW đầu tiên: 500 đồng/KW
          + 50 KW tiếp theo: 650 đồng/KW
          + 100 KW tiếp theo: 850 đồng/KW
          + 150 KW tiếp theo: 1100 đồng/KW
          + Phần còn lại: 1300 đồng/KW
      - Chi tiết các bước tính toán:
          + Bước 1: Kiểm tra nếu số KW <= 50, tính tiền = số KW * 500 đồng.
          + Bước 2: Nếu số KW trong khoảng 51 - 100, tính tiền = 50 * 500 + (số KW - 50) * 650 đồng.
          + Bước 3: Nếu số KW trong khoảng 101 - 200, tính tiền = 50 * 500 + 50 * 650 + (số KW - 100) * 850 đồng.
          + Bước 4: Nếu số KW trong khoảng 201 - 350, tính tiền = 50 * 500 + 50 * 650 + 100 * 850 + (số KW - 200) * 1100 đồng.
          + Bước 5: Nếu số KW > 350, tính tiền = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (số KW - 350) * 1300 đồng.
3. Lớp đầu ra (Output Layer)
Xuất ra tên khách hàng và tổng số tiền điện cần thanh toán.
 */

document.getElementById("btnCalculateBill").onclick = function () {
  // Lấy giá trị từ các ô input
  let fullName = document.getElementById("fullName").value;
  let kwUsed = parseFloat(document.getElementById("kwUsed").value);
  let billAmount = 0;

  // Kiểm tra từng bậc tiêu thụ điện
  if (kwUsed <= 50) {
    billAmount = kwUsed * 500;
  } else if (kwUsed <= 100) {
    billAmount = 50 * 500 + (kwUsed - 50) * 650;
  } else if (kwUsed <= 200) {
    billAmount = 50 * 500 + 50 * 650 + (kwUsed - 100) * 850;
  } else if (kwUsed <= 350) {
    billAmount = 50 * 500 + 50 * 650 + 100 * 850 + (kwUsed - 200) * 1100;
  } else {
    billAmount = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kwUsed - 350) * 1300;
  }

  // Hiển thị kết quả
  let resultText1 = `Họ Tên: ${fullName} ; Tiền Điện: ${billAmount.toLocaleString()} VND`;
  document.getElementById("resultText1").innerText = resultText1;
};

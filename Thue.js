/**
    * 1. Lớp đầu vào (Input Layer)
        - Họ tên cá nhân: Người dùng nhập họ tên của người cần tính thuế.
        - Tổng thu nhập năm: Người dùng nhập tổng thu nhập năm của cá nhân tính bằng triệu đồng.
        - Số người phụ thuộc: Người dùng nhập số lượng người phụ thuộc (số nguyên không âm).
    * 2. Lớp xử lý (Processing Layer)
        - Bước 1: Tính thu nhập chịu thuế
        - Công thức:
            + Thu nhập chịu thuế = Tổng −4− Số người phụ thuộc * 1.6
            + Nếu Thu nhập chịu thuế <= 0, thì không phải nộp thuế (thuế bằng 0).
        - Bước 2: Tính thuế suất theo bậc thuế
            + Dựa vào mức thu nhập chịu thuế, xác định thuế suất áp dụng:
                * Thu nhập đến 60 triệu: thuế suất 5%
                * Thu nhập từ 60 triệu đến 120 triệu: thuế suất 10%
                * Thu nhập từ 120 triệu đến 210 triệu: thuế suất 15%
                * Thu nhập từ 210 triệu đến 384 triệu: thuế suất 20%
                * Thu nhập từ 384 triệu đến 624 triệu: thuế suất 25%
                * Thu nhập từ 624 triệu đến 960 triệu: thuế suất 30%
                * Thu nhập trên 960 triệu: thuế suất 35%
        - Bước 3: Tính thuế thu nhập cá nhân phải trả
            + Thuế thu nhập cá nhân = Thu nhập chịu thuế * thuế suất tương ứng.
    * 3. Lớp đầu ra (Output Layer)
        - Xuất ra họ tên cá nhân và số thuế thu nhập cá nhân phải nộp (nếu có).
 * 
 */
// Lớp xử lý (Processing Layer)
document.getElementById("btnCalculateTax").onclick = function () {
  // Lấy giá trị từ các ô input
  let fullName = document.getElementById("fullName1").value; // Đảm bảo ID đúng
  let annualIncome = parseFloat(document.getElementById("annualIncome").value); // Tổng thu nhập năm
  let dependents = parseInt(document.getElementById("dependents").value); // Số người phụ thuộc

  // Kiểm tra nếu các giá trị không hợp lệ
  if (
    fullName.trim() === "" ||
    isNaN(annualIncome) ||
    annualIncome <= 0 ||
    isNaN(dependents) ||
    dependents < 0
  ) {
    document.getElementById("resultText2").innerText =
      "Please enter valid information!";
    return;
  }

  // Tính thu nhập chịu thuế
  let taxableIncome = annualIncome - 4000000 - dependents * 1600000; // 4 triệu và 1.6 triệu mỗi người phụ thuộc

  // Nếu thu nhập chịu thuế <= 0, không phải nộp thuế
  if (taxableIncome <= 0) {
    let resultText = `${fullName}: Tiền thuế thu nhập cá nhân: 0 VND`;
    document.getElementById("resultText2").innerText = resultText;
    return;
  }

  // Tính thuế theo từng đoạn thu nhập
  let taxAmount = 0;

  // Đoạn thu nhập từ 0 đến 60 triệu (thuế 5%)
  if (taxableIncome <= 60000000) {
    taxAmount = taxableIncome * 0.05;
  } else {
    taxAmount += 60000000 * 0.05; // 60 triệu đầu tiên
    taxableIncome -= 60000000;

    // Đoạn thu nhập từ 60 triệu đến 120 triệu (thuế 10%)
    if (taxableIncome <= 60000000) {
      taxAmount += taxableIncome * 0.1;
    } else {
      taxAmount += 60000000 * 0.1; // 60 triệu tiếp theo
      taxableIncome -= 60000000;

      // Đoạn thu nhập từ 120 triệu đến 210 triệu (thuế 15%)
      if (taxableIncome <= 90000000) {
        taxAmount += taxableIncome * 0.15;
      } else {
        taxAmount += 90000000 * 0.15; // 90 triệu tiếp theo
        taxableIncome -= 90000000;

        // Đoạn thu nhập từ 210 triệu đến 384 triệu (thuế 20%)
        if (taxableIncome <= 174000000) {
          taxAmount += taxableIncome * 0.2;
        } else {
          taxAmount += 174000000 * 0.2; // 174 triệu tiếp theo
          taxableIncome -= 174000000;

          // Đoạn thu nhập từ 384 triệu đến 624 triệu (thuế 25%)
          if (taxableIncome <= 240000000) {
            taxAmount += taxableIncome * 0.25;
          } else {
            taxAmount += 240000000 * 0.25; // 240 triệu tiếp theo
            taxableIncome -= 240000000;

            // Đoạn thu nhập từ 624 triệu đến 960 triệu (thuế 30%)
            if (taxableIncome <= 336000000) {
              taxAmount += taxableIncome * 0.3;
            } else {
              taxAmount += 336000000 * 0.3; // 336 triệu tiếp theo
              taxableIncome -= 336000000;

              // Đoạn thu nhập trên 960 triệu (thuế 35%)
              taxAmount += taxableIncome * 0.35;
            }
          }
        }
      }
    }
  }

  // Hiển thị kết quả với dấu phẩy phân cách và định dạng chính xác
  let resultText = `Họ và tên: ${fullName} - Tiền thuế thu nhập cá nhân: ${taxAmount.toLocaleString()} VND`;
  document.getElementById("resultText2").innerText = resultText;
};

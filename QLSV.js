/**
 * Mô Hình 3 Khối
  * 1. Lớp đầu vào (Input Layer)
      - Điểm chuẩn: Nhập từ hội đồng tuyển sinh.
      - Điểm 3 môn thi của thí sinh: Nhập điểm của từng môn thi (các môn sẽ được kiểm tra xem có môn nào bị 0 điểm không).
      - Khu vực ưu tiên: Người dùng Click một trong ba ký tự "A", "B", "C" cho các khu vực ưu tiên hoặc "X" nếu không thuộc khu vực ưu tiên.
      - Đối tượng ưu tiên: Người dùng Click một trong các số 1, 2, 3 cho các đối tượng ưu tiên hoặc 0 nếu không thuộc đối tượng ưu tiên.
  * 2. Lớp xử lý (Processing Layer)
      - Bước 1: Kiểm tra điều kiện điểm môn thi: Kiểm tra từng điểm môn thi xem có môn nào có điểm bằng 0 hay không. Nếu có, thí sinh không trúng tuyển.
      - Bước 2: Tính điểm ưu tiên
      - Khu vực ưu tiên:
            + Khu vực A, điểm ưu tiên là 2.
            + Khu vực B, điểm ưu tiên là 1.
            + Khu vực C, điểm ưu tiên là 0.5.
            + "X", điểm ưu tiên theo khu vực là 0.
      - Đối tượng ưu tiên:
            + Đối tượng 1 có điểm ưu tiên là 2.5.
            + Đối tượng 2 có điểm ưu tiên là 1.5.
            + Đối tượng 3 có điểm ưu tiên là 1.
            + Đối tượng 0 có điểm ưu tiên là 0.
      - Bước 3: Tính tổng điểm:
            + Tổng điểm = (Điểm 3 môn thi) + (Điểm ưu tiên khu vực) + (Điểm ưu tiên đối tượng).
      - Bước 4: Kiểm tra trúng tuyển:
            + So sánh tổng điểm với điểm chuẩn. Nếu tổng điểm lớn hơn hoặc bằng điểm chuẩn và không có môn nào có điểm bằng 0, thí sinh trúng tuyển. Ngược lại, thí sinh không trúng tuyển.
  * 3. Lớp đầu ra (Output Layer)
      - Xuất ra tổng số điểm của thí sinh.
      -  Kết quả đậu hoặc rớt dựa trên điều kiện điểm chuẩn và các điều kiện về điểm môn thi.
 * 
 */

document.getElementById("btnResult").onclick = function () {
  // Lấy giá trị từ các ô input
  let benchmarkScore = parseFloat(
    document.getElementById("benchmarkScore").value
  );
  let subjectScore1 = parseFloat(
    document.getElementById("subjectScore1").value
  );
  let subjectScore2 = parseFloat(
    document.getElementById("subjectScore2").value
  );
  let subjectScore3 = parseFloat(
    document.getElementById("subjectScore3").value
  );
  let area = document.getElementById("area").value;
  let category = parseInt(document.getElementById("category").value);

  // Điểm ưu tiên khu vực
  let areaBonus = 0;
  if (area === "A") {
    areaBonus = 2;
  } else if (area === "B") {
    areaBonus = 1;
  } else if (area === "C") {
    areaBonus = 0.5;
  }

  // Điểm ưu tiên đối tượng
  let categoryBonus = 0;
  if (category === 1) {
    categoryBonus = 2.5;
  } else if (category === 2) {
    categoryBonus = 1.5;
  } else if (category === 3) {
    categoryBonus = 1;
  }

  // Tính tổng điểm
  let totalScore =
    subjectScore1 + subjectScore2 + subjectScore3 + areaBonus + categoryBonus;

  // Kiểm tra điều kiện trúng tuyển
  let result = "";
  if (
    subjectScore1 > 0 &&
    subjectScore2 > 0 &&
    subjectScore3 > 0 &&
    totalScore >= benchmarkScore
  ) {
    result = `Bạn đã đậu! Tổng điểm của bạn là ${totalScore}`;
  } else {
    result = `Bạn đã rớt! Tổng điểm của bạn là ${totalScore}`;
  }

  // Hiển thị kết quả
  document.getElementById("resultText").innerText = result;
};

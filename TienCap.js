/**
    * 1. Lớp đầu vào (Input Layer)
        - Các thông tin từ người dùng, bao gồm:
            + Mã khách hàng: Người dùng nhập mã khách hàng, giúp xác định thông tin khách hàng.
            + Loại khách hàng: Người dùng chọn loại khách hàng, có hai loại: Nhà dân và Doanh nghiệp.
                . Nếu chọn "Nhà dân", chỉ cần nhập số kênh cao cấp (không có kết nối).
                .Nếu chọn "Doanh nghiệp", người dùng sẽ nhập thêm số kết nối.
            + Số kết nối (Chỉ nhập nếu là khách hàng Doanh nghiệp): Nếu là khách hàng doanh nghiệp, người dùng nhập số kết nối mà doanh nghiệp sử dụng. Nếu là nhà dân, ô này sẽ bị ẩn hoặc disabled.
            + Số kênh cao cấp: Người dùng nhập số lượng kênh cao cấp mà khách hàng sử dụng. Số kênh này sẽ được tính phí tùy vào loại khách hàng.
    * 2. Lớp xử lý (Processing Layer)
        - Lớp này thực hiện tính toán và xử lý logic của bài toán:
            + Bước 1: Kiểm tra loại khách hàng
                . Khách hàng Nhà dân:
                    * Phí xử lý hóa đơn: 4.5$
                    * Phí dịch vụ cơ bản: 20.5% (sẽ tính trên tổng tiền cáp chưa tính phí cơ bản).
                    * Phí thuê kênh cao cấp: 7.5$/kênh.
                . Khách hàng Doanh nghiệp:
                    * Phí xử lý hóa đơn: 15$.
                    * Phí dịch vụ cơ bản: 75% cho tổng 10 kết nối đầu, mỗi kết nối thêm tính phí 5$/kết nối.
                    * Phí thuê kênh cao cấp: 50$/kênh.
            + Bước 2: Tính toán giá trị
                . Tính phí dịch vụ cơ bản:
                    * Với nhà dân, tính 20.5% trên tổng tiền chưa bao gồm phí cơ bản.
                    * Với doanh nghiệp, tính phí dịch vụ cơ bản theo quy định về số kết nối. Tổng phí dịch vụ cơ bản = 75% cho 10 kết nối đầu và thêm 5$ cho mỗi kết nối bổ sung.
                . Tính phí kênh cao cấp: Tính phí thuê kênh cao cấp bằng số kênh x giá thuê (7.5$ cho nhà dân và 50$ cho doanh nghiệp).

                . Tính tổng số tiền hóa đơn: Tổng tiền hóa đơn sẽ là tổng của các thành phần sau:
                    * Phí xử lý hóa đơn.
                    * Phí dịch vụ cơ bản.
                    * Phí thuê kênh cao cấp.
            + Bước 3: Lưu ý về tính ẩn ô nhập số kết nối
                . Nếu khách hàng là Nhà dân, ô nhập số kết nối sẽ bị ẩn hoặc disabled.
                . Nếu khách hàng là Doanh nghiệp, ô nhập số kết nối sẽ được kích hoạt và yêu cầu nhập số kết nối.
    *3. Lớp đầu ra (Output Layer)
        - Lớp này sẽ xuất kết quả ra cho người dùng:
            + Tổng tiền hóa đơn: Sau khi tính toán tất cả các loại phí, kết quả sẽ được hiển thị cho khách hàng, bao gồm phí xử lý hóa đơn, phí dịch vụ cơ bản và phí thuê kênh cao cấp.
            + Thông tin chi tiết: Cung cấp thông tin chi tiết về từng khoản phí đã tính.
 * 
 */

function toggleConnectionInput() {
  const customerType = document.getElementById("customerType").value;
  const connectionsGroup = document.getElementById("connectionsGroup");
  const connectionsElement = document.getElementById("connections");

  // Hiển thị hoặc ẩn ô nhập số kết nối
  if (customerType === "business") {
    connectionsGroup.style.display = "block";
    connectionsElement.required = true;
  } else {
    connectionsGroup.style.display = "none";
    connectionsElement.required = false;
    connectionsElement.value = "0";
  }
}

// Hàm tính toán hóa đơn
function calculateBill() {
  const customerId = document.getElementById("customerId").value;
  const customerType = document.getElementById("customerType").value;
  const premiumChannels = parseInt(
    document.getElementById("premiumChannels").value || 0
  );
  const connections = parseInt(
    document.getElementById("connections").value || 0
  );

  // Kiểm tra thông tin đầu vào
  if (!customerId || !customerType || premiumChannels < 0) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Biến lưu kết quả tính toán
  let processingFee = 0;
  let basicServiceFee = 0;
  let premiumChannelFee = 0;
  let totalBill = 0;

  // Tính toán dựa theo loại khách hàng
  if (customerType === "residential") {
    // Khách hàng Nhà dân
    processingFee = 4.5;
    basicServiceFee = 20.5;
    premiumChannelFee = premiumChannels * 7.5;
  } else if (customerType === "business") {
    // Khách hàng Doanh nghiệp
    processingFee = 15;
    // Tính phí dịch vụ cơ bản
    if (connections <= 10) {
      basicServiceFee = 75; // Giá trọn gói cho 10 kết nối đầu
    } else {
      basicServiceFee = 75 + (connections - 10) * 5; // Tính thêm 5$/kết nối vượt quá 10
    }
    premiumChannelFee = premiumChannels * 50;
  }

  // Tính tổng tiền hóa đơn
  totalBill = processingFee + basicServiceFee + premiumChannelFee;

  // Hàm định dạng số tiền với dấu phân cách hàng nghìn
  function formatCurrency(amount) {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Hiển thị kết quả
  document.getElementById("result").innerHTML = `
      <h3>Kết quả hóa đơn</h3>
      <p>Mã khách hàng: <strong>${customerId}</strong></p>
      <p>Tiền Cáp: ${formatCurrency(totalBill)}</p>
    `;
}

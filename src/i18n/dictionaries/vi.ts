import type { Dictionary } from "./en";

// Vietnamese. Have a native speaker review before launch.
const vi: Dictionary = {
  meta: {
    title: "Radhe Impex — Kim cương nhân tạo CVD với mười hai kiểu cắt",
    description:
      "Radhe Impex sản xuất kim cương nhân tạo (lab-grown) CVD có giấy kiểm định từ năm 2015, với mười hai kiểu cắt: tròn, oval, giọt nước, emerald và nhiều hơn nữa. Văn phòng tại Ấn Độ, Thái Lan và Campuchia.",
    ogLine: "Kim cương CVD có kiểm định, mười hai kiểu cắt",
  },
  nav: { shapes: "Kiểu cắt", enquire: "Liên hệ", language: "Ngôn ngữ" },
  hero: {
    title: "Kim cương nhân tạo, đúng dáng bạn yêu thích.",
    body: "Kim cương CVD có giấy kiểm định, với mười hai kiểu cắt. Chọn dáng và kích thước, chúng tôi sẽ gửi bạn những viên phù hợp kèm giá trong vòng một ngày.",
    primary: "Chọn dáng",
    secondary: "Hỏi trực tiếp",
  },
  shapes: {
    title: "Mười hai kiểu cắt",
    body: "Chạm vào một kiểu cắt để bắt đầu yêu cầu báo giá.",
    alt: "Kim cương nhân tạo dáng {shape}",
    items: {
      round: { name: "Tròn", note: "Phản chiếu ánh sáng tốt nhất trong các kiểu cắt." },
      oval: { name: "Oval", note: "Trông lớn hơn viên tròn cùng trọng lượng." },
      pear: { name: "Giọt nước", note: "Đầu nhọn mềm mại giúp ngón tay trông thon dài." },
      marquise: { name: "Marquise", note: "Bề mặt dài nhất trên mỗi carat." },
      cushion: { name: "Cushion", note: "Góc bo tròn, lấp lánh rõ và mạnh." },
      emerald: { name: "Emerald", note: "Giác cắt bậc, vẻ đẹp tĩnh lặng như gương." },
      princess: { name: "Princess", note: "Hình vuông sắc nét với góc nhọn." },
      radiant: { name: "Radiant", note: "Dáng chữ nhật, lấp lánh rực rỡ." },
      heart: { name: "Trái tim", note: "Nên chọn từ một carat trở lên để rõ dáng." },
      trillion: { name: "Tam giác", note: "Hình tam giác, thường dùng làm đá phụ." },
      asscher: { name: "Asscher", note: "Giác cắt bậc hình vuông, tâm như chong chóng." },
      moval: { name: "Moval", note: "Nằm giữa dáng oval và marquise." },
    },
  },
  facts: [
    {
      title: "Kim cương thật",
      body: "Được nuôi cấy bằng công nghệ CVD từ carbon tinh khiết. Cùng cấu trúc tinh thể, độ cứng và độ lửa như kim cương khai thác.",
    },
    {
      title: "Có giấy kiểm định",
      body: "Mỗi viên đều có giấy kiểm định độc lập, có thể tra cứu trực tuyến.",
    },
    {
      title: "Giá minh bạch",
      body: "Thường chỉ bằng một phần nhỏ giá của kim cương khai thác cùng chất lượng.",
    },
  ],
  enquiry: {
    title: "Cho chúng tôi biết bạn đang tìm gì",
    body: "Chúng tôi sẽ gửi lại danh sách ngắn các viên kim cương, giấy kiểm định và giá. Không cần tài khoản, không ràng buộc.",
    shape: "Kiểu cắt",
    size: "Kích thước",
    name: "Tên của bạn",
    note: "Ghi chú thêm (không bắt buộc)",
    notePlaceholder: "Ngân sách, kiểu nhẫn, thời hạn…",
    sizes: ["Dưới 0,5 ct", "0,5 – 1 ct", "1 – 2 ct", "2 – 3 ct", "Trên 3 ct", "Chưa chắc chắn"],
    send: "Gửi qua WhatsApp",
    email: "Hoặc gửi qua email",
    message: "Xin chào {brand}, tôi đang tìm kim cương dáng {shape}, {size}.",
    subject: "Yêu cầu kim cương dáng {shape}",
  },
  about: {
    title: "Sản xuất kim cương nhân tạo từ năm 2015",
    body: "Radhe Impex sản xuất kim cương nhân tạo từ năm 2015. Chúng tôi cung cấp cho các nhà kim hoàn và thương nhân ở nhiều quốc gia, với văn phòng tại Ấn Độ, Thái Lan và Campuchia.",
    officesLabel: "Văn phòng",
    offices: ["Surat, Ấn Độ", "Bangkok, Thái Lan", "Campuchia"],
    customersLabel: "Khách hàng tại",
    countries: ["Mỹ", "Israel", "Ý", "Brazil", "Dubai", "Thái Lan", "Campuchia", "Việt Nam", "Myanmar"],
  },
  contact: {
    title: "Hoặc liên hệ trực tiếp",
    call: "Gọi",
    whatsapp: "WhatsApp",
    email: "Email",
    office: "Trụ sở chính",
    directions: "Chỉ đường",
  },
};

export default vi;

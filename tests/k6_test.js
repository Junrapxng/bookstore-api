import http from "k6/http";
import { check, sleep } from "k6";

// กำหนด stages จำลอง traffic เพิ่มขึ้นทีละระดับ
export let options = {
  stages: [
    { duration: "10s", target: 10 }, // เริ่มยิง 10 users
    { duration: "20s", target: 20 }, // เพิ่มเป็น 20 users
    { duration: "10s", target: 0 },  // ลดเหลือ 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% ของ request ต้องตอบ < 500ms
    http_req_failed: ["rate<0.05"],   // error rate น้อยกว่า 5%
  },
};

const BASE_URL = 'http://host.docker.internal:3000';

export default function () {
  // เรียก API GET /books
  let res = http.get(`${BASE_URL}/books`);

  // ตรวจสอบสถานะตอบกลับ
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  // รอ 1 วินาทีก่อนยิงรอบถัดไป
  sleep(1);
}

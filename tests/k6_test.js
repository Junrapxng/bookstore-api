import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

// สร้าง metrics custom สำหรับ Prometheus
export let myTrend = new Trend("my_api_response_time");
export let myCounter = new Counter("my_api_requests");

export let options = {
  stages: [
    { duration: "10s", target: 10 }, // 10 users
    { duration: "20s", target: 20 }, // 20 users
    { duration: "10s", target: 0 },  // 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.05"],
  },
  // ส่ง metrics ไป Pushgateway
  ext: {
    loadimpact: {
      projectID: 123456, // optional ถ้าใช้ k6 cloud
      name: "bookstore-api-test",
    },
  },
};

const BASE_URL = "http://host.docker.internal:3000"; // สำหรับ container -> host API

export default function () {
  let res = http.get(`${BASE_URL}/books`);

  // custom metrics
  myTrend.add(res.timings.duration);
  myCounter.add(1);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}

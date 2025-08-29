import { sleep } from "k6";
import http from "k6/http";
import { Options } from "k6/options";

export const options: Options = {
  stages: [
    { duration: "30s", target: 125 },
    { duration: "30s", target: 500 },
    { duration: "30s", target: 2_000 },
    { duration: "30s", target: 4_000 },
    { duration: "30s", target: 8_000 },
  ],
};

// FIXME: Use location from k6 envuironment variables
const location = "http://localhost";

export default function () {
  http.get(`${location}/`);

  sleep(1);
}

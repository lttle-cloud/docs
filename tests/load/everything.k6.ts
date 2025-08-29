import { group, sleep } from "k6";
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

// FIXME: Use location from k6 environment variables
const location = "http://localhost";

export default function main() {
  group("page_1 - /", function () {
    http.get(`${location}/assets/js/5e95c892.ec7b88f9.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/aba21aa0.2350feba.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a7bd4aaa.b63c9aab.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/0058b4c6.fd3bc375.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a94703ab.e78acd70.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/14eb3368.7f00a83b.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/73c6e09c.ba32271e.js`, {
      headers: {
        referer: `${location}/`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_2 - /docs/category/introduction", function () {
    http.get(`${location}/img/logo.svg`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/img/logo-dark.svg`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/5e95c892.ec7b88f9.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/aba21aa0.2350feba.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a7bd4aaa.b63c9aab.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/0058b4c6.fd3bc375.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a94703ab.e78acd70.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/17896441.97797548.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/b09c47f8.1379edc3.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/14eb3368.7f00a83b.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/6bb166bd.aacbcfa8.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/c8a4e95a.74d0f673.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/img/favicon.ico`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/649.05d2a6ff.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/17896441.97797548.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/b09c47f8.1379edc3.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/0e384e19.9504d761.js`, {
      headers: {
        referer: `${location}/docs/category/introduction`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_4 - /docs/intro", function () {
    http.get(`${location}/assets/js/c8a4e95a.74d0f673.js`, {
      headers: {
        referer: `${location}/docs/intro`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_5 - /docs/category/tutorial---basics", function () {
    http.get(`${location}/assets/js/5e95c892.ec7b88f9.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/aba21aa0.2350feba.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a7bd4aaa.b63c9aab.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/0058b4c6.fd3bc375.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a94703ab.e78acd70.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/17896441.97797548.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/533a09ca.c04b323d.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/18c41134.d732d265.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/822bd8ab.8a00f723.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/5c868d36.26c0f9c8.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/1e4232ab.be56a0ae.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/f55d3e7a.c5d7e692.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/5c868d36.26c0f9c8.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/822bd8ab.8a00f723.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/18c41134.d732d265.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---basics`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_6 - /docs/tutorial-basics/create-a-page", function () {
    http.get(`${location}/assets/js/1e4232ab.be56a0ae.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/create-a-page`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_7 - /docs/tutorial-basics/create-a-document", function () {
    http.get(`${location}/assets/js/533a09ca.c04b323d.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/create-a-document`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_9 - /docs/tutorial-basics/markdown-features", function () {
    http.get(`${location}/assets/js/f55d3e7a.c5d7e692.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/markdown-features`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_11 - /docs/tutorial-basics/congratulations", function () {
    http.get(`${location}/assets/js/5e95c892.ec7b88f9.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/aba21aa0.2350feba.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a7bd4aaa.b63c9aab.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/0058b4c6.fd3bc375.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/a94703ab.e78acd70.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/17896441.97797548.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/dff1c289.159f97c2.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/e44a2883.65ff4174.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "sec-purpose": "prefetch",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
    http.get(`${location}/assets/js/6bb166bd.aacbcfa8.js`, {
      headers: {
        referer: `${location}/docs/tutorial-basics/congratulations`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_12 - /docs/category/tutorial---extras", function () {
    http.get(`${location}/assets/js/dff1c289.159f97c2.js`, {
      headers: {
        referer: `${location}/docs/category/tutorial---extras`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_13 - /docs/tutorial-extras/manage-docs-versions", function () {
    http.get(
      `${location}/assets/images/docsVersionDropdown-35e13cbe46c9923327f30a76a90bff3b.png`,
      {
        headers: {
          referer: `${location}/docs/tutorial-extras/manage-docs-versions`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );
    http.get(`${location}/assets/js/e44a2883.65ff4174.js`, {
      headers: {
        referer: `${location}/docs/tutorial-extras/manage-docs-versions`,
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
      },
    });
  });

  group("page_14 - /docs/tutorial-extras/translate-your-site", function () {
    http.get(
      `${location}/assets/images/localeDropdown-f0d995e751e7656a1b0dbbc1134e49c2.png`,
      {
        headers: {
          referer: `${location}/docs/tutorial-extras/translate-your-site`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );
  });

  // Automatically added sleep
  sleep(1);
}

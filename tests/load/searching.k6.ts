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
const location = "http://localhost:8108";

// FIXME: Use location from k6 environment variables
const referer = "http://localhost";

export default function main() {
  group("page_1 - /", function () {
    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"i","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );

    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"in","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );

    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"int","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );

    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"intr","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );

    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"intro","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
          "sec-ch-ua": '"Chromium";v="139", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
        },
      }
    );

    http.post(
      `${location}/multi_search?x-typesense-api-key=local-typesense-api-key`,
      '{"searches":[{"collection":"lttle-cloud-docs","q":"intro","query_by":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","include_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content,anchor,url,type,id","highlight_full_fields":"hierarchy.lvl0,hierarchy.lvl1,hierarchy.lvl2,hierarchy.lvl3,hierarchy.lvl4,hierarchy.lvl5,hierarchy.lvl6,content","group_by":"url","group_limit":3,"sort_by":"item_priority:desc","snippet_threshold":8,"highlight_affix_num_tokens":4,"filter_by":"language:=en && docusaurus_tag:=[default,docs-default-current]"}]}',
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "text/plain",
          referer: `${referer}/`,
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

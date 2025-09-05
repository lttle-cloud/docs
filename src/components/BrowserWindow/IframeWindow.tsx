/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * https://github.com/facebook/docusaurus/blob/3dacdf33c9eeec14a1e7ca05f9dc83a69d8fd506/website/src/components/BrowserWindow/IframeWindow.tsx
 *
 * https://github.com/facebook/docusaurus/blob/3dacdf33c9eeec14a1e7ca05f9dc83a69d8fd506/LICENSE
 *
 * MIT License
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { type ReactNode } from "react";

import BrowserWindow from "./index";

// Quick and dirty component, to improve later if needed
export default function IframeWindow({ url }: { url: string }): ReactNode {
  return (
    <div style={{ padding: 10 }}>
      <BrowserWindow
        url={url}
        style={{
          minWidth: "min(100%,45vw)",
          width: 800,
          maxWidth: "100%",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <iframe
          src={url}
          title={url}
          style={{ display: "block", width: "100%", height: 300 }}
        />
      </BrowserWindow>
    </div>
  );
}

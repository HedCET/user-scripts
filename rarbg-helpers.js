// ==UserScript==
// @name         rarbg-helpers
// @namespace    http://tampermonkey.net
// @version      0.1
// @description  description image helpers
// @author       linto.cet@gmail.com
// @grant        none
// @run-at       document-end
// @noframes
// @match        http://rarbgp2p.org/torrent*
// ==/UserScript==

(async () => {
  "use strict";

  const selectors = [
    {
      ref: '#description img[src*="22pixx.xyz/os/"]',
      srcMatch: "22pixx\\.xyz\\/os\\/",
      srcReplace: "22pixx.xyz/o/",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="22pixx.xyz/s/"]',
      srcMatch: "22pixx\\.xyz\\/s\\/",
      srcReplace: "22pixx.xyz/i/",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="imagecurl.com/images/"]',
      srcMatch: "_thumb\\.",
      srcReplace: ".",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="imagesnake.com/tn/t"]',
      srcMatch: "tn\\/t",
      srcReplace: "tn/i",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="freebunker.com/tn/t"]',
      srcMatch: "tn\\/t",
      srcReplace: "tn/i",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="pornbus.org/tn/t"]',
      srcMatch: "tn\\/t",
      srcReplace: "tn/i",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="imgprime.com/uploads/"]',
      srcMatch: "\\/small\\/",
      srcReplace: "/big/",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="imgcarry.com/tn/t"]',
      srcMatch: "tn\\/t",
      srcReplace: "tn/i",
      style: {
        maxWidth: "unset",
      },
    },
    {
      ref: '#description img[src*="imgshots.com/tn/t"]',
      srcMatch: "tn\\/t",
      srcReplace: "tn/i",
      style: {
        maxWidth: "unset",
      },
    },
  ];

  for (const selector of selectors) {
    const refs = document.querySelectorAll(selector.ref);

    for (const ref of refs) {
      if (selector.srcMatch) {
        ref.src = ref.src.replace(
          new RegExp(selector.srcMatch, selector.srcMatchOpt || ""),
          selector.srcReplace || ""
        );
      }

      if (selector.style) {
        for (const prop of Object.keys(selector.style)) {
          ref.style[prop] = selector.style[prop];
        }
      }
    }
  }

  const viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

  for (const element of document.querySelectorAll(
    '.lista2t td:nth-child(2) > a[onmouseover^="return overlib"]'
  ) || []) {
    if (-1 < viewed.indexOf(element.href))
      element.closest("tr").style.borderLeft = "3px solid yellow";
    else viewed.push(element.href);
  }

  localStorage.setItem("viewed", JSON.stringify(viewed));
})();

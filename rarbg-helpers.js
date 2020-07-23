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

  const imgSelectors = [
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

  for (const imgSelector of imgSelectors) {
    const refs = document.querySelectorAll(imgSelector.ref);

    for (const ref of refs) {
      if (imgSelector.srcMatch) {
        ref.src = ref.src.replace(
          new RegExp(imgSelector.srcMatch, imgSelector.srcMatchOpt || ""),
          imgSelector.srcReplace || ""
        );
      }

      if (imgSelector.style) {
        for (const prop of Object.keys(imgSelector.style)) {
          ref.style[prop] = imgSelector.style[prop];
        }
      }
    }
  }

  const listed = JSON.parse(localStorage.getItem("listed") || "[]");
  const opened = JSON.parse(localStorage.getItem("opened") || "[]");

  for (const element of document.querySelectorAll(
    '.lista2t td:nth-child(2) > a[onmouseover^="return overlib"]'
  ) || []) {
    if (-1 < listed.indexOf(element.href))
      element.closest("tr").style.borderLeft = "2px solid yellow";
    else listed.push(element.href);

    if (-1 < opened.indexOf(element.href))
      element.closest("tr").style.borderLeft = "2px solid red";
  }

  if (
    location.href.match(
      /https?:\/\/rarbg[0-9a-z]*\.[0-9a-z]{2,4}\/torrent\/[^\/\?]+/
    ) &&
    opened.indexOf(location.href) === -1
  )
    opened.push(location.href);

  localStorage.setItem("listed", JSON.stringify(listed));
  localStorage.setItem("opened", JSON.stringify(opened));
})();

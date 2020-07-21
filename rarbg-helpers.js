// ==UserScript==
// @name         rarbg-helpers
// @namespace    http://tampermonkey.net
// @version      0.1
// @description  description image helpers
// @author       linto.cet@gmail.com
// @grant        none
// @run-at       document-end
// @noframes
// @match        http://rarbgp2p.org/torrent/*
// ==/UserScript==

(async () => {
    'use strict';

    const selectors = [{
            ref: '#description img[src*="22pixx.xyz/os/"]',
            srcMatch: '22pixx\\.xyz\\/os\\/',
            srcReplace: '22pixx.xyz/o/',
            style: {
                maxWidth: 'unset',
            },
        }, {
            ref: '#description img[src*="imagecurl.com/images/"]',
            srcMatch: '_thumb\\.',
            srcReplace: '.',
            style: {
                maxWidth: 'unset',
            },
        }];

    for(const selector of selectors) {
        const refs = document.querySelectorAll(selector.ref);

        for(const ref of refs) {
            if(selector.srcMatch) {
                ref.src = ref.src.replace(new RegExp(selector.srcMatch, selector.srcMatchOpt || ''), selector.srcReplace || '');
            }

            if(selector.style) {
                for(const prop of Object.keys(selector.style)) {
                    ref.style[prop] = selector.style[prop];
                }
            }
        }
    }
})();

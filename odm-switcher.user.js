// ==UserScript==
// @name        OverDrive Marketplace - Keep Title on Model Switch
// @namespace   https://github.com/bottleofink/
// @supportURL  https://github.com/bottleofink/odm-switcher/issues
// @downloadURL https://github.com/bottleofink/odm-switcher/raw/main/odm-switcher.user.js
// @match       https://marketplace.overdrive.com/*
// @author      bottleofink
// @license     GPL-3.0-or-later
// @grant       none
// @version     1.3.1
// @description Keeps the current title active when switching between lending models (Metered Access, Cost Per Circ, Simultaneous Use) in OverDrive Marketplace. Streamlines book ordering workflows for librarians managing Libby collections.
// ==/UserScript==

(function() {
    'use strict';

    // Extract Title ID from the current URL (matches numbers, letters, and hyphens)
    const urlMatch = window.location.href.match(/\/TitleDetails\/([a-zA-Z0-9-]+)/i);
    if (!urlMatch) return; // Exit if not on a TitleDetails page

    const titleId = urlMatch[1];

    // The base paths in the dropdown that should carry over the Title ID
    const targetPaths = [
        '/Marketplace/OneCopyOneUserAndMeteredAccess',
        '/Marketplace/CostPerCirc',
        '/Marketplace/SimultaneousUse'
    ];

    // Find all links in the specific shop dropdown menu
    const dropdownLinks = document.querySelectorAll('#marketPlaces li a');

    dropdownLinks.forEach(link => {
        const currentHref = link.getAttribute('href');

        // If the link's exact href matches one of our target paths
        if (targetPaths.includes(currentHref)) {
            // Append the Title Details path to it
            link.setAttribute('href', `${currentHref}/TitleDetails/${titleId}`);
        }
    });
})();

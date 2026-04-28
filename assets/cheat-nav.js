(function () {
    'use strict';

    var MACHINES = [
        { slug: "aladdins-fortune", name: "Aladdin's Fortune 3D" },
        { slug: "aztec-vault", name: "Aztec Vault" },
        { slug: "boom", name: "Boom" },
        { slug: "buccaneers-gold", name: "Buccaneer's Gold" },
        { slug: "buffalo-ascension", name: "Buffalo Ascension" },
        { slug: "cleopatras-vault", name: "Cleopatra's Vault" },
        { slug: "eagle-bucks", name: "Eagle Bucks" },
        { slug: "fort-knox", name: "Fort Knox" },
        { slug: "golden-egypt", name: "Golden Egypt" },
        { slug: "golden-jungle", name: "Golden Jungle" },
        { slug: "hexbreaker", name: "Hexbreak3r" },
        { slug: "mustang-money", name: "Mustang Money" },
        { slug: "ocean-magic", name: "Ocean Magic" },
        { slug: "piggy-bankin", name: "Piggy Bankin'" },
        { slug: "plants-zombies", name: "Plants vs Zombies 3D" },
        { slug: "scarab", name: "Scarab" },
        { slug: "the-enforcer", name: "The Enforcer" },
        { slug: "thunder-cash", name: "Thunder Cash" },
        { slug: "triple-double-diamond", name: "Triple Double Diamond" },
        { slug: "wheel-of-fortune", name: "Wheel of Fortune (Puzzle)" }
    ];

    function currentSlug() {
        var m = window.location.pathname.match(/\/hunter\/([^\/]+)\/?/);
        return m ? m[1] : null;
    }

    function el(tag, attrs, html) {
        var node = document.createElement(tag);
        if (attrs) {
            for (var k in attrs) if (attrs.hasOwnProperty(k)) node.setAttribute(k, attrs[k]);
        }
        if (html != null) node.innerHTML = html;
        return node;
    }

    function buildTop() {
        var nav = el('nav', { 'class': 'sc-nav-top', 'aria-label': 'Cheat sheet navigation' });
        var back = el('button', { 'type': 'button', 'class': 'sc-nav-back', 'aria-label': 'Back' }, '← Back');
        back.addEventListener('click', function () {
            if (window.history.length > 1) window.history.back();
            else window.location.href = '/hunter/';
        });
        var home = el('a', { 'href': '/', 'class': 'sc-nav-home' },
            '<span class="sc-nav-home-mark">♦</span> SlotCheater');
        var all = el('a', { 'href': '/hunter/', 'class': 'sc-nav-all' }, 'All Sheets');
        nav.appendChild(back);
        nav.appendChild(home);
        nav.appendChild(all);
        return nav;
    }

    function buildBottom(prev, next) {
        var nav = el('nav', { 'class': 'sc-nav-bottom', 'aria-label': 'Previous and next cheat sheets' });
        if (prev) {
            var p = el('a', { 'href': '/hunter/' + prev.slug + '/', 'class': 'sc-nav-prev' + (next ? '' : ' sc-nav-solo') },
                '<span class="sc-nav-label">← Previous</span>' + escapeHtml(prev.name));
            nav.appendChild(p);
        }
        if (next) {
            var n = el('a', { 'href': '/hunter/' + next.slug + '/', 'class': 'sc-nav-next' + (prev ? '' : ' sc-nav-solo') },
                '<span class="sc-nav-label">Next →</span>' + escapeHtml(next.name));
            nav.appendChild(n);
        }
        return nav;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function init() {
        if (document.querySelector('.sc-nav-top')) return;
        var slug = currentSlug();
        if (!slug) return;
        var idx = -1;
        for (var i = 0; i < MACHINES.length; i++) if (MACHINES[i].slug === slug) { idx = i; break; }
        if (idx === -1) return;
        var prev = idx > 0 ? MACHINES[idx - 1] : null;
        var next = idx < MACHINES.length - 1 ? MACHINES[idx + 1] : null;
        document.body.insertBefore(buildTop(), document.body.firstChild);
        document.body.appendChild(buildBottom(prev, next));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

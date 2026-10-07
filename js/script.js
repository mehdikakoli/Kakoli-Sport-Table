/* =====================================================
   Kakoli Sport Table - Main Script
   ===================================================== */

(function() {
    'use strict';

    // ---------- زبان پیش‌فرض ----------
    var currentLang = 'fa';

    // ---------- ذخیره متن‌های اصلی ----------
    var texts = {};

    function captureOriginalTexts() {
        var elements = document.querySelectorAll('[data-fa]');
        elements.forEach(function(el) {
            texts[el] = {
                fa: el.getAttribute('data-fa'),
                en: el.getAttribute('data-en')
            };
        });
    }

    // ---------- تغییر زبان ----------
    function switchLanguage(lang) {
        currentLang = lang;

        var body = document.body;
        var html = document.documentElement;
        var langBtn = document.getElementById('langToggle');

        // --- تغییر جهت و کلاس ---
        if (lang === 'en') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            body.classList.add('lang-en');
            if (langBtn) langBtn.textContent = 'FA';
        } else {
            html.setAttribute('lang', 'fa');
            html.setAttribute('dir', 'rtl');
            body.classList.remove('lang-en');
            if (langBtn) langBtn.textContent = 'EN';
        }

        // --- تغییر متن‌ها ---
        var elements = document.querySelectorAll('[data-fa]');
        elements.forEach(function(el) {
            var text = el.getAttribute('data-' + lang);
            if (text) {
                el.textContent = text;
            }
        });

        // --- ذخیره در localStorage ---
        try {
            localStorage.setItem('kst-lang', lang);
        } catch (e) {
            // نادیده بگیر
        }
    }

    // ---------- راه‌اندازی ----------
    function init() {
        captureOriginalTexts();

        var langBtn = document.getElementById('langToggle');
        if (langBtn) {
            langBtn.addEventListener('click', function() {
                var newLang = (currentLang === 'fa') ? 'en' : 'fa';
                switchLanguage(newLang);
            });
        }

        // --- بازیابی زبان از localStorage ---
        try {
            var savedLang = localStorage.getItem('kst-lang');
            if (savedLang === 'en') {
                switchLanguage('en');
            }
        } catch (e) {
            // نادیده بگیر
        }

        // --- Smooth Scroll برای لینک‌های داخلی ---
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        console.log('Kakoli Sport Table - Loaded');
    }

    // ---------- اجرا بعد از لود شدن صفحه ----------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

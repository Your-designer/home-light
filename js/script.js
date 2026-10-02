document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const cursorGlow = document.getElementById("cursorGlow");

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    const navLinks = document.querySelectorAll(
        '.nav-link, .mobile-nav-link, .hero-primary-button, .header-button, .mobile-menu-cta'
    );


    /* =====================================================
       HEADER — SCROLL STATE
    ===================================================== */

    const updateHeader = () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const openMenu = () => {

        menuToggle.classList.add("active");

        mobileMenu.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Закрыть меню"
        );

    };


    const closeMenu = () => {

        menuToggle.classList.remove("active");

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Открыть меню"
        );

    };


    menuToggle.addEventListener("click", () => {

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       ESC CLOSE
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mobileMenu.classList.contains("active")
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 800 &&
            mobileMenu.classList.contains("active")
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       CURSOR LIGHT
    ===================================================== */

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    let cursorVisible = false;


    if (window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorVisible = true;

            cursorGlow.style.opacity = "1";

        });


        document.addEventListener("mouseleave", () => {

            cursorVisible = false;

            cursorGlow.style.opacity = "0";

        });


        const animateCursor = () => {

            if (cursorVisible) {

                glowX += (mouseX - glowX) * 0.08;
                glowY += (mouseY - glowY) * 0.08;

                cursorGlow.style.left = `${glowX}px`;
                cursorGlow.style.top = `${glowY}px`;

            }

            requestAnimationFrame(animateCursor);

        };

        animateCursor();

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");

    if (hero && heroImage) {

        const desktopPointer =
            window.matchMedia("(hover: hover) and (pointer: fine)");

        if (desktopPointer.matches) {

            hero.addEventListener("mousemove", event => {

                const rect = hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;

                const moveX = x * 10;
                const moveY = y * 7;

                heroImage.style.transform =
                    `scale(1.045) translate(${moveX}px, ${moveY}px)`;

            });

            hero.addEventListener("mouseleave", () => {

                heroImage.style.transform =
                    "scale(1.03) translate(0, 0)";

            });

        } else {

            /* Мобильные и touch-устройства */

            heroImage.style.transform = "none";
            heroImage.style.transition = "none";

        }

    }


    /* =====================================================
       ACTIVE NAV ON SCROLL
    ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const observerOptions = {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    document
                        .querySelectorAll(".nav-link")
                        .forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                });

            },
            observerOptions
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       SMOOTH ANCHOR OFFSET
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                !href.startsWith("#") ||
                href === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            closeMenu();

        });

    });


    /* =====================================================
       HERO ENTRANCE
    ===================================================== */

    window.requestAnimationFrame(() => {

        document.body.classList.add("page-ready");

    });

});













/* ============================================================
   CALLBACK MODAL
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const modal =
        document.querySelector("#callbackModal");

    if (!modal) return;


    const overlay =
        document.querySelector("#callbackModalOverlay");

    const closeButton =
        document.querySelector("#callbackModalClose");

    const form =
        document.querySelector("#callbackForm");

    const success =
        document.querySelector("#callbackSuccess");

    const error =
        document.querySelector("#callbackFormError");


    /* ========================================================
       OPEN
       ======================================================== */

    function openCallbackModal() {

        modal.classList.add("active");

        document.body.classList.add("callback-modal-open");

        document.body.style.overflow = "hidden";


        /*
         * Возвращаем форму,
         * если окно открывается повторно.
         */

        if (form) {
            form.style.display = "";
        }

        if (success) {
            success.classList.remove("active");
        }

        if (error) {
            error.textContent = "";
            error.classList.remove("visible");
        }


        /*
         * Подключаем телефонную маску.
         */

        const phoneInput =
            form?.querySelector('input[name="phone"]');

        if (
            phoneInput &&
            typeof $ !== "undefined" &&
            $.fn.mask
        ) {

            $(phoneInput).mask(
                "+7 (999) 999-99-99"
            );

        }


        /*
         * Фокус на имя.
         */

        setTimeout(() => {

            const nameInput =
                form?.querySelector('input[name="name"]');

            if (nameInput) {
                nameInput.focus();
            }

        }, 350);
    }


    /* ========================================================
       CLOSE
       ======================================================== */

    function closeCallbackModal() {

        modal.classList.remove("active");

        document.body.classList.remove(
            "callback-modal-open"
        );

        document.body.style.overflow = "";
    }


    /* ========================================================
       CALLBACK BUTTONS
       ======================================================== */

    /*
     * Можно поставить этот класс на любое количество кнопок.
     *
     * <a href="#" class="callback-trigger">
     * <button class="callback-trigger">
     */

    document
        .querySelectorAll(".callback-trigger")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                openCallbackModal();

            });

        });


    /* ========================================================
       CLOSE BUTTON
       ======================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeCallbackModal();

            }
        );

    }


    /* ========================================================
       OVERLAY
       ======================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCallbackModal
        );

    }


    /* ========================================================
       ESC
       ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeCallbackModal();

            }

        }
    );


    /* ========================================================
       SUBMIT
       ======================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const name =
                    form.elements.name.value.trim();

                const phone =
                    form.elements.phone.value.trim();

                const personalConsent =
                    form.elements.personalConsent.checked;


                /* ------------------------------------------------
                   VALIDATION
                ------------------------------------------------ */

                if (
                    !name ||
                    !phone ||
                    !personalConsent
                ) {

                    if (error) {

                        error.textContent =
                            "Заполните имя, телефон и подтвердите согласие.";

                        error.classList.add("visible");

                    }

                    return;
                }


               /* ------------------------------------------------
                   BUTTON
                ------------------------------------------------ */

                const submitButton =
                    form.querySelector(
                        ".callback-submit"
                    );

                submitButton.disabled = true;

                const submitText =
                    submitButton.querySelector(
                        "span:first-child"
                    );

                if (submitText) {
                    submitText.textContent =
                        "Отправляем...";
                }

                /* ------------------------------------------------
                   PAYLOAD
                ------------------------------------------------ */

                const payload = {

                    type: "callback",

                    timestamp:
                        new Date().toISOString(),

                    name,

                    phone,

                    personalConsent,

                    source:
                        window.location.href

                };


                /* ------------------------------------------------
                   SEND
                ------------------------------------------------ */

                try {

                    const response =
                        await fetch(
                            "./quiz/quiz.json"
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Не удалось загрузить настройки"
                        );

                    }


                    const config =
                        await response.json();


                    const googleScriptUrl =
                        config.settings?.googleScriptUrl;


                    if (!googleScriptUrl) {

                        throw new Error(
                            "Google Apps Script URL не указан"
                        );

                    }


                    await fetch(
                        googleScriptUrl,
                        {
                            method: "POST",

                            mode: "no-cors",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(payload)
                        }
                    );


                    /* ------------------------------------------------
                       SUCCESS
                    ------------------------------------------------ */

                    form.style.display = "none";


                    if (error) {
                        error.classList.remove(
                            "visible"
                        );
                    }


                    if (success) {
                        success.classList.add(
                            "active"
                        );
                    }


                } catch (submitError) {

                    console.error(
                        "Callback submit error:",
                        submitError
                    );


                    if (error) {

                        error.textContent =
                            "Не удалось отправить заявку. Попробуйте ещё раз.";

                        error.classList.add(
                            "visible"
                        );

                    }


                    submitButton.disabled = false;

                    const submitText =
                        submitButton.querySelector(
                            "span:first-child"
                        );

                    if (submitText) {
                        submitText.textContent =
                            "Перезвоните мне";
                    }

                }

            }
        );

    }

});





















/* =========================================================
   PROJECTS GALLERY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectMainImage =
        document.getElementById("projectMainImage");

    const projectImageButton =
        document.getElementById("projectImageButton");

    const projectCurrentImage =
        document.getElementById("projectCurrentImage");

    const projectTotalImages =
        document.getElementById("projectTotalImages");

    const projectNumber =
        document.getElementById("projectNumber");

    const projectName =
        document.getElementById("projectName");

    const projectYear =
        document.getElementById("projectYear");

    const projectDescription =
        document.getElementById("projectDescription");

    const projectStats =
        document.getElementById("projectStats");

    const projectThumbnails =
        document.getElementById("projectThumbnails");

    const projectPrev =
        document.getElementById("projectPrev");

    const projectNext =
        document.getElementById("projectNext");

    const filters =
        document.querySelectorAll(".project-filter");

    const projectsVisibleCount =
        document.getElementById("projectsVisibleCount");







/* =====================================================
   PROJECT DATA

   Здесь потом можно спокойно менять
   названия, фотографии, категории и описание.
===================================================== */

const projects = [

    // =====================================================
    // GARLAND
    // =====================================================

    {
        title: "Дом в Лесном",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Праздничное оформление загородного дома " +
            "с акцентом на фасад, кровлю и архитектурные элементы.",

        stats: [
            "55 м.п. — Бахрома",
            "80 м.п. — световая нить",
            "Тёплый белый свет"
        ],

        images: [
            "img/work/b_24.jpg",
            "img/work/b_25.jpg",
            "img/work/b_26.jpg"
        ]
    },


    {
        title: "Дом на Берёзовой",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Комплексное праздничное оформление фасада " +
            "и придомовой территории частного дома.",

        stats: [
            "75 м.п. — Бахрома",
            "60 м.п. — световая нить",
            "Контурное оформление фасада"
        ],

        images: [
            "img/work/b_5.jpg",
            "img/work/b_6.jpg",
            "img/work/b_7.jpg",
            "img/work/b_8.jpg",
            "img/work/b_9.jpg"
        ]
    },


    {
        title: "Загородный дом в сосновом лесу",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Праздничная подсветка большого загородного дома " +
            "с оформлением фасада и окружающей территории.",

        stats: [
            "90 м.п. — Бахрома",
            "120 м.п. — световая нить",
            "Оформление деревьев"
        ],

        images: [
            "img/work/b_10.jpg",
            "img/work/b_11.jpg",
            "img/work/b_12.jpg",
            "img/work/b_13.jpg",
            "img/work/b_14.jpg",
            "img/work/b_15.jpg"
        ]
    },


    {
        title: "Дом у озера",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Лаконичное праздничное оформление фасада " +
            "и кровли загородного дома.",

        stats: [
            "40 м.п. — Бахрома",
            "35 м.п. — световая нить",
            "Тёплый белый свет"
        ],

        images: [
            "img/work/b_17.jpg",
            "img/work/b_18.jpg"
        ]
    },


    {
        title: "Дом в современном стиле",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Сдержанное световое оформление современного дома " +
            "с акцентом на основные архитектурные линии.",

        stats: [
            "50 м.п. — Бахрома",
            "45 м.п. — световая нить",
            "Акцентная подсветка входной группы"
        ],

        images: [
            "img/work/b_20.jpg",
            "img/work/b_21.jpg"
        ]
    },


    {
        title: "Дом в загородном посёлке",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Праздничное оформление фасада и территории " +
            "с использованием световых гирлянд.",

        stats: [
            "65 м.п. — Бахрома",
            "70 м.п. — световая нить",
            "Оформление фасада и кровли"
        ],

        images: [
            "img/work/b_1.jpg",
            "img/work/b_2.jpg",
            "img/work/b_3.jpg",
            "img/work/b_4.jpg"
        ]
    },


    {
        title: "Таунхаус в центре посёлка",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Компактное праздничное оформление фасада " +
            "и входной группы таунхауса.",

        stats: [
            "35 м.п. — Бахрома",
            "30 м.п. — световая нить",
            "Оформление входной группы"
        ],

        images: [
            "img/work/b_29.jpg",
            "img/work/b_30.jpg"
        ]
    },


    {
        title: "Дом с панорамным фасадом",
        year: "2026",

        categories: [
            "garland"
        ],

        description:
            "Праздничная подсветка фасада и архитектурных " +
            "элементов частного дома.",

        stats: [
            "45 м.п. — Бахрома",
            "50 м.п. — световая нить",
            "Акцентная подсветка фасада"
        ],

        images: [
            "img/work/b_32.jpg",
            "img/work/b_33.jpg"
        ]
    },


    // =====================================================
    // NEON
    // =====================================================

    {
        title: "Современная резиденция",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Выразительная архитектурная подсветка дома " +
            "с использованием гибкого неона.",

        stats: [
            "95 м.п. — гибкий Неон",
            "Контурная подсветка фасада",
            "Wi-Fi управление"
        ],

        images: [
            "img/work/n_91.jpg",
            "img/work/n_92.jpg",
            "img/work/n_93.jpg",
            "img/work/n_94.jpg",
            "img/work/n_95.jpg",
            "img/work/n_96.jpg",
            "img/work/n_98.jpg"
        ]
    },


    {
        title: "Дом с контурной подсветкой",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Минималистичная подсветка фасада " +
            "и основных архитектурных линий здания.",

        stats: [
            "55 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_44.jpg",
            "img/work/n_45.jpg",
            "img/work/n_33.jpg"
        ]
    },


    {
        title: "Коттедж на Луговой",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Акцентная подсветка фасада и архитектурных " +
            "элементов частного коттеджа.",

        stats: [
            "70 м.п. — гибкий Неон",
            "Подсветка архитектурных линий",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_67.jpg",
            "img/work/n_68.jpg",
            "img/work/n_69.jpg",
            "img/work/n_70.jpg",
            "img/work/n_71.jpg"
        ]
    },


    {
        title: "Дом на Тихой улице",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Лаконичная архитектурная подсветка " +
            "с акцентом на геометрию фасада.",

        stats: [
            "60 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Тёплый белый свет"
        ],

        images: [
            "img/work/n_72.jpg",
            "img/work/n_73.jpg",
            "img/work/n_74.jpg",
            "img/work/n_75.jpg"
        ]
    },


    {
        title: "Дом на Первомайской",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Современная подсветка фасада гибким неоном " +
            "для подчёркивания архитектурных линий.",

        stats: [
            "45 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_76.jpg",
            "img/work/n_77.jpg"
        ]
    },


    {
        title: "Коттедж на Береговой",
        year: "2026",

        categories: [
            "neon"
        ],

        description:
            "Комплексная архитектурная подсветка фасада " +
            "с выделением основных объёмов здания.",

        stats: [
            "85 м.п. — гибкий Неон",
            "Подсветка фасада",
            "Wi-Fi управление"
        ],

        images: [
            "img/work/n_81.jpg",
            "img/work/n_82.jpg",
            "img/work/n_83.jpg",
            "img/work/n_84.jpg",
            "img/work/n_85.jpg",
            "img/work/n_86.jpg"
        ]
    },


    // =====================================================
    // ARCHITECTURE
    // =====================================================

    {
        title: "Дом на Речной набережной",
        year: "2026",

        categories: [
            "architecture"
        ],

        description:
            "Архитектурная подсветка фасада " +
            "с акцентом на объём и геометрию здания.",

        stats: [
            "Архитектурная подсветка фасада",
            "Акцентная подсветка элементов",
            "Автоматическое управление"
        ],

        images: [
            "img/work/ao_1.jpg",
            "img/work/ao_2.jpg",
            "img/work/ao_3.jpg",
            "img/work/ao_4.jpg"
        ]
    },


    // =====================================================
    // COMBINED
    // =====================================================

    {
        title: "Большая загородная резиденция",
        year: "2026",

        categories: [
            "garland",
            "combined"
        ],

        description:
            "Масштабное праздничное оформление загородной " +
            "резиденции с подсветкой фасада и территории.",

        stats: [
            "120 м.п. — Бахрома",
            "180 м.п. — световая нить",
            "Оформление деревьев"
        ],

        images: [
            "img/work/b_35.jpg",
            "img/work/b_36.jpg",
            "img/work/b_37.jpg",
            "img/work/b_38.jpg",
            "img/work/b_39.jpg",
            "img/work/b_40.jpg",
            "img/work/b_41.jpg",
            "img/work/b_42.jpg",
            "img/work/b_43.jpg",
            "img/work/b_44.jpg"
        ]
    },


    {
        title: "Дом с неоновой подсветкой",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Комбинированное световое решение " +
            "с акцентной подсветкой фасада гибким неоном.",

        stats: [
            "55 м.п. — гибкий Неон",
            "Контурная подсветка фасада",
            "Wi-Fi управление"
        ],

        images: [
            "img/work/n_2.jpg",
            "img/work/n_3.jpg",
            "img/work/n_4.jpg"
        ]
    },


    {
        title: "Дом в современном стиле",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Современная подсветка фасада " +
            "с использованием гибкого неона.",

        stats: [
            "60 м.п. — гибкий Неон",
            "Акцентная подсветка фасада",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_5.jpg",
            "img/work/n_6.jpg",
            "img/work/n_7.jpg"
        ]
    },


    {
        title: "Коттедж с архитектурной подсветкой",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Выразительная подсветка архитектурных " +
            "элементов частного коттеджа.",

        stats: [
            "65 м.п. — гибкий Неон",
            "Подсветка фасада",
            "Автоматическое управление"
        ],

        images: [
            "img/work/n_8.jpg",
            "img/work/n_9.jpg",
            "img/work/n_10.jpg"
        ]
    },


    {
        title: "Резиденция в Сосновом",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Комплексная подсветка загородной резиденции " +
            "с выделением архитектурных линий здания.",

        stats: [
            "90 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Wi-Fi управление"
        ],

        images: [
            "img/work/n_11.jpg",
            "img/work/n_12.jpg",
            "img/work/n_13.jpg",
            "img/work/n_14.jpg",
            "img/work/n_15.jpg",
            "img/work/n_16.jpg"
        ]
    },


    {
        title: "Дом у озера",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Архитектурная подсветка загородного дома " +
            "с акцентом на фасад и отдельные элементы.",

        stats: [
            "75 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_17.jpg",
            "img/work/n_18.jpg",
            "img/work/n_19.jpg",
            "img/work/n_20.jpg",
            "img/work/n_21.jpg",
            "img/work/n_22.jpg"
        ]
    },


    {
        title: "Дом на Полянах",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Лаконичная подсветка фасада " +
            "гибким архитектурным неоном.",

        stats: [
            "45 м.п. — гибкий Неон",
            "Контурная подсветка",
            "Тёплый белый свет"
        ],

        images: [
            "img/work/n_23.jpg",
            "img/work/n_24.jpg"
        ]
    },


    {
        title: "Дом на Центральной",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Контурная подсветка фасада " +
            "и отдельных архитектурных элементов.",

        stats: [
            "50 м.п. — гибкий Неон",
            "Подсветка фасада",
            "Скрытый монтаж"
        ],

        images: [
            "img/work/n_34.jpg",
            "img/work/n_35.jpg"
        ]
    },


    {
        title: "Коттедж в Новых Полях",
        year: "2026",

        categories: [
            "neon",
            "combined"
        ],

        description:
            "Комплексное световое решение для загородного " +
            "коттеджа с акцентом на архитектуру здания.",

        stats: [
            "90 м.п. — гибкий Неон",
            "Контурная подсветка фасада",
            "Wi-Fi управление"
        ],

        images: [
            "img/work/n_36.jpg",
            "img/work/n_37.jpg",
            "img/work/n_38.jpg",
            "img/work/n_39.jpg",
            "img/work/n_40.jpg",
            "img/work/n_41.jpg",
            "img/work/n_42.jpg",
            "img/work/n_43.jpg"
        ]
    }

];



    /* =====================================================
       STATE
    ===================================================== */

    let filteredProjects = [...projects];

    let currentProjectIndex = 0;

    let currentImageIndex = 0;



    /* =====================================================
       HELPERS
    ===================================================== */

    function padNumber(number) {

        return String(number).padStart(2, "0");

    }



    /* =====================================================
       RENDER STATS
    ===================================================== */

    function renderStats(project) {

        if (!projectStats) return;

        projectStats.innerHTML = "";

        project.stats.forEach(stat => {

            const element =
                document.createElement("div");

            element.className =
                "project-stat";

            element.textContent =
                stat;

            projectStats.appendChild(element);

        });

    }



    /* =====================================================
       RENDER THUMBNAILS
    ===================================================== */

    function renderThumbnails(project) {

        if (!projectThumbnails) return;

        projectThumbnails.innerHTML = "";

        project.images.forEach(
            (image, index) => {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "project-thumbnail";

                if (index === currentImageIndex) {
                    button.classList.add("active");
                }

                button.setAttribute(
                    "aria-label",
                    `Фотография ${index + 1}`
                );


                const img =
                    document.createElement("img");

                img.src = image;

                img.alt =
                    `${project.title} — фото ${index + 1}`;

                img.loading =
                    index === 0
                        ? "eager"
                        : "lazy";

                img.decoding =
                    "async";


                button.appendChild(img);

                button.addEventListener(
                    "click",
                    () => {

                        currentImageIndex = index;

                        updateProjectImage();

                    }
                );


                projectThumbnails.appendChild(button);

            }
        );

    }



    /* =====================================================
       UPDATE MAIN IMAGE
    ===================================================== */

    function updateProjectImage(
        animate = true
    ) {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        const image =
            project.images[currentImageIndex];



        if (animate) {

            projectMainImage.style.opacity = "0";

            projectMainImage.style.transform =
                "scale(1.025)";


            setTimeout(() => {

                projectMainImage.src =
                    image;

                projectMainImage.alt =
                    `${project.title} — фото ${currentImageIndex + 1}`;

                projectMainImage.style.opacity =
                    "1";

                projectMainImage.style.transform =
                    "scale(1.001)";

            }, 180);

        } else {

            projectMainImage.src =
                image;

            projectMainImage.alt =
                `${project.title} — фото ${currentImageIndex + 1}`;

        }



        projectCurrentImage.textContent =
            padNumber(currentImageIndex + 1);

        projectTotalImages.textContent =
            padNumber(project.images.length);



        renderThumbnails(project);

    }



    /* =====================================================
       UPDATE PROJECT
    ===================================================== */

    function renderProject(
        animate = false
    ) {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        currentImageIndex = 0;


        if (animate) {

            projectName.style.opacity = "0";
            projectDescription.style.opacity = "0";
            projectStats.style.opacity = "0";


            setTimeout(() => {

                projectName.textContent =
                    project.title;

                projectYear.textContent =
                    project.year;

                projectNumber.textContent =
                    padNumber(
                        projects.indexOf(project) + 1
                    );

                projectDescription.textContent =
                    project.description;


                renderStats(project);

                projectName.style.opacity = "1";
                projectDescription.style.opacity = "1";
                projectStats.style.opacity = "1";


                updateProjectImage(false);

            }, 180);

        } else {

            projectName.textContent =
                project.title;

            projectYear.textContent =
                project.year;

            projectNumber.textContent =
                padNumber(
                    projects.indexOf(project) + 1
                );

            projectDescription.textContent =
                project.description;


            renderStats(project);

            updateProjectImage(false);

        }

    }



    /* =====================================================
       PROJECT NAVIGATION
    ===================================================== */

    function nextProject() {

        if (!filteredProjects.length) return;

        currentProjectIndex =
            (currentProjectIndex + 1) %
            filteredProjects.length;

        renderProject(true);

    }



    function previousProject() {

        if (!filteredProjects.length) return;

        currentProjectIndex =
            (
                currentProjectIndex -
                1 +
                filteredProjects.length
            ) %
            filteredProjects.length;

        renderProject(true);

    }



    /* =====================================================
       IMAGE NAVIGATION
    ===================================================== */

    function nextImage() {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        currentImageIndex =
            (currentImageIndex + 1) %
            project.images.length;

        updateProjectImage();

    }



    function previousImage() {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        currentImageIndex =
            (
                currentImageIndex -
                1 +
                project.images.length
            ) %
            project.images.length;

        updateProjectImage();

    }



    /* =====================================================
       MAIN IMAGE BUTTON

       Клик по большой фотографии открывает lightbox.
    ===================================================== */

    if (projectImageButton) {

        projectImageButton.addEventListener(
            "click",
            () => {

                openLightbox();

            }
        );

    }



    /* =====================================================
       MAIN ARROWS
    ===================================================== */

    if (projectNext) {

        projectNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextProject();

            }
        );

    }


    if (projectPrev) {

        projectPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousProject();

            }
        );

    }



    /* =====================================================
       FILTERS
    ===================================================== */

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const category =
                    filter.dataset.filter;


                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                filter.classList.add("active");


                if (category === "all") {

                    filteredProjects =
                        [...projects];

                } else {

                    filteredProjects =
                        projects.filter(project =>
                            project.categories.includes(
                                category
                            )
                        );

                }


                currentProjectIndex = 0;

                currentImageIndex = 0;


                if (projectsVisibleCount) {

                    projectsVisibleCount.textContent =
                        padNumber(
                            filteredProjects.length
                        );

                }


                renderProject(true);

            }
        );

    });



    /* =====================================================
       LIGHTBOX ELEMENTS
    ===================================================== */

    const lightbox =
        document.getElementById(
            "projectLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxCurrent =
        document.getElementById(
            "lightboxCurrent"
        );

    const lightboxTotal =
        document.getElementById(
            "lightboxTotal"
        );

    const lightboxProjectName =
        document.getElementById(
            "lightboxProjectName"
        );

    const lightboxProjectYear =
        document.getElementById(
            "lightboxProjectYear"
        );

    const lightboxClose =
        document.getElementById(
            "projectLightboxClose"
        );

    const lightboxBackdrop =
        document.getElementById(
            "projectLightboxBackdrop"
        );

    const lightboxPrev =
        document.getElementById(
            "lightboxPrev"
        );

    const lightboxNext =
        document.getElementById(
            "lightboxNext"
        );

        const lightboxThumbnails =
    document.getElementById(
        "lightboxThumbnails"
    );



       // ============================================================
        // ЗАКРЫТИЕ ЛАЙТБОКСА ПО КЛИКУ / ТАПУ ВНЕ КОНТЕНТА
        // ============================================================

        lightbox.addEventListener("pointerdown", event => {

    const clickedInsideWindow =
        event.target.closest(".project-lightbox-window");

    if (!clickedInsideWindow) {
        closeLightbox();
    }

});



    /* =====================================================
       RENDER LIGHTBOX THUMBNAILS
    ===================================================== */

    function renderLightboxThumbnails(project) {

        if (!lightboxThumbnails) return;

        lightboxThumbnails.innerHTML = "";


        project.images.forEach(
            (image, index) => {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "lightbox-thumbnail";


                if (
                    index === currentImageIndex
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                button.setAttribute(
                    "aria-label",
                    `Открыть фотографию ${index + 1}`
                );


                const img =
                    document.createElement("img");

                img.src =
                    image;

                img.alt =
                    `${project.title} — фото ${index + 1}`;

                img.loading =
                    index === currentImageIndex
                        ? "eager"
                        : "lazy";

                img.decoding =
                    "async";


                button.appendChild(img);


                button.addEventListener(
                    "click",
                    () => {

                        currentImageIndex =
                            index;

                        updateLightbox();

                        updateProjectImage(
                            false
                        );

                    }
                );


                lightboxThumbnails.appendChild(
                    button
                );

            }
        );


    /* =================================================
       ПОКАЗЫВАЕМ АКТИВНУЮ МИНИАТЮРУ
    ================================================= */

    const activeThumbnail =
        lightboxThumbnails.querySelector(
            ".lightbox-thumbnail.active"
        );


    if (activeThumbnail) {

        activeThumbnail.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

    }

}


    /* =====================================================
       UPDATE LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        const image =
            project.images[currentImageIndex];


        lightboxImage.src =
            image;

        lightboxImage.alt =
            `${project.title} — фото ${currentImageIndex + 1}`;


        lightboxCurrent.textContent =
            padNumber(
                currentImageIndex + 1
            );

        lightboxTotal.textContent =
            padNumber(
                project.images.length
            );


        lightboxProjectName.textContent =
            project.title;

        lightboxProjectYear.textContent =
            project.year;


        /* ================================================
           LIGHTBOX THUMBNAILS
        ================================================ */

        renderLightboxThumbnails(
            project
        );

    }



    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox() {

        if (!lightbox) return;


        updateLightbox();


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }



    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }



    /* =====================================================
       LIGHTBOX IMAGE NAVIGATION
    ===================================================== */

    function lightboxNextImage() {

        nextImage();

        updateLightbox();

    }



    function lightboxPreviousImage() {

        previousImage();

        updateLightbox();

    }



    /* =====================================================
       LIGHTBOX EVENTS
    ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            lightboxNextImage
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            lightboxPreviousImage
        );

    }



    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                lightboxNextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                lightboxPreviousImage();

            }

        }
    );


       /* =====================================================
           TOUCH GESTURES
        ===================================================== */

        let touchStartX = 0;
        let touchStartY = 0;

        const SWIPE_IMAGE_DISTANCE = 50;
        const SWIPE_CLOSE_DISTANCE = 100;

        const lightboxImageWrap =
            document.querySelector(".lightbox-image-wrap");

        if (lightboxImageWrap) {

            lightboxImageWrap.addEventListener(
                "touchstart",
                event => {

                    if (
                        !event.touches ||
                        event.touches.length !== 1
                    ) {
                        return;
                    }

                    const touch =
                        event.touches[0];

                    touchStartX =
                        touch.clientX;

                    touchStartY =
                        touch.clientY;

                },
                { passive: true }
            );


            lightboxImageWrap.addEventListener(
                "touchend",
                event => {

                    if (
                        !event.changedTouches ||
                        event.changedTouches.length !== 1
                    ) {
                        return;
                    }

                    const touch =
                        event.changedTouches[0];

                    const deltaX =
                        touch.clientX -
                        touchStartX;

                    const deltaY =
                        touch.clientY -
                        touchStartY;


                    /* ============================================
                       СВАЙП ВВЕРХ / ВНИЗ — ЗАКРЫТЬ
                    ============================================ */

                    if (
                        Math.abs(deltaY) >
                        SWIPE_CLOSE_DISTANCE &&
                        Math.abs(deltaY) >
                        Math.abs(deltaX)
                    ) {

                        closeLightbox();

                        return;

                    }


                    /* ============================================
                       СВАЙП ВЛЕВО / ВПРАВО — СМЕНА ФОТО
                    ============================================ */

                    if (
                        Math.abs(deltaX) <
                        SWIPE_IMAGE_DISTANCE ||
                        Math.abs(deltaX) <
                        Math.abs(deltaY)
                    ) {
                        return;
                    }


                    if (deltaX < 0) {

                        lightboxNextImage();

                    } else {

                        lightboxPreviousImage();

                    }

                },
                { passive: true }
            );

        }



    /* =====================================================
       PRELOAD NEXT IMAGE
    ===================================================== */

    function preloadNextImage() {

        const project =
            filteredProjects[currentProjectIndex];

        if (!project) return;


        const nextIndex =
            (
                currentImageIndex + 1
            ) %
            project.images.length;


        const image =
            new Image();

        image.src =
            project.images[nextIndex];

    }



    /* =====================================================
       PRELOAD AFTER IMAGE CHANGE
    ===================================================== */

    const originalUpdateProjectImage =
        updateProjectImage;


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderProject(false);


    if (projectsVisibleCount) {

        projectsVisibleCount.textContent =
            padNumber(
                filteredProjects.length
            );

    }

});










/* =========================================================
   SOLUTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const solutionsSection =
        document.getElementById("solutions");

    if (!solutionsSection) return;


    const solutionsImage =
        document.getElementById("solutionsImage");

    const solutionsCurrent =
        document.getElementById("solutionsCurrent");

    const solutionsCaption =
        document.getElementById("solutionsCaption");

    const solutionItems =
        document.querySelectorAll(".solution-item");


    const solutions = [

        {
            image: "img/work/bah_s.jpg",
            title: "Бахрома"
        },

        {
            image: "img/work/n_s.jpg",
            title: "Гибкий неон"
        },

        {
            image: "img/work/zan_s.jpg",
            title: "Занавес"
        },

        {
            image: "img/work/fig_s.jpg",
            title: "Световые фигуры"
        },

        {
            image: "img/work/nit_s.jpg",
            title: "Нить"
        },

        {
            image: "img/work/bel_s.jpg",
            title: "Бэлт-лайт"
        }

    ];


    let currentIndex = 0;
    let changeTimer = null;


    function changeSolution(index) {

        if (
            index === currentIndex &&
            !solutionsImage.classList.contains("is-changing")
        ) {
            return;
        }


        const solution = solutions[index];

        if (!solution) return;


        currentIndex = index;


        solutionItems.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active",
                itemIndex === index
            );

        });


        solutionsImage.classList.add("is-changing");


        clearTimeout(changeTimer);


        changeTimer = setTimeout(() => {

            solutionsImage.src = solution.image;
            solutionsImage.alt = solution.title;

            solutionsCurrent.textContent =
                String(index + 1).padStart(2, "0");

            solutionsCaption.textContent =
                solution.title;


            solutionsImage.onload = () => {

                requestAnimationFrame(() => {

                    solutionsImage.classList.remove(
                        "is-changing"
                    );

                });

            };


            /*
             * На случай, если изображение уже
             * находится в браузерном кеше.
             */

            if (solutionsImage.complete) {

                requestAnimationFrame(() => {

                    solutionsImage.classList.remove(
                        "is-changing"
                    );

                });

            }

        }, 220);

    }


    solutionItems.forEach((item, index) => {

        item.addEventListener("mouseenter", () => {

            /*
             * Hover работает только там,
             * где действительно есть мышь.
             */

            if (
                window.matchMedia(
                    "(hover: hover) and (pointer: fine)"
                ).matches
            ) {
                changeSolution(index);
            }

        });


        item.addEventListener("click", () => {

            changeSolution(index);

        });

    });


    /*
     * Предзагрузка изображений.
     */

    solutions.forEach(solution => {

        const image = new Image();

        image.src = solution.image;

    });


    /*
     * Reveal при появлении блока.
     */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            solutionsSection.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                solutionsSection
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        observer.observe(solutionsSection);

    } else {

        solutionsSection.classList.add(
            "is-visible"
        );

    }


});











/* =========================================================
   PROCESS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const processSection =
        document.getElementById("process");

    if (!processSection) return;


    /*
     * Reveal
     */

    if ("IntersectionObserver" in window) {

        const processObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            processSection.classList.add(
                                "is-visible"
                            );

                            processObserver.unobserve(
                                processSection
                            );

                        }

                    });

                },
                {
                    threshold: 0.14
                }
            );


        processObserver.observe(processSection);

    } else {

        processSection.classList.add(
            "is-visible"
        );

    }


    /*
     * Interactive steps
     */

    const processSteps =
        processSection.querySelectorAll(
            ".process-step"
        );


    processSteps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            if (
                window.matchMedia(
                    "(hover: hover) and (pointer: fine)"
                ).matches
            ) {

                processSteps.forEach(item => {
                    item.classList.remove("active");
                });

                step.classList.add("active");

            }

        });

    });

});








document.addEventListener("DOMContentLoaded", () => {

    const finalCta =
        document.getElementById("about");

    if (!finalCta) return;


    /*
     * Reveal
     */

    if ("IntersectionObserver" in window) {

        const finalCtaObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            finalCta.classList.add(
                                "is-visible"
                            );

                            finalCtaObserver.unobserve(
                                finalCta
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        finalCtaObserver.observe(finalCta);

    } else {

        finalCta.classList.add("is-visible");

    }

});
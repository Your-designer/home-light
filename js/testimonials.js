/* =========================================================
   HOME LIGHT — TESTIMONIALS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("testimonialsSlider");

    if (!slider) return;

    const viewport = document.getElementById("testimonialsViewport");
    const track = document.getElementById("testimonialsTrack");

    const prevButton = document.getElementById("testimonialsPrev");
    const nextButton = document.getElementById("testimonialsNext");

    const pagination = document.getElementById("testimonialsPagination");

    const cards = Array.from(
        track.querySelectorAll(".testimonial-card")
    );

    const lightbox = document.getElementById("testimonialLightbox");
    const lightboxImage = document.getElementById("testimonialLightboxImage");

    const lightboxClose = document.getElementById("testimonialLightboxClose");
    const lightboxBackdrop = document.getElementById("testimonialLightboxBackdrop");

    const lightboxPrev = document.getElementById("testimonialLightboxPrev");
    const lightboxNext = document.getElementById("testimonialLightboxNext");

    const lightboxCounter = document.getElementById("testimonialLightboxCounter");

    if (
        !viewport ||
        !track ||
        !prevButton ||
        !nextButton ||
        !pagination ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    /* =====================================================
       SLIDER STATE
    ===================================================== */

    let currentIndex = 0;
    let currentLightboxIndex = 0;

    let visibleSlides = 3;
    let maxIndex = 0;

    let startX = 0;
    let startY = 0;
    let isPointerDown = false;


    /* =====================================================
       HELPERS
    ===================================================== */

    const getImages = () => {
        return cards.map(card => card.querySelector("img"));
    };


    const getVisibleSlides = () => {

        const value = getComputedStyle(slider)
            .getPropertyValue("--testimonial-visible")
            .trim();

        return Math.max(1, parseInt(value, 10) || 1);

    };


    const getMaxIndex = () => {
        return Math.max(0, cards.length - visibleSlides);
    };


    const getImagePath = (index) => {

        const image = cards[index]?.querySelector("img");

        return image ? image.getAttribute("src") : "";

    };


    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };


    /* =====================================================
       PAGINATION
    ===================================================== */

    function createPagination() {

    visibleSlides = getVisibleSlides();
    maxIndex = getMaxIndex();

    pagination.innerHTML = "";

    for (let index = 0; index <= maxIndex; index++) {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "testimonial-pagination-dot";

        dot.setAttribute(
            "aria-label",
            `Показать позицию ${index + 1}`
        );

        dot.addEventListener("click", () => {

            currentIndex = index;

            updateSlider();

        });

        pagination.appendChild(dot);

    }

}


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider() {

        visibleSlides = getVisibleSlides();
        maxIndex = getMaxIndex();

        currentIndex = Math.max(
            0,
            Math.min(currentIndex, maxIndex)
        );

        const firstSlide = cards[0];

        if (!firstSlide) return;

        const slideWidth = firstSlide.getBoundingClientRect().width;

        const trackStyles = getComputedStyle(track);
        const gap = parseFloat(trackStyles.columnGap) || 0;

        const offset = currentIndex * (slideWidth + gap);

        track.style.transform = `translate3d(-${offset}px, 0, 0)`;


        /* ARROWS */

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;


        /* DOTS */

        const dots = pagination.querySelectorAll(
            ".testimonial-pagination-dot"
        );

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

            dot.setAttribute(
                "aria-current",
                index === currentIndex ? "true" : "false"
            );

        });

    }


    /* =====================================================
       SLIDER NAVIGATION
    ===================================================== */

    prevButton.addEventListener("click", () => {

        if (currentIndex <= 0) return;

        currentIndex--;

        updateSlider();

    });


    nextButton.addEventListener("click", () => {

        if (currentIndex >= maxIndex) return;

        currentIndex++;

        updateSlider();

    });


    /* =====================================================
       SWIPE / DRAG
    ===================================================== */

    viewport.addEventListener("pointerdown", (event) => {

        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        startX = event.clientX;
        startY = event.clientY;

        isPointerDown = true;

    });


    viewport.addEventListener("pointerup", (event) => {

        if (!isPointerDown) return;

        isPointerDown = false;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        // Не реагируем на вертикальный скролл
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;

        if (Math.abs(deltaX) < 45) return;

        if (deltaX < 0 && currentIndex < maxIndex) {
            currentIndex++;
        }

        if (deltaX > 0 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();

    });


    viewport.addEventListener("pointercancel", () => {
        isPointerDown = false;
    });


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    let previousBodyOverflow = "";


    function openLightbox(index) {

        currentLightboxIndex = index;

        updateLightbox();

        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        lightboxClose.focus();

    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousBodyOverflow;

    }


    function updateLightbox() {

        const imagePath = getImagePath(currentLightboxIndex);

        if (!imagePath) return;

        lightboxImage.src = imagePath;

        lightboxCounter.textContent =
            `${formatNumber(currentLightboxIndex + 1)} / ${formatNumber(cards.length)}`;

    }


    function showPreviousLightboxImage() {

        currentLightboxIndex =
            (currentLightboxIndex - 1 + cards.length) % cards.length;

        updateLightbox();

    }


    function showNextLightboxImage() {

        currentLightboxIndex =
            (currentLightboxIndex + 1) % cards.length;

        updateLightbox();

    }


    /* OPEN FROM CARD */

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {
            openLightbox(index);
        });

    });


    /* CLOSE */

    lightboxClose.addEventListener("click", closeLightbox);

    lightboxBackdrop.addEventListener("click", closeLightbox);


    /* LIGHTBOX ARROWS */

    lightboxPrev.addEventListener(
        "click",
        showPreviousLightboxImage
    );

    lightboxNext.addEventListener(
        "click",
        showNextLightboxImage
    );


    /* KEYBOARD */

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousLightboxImage();
        }

        if (event.key === "ArrowRight") {
            showNextLightboxImage();
        }

    });


    /* =====================================================
       RESPONSIVE UPDATE
    ===================================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            createPagination();
            updateSlider();

        }, 120);

    });


    /* =====================================================
       INIT
    ===================================================== */

    createPagination();

    updateSlider();

});
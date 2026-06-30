document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. GLOBAL GSAP PAGE ENTRANCE ANIMATIONS
    // ==========================================
    if (typeof gsap !== "undefined") {
        const tl = gsap.timeline();

        // 1. Gently fade & slide down page headers/titles first
        tl.from(".deals-page-title, .shop-page-title, .category-main-title, .app-header", {
            duration: 0.5,
            y: -20,
            opacity: 0,
            ease: "power2.out"
        });

        // 2. Identify active card components across all built views
        const genericCardSelectors = ".mega-deal-card, .food-card, .checkout-center-alert-card, .shop-item-card, .product-item-card";
        const cardsOnPage = document.querySelectorAll(genericCardSelectors);

        // 3. Stagger slide up the cards dynamically
        if (cardsOnPage.length > 0) {
            tl.from(cardsOnPage, {
                duration: 0.7,
                y: 40,
                opacity: 0,
                stagger: 0.12, 
                ease: "back.out(1.1)"
            }, "-=0.25");
        }

        // ==========================================
        // 2. SWARM FLOATING BACKGROUND GENERATOR
        // ==========================================
        const canvas = document.querySelector(".confirm-modal-canvas");
        
        if (canvas) {
            const totalElements = 22; // Quantity of oranges floating around

            for (let i = 0; i < totalElements; i++) {
                const orangeItem = document.createElement("img");
                orangeItem.src = "images/orange.png"; // Maps directly to your file!
                orangeItem.classList.add("bg-floating-orange");

                // Random sizes from small accent spots to larger layout elements
                const randomSize = gsap.utils.random(14, 38);
                orangeItem.style.width = `${randomSize}px`;
                orangeItem.style.height = `${randomSize}px`;

                // Spread coordinate positions across canvas grid lines
                orangeItem.style.left = `${gsap.utils.random(0, 100)}%`;
                orangeItem.style.top = `${gsap.utils.random(0, 100)}%`;

                // Subtle transparent layer blend variables
                orangeItem.style.opacity = gsap.utils.random(0.08, 0.22);

                canvas.appendChild(orangeItem);

                // Start structural continuous motion loop via GSAP core
                gsap.to(orangeItem, {
                    x: gsap.utils.random(-50, 50),
                    y: gsap.utils.random(-70, 70),
                    rotation: gsap.utils.random(-180, 180),
                    duration: gsap.utils.random(7, 13),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }
    }

    // ==========================================
    // 3. LOCAL STORAGE DATABASE INTERACTION
    // ==========================================
    const grabButton = document.querySelector(".grab-btn");
    if (grabButton) {
        grabButton.addEventListener("click", () => {
            const cardTitle = document.querySelector(".deal-card-title, .food-title, .shop-item-title, .product-title")?.innerText || "Meal Box Selection";
            const claimedMeal = {
                title: cardTitle,
                claimTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "Pending"
            };
            localStorage.setItem("lastBite_claimedMeal", JSON.stringify(claimedMeal));
            console.log("Database updated locally.", claimedMeal);
        });
    }

    const confirmButton = document.querySelector(".confirm-action-btn");
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            const activeRecord = localStorage.getItem("lastBite_claimedMeal");
            if (activeRecord) {
                const updatedRecord = JSON.parse(activeRecord);
                updatedRecord.status = "Confirmed";
                localStorage.setItem("lastBite_claimedMeal", JSON.stringify(updatedRecord));
                console.log("Database Committed to Memory.", updatedRecord);
            }
        });
    }
});

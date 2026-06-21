// Ensure the DOM is fully loaded before running animations
document.addEventListener("DOMContentLoaded", () => {

    // 1. Initial Page Load Animation: Staggered entry for the food cards
    // This looks at our 'opacity: 0' elements and animates them cleanly into place.
    gsap.to(".food-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2, // Delays each card entry slightly for a smooth, premium feel
        ease: "power2.out"
    });

    // 2. Interactive Search Bar Toggle Animation
    const searchBtn = document.getElementById("searchBtn");
    const searchBarContainer = document.getElementById("searchBarContainer");
    let isSearchOpen = false;

    searchBtn.addEventListener("click", () => {
        if (!isSearchOpen) {
            // Open Search Bar smoothly using GSAP
            gsap.to(searchBarContainer, {
                height: "60px",
                padding: "10px 20px",
                duration: 0.4,
                ease: "power2.out"
            });
            // Focus the input once the animation finishes
            setTimeout(() => document.getElementById("searchInput").focus(), 200);
        } else {
            // Close Search Bar smoothly
            gsap.to(searchBarContainer, {
                height: "0px",
                padding: "0px 20px",
                duration: 0.3,
                ease: "power2.in"
            });
        }
        isSearchOpen = !isSearchOpen;
    });

    // 3. Client-Side Instant Search Filter
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".food-card");

        cards.forEach(card => {
            const title = card.querySelector(".food-title").textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});
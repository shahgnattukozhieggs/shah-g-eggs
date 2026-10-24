document.addEventListener('DOMContentLoaded', () => {
    // Calculator Elements
    const eggCountInput = document.getElementById('eggCount');
    const totalEggsDisplay = document.getElementById('totalEggsDisplay');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const savingsDisplay = document.getElementById('savingsDisplay');
    
    const custNameInput = document.getElementById('custName');
    const custAddressInput = document.getElementById('custAddress');
    const whatsappBtn = document.getElementById('whatsappOrderBtn');

    // Fixed Rates
    const OFFER_RATE = 19;
    const MRP_RATE = 23;

    // Calculation Logic
    function calculateTotal() {
        const totalEggs = parseInt(eggCountInput.value) || 0;
        
        const totalAmount = totalEggs * OFFER_RATE;
        const mrpTotal = totalEggs * MRP_RATE;
        const totalSavings = mrpTotal - totalAmount;

        // Update UI
        totalEggsDisplay.textContent = totalEggs;
        totalPriceDisplay.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;

        if (totalSavings > 0) {
            savingsDisplay.style.display = 'block';
            savingsDisplay.textContent = `You Save ₹${totalSavings.toLocaleString('en-IN')} compared to MRP!`;
        } else {
            savingsDisplay.style.display = 'none';
        }
    }

    // Event Listeners
    if (eggCountInput) {
        eggCountInput.addEventListener('input', calculateTotal);
        calculateTotal();
    }

    // WhatsApp Direct Order Trigger
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const eggs = parseInt(eggCountInput.value) || 0;
            const total = eggs * OFFER_RATE;
            const name = custNameInput.value.trim() || 'Customer';
            const address = custAddressInput.value.trim() || 'Chennai';

            if (eggs <= 0) {
                alert('Please enter a valid number of eggs.');
                return;
            }

            const message = `Hello SHAH G Eggs Team,\n\nI would like to place an order:\n- Name: ${name}\n- Address: ${address}\n- Total Eggs: ${eggs}\n- Rate: ₹${OFFER_RATE} per egg (Offer Rate)\n- Estimated Total: ₹${total}\n\nPlease confirm order and delivery timing.`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/917200176203?text=${encodedMessage}`, '_blank');
        });
    }

    // Video Carousel Slider Logic (Video 2 & Video 3)
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video && i !== index) {
                video.pause();
            }
        });
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }
});
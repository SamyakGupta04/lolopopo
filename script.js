document.addEventListener('DOMContentLoaded', () => {
    const giftBoxContainer = document.getElementById('gift-box-container');
    const giftBox = document.getElementById('gift-box');
    const messageContainer = document.getElementById('message-container');
    const galleryContainer = document.getElementById('gallery-container');
    const heartsContainer = document.getElementById('hearts-container');

    // ========== PRE-POPULATE HEARTS ALREADY FLOATING ==========
    // Create hearts that are already mid-animation when page loads
    for (let i = 0; i < 25; i++) {
        createPreExistingHeart();
    }

    // Continue spawning new hearts
    setInterval(createBackgroundHeart, 500);

    // ========== BOX CLICK HANDLER ==========
    giftBoxContainer.addEventListener('click', () => {
        if (giftBox.classList.contains('open')) return;

        giftBox.classList.add('open');
        triggerNaturalFlood();

        setTimeout(() => {
            giftBoxContainer.style.display = 'none';
            messageContainer.classList.remove('hidden');
            messageContainer.style.display = 'block';
        }, 4500);

        setTimeout(() => {
            galleryContainer.classList.remove('hidden');
            galleryContainer.style.display = 'flex';
        }, 5500);
    });

    // ========== PRE-EXISTING HEARTS (Already mid-float) ==========
    function createPreExistingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '❤';

        const colors = ['rgba(255,182,193,0.7)', 'rgba(255,105,180,0.5)', 'rgba(255,192,203,0.6)'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        const left = Math.random() * 100;
        const size = Math.random() * 25 + 18; // BIGGER: 18-43px
        const duration = Math.random() * 8 + 14;

        // Start at random vertical positions (already floating)
        const startY = Math.random() * 80 + 10; // 10% to 90% of screen height

        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.bottom = `${startY}vh`;
        heart.style.animationDuration = `${duration}s`;
        // Negative delay makes animation start partway through
        heart.style.animationDelay = `-${Math.random() * duration}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // ========== NEW BACKGROUND HEARTS ==========
    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '❤';

        const colors = ['rgba(255,182,193,0.7)', 'rgba(255,105,180,0.5)', 'rgba(255,192,203,0.6)'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        const left = Math.random() * 100;
        const size = Math.random() * 25 + 18; // BIGGER: 18-43px
        const duration = Math.random() * 8 + 14;

        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // ========== NATURAL FLOOD EFFECT ==========
    function triggerNaturalFlood() {
        const totalHearts = 350;

        // Wave-based spawning for natural look
        const waves = [
            { count: 80, delay: 0, speed: 'fast' },
            { count: 100, delay: 300, speed: 'medium' },
            { count: 100, delay: 800, speed: 'slow' },
            { count: 70, delay: 1500, speed: 'medium' }
        ];

        waves.forEach(wave => {
            setTimeout(() => {
                for (let i = 0; i < wave.count; i++) {
                    setTimeout(() => createFloodHeart(wave.speed), i * 8);
                }
            }, wave.delay);
        });
    }

    function createFloodHeart(speed) {
        const heart = document.createElement('div');
        heart.classList.add('flood-heart');
        heart.innerHTML = '❤';

        const left = Math.random() * 100;
        const size = Math.random() * 55 + 25; // 25-80px

        // Natural speed variation
        let duration;
        if (speed === 'fast') duration = Math.random() * 1.5 + 2;
        else if (speed === 'medium') duration = Math.random() * 2 + 2.5;
        else duration = Math.random() * 2.5 + 3;

        // Slight horizontal drift for natural motion
        const drift = (Math.random() - 0.5) * 30;
        heart.style.setProperty('--drift', `${drift}px`);

        // Random rotation
        const rotation = (Math.random() - 0.5) * 40;
        heart.style.setProperty('--rotation', `${rotation}deg`);

        heart.style.left = `${left}vw`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000 + 500);
    }
});

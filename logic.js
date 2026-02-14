document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('runaway-btn');
    const yesBtn = document.getElementById('yes-btn');

    if (!btn) return;

    // --- NEW: Store the original position of the No button ---
    const originalNoPos = {
        left: btn.style.left,
        top: btn.style.top,
        position: btn.style.position
    };

    // --- 1. RUNAWAY LOGIC ---
    btn.style.position = 'absolute';
    btn.style.margin = '0';

    let moving = false;
    const moveButton = (e) => {
        if (e) e.preventDefault();
        if (moving) return;
        moving = true;

        const w = btn.offsetWidth;
        const h = btn.offsetHeight;
        btn.style.width = `${w}px`;
        btn.style.height = `${h}px`;

        const maxX = Math.max(0, window.innerWidth - w);
        const maxY = Math.max(0, window.innerHeight - h);
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);

        btn.style.pointerEvents = 'none';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        setTimeout(() => {
            btn.style.pointerEvents = 'auto';
            moving = false;
        }, 150);
    };

    btn.addEventListener('mouseenter', moveButton);
    btn.addEventListener('touchstart', moveButton);
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // --- 2. HAPPY & REDIRECT LOGIC ---
    function happy() {
        let redirectBtn = document.getElementById('redirect-btn');
        if (!redirectBtn) {
            redirectBtn = document.createElement('button');
            redirectBtn.id = 'redirect-btn';
            redirectBtn.textContent = "Click for a surprise! ❤️";
            redirectBtn.style.cssText = `
                position: absolute; z-index: 1000; padding: 15px 25px;
                background-color: #ff4d6d; color: white; border: none;
                border-radius: 25px; cursor: pointer; font-weight: bold;
                display: none; transition: all 0.3s ease;
            `;

            redirectBtn.addEventListener('mouseenter', () => {
                redirectBtn.style.backgroundColor = '#ff0033';
                redirectBtn.style.transform = 'scale(1.1)';
            });
            redirectBtn.addEventListener('mouseleave', () => {
                redirectBtn.style.backgroundColor = '#ff4d6d';
                redirectBtn.style.transform = 'scale(1)';
            });

            redirectBtn.onclick = () => window.location.href = 'happyUs.html';
            document.body.appendChild(redirectBtn);
        }

        if (!yesBtn.dataset.original) {
            yesBtn.dataset.original = JSON.stringify({
                backgroundImage: yesBtn.style.backgroundImage,
                backgroundSize: yesBtn.style.backgroundSize,
                padding: yesBtn.style.padding,
                top: yesBtn.style.top,
                left: yesBtn.style.left,
                textContent: yesBtn.textContent
            });
        }

        // --- THE "HAPPY" TRANSITION ---
        
        // 1. Hide the "No" button immediately
        btn.style.display = 'none'; 

        // 2. Change "Yes" button appearance
        yesBtn.style.backgroundImage = "url(joy.gif)";
        yesBtn.style.backgroundSize = "cover";
        yesBtn.style.padding = "83px 122px";
        yesBtn.style.top = "35%";
        yesBtn.style.left = "14%";
        yesBtn.textContent = "";

        // 3. Show the Redirect Surprise button
        redirectBtn.style.display = "block";
        redirectBtn.style.top = "65%"; 
        redirectBtn.style.left = "20%";

        // Restore after 10 seconds
        setTimeout(() => {
            const original = JSON.parse(yesBtn.dataset.original);
            Object.assign(yesBtn.style, original);
            yesBtn.textContent = original.textContent;

            // --- NEW: Reset "No" button position and show it ---
            btn.style.left = originalNoPos.left;
            btn.style.top = originalNoPos.top;
            btn.style.position = originalNoPos.position;
            btn.style.display = 'block'; 
            
            redirectBtn.style.display = "none";
        }, 10000);
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', happy);
    }
});

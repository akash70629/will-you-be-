// ...existing code...
const btn = document.getElementById('runaway-btn');
if (!btn) throw new Error('runaway-btn not found');



function happy() {
    const yesBtn = document.getElementById('yes-btn');

    // save original styles once
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

    // apply happy state
    yesBtn.style.backgroundImage = "url(joy.gif)";
    yesBtn.style.backgroundSize = "cover";
    yesBtn.style.padding = "83px 122px";
    yesBtn.style.top = "35%";
    yesBtn.style.left = "14%";
    yesBtn.textContent = "";

    // restore after 10 seconds
    setTimeout(() => {
        const original = JSON.parse(yesBtn.dataset.original);

        yesBtn.style.backgroundImage = original.backgroundImage;
        yesBtn.style.backgroundSize = original.backgroundSize;
        yesBtn.style.padding = original.padding;
        yesBtn.style.top = original.top;
        yesBtn.style.left = original.left;
        yesBtn.textContent = original.textContent;
    }, 10000);
}



// ensure it won't affect layout and keep its size stable
btn.style.position = 'absolute';
btn.style.margin = '0';

let moving = false;
const moveButton = (e) => {
    if (e) e.preventDefault();

    if (moving) return;
    moving = true;

    // lock current size so it doesn't reflow/rescale while moving
    const w = btn.offsetWidth;
    const h = btn.offsetHeight;
    btn.style.width = `${w}px`;
    btn.style.height = `${h}px`;
    btn.style.transform = 'none';

    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(0, window.innerHeight - h);
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    // temporarily disable pointer events so mouseenter doesn't immediately retrigger
    btn.style.pointerEvents = 'none';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;

    // re-enable after a short delay
    setTimeout(() => {
        btn.style.pointerEvents = 'auto';
        moving = false;
    }, 150);
};

btn.addEventListener('mouseenter', moveButton);
btn.addEventListener('touchstart', moveButton);

btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveButton();
    return false;
});

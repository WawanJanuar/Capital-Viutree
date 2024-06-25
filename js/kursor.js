const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const trailLength = 40;
const trail = new Array(trailLength).fill().map(() => ({ x: 0, y: 0, opacity: 0, color: 'rgba(255, 255, 255, 0)' }));

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '1000';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateTrail(x, y) {
    trail.pop();
    trail.unshift({ x, y, opacity: 1, color: getColor(x, y) });
}

function getColor(x, y) {
    const hue = x / window.innerWidth * 360;
    const saturation = y / window.innerHeight * 100;
    return `hsla(${hue}, ${saturation}%, 50%, 1)`;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trail.forEach((point, index) => {
        if (point.opacity > 0) {
            ctx.fillStyle = point.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fill();
            point.opacity -= 0.05;
        }
    });

    requestAnimationFrame(update);
}

update();

document.addEventListener('mousemove', e => {
    updateTrail(e.clientX, e.clientY);
});

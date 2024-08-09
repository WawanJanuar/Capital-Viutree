document.addEventListener('click', function(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${e.pageX - 7.5}px`;
    effect.style.top = `${e.pageY - 7.5}px`;
    document.body.appendChild(effect);

    setTimeout(() => {
        effect.remove();
    }, 300);  // Durasi animasi harus sesuai dengan @keyframes expand
});
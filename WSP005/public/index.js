function drawMemo() {
    const memo = document.getElementById('memo');
    if (memo.getContext) {
        const ctx = memo.getContext('2d');

        ctx.fillStyle = '#f5e37b'
        ctx.fillRect(0, 0, 300, 300);
    }

}

drawMemo();
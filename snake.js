
// 1. CONFIGURAÇÃO
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL = 20;
const COLS = canvas.width / CELL;
const ROWS = canvas.height / CELL;

// 2. ESTADO DO JOGO
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let direction = 'right';
let score = 0;
let gameRunning = false;

// 3. GERAR COMIDA
function gerarComida() {
    food.x = Math.floor(Math.random() * COLS);
    food.y = Math.floor(Math.random() * ROWS);
}

// 4. ATUALIZAR JOGO
function update() {
    // Cria nova cabeça
    const head = { ...snake[0] };
    
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;
    if (direction === 'left') head.x--;
    if (direction === 'right') head.x++;
    
    // Colisão com paredes
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        gameOver();
        return;
    }
    
    // Colisão com corpo
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Comeu comida?
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        gerarComida();
    } else {
        snake.pop();
    }
}

// 5. DESENHAR
function draw() {
    // Fundo
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Comida
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);
    
    // Cobra
    snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#00ff88' : '#00aa55';
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
}

// 6. GAME LOOP
function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    setTimeout(gameLoop, 100);
}

// 7. GAME OVER
function gameOver() {
    gameRunning = false;
    alert('Game Over! Pontos: ' + score);
}

// 8. CONTROLES
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

// 9. INICIAR
document.getElementById('startBtn').addEventListener('click', () => {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    score = 0;
    document.getElementById('score').textContent = 0;
    gameRunning = true;
    gerarComida();
    gameLoop();
});

draw();

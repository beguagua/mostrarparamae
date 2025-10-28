const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 400, y: 300, size: 50, speed: 5, vida: 5 };
const creepers = [];
const creeperSize = 40;
let score = 0;

// Criar alguns creepers aleatórios
for(let i = 0; i < 5; i++){
    creepers.push({
        x: Math.random() * (canvas.width - creeperSize),
        y: Math.random() * (canvas.height - creeperSize),
    });
}

// Controle do jogador
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Movimentar jogador
    if(keys["ArrowUp"]) player.y -= player.speed;
    if(keys["ArrowDown"]) player.y += player.speed;
    if(keys["ArrowLeft"]) player.x -= player.speed;
    if(keys["ArrowRight"]) player.x += player.speed;

    // Desenhar jogador
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Movimentar e desenhar creepers
    ctx.fillStyle = "green";
    creepers.forEach((c, i) => {
        // Seguir jogador
        const dx = player.x - c.x;
        const dy = player.y - c.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist > 0){
            c.x += (dx/dist) * 2;
            c.y += (dy/dist) * 2;
        }

        ctx.fillRect(c.x, c.y, creeperSize, creeperSize);

        // Colisão
        if(player.x < c.x + creeperSize &&
           player.x + player.size > c.x &&
           player.y < c.y + creeperSize &&
           player.y + player.size > c.y){
            player.vida--;
            creepers.splice(i, 1); // Creeper explode
        }
    });

    // HUD
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Vida: " + player.vida, 10, 20);
    ctx.fillText("Creepers derrotados: " + score, 10, 50);

    if(player.vida <= 0){
        alert("Game Over! Sua pontuação: " + score);
        window.location.reload();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();


/* =========================
   元素
========================= */

const cover = document.getElementById("cover");
const startBtn = document.getElementById("startBtn");

const world = document.getElementById("world");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

const cakeContainer = document.getElementById("cakeContainer");

const letterCard = document.getElementById("letterCard");
const typingText = document.getElementById("typingText");

const bgm = document.getElementById("bgm");

const hearts = document.getElementById("hearts");
const confetti = document.getElementById("confetti");

const starsCanvas = document.getElementById("stars");
const fireCanvas = document.getElementById("fireworks");

/* =========================
   状态
========================= */

let stage = 0;

/* =========================
   音乐
========================= */

function playMusic(){
    bgm.volume = 0.5;
    bgm.play().catch(()=>{});
}

/* =========================
   开始
========================= */

startBtn.addEventListener("click", ()=>{

    cover.style.opacity = 0;

    setTimeout(()=>{
        cover.style.display = "none";
    },900);

    playMusic();

    init();
});

/* =========================
   初始化
========================= */

function init(){

    initStars();
    initHearts();
    initFireworks();

    bindEvents();
}

/* =========================
   星空
========================= */

function initStars(){

    const ctx = starsCanvas.getContext("2d");

    starsCanvas.width = innerWidth;
    starsCanvas.height = innerHeight;

    const stars = [];

    for(let i=0;i<140;i++){

        stars.push({
            x:Math.random()*starsCanvas.width,
            y:Math.random()*starsCanvas.height,
            r:Math.random()*1.8,
            a:Math.random()
        });
    }

    function draw(){

        ctx.clearRect(0,0,starsCanvas.width,starsCanvas.height);

        for(let s of stars){

            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
            ctx.fillStyle = `rgba(255,255,255,${s.a})`;
            ctx.fill();

            s.a += (Math.random()-0.5)*0.03;
            s.a = Math.max(0.2,Math.min(1,s.a));
        }

        requestAnimationFrame(draw);
    }

    draw();
}

/* =========================
   爱心
========================= */

function initHearts(){

    setInterval(()=>{

        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = "❤";

        h.style.left = Math.random()*100 + "vw";
        h.style.top = "100vh";

        h.style.fontSize = (16 + Math.random()*18) + "px";

        hearts.appendChild(h);

        setTimeout(()=>h.remove(),6000);

    },600);
}

/* =========================
   彩带（一次性）
========================= */

function burstConfetti(){

    for(let i=0;i<80;i++){

        const c = document.createElement("div");
        c.className = "confetti-piece";

        c.style.left = Math.random()*100 + "vw";
        c.style.top = "-10px";

        const colors = ["#ff6fae","#ffd84d","#6bd6ff","#9bff6b"];

        c.style.background =
        colors[Math.floor(Math.random()*colors.length)];

        confetti.appendChild(c);

        setTimeout(()=>c.remove(),3000);
    }
}

/* =========================
   烟花（最终）
========================= */

function initFireworks(){

    const ctx = fireCanvas.getContext("2d");

    fireCanvas.width = innerWidth;
    fireCanvas.height = innerHeight;

    let particles = [];

    function spawn(){

        if(stage < 3) return; // 只在最后阶段出现

        for(let i=0;i<25;i++){

            particles.push({
                x:Math.random()*fireCanvas.width,
                y:fireCanvas.height,
                vx:(Math.random()-0.5)*3,
                vy:-Math.random()*6,
                life:100
            });
        }
    }

    function draw(){

        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.fillRect(0,0,fireCanvas.width,fireCanvas.height);

        for(let p of particles){

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fillStyle = "#ffb3d9";
            ctx.fill();
        }

        particles = particles.filter(p=>p.life>0);

        requestAnimationFrame(draw);
    }

    setInterval(spawn,1200);
    draw();
}

/* =========================
   拖动旋转（手机+电脑）
========================= */

let rx = -18;
let ry = 25;

let dragging = false;
let lastX = 0;
let lastY = 0;

function bindEvents(){

    updateWorld();

    world.addEventListener("mousedown",e=>{
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    });

    window.addEventListener("mouseup",()=>{
        dragging = false;
    });

    window.addEventListener("mousemove",e=>{
        if(!dragging) return;

        let dx = e.clientX - lastX;
        let dy = e.clientY - lastY;

        ry += dx * 0.4;
        rx -= dy * 0.4;

        updateWorld();

        lastX = e.clientX;
        lastY = e.clientY;
    });

    world.addEventListener("touchstart",e=>{
        dragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
    });

    world.addEventListener("touchmove",e=>{
        if(!dragging) return;

        let dx = e.touches[0].clientX - lastX;
        let dy = e.touches[0].clientY - lastY;

        ry += dx * 0.4;
        rx -= dy * 0.4;

        updateWorld();

        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
    });

    world.addEventListener("touchend",()=>{
        dragging = false;
    });

    /* 礼盒点击 */

    box1.onclick = ()=>openBox(1);
    box2.onclick = ()=>openBox(2);
    box3.onclick = ()=>openBox(3);
}

function updateWorld(){
    world.style.transform =
    `rotateX(${rx}deg) rotateY(${ry}deg)`;
}

/* =========================
   礼盒逻辑
========================= */

function openBox(level){

    if(level === 1 && stage === 0){

        box1.classList.add("open");

        setTimeout(()=>{
            box2.classList.remove("hidden");
            box2.style.transform = "translateY(-120px)";
        },800);

        burstConfetti();

        stage = 1;
    }

    else if(level === 2 && stage === 1){

        box2.classList.add("open");

        setTimeout(()=>{
            box3.classList.remove("hidden");
            box3.style.transform = "translateY(-220px)";
        },800);

        stage = 2;
    }

    else if(level === 3 && stage === 2){

        box3.classList.add("open");

        setTimeout(()=>{

            showCake();
            showLetter();

            stage = 3;

        },900);
    }
}

/* =========================
   蛋糕
========================= */

function showCake(){

    cakeContainer.classList.remove("hidden");

    cakeContainer.style.opacity = "0";

    setTimeout(()=>{

        cakeContainer.style.opacity = "1";

        cakeContainer.style.transform =
        "translate(-50%,-50%) scale(1.1)";

    },100);
}

/* =========================
   祝福信（空内容）
========================= */

function showLetter(){

    letterCard.classList.add("show");

    const text =
``;   // 👈 这里留空，你后面自己填

    let i = 0;

    function type(){

        if(i < text.length){

            typingText.innerHTML += text[i];
            i++;

            setTimeout(type,60);
        }
    }

    type();
}

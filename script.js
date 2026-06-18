 /* =========================
   获取元素
========================= */

const cover = document.getElementById("cover");
const startBtn = document.getElementById("startBtn");

const world = document.getElementById("world");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

const bookContainer =
document.getElementById("bookContainer");

const book =
document.getElementById("book");

const letterCard =
document.getElementById("letterCard");

const typingText =
document.getElementById("typingText");

const starsCanvas =
document.getElementById("stars");

const fireCanvas =
document.getElementById("fireworks");

const hearts =
document.getElementById("hearts");

const confetti =
document.getElementById("confetti");

const bgm =
document.getElementById("bgm");

/* =========================
   状态
========================= */

let stage = 0;

/*
0 封面

1 大盒子

2 中盒子

3 小盒子

4 书

5 信件
*/

/* =========================
   开始
========================= */

startBtn.addEventListener("click", () => {

    cover.style.opacity = "0";

    setTimeout(() => {

        cover.style.display = "none";

    }, 1000);

    playMusic();

    initStars();

    initHearts();

    initFireworks();

});

/* =========================
   音乐
========================= */

function playMusic(){

    if(!bgm) return;

    bgm.volume = 0.5;

    bgm.play().catch(()=>{});
}

/* =========================
   鼠标旋转
========================= */

let rotateX = -20;
let rotateY = 30;

let dragging = false;

let lastX = 0;
let lastY = 0;

function updateWorld(){

    world.style.transform =
    `rotateX(${rotateX}deg)
     rotateY(${rotateY}deg)`;
}

updateWorld();

world.addEventListener("mousedown",(e)=>{

    dragging = true;

    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener("mouseup",()=>{

    dragging = false;
});

window.addEventListener("mousemove",(e)=>{

    if(!dragging) return;

    let dx = e.clientX - lastX;
    let dy = e.clientY - lastY;

    rotateY += dx * 0.4;
    rotateX -= dy * 0.4;

    updateWorld();

    lastX = e.clientX;
    lastY = e.clientY;
});

/* =========================
   手机触摸
========================= */

world.addEventListener("touchstart",(e)=>{

    dragging = true;

    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
});

world.addEventListener("touchmove",(e)=>{

    if(!dragging) return;

    let dx = e.touches[0].clientX - lastX;
    let dy = e.touches[0].clientY - lastY;

    rotateY += dx * 0.4;
    rotateX -= dy * 0.4;

    updateWorld();

    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
});

world.addEventListener("touchend",()=>{

    dragging = false;
});

/* =========================
   礼盒1
========================= */

box1.addEventListener("click",()=>{

    if(stage !== 0) return;

    box1.classList.add("open");

    burstConfetti();

    setTimeout(()=>{

        box2.classList.remove("hidden");

    },1200);

    stage = 1;
});

/* =========================
   礼盒2
========================= */

box2.addEventListener("click",()=>{

    if(stage !== 1) return;

    box2.classList.add("open");

    burstConfetti();

    setTimeout(()=>{

        box3.classList.remove("hidden");

    },1200);

    stage = 2;
});

/* =========================
   礼盒3
========================= */

box3.addEventListener("click",()=>{

    if(stage !== 2) return;

    box3.classList.add("open");

    burstConfetti();

    setTimeout(()=>{

        bookContainer.classList.remove("hidden");

    },1200);

    stage = 3;
});

/* =========================
   书本
========================= */

book.addEventListener("click",()=>{

    if(stage !== 3) return;

    book.classList.add("book-open");

    stage = 4;

    setTimeout(()=>{

        showLetter();

        stage = 5;

    },1600);
});

/* =========================
   信件
========================= */

function showLetter(){

    letterCard.classList.add("show");

    const text =

`首先还是祝你生日快乐，祝你大学四年不为期末考试困扰，每天都有个好心情，其他套话我就不说了。

其次，上次没打成现在还是有点遗憾，暑假有空一定要和你打一场，这次我来订场。早想看看你打得怎么样了。

最后，虽然很难线下见面了，但是希望还是能常常联系呀，今年算是我们认识的12年了吧？

希望还能一直是朋友，

愿友谊长存！`;

    let index = 0;

    typingText.innerHTML = "";

    function type(){

        if(index >= text.length){

            burstMegaFireworks();

            return;
        }

        typingText.innerHTML += text[index];

        index++;

        setTimeout(type,45);
    }

    type();
}

/* =========================
   爱心
========================= */

function initHearts(){

    setInterval(()=>{

        const heart =
        document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤";

        heart.style.left =
        Math.random()*100 + "vw";

        heart.style.top =
        "100vh";

        heart.style.fontSize =
        (16 + Math.random()*24) + "px";

        hearts.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },500);
}

/* =========================
   彩带
========================= */

function burstConfetti(){

    const colors =

    [
        "#ff6ba5",
        "#ffd54f",
        "#6bcfff",
        "#a5ff6b",
        "#ffffff"
    ];

    for(let i=0;i<60;i++){

        const piece =
        document.createElement("div");

        piece.className =
        "confetti-piece";

        piece.style.left =
        Math.random()*100 + "vw";

        piece.style.top =
        "-20px";

        piece.style.background =
        colors[
            Math.floor(
                Math.random()*colors.length
            )
        ];

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },3000);
    }
}

/* =========================
   星空
========================= */

function initStars(){

    const ctx =
    starsCanvas.getContext("2d");

    starsCanvas.width =
    window.innerWidth;

    starsCanvas.height =
    window.innerHeight;

    let stars = [];

    for(let i=0;i<150;i++){

        stars.push({

            x:
            Math.random()
            * starsCanvas.width,

            y:
            Math.random()
            * starsCanvas.height,

            r:
            Math.random()*2,

            a:
            Math.random()
        });
    }

    function animate(){

        ctx.clearRect(
            0,
            0,
            starsCanvas.width,
            starsCanvas.height
        );

        stars.forEach(s=>{

            ctx.beginPath();

            ctx.arc(
                s.x,
                s.y,
                s.r,
                0,
                Math.PI*2
            );

            ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${s.a}
            )`;

            ctx.fill();

            s.a +=
            (Math.random()-0.5)
            *0.02;

            s.a =
            Math.max(
                0.2,
                Math.min(1,s.a)
            );
        });

        requestAnimationFrame(
            animate
        );
    }

    animate();
}

/* =========================
   烟花
========================= */

let particles = [];

function initFireworks(){

    const ctx =
    fireCanvas.getContext("2d");

    fireCanvas.width =
    window.innerWidth;

    fireCanvas.height =
    window.innerHeight;

    function animate(){

        ctx.clearRect(
            0,
            0,
            fireCanvas.width,
            fireCanvas.height
        );

        particles.forEach((p,i)=>{

            p.x += p.vx;
            p.y += p.vy;

            p.life--;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI*2
            );

            ctx.fillStyle =
            p.color;

            ctx.fill();

            if(p.life<=0){

                particles.splice(i,1);
            }
        });

        requestAnimationFrame(
            animate
        );
    }

    animate();
}

function burstMegaFireworks(){

    const colors =

    [
        "#ff6ba5",
        "#ffd54f",
        "#6bcfff",
        "#a5ff6b",
        "#ffffff"
    ];

    for(let n=0;n<8;n++){

        setTimeout(()=>{

            let centerX =
            Math.random()
            * fireCanvas.width;

            let centerY =
            100 +
            Math.random()*300;

            for(let i=0;i<80;i++){

                let angle =
                Math.random()
                * Math.PI*2;

                let speed =
                Math.random()*4+2;

                particles.push({

                    x:centerX,
                    y:centerY,

                    vx:
                    Math.cos(angle)
                    * speed,

                    vy:
                    Math.sin(angle)
                    * speed,

                    color:
                    colors[
                        Math.floor(
                        Math.random()
                        * colors.length
                        )
                    ],

                    life:100
                });
            }

        },n*500);
    }
}

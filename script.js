 /* =========================
   获取元素
========================= */

const cover =
document.getElementById("cover");

const startBtn =
document.getElementById("startBtn");

const world =
document.getElementById("world");

const box1 =
document.getElementById("box1");

const box2 =
document.getElementById("box2");

const box3 =
document.getElementById("box3");

const bookContainer =
document.getElementById("bookContainer");

const book =
document.getElementById("book");

const letterCard =
document.getElementById("letterCard");

const typingText =
document.getElementById("typingText");

const bgm =
document.getElementById("bgm");

const hearts =
document.getElementById("hearts");

const confetti =
document.getElementById("confetti");

const starsCanvas =
document.getElementById("stars");

const fireCanvas =
document.getElementById("fireworks");

/* =========================
   状态机
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
   开始按钮
========================= */

startBtn.addEventListener("click", () => {

    cover.style.opacity = "0";

    setTimeout(() => {

        cover.style.display = "none";

    }, 1000);

    playMusic();

    initStars();

    initFireworks();

    initHearts();
});

/* =========================
   音乐
========================= */

function playMusic(){

    if(!bgm) return;

    bgm.volume = 0.45;

    bgm.play().catch(()=>{});
}

/* =========================
   场景旋转
========================= */

let rotateX = -18;
let rotateY = 28;

let dragging = false;

let lastX = 0;
let lastY = 0;

function updateWorld(){

    world.style.transform =
    `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    `;
}

updateWorld();

/* PC */

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

    rotateY +=
    (e.clientX-lastX)*0.35;

    rotateX -=
    (e.clientY-lastY)*0.35;

    updateWorld();

    lastX = e.clientX;
    lastY = e.clientY;
});

/* 手机 */

world.addEventListener("touchstart",(e)=>{

    dragging = true;

    lastX =
    e.touches[0].clientX;

    lastY =
    e.touches[0].clientY;
});

world.addEventListener("touchmove",(e)=>{

    if(!dragging) return;

    rotateY +=
    (e.touches[0].clientX-lastX)
    *0.3;

    rotateX -=
    (e.touches[0].clientY-lastY)
    *0.3;

    updateWorld();

    lastX =
    e.touches[0].clientX;

    lastY =
    e.touches[0].clientY;
});

world.addEventListener("touchend",()=>{

    dragging = false;
});

/* =========================
   展开动画
========================= */

function openGift(box){

    box.classList.add("open");

    burstConfetti();
}

/* =========================
   第一层
========================= */

box1.addEventListener("click",()=>{

    if(stage!==0) return;

    openGift(box1);

    stage = 1;

    setTimeout(()=>{

        box2.classList.remove("hidden");

    },1300);
});

/* =========================
   第二层
========================= */

box2.addEventListener("click",()=>{

    if(stage!==1) return;

    openGift(box2);

    stage = 2;

    setTimeout(()=>{

        box3.classList.remove("hidden");

    },1300);
});

/* =========================
   第三层
========================= */

box3.addEventListener("click",()=>{

    if(stage!==2) return;

    openGift(box3);

    stage = 3;

    setTimeout(()=>{

        bookContainer
        .classList.remove("hidden");

    },1400);
});

/* =========================
   书本
========================= */

book.addEventListener("click",()=>{

    if(stage!==3) return;

    book.classList.add("book-open");

    stage = 4;

    setTimeout(()=>{

        showLetter();

    },1700);
});

/* =========================
   打字机
========================= */

function showLetter(){

    letterCard.classList.add("show");

    typingText.style.color =
    "#fff8e8";

    const message =

`首先还是祝你生日快乐，祝你大学四年不为期末考试困扰，每天都有个好心情；祝你生活事事如意，心想事成，所有烦心事都绕你而去；祝你喜欢的主队全胜，喜欢的球星一直赢，一切向好发展。

其次，我记得上次约球没打成来着，一直很期待看看你的羽毛球水平，当时怪我准备不充分没有打成，所以今年暑假，我来订场，有机会一定要和你打一次，嘻嘻。

最后，虽然很难线下见面了，但是希望还是能常常联系呀。今年算是我们认识的12年了吧？从小学，初中，高中到大学，一直还能保持联系的朋友还有多少呢？ 希望这条时间线，能够一直延长下去，

希望还能一直是朋友

愿友谊长存！`;

    typingText.innerHTML = "";

    let index = 0;

    function type(){

        if(index>=message.length){

            megaFireworks();

            return;
        }

        typingText.innerHTML +=
        message[index];

        index++;

        setTimeout(type,45);
    }

    type();
}

/* =========================
   爱心粒子
========================= */

function initHearts(){

    setInterval(()=>{

        const heart =
        document.createElement("div");

        heart.innerHTML = "❤";

        heart.className = "heart";

        heart.style.left =
        Math.random()*100+"vw";

        heart.style.top =
        "100vh";

        heart.style.fontSize =
        (18+Math.random()*18)+"px";

        hearts.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    },450);
}

/* =========================
   彩带
========================= */

function burstConfetti(){

    const colors =

    [
        "#ff6ea8",
        "#ffd54f",
        "#79ffd0",
        "#bca8ff",
        "#ffffff"
    ];

    for(let i=0;i<80;i++){

        const piece =
        document.createElement("div");

        piece.className =
        "confetti-piece";

        piece.style.left =
        Math.random()*100+"vw";

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

        },3500);
    }
}

/* =========================
   星空
========================= */

function initStars(){

    const ctx =
    starsCanvas.getContext("2d");

    starsCanvas.width =
    innerWidth;

    starsCanvas.height =
    innerHeight;

    const stars = [];

    for(let i=0;i<180;i++){

        stars.push({

            x:
            Math.random()*innerWidth,

            y:
            Math.random()*innerHeight,

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
            innerWidth,
            innerHeight
        );

        stars.forEach(star=>{

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.r,
                0,
                Math.PI*2
            );

            ctx.fillStyle =
            `rgba(255,255,255,${star.a})`;

            ctx.fill();

            star.a +=
            (Math.random()-0.5)
            *0.03;

            star.a =
            Math.max(
                0.2,
                Math.min(1,star.a)
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
    innerWidth;

    fireCanvas.height =
    innerHeight;

    function draw(){

        ctx.clearRect(
            0,
            0,
            innerWidth,
            innerHeight
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

        requestAnimationFrame(draw);
    }

    draw();
}

function megaFireworks(){

    const colors =

    [
        "#ff6ea8",
        "#ffd54f",
        "#79ffd0",
        "#bca8ff",
        "#ffffff"
    ];

    for(let burst=0; burst<10; burst++){

        setTimeout(()=>{

            let centerX =
            Math.random()*innerWidth;

            let centerY =
            120+
            Math.random()*250;

            for(let i=0;i<90;i++){

                let angle =
                Math.random()*Math.PI*2;

                let speed =
                Math.random()*4+2;

                particles.push({

                    x:centerX,
                    y:centerY,

                    vx:
                    Math.cos(angle)*speed,

                    vy:
                    Math.sin(angle)*speed,

                    life:100,

                    color:
                    colors[
                        Math.floor(
                        Math.random()
                        * colors.length
                        )
                    ]
                });
            }

        },burst*500);
    }
}

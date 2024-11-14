// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)


document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("index.html")) {
        console.log("This is the lx page.");
        const rollingBall = document.getElementById("rollingBall");
        const lbc = document.getElementById('loadingbar2');
        let progress = 0;
        const duration = 4000;
        const intervalTime = 20;
        const maxWidth = lbc.offsetWidth - rollingBall.offsetWidth;
        const interval = setInterval(() => {
            progress += intervalTime / duration;
            rollingBall.style.left = `${progress * maxWidth}px`;
            if (progress >= 1.03) {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.href = "introduction.html";
                }, 1000);
                document.body.classList.add("fade");
            }
        }, intervalTime);

        localStorage.removeItem('musicTime');
        localStorage.setItem('musicPlaying', 'true');
    }


    else if (path.includes("introduction.html")) {
        console.log("This is the Homepage.");
        function navigate() {
            window.location.href = 'homepage.html';
        }
        const ebutton = document.querySelector(".explorebutton");
        ebutton.addEventListener("click", navigate);

        const music = document.getElementById('bgm-intro-home');
        const musicControlButton = document.getElementById('music-control1');
        const musicIcon = document.getElementById('music-icon1');
        const isPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

        if (isPlaying) {
            music.currentTime = savedTime;
            music.play();
            musicIcon.src = 'images/musicstop.png';
        } else {
            music.pause();
            musicIcon.src = 'images/musicplay.png';
        }


        musicControlButton.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicIcon.src = 'images/musicstop.png';
                localStorage.setItem('musicPlaying', 'true');
            } else {
                music.pause();
                musicIcon.src = 'images/musicplay.png';
                localStorage.setItem('musicPlaying', 'false');
            }
        });

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', music.currentTime);
        });


    }
    else if (path.includes("homepage.html")) {
        console.log("This is the Homepage.");
        const hoverright = document.getElementById("hover-right");
        const hoverleft = document.getElementById("hover-left");
        const coverright = document.querySelector(".leftcover");
        const coverleft = document.querySelector(".rightcover");
        const comefw = document.querySelector('.mainhomepage');
        const musicfw = document.querySelector('#music-control2');

        function addHoverEffect() {
            coverleft.style.transform = "translateX(20px)";
            coverright.style.transform = "translateX(-20px)";
        }

        function removeHoverEffect() {
            coverleft.style.transform = "translateX(0)";
            coverright.style.transform = "translateX(0)";
        }

        function moveCovers() {
            coverleft.style.transition = "transform 2s ease";
            coverright.style.transition = "transform 2s ease";
            hoverleft.style.transition = "transform 2s ease";
            hoverright.style.transition = "transform 2s ease";

            coverright.style.transform = "translateX(-680px)";
            coverleft.style.transform = "translateX(680px)";
            hoverright.style.transform = "translateX(-680px)";
            hoverleft.style.transform = "translateX(680px)";

            hoverright.removeEventListener("mouseenter", addHoverEffect);
            hoverleft.removeEventListener("mouseenter", addHoverEffect);
            hoverright.removeEventListener("mouseleave", removeHoverEffect);
            hoverleft.removeEventListener("mouseleave", removeHoverEffect);
            hoverright.removeEventListener("click", moveCovers);
            hoverleft.removeEventListener("click", moveCovers);

            setTimeout(() => {
                comefw.classList.add('comeforward');
                musicfw.classList.add('comeforward');
            }, 1500);
        }

        hoverright.addEventListener("mouseenter", addHoverEffect);
        hoverleft.addEventListener("mouseenter", addHoverEffect);
        hoverright.addEventListener("mouseleave", removeHoverEffect);
        hoverleft.addEventListener("mouseleave", removeHoverEffect);


        hoverright.addEventListener("click", moveCovers);
        hoverleft.addEventListener("click", moveCovers);

        const scenclick = document.querySelector('.scenery');
        const petclick = document.querySelector('.pet');
        const citiclick = document.querySelector('.clickbs');
        const gameclick = document.querySelector('.children');
        const back = document.getElementById('back1');

        scenclick.addEventListener('click', () => {
            window.location.href = "scenery.html";
        })
        petclick.addEventListener('click', () => {
            window.location.href = "pet.html";
        })
        citiclick.addEventListener('click', () => {
            window.location.href = "towncitizen.html";
        })
        gameclick.addEventListener('click', () => {
            window.location.href = "game.html";
        })
        back.addEventListener('click', () => {
            window.location.href = "introduction.html";
        })

        const music = document.getElementById('bgm-intro-home');
        const musicControlButton = document.getElementById('music-control2');
        const musicIcon = document.getElementById('music-icon2');
        const isPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

        if (isPlaying) {
            music.currentTime = savedTime;
            music.play();
            musicIcon.src = 'images/musicstop.png';
        } else {
            music.pause();
            musicIcon.src = 'images/musicplay.png';
        }


        musicControlButton.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicIcon.src = 'images/musicstop.png';
                localStorage.setItem('musicPlaying', 'true');
            } else {
                music.pause();
                musicIcon.src = 'images/musicplay.png';
                localStorage.setItem('musicPlaying', 'false');
            }
        });

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', music.currentTime);
        });
    }

    else if (path.includes("scenery.html")) {
        const sections = document.querySelectorAll('section');
        let currentIndex = 0;

        document.querySelector('.nexts').addEventListener('click', () => {
            // 重置当前场景的样式
            sections[currentIndex].classList.remove('active');
            sections[currentIndex].style.transform = 'translateX(-100%)';

            // 更新索引至下一个场景
            currentIndex = (currentIndex + 1) % sections.length;

            // 设置下一个场景的样式
            sections[currentIndex].classList.add('active');
            sections[currentIndex].style.transform = 'translateX(0)';

            // 设置右边的小图显示
            let nextIndex = (currentIndex + 1) % sections.length;
            sections[nextIndex].style.transform = 'translateX(100%) scale(0.7)';
            sections[nextIndex].style.opacity = '0.6';
        });

    }
});
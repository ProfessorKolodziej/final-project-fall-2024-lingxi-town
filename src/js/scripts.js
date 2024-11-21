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

    else if (path.includes("game.html")) {

        const audio = document.getElementById('game-bgm');
        const musicControlButton = document.getElementById('music-control2');
        const musicIcon = document.getElementById('music-icon2');

        const lastTime = localStorage.getItem('audioCurrentTime');
        if (lastTime) {
            audio.currentTime = lastTime;
            audio.play();
            musicIcon.src = 'images/musicplay.png';
        } else {
            audio.currentTime = 0;
            audio.play();
            musicIcon.src = 'images/musicplay.png';
        }

        musicControlButton.onclick = () => {
            if (audio.paused) {
                audio.play();
                musicIcon.src = 'images/musicplay.png';
            } else {
                audio.pause();
                musicIcon.src = 'images/musicstop.png';
            }
        };

        audio.ontimeupdate = () => {
            localStorage.setItem('audioCurrentTime', audio.currentTime);
        };
        audio.onpause = () => {
            localStorage.removeItem('audioCurrentTime');
        };

        window.onbeforeunload = () => {
            localStorage.setItem('audioCurrentTime', audio.currentTime);
        };
        window.onload = () => {
        };

        twopeoplemode = document.querySelector('.twop');
        onepeoplemode = document.querySelector('.onep');
        playmode = document.querySelector('.play-mode');
        const homepagegame = document.querySelector('.gamehome');

        homepagegame.onclick = () => {
            window.location.href = "homepage.html";
        }

        onepeoplemode.onclick = () => {

            const selectBox = document.querySelector('.select-box');
            const selectXBtn = selectBox.querySelector('.playerX');
            const selectYBtn = selectBox.querySelector('.playerY');
            const playBoard = document.querySelector('.play-board');
            const allBox = document.querySelectorAll('section span');
            const players = document.querySelector('.players');
            const resultBox = document.querySelector('.result-box');
            const wonText = resultBox.querySelector('.won-text');
            replayBtn = resultBox.querySelector('button');
            const backgame = document.querySelector('.gameback');
            const homepagegame2 = document.querySelector('.gamehome2');

            homepagegame2.onclick = () => {
                window.location.href = "homepage.html";
            }

            backgame.onclick = () => {
                window.location.reload();
            }

            playmode.classList.add('hide');
            selectBox.classList.add('show');

            window.clickedBox = function (element) {
                //console.log('Box clicked', element);
                if (players.classList.contains('player')) {
                    element.innerHTML = `<img src="${playerYIcon}">`;
                    players.classList.add('active');
                    playerSign = 'Y';
                    element.setAttribute('id', playerSign);
                } else {
                    element.innerHTML = `<img src="${playerXIcon}">`;
                    players.classList.add('active');
                    element.setAttribute('id', playerSign);
                }
                selectWinner();
                playBoard.style.pointerEvents = 'none';
                element.style.pointerEvents = 'none';
                let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
                setTimeout(() => {
                    bot(runBot);
                }, randomDelayTime);
            }

            for (let i = 0; i < allBox.length; i++) {
                allBox[i].setAttribute('onclick', 'clickedBox(this)');
            }

            // 为 X 和 Y 按钮添加点击事件
            selectXBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                playerSign = 'X'; // 设置初始玩家为 X
            }

            selectYBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                players.setAttribute('class', 'players active player');
                playerSign = 'Y'; // 设置初始玩家为 Y
            }

            function bot(runBot) {
                if (runBot) {
                    playerSign = 'Y';
                    let array = [];
                    for (let i = 0; i < allBox.length; i++) {
                        if (allBox[i].childElementCount == 0) {
                            array.push(i);
                            //console.log(i + " " + "has no children");
                        }
                    }
                    let randomBox = array[Math.floor(Math.random() * array.length)];
                    console.log(randomBox);
                    if (array.length > 0) {
                        if (players.classList.contains('player')) {
                            allBox[randomBox].innerHTML = `<img src="${playerXIcon}">`;
                            players.classList.remove('active');
                            playerSign = 'X';
                            allBox[randomBox].setAttribute('id', playerSign);
                        } else {
                            allBox[randomBox].innerHTML = `<img src="${playerYIcon}">`;
                            players.classList.remove('active');
                            allBox[randomBox].setAttribute('id', playerSign);
                        }
                        selectWinner();
                    }
                    allBox[randomBox].style.pointerEvents = "none";
                    playerSign = 'X';
                    playBoard.style.pointerEvents = 'auto';
                }
            }
            let playerXIcon = '../images/Chinese1.png';
            let playerYIcon = '../images/Chinese2.png';
            let playerSign = 'X';
            let runBot = true;

            function getId(idname) {
                return document.querySelector(".box" + idname).id;
            }

            function checkThreeId(val1, val2, val3, sign) {
                if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
                    return true;
                }
            }

            function selectWinner() {
                if (checkThreeId(1, 2, 3, playerSign) || checkThreeId(4, 5, 6, playerSign) || checkThreeId(7, 8, 9, playerSign) || checkThreeId(1, 4, 7, playerSign) || checkThreeId(2, 5, 8, playerSign) || checkThreeId(3, 6, 9, playerSign) || checkThreeId(1, 5, 9, playerSign) || checkThreeId(3, 5, 7, playerSign)) {
                    console.log(playerSign + ' ' + 'winner');
                    runBot = false;
                    bot(runBot);
                    setTimeout(() => {
                        playBoard.classList.remove('show');
                        resultBox.classList.add('show');
                    }, 1000);
                    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
                } else {
                    if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
                        console.log(playerSign + ' ' + 'winner');
                        runBot = false;
                        bot(runBot);
                        setTimeout(() => {
                            playBoard.classList.remove('show');
                            resultBox.classList.add('show');
                        }, 1000);
                        wonText.textContent = `Match has been drawn!`;
                    }
                }
            }

            replayBtn.onclick = () => {
                window.location.reload();
            }
        }
    } else if (path.includes("scenery.html")) {
        let next = document.querySelector('.nex');
        let prev = document.querySelector('.pre');

        next.addEventListener('click', function () {
            console.log(1);
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').appendChild(items[0]);
        })
        prev.addEventListener('click', function () {
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').prepend(items[items.length - 1]);
        })

        const shome = document.querySelector('.scenehome');
        shome.addEventListener('click', () => {
            console.log(1)
            window.location.href = "homepage.html";
        })
    }
});


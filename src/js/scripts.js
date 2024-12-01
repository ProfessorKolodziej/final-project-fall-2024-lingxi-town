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
        // 音频初始化函数
        async function initAudio() {
            const music = document.getElementById('bgm-intro-home');
            const musicIcon = document.getElementById('music-icon1');
            const isPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

            // 浏览器检测
            const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
            const isEdge = /Edg/.test(navigator.userAgent);
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isFirefox || isMobile) {
                musicIcon.src = 'images/musicplay.png';
                music.pause();
                return;
            }

            try {
                music.currentTime = savedTime;
                // 默认显示播放按钮
                musicIcon.src = 'images/musicplay.png';

                if (isPlaying) {
                    if ((isChrome || isEdge || isSafari) && !isMobile) {
                        // 只在 Chrome 和 Edge 桌面版尝试自动播放
                        try {
                            await music.play();
                            musicIcon.src = 'images/musicstop.png';
                        } catch (err) {
                            console.log('自动播放失败:', err);
                            music.pause();
                        }
                    } else {
                        // Safari、Firefox 和移动设备都先暂停
                        music.pause();
                    }
                } else {
                    music.pause();
                }
            } catch (err) {
                console.log('音频初始化失败:', err);
                music.pause();
                localStorage.setItem('musicPlaying', 'false');
            }
        }

        // 音乐控制函数
        async function handleMusicControl() {
            const music = document.getElementById('bgm-intro-home');
            const musicIcon = document.getElementById('music-icon1');

            try {
                if (music.paused) {
                    await music.play();
                    musicIcon.src = 'images/musicstop.png';
                    localStorage.setItem('musicPlaying', 'true');
                } else {
                    music.pause();
                    musicIcon.src = 'images/musicplay.png';
                    localStorage.setItem('musicPlaying', 'false');
                }
            } catch (err) {
                console.log('播放控制失败:', err);
                music.pause();
                musicIcon.src = 'images/musicplay.png';
            }
        }

        // 导航到主页
        function navigate() {
            window.location.href = 'homepage.html';
        }

        // 初始化所有事件监听
        function initializeEvents() {
            const ebutton = document.querySelector(".explorebutton");
            const musicControlButton = document.getElementById('music-control1');
            const music = document.getElementById('bgm-intro-home');

            ebutton?.addEventListener("click", navigate);
            musicControlButton?.addEventListener('click', handleMusicControl);
            window.addEventListener('beforeunload', () => {
                localStorage.setItem('musicTime', music.currentTime.toString());
            });
        }

        // 初始化所有功能
        initializeEvents();
        initAudio();
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
            let playerXIcon = '/final-project-fall-2024-lingxi-town/images/Chinese1.png';
            let playerYIcon = '/final-project-fall-2024-lingxi-town/images/Chinese2.png';
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

        twopeoplemode.onclick = () => {
            const selectBox = document.querySelector('.select-box');
            const selectXBtn1 = selectBox.querySelector('.playerX');
            const selectYBtn1 = selectBox.querySelector('.playerY');
            const selectXBtn = selectBox.querySelector('.playerX2');
            const selectYBtn = selectBox.querySelector('.playerY2');
            const playBoard = document.querySelector('.play-board');
            const allBox = document.querySelectorAll('section span');
            const players = document.querySelector('.players');
            const resultBox = document.querySelector('.result-box');
            const wonText = resultBox.querySelector('.won-text');
            const replayBtn = resultBox.querySelector('button');
            const playmode = document.querySelector('.play-mode');
            const backgame1 = document.querySelector('.gameback');
            const backgame = document.querySelector('.gameback2');
            const homepagegame2 = document.querySelector('.gamehome2');

            homepagegame2.onclick = () => {
                window.location.href = "homepage.html";
            }

            backgame.onclick = () => {
                window.location.reload();
            }

            // 隐藏模式选择界面，显示角色选择界面
            backgame1.classList.add('hide');
            selectXBtn1.classList.add('hide');
            selectYBtn1.classList.add('hide');
            playmode.classList.add('hide');
            selectBox.classList.add('show');
            selectXBtn.classList.add('show');
            selectYBtn.classList.add('show');
            backgame.classList.add('show');


            // 为所有格子添加点击事件
            for (let i = 0; i < allBox.length; i++) {
                allBox[i].setAttribute('onclick', 'clickedBox(this)');
            }

            let playerXIcon = '/final-project-fall-2024-lingxi-town/images/Chinese1.png';
            let playerYIcon = '/final-project-fall-2024-lingxi-town/images/Chinese2.png';
            let playerSign = 'X';
            let runBot = false; // 双人模式不需要机器人

            window.clickedBox = function (element) {
                // 检查是否是 Y 的回合
                if (players.classList.contains('active')) {
                    element.innerHTML = `<img src="${playerYIcon}">`;
                    players.classList.remove('active');
                    playerSign = 'Y';
                    element.setAttribute('id', playerSign);
                } else {
                    element.innerHTML = `<img src="${playerXIcon}">`;
                    players.classList.add('active');
                    playerSign = 'X';
                    element.setAttribute('id', playerSign);
                }
                selectWinner();
                element.style.pointerEvents = 'none';
            }

            // 选择 X 玩家
            selectXBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
            }

            // 选择 Y 玩家
            selectYBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                players.classList.add('active');
            }

            // 获取指定格子的ID
            function getId(idname) {
                return document.querySelector(".box" + idname).id;
            }

            // 检查三个格子是否相同
            function checkThreeId(val1, val2, val3, sign) {
                if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
                    return true;
                }
            }

            // 检查获胜者
            function selectWinner() {
                if (
                    checkThreeId(1, 2, 3, playerSign) ||
                    checkThreeId(4, 5, 6, playerSign) ||
                    checkThreeId(7, 8, 9, playerSign) ||
                    checkThreeId(1, 4, 7, playerSign) ||
                    checkThreeId(2, 5, 8, playerSign) ||
                    checkThreeId(3, 6, 9, playerSign) ||
                    checkThreeId(1, 5, 9, playerSign) ||
                    checkThreeId(3, 5, 7, playerSign)
                ) {
                    allBox.forEach(box => {
                        box.style.pointerEvents = 'none';
                    });
                    setTimeout(() => {
                        playBoard.classList.remove('show');
                        resultBox.classList.add('show');
                    }, 700);
                    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
                } else {
                    // 检查是否平局
                    if (getId(1) != "" && getId(2) != "" && getId(3) != "" &&
                        getId(4) != "" && getId(5) != "" && getId(6) != "" &&
                        getId(7) != "" && getId(8) != "" && getId(9) != "") {
                        allBox.forEach(box => {
                            box.style.pointerEvents = 'none';
                        });
                        setTimeout(() => {
                            playBoard.classList.remove('show');
                            resultBox.classList.add('show');
                        }, 700);
                        wonText.textContent = `Match has been drawn!`;
                    }
                }
            }

            // 重新开始游戏
            replayBtn.onclick = () => {
                window.location.reload();
            }
        }


    } else if (path.includes("scenery.html")) {
        let next = document.querySelector('.nex');
        let prev = document.querySelector('.pre');

        // 控制音频播放的函数
        function updateAudio() {
            const items = document.querySelectorAll('.items');
            const allAudios = document.querySelectorAll('audio');

            // 首先暂停所有音频
            allAudios.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });

            // 只播放当前显示项的音频（第二个items，因为CSS中第二个是显示的）
            const activeAudio = items[1].querySelector('audio');
            if (activeAudio) {
                activeAudio.play().catch(err => console.log("Playback failed:", err));
            }
        }

        // 初始化时控制音频
        updateAudio();

        next.addEventListener('click', function () {
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').appendChild(items[0]);
            // 更新音频状态
            updateAudio();
        });

        prev.addEventListener('click', function () {
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').prepend(items[items.length - 1]);
            // 更新音频状态
            updateAudio();
        });

        const shome = document.querySelectorAll('.scenehome');
        shome.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = "homepage.html";
            });
        });
        // 页面离开时停止所有音频
        window.addEventListener('beforeunload', () => {
            const allAudios = document.querySelectorAll('audio');
            allAudios.forEach(audio => {
                audio.pause();
            });
        });
    } else if (path.includes("towncitizen.html")) {
        const shome = document.querySelector('.citihome');
        shome.addEventListener('click', () => {
            window.location.href = "homepage.html";
        });
    }
})

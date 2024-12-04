// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// i learn the basic functionalities from the video i list in the html pages
// to add my own functionalities and thoughts, i use claude3.5 to help me
//this js is very long because at the beginning i ask how i can control different page, the chatgpt tells me to use if, else if
//i also have another small js only for pet
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
        //i ask claude how I can get a subjet to move from one end to another end in a seting time
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

        //i ask claude how to store the time of played music
        localStorage.removeItem('musicTime');
        localStorage.setItem('musicPlaying', 'true');
    }


    else if (path.includes("introduction.html")) {

        async function initAudio() {
            const music = document.getElementById('bgm-intro-home');
            const musicIcon = document.getElementById('music-icon1');
            const isPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

            // realize only chrome can autoplay, i ask claude helping me to set different music playing mode for different devices, question like: if firefox cannot auto play what should i do , should i just create a button to control the music? in what way, the music will be played
            //the followin code is finished with the help of claude3.5
            // i also ask how to store and play music, how to continue the music in another different page
            //i also ask how to detect the device users are using
            const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
            const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            try {
                music.currentTime = savedTime;
                musicIcon.src = 'images/musicplay.png';
                music.pause();

                if (isPlaying && (isChrome || isEdge) && !isMobile) {
                    try {
                        const playPromise = music.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                musicIcon.src = 'images/musicstop.png';
                            }).catch(error => {
                                console.log("自动播放失败:", error);
                                music.pause();
                                musicIcon.src = 'images/musicplay.png';
                            });
                        }
                    } catch (err) {
                        console.log('尝试播放失败:', err);
                        music.pause();
                        musicIcon.src = 'images/musicplay.png';
                    }
                }
            } catch (err) {
                console.log('音频初始化失败:', err);
                music.pause();
                musicIcon.src = 'images/musicplay.png';
                localStorage.setItem('musicPlaying', 'false');
            }
        }

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
                localStorage.setItem('musicPlaying', 'false');
            }
        }


        function navigate() {
            window.location.href = 'homepage.html';
        }

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

        initializeEvents();
        initAudio();
    }

    else if (path.includes("homepage.html")) {
        console.log("This is the Homepage.");

        //the music part process of homepage is similar to the introduction page
        // I realize only chrome can autoplay, i ask claude helping me to set different music playing mode for different devices, question like: if firefox cannot auto play what should i do , should i just create a button to control the music? in what way, the music will be played
        //the followin code is finished with the help of claude3.5
        // i also ask how to store and play music, how to continue the music in another different page
        //i also ask how to detect the device users are using
        async function initAudio() {
            const music = document.getElementById('bgm-intro-home');
            const musicIcon = document.getElementById('music-icon2');
            const isPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

            const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
            const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


            try {
                music.currentTime = savedTime;
                musicIcon.src = 'images/musicplay.png';
                music.pause();


                if (isPlaying && (isChrome || isEdge) && !isMobile) {
                    try {
                        const playPromise = music.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                musicIcon.src = 'images/musicstop.png';
                            }).catch(error => {
                                console.log("自动播放失败:", error);
                                music.pause();
                                musicIcon.src = 'images/musicplay.png';
                            });
                        }
                    } catch (err) {
                        console.log('尝试播放失败:', err);
                        music.pause();
                        musicIcon.src = 'images/musicplay.png';
                    }
                }
            } catch (err) {
                console.log('音频初始化失败:', err);
                music.pause();
                musicIcon.src = 'images/musicplay.png';
                localStorage.setItem('musicPlaying', 'false');
            }
        }

        function getScreenWidth() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        }

        function updateImageSources() {
            // to change the picture based on the width of computer, i ask computer how to detect the width of screen
            //how to get real-time update of the width
            const screenWidth = getScreenWidth();

            if (screenWidth < 768) {
                document.querySelector(".leftcover").src = "images/leftcover1.png";
                document.querySelector(".rightcover").src = "images/rightcover1.png";
            } else {
                document.querySelector(".leftcover").src = "images/leftcover.png";
                document.querySelector(".rightcover").src = "images/rightcover.png";
            }
        }

        window.addEventListener("load", updateImageSources);
        window.addEventListener("resize", updateImageSources);

        // 原有的 UI 元素
        const hoverright = document.getElementById("hover-right");
        const hoverleft = document.getElementById("hover-left");
        const handright = document.getElementById("hand-right");
        const handleft = document.getElementById("hand-left");
        const coverright = document.querySelector(".leftcover");
        const coverleft = document.querySelector(".rightcover");
        const comefw = document.querySelector('.mainhomepage');
        const musicfw = document.querySelector('.music-control2');

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (!isMobile) {
            handright.style.display = 'none';
            handleft.style.display = 'none';
        }

        function addHoverEffect() {
            coverleft.style.transform = "translateX(20px)";
            coverright.style.transform = "translateX(-20px)";
        }

        function removeHoverEffect() {
            coverleft.style.transform = "translateX(0)";
            coverright.style.transform = "translateX(0)";
        }

        async function moveCovers() {
            coverleft.style.transition = "transform 2s ease";
            coverright.style.transition = "transform 2s ease";
            hoverleft.style.transition = "transform 2s ease";
            hoverright.style.transition = "transform 2s ease";
            handleft.style.transition = "transform 2s ease";
            handright.style.transition = "transform 2s ease";

            coverright.style.transform = "translateX(-680px)";
            coverleft.style.transform = "translateX(680px)";
            hoverright.style.transform = "translateX(-680px)";
            hoverleft.style.transform = "translateX(680px)";
            handright.style.transform = "translateX(680px)";
            handleft.style.transform = "translateX(-680px)";

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

            // ask cluade3.5 how to control the music based on different devices
            const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
            const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (!(isChrome || isEdge) || isMobile) {
                const music = document.getElementById('bgm-intro-home');
                const musicIcon = document.getElementById('music-icon2');
                try {
                    await music.play();
                    musicIcon.src = 'images/musicstop.png';
                    localStorage.setItem('musicPlaying', 'true');
                } catch (err) {
                    console.log('播放失败:', err);
                }
            }
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

        scenclick?.addEventListener('click', () => {
            window.location.href = "scenery.html";
        });
        petclick?.addEventListener('click', () => {
            window.location.href = "pet.html";
        });
        citiclick?.addEventListener('click', () => {
            window.location.href = "towncitizen.html";
        });
        gameclick?.addEventListener('click', () => {
            window.location.href = "game.html";
        });
        back?.addEventListener('click', () => {
            window.location.href = "introduction.html";
        });


        const musicControlButton = document.getElementById('music-control2');
        musicControlButton?.addEventListener('click', async () => {
            const music = document.getElementById('bgm-intro-home');
            const musicIcon = document.getElementById('music-icon2');

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
                localStorage.setItem('musicPlaying', 'false');
            }
        });

        window.addEventListener('beforeunload', () => {
            const music = document.getElementById('bgm-intro-home');
            localStorage.setItem('musicTime', music.currentTime.toString());
        });

        initAudio();
    }

    else if (path.includes("game.html")) {
        //for the bgm, i also ask cluade for help
        //the process is similar to the previous page
        // I realize only chrome can autoplay, i ask claude helping me to set different music playing mode for different devices, question like: if firefox cannot auto play what should i do , should i just create a button to control the music? in what way, the music will be played
        //the followin code is finished with the help of claude3.5
        const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
        const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isAutoPlayBrowser = (isChrome || isEdge) && !isMobile;

        const audio = document.getElementById('game-bgm');
        const musicControlButton = document.getElementById('music-control2');
        const musicIcon = document.getElementById('music-icon2');

        const lastTime = localStorage.getItem('audioCurrentTime');
        if (isAutoPlayBrowser) {
            if (lastTime) {
                audio.currentTime = lastTime;
                audio.play();
                musicIcon.src = 'images/musicplay.png';
            } else {
                audio.currentTime = 0;
                audio.play();
                musicIcon.src = 'images/musicplay.png';
            }
        } else {
            audio.currentTime = lastTime || 0;
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
        //one people mode, i learn it from video
        //two people mode. i ask claude3.5 for some help, such as how to end game and end all the clicking function after one win

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

            if (!isAutoPlayBrowser && audio.paused) {
                audio.play();
            }


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


            selectXBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                playerSign = 'X';
            }

            selectYBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                players.setAttribute('class', 'players active player');
                playerSign = 'Y';
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

            //i ask cluade3.5 how to use image from the images in java script
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
                    wonText.innerHTML = `Player  <p> ${playerSign} </p>  won the game!`;
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
            const title1 = document.querySelector('.gametitle');
            const title3 = document.querySelector('.gametitle3');

            if (!isAutoPlayBrowser && audio.paused) {
                audio.play();
            }

            homepagegame2.onclick = () => {
                window.location.href = "homepage.html";
            }

            backgame.onclick = () => {
                window.location.reload();
            }

            title1.classList.add("hide");
            backgame1.classList.add('hide');
            selectXBtn1.classList.add('hide');
            selectYBtn1.classList.add('hide');
            playmode.classList.add('hide');
            selectBox.classList.add('show');
            selectXBtn.classList.add('show');
            selectYBtn.classList.add('show');
            backgame.classList.add('show');
            title3.classList.add("show");


            for (let i = 0; i < allBox.length; i++) {
                allBox[i].setAttribute('onclick', 'clickedBox(this)');
            }

            let playerXIcon = '/final-project-fall-2024-lingxi-town/images/Chinese1.png';
            let playerYIcon = '/final-project-fall-2024-lingxi-town/images/Chinese2.png';
            let playerSign = 'X';
            let runBot = false;

            window.clickedBox = function (element) {
                // i ask claude to know how to check whether it is X or Y role
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

            selectXBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
            }

            selectYBtn.onclick = () => {
                selectBox.classList.remove('show');
                selectBox.classList.add('hide');
                playBoard.classList.add('show');
                players.classList.add('active');
            }

            function getId(idname) {
                return document.querySelector(".box" + idname).id;
            }

            function checkThreeId(val1, val2, val3, sign) {
                if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
                    return true;
                }
            }

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
                    wonText.innerHTML = `Player <p> ${playerSign} </p>  won the game!`;
                } else {
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

            // i ask claude3.5 how to reload the page to replay it 
            replayBtn.onclick = () => {
                window.location.reload();
            }
        }


    } else if (path.includes("scenery.html")) {
        // the music process is similar to previous 
        //for the bgm, i also ask cluade for help
        //the process is similar to the previous page
        // I realize only chrome can autoplay, i ask claude helping me to set different music playing mode for different devices, question like: if firefox cannot auto play what should i do , should i just create a button to control the music? in what way, the music will be played
        //the followin code is finished with the help of claude3.5
        //during the chat with claude3.5, i gradualy have idea how to make it
        let next = document.querySelector('.nex');
        let prev = document.querySelector('.pre');
        let playButton = document.querySelector('.plays');
        let isFirstLoad = true;

        const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
        const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isAutoPlayBrowser = (isChrome || isEdge) && !isMobile;


        if (!isAutoPlayBrowser) {
            playButton.innerHTML = '<img src="images/musicplay2.png" alt="music control" class="music-icon">';
            playButton.style.visibility = 'visible';
        } else {
            playButton.style.visibility = 'hidden';
        }

        function updateAudio() {
            const items = document.querySelectorAll('.items');
            const allAudios = document.querySelectorAll('audio');

            allAudios.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });


            const activeAudio = items[1].querySelector('audio');

            if (activeAudio) {
                if (isAutoPlayBrowser) {
                    activeAudio.play().catch(err => console.log("Playback failed:", err));
                } else if (isFirstLoad) {
                    playButton.style.visibility = 'visible';
                    playButton.innerHTML = '<img src="images/musicplay2.png" alt="music control" class="music-icon">';
                } else {
                    activeAudio.play().catch(err => console.log("Playback failed:", err));
                    playButton.style.visibility = 'hidden';
                }
            }
        }

        if (!isAutoPlayBrowser) {
            playButton.addEventListener('click', () => {
                const items = document.querySelectorAll('.items');
                const activeAudio = items[1].querySelector('audio');
                if (activeAudio && activeAudio.paused) {
                    activeAudio.play().catch(err => console.log("Playback failed:", err));
                    isFirstLoad = false;
                    playButton.innerHTML = '<img src="images/musicstop2.png" alt="music control" class="music-icon">';
                    setTimeout(() => {
                        playButton.style.visibility = 'hidden';
                    }, 300);
                }
            });
        }

        //i learn this sldieshow from video list in the html
        next.addEventListener('click', function () {
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').appendChild(items[0]);
            isFirstLoad = false;
            updateAudio();
        });

        prev.addEventListener('click', function () {
            let items = document.querySelectorAll('.items');
            document.querySelector('.slides2').prepend(items[items.length - 1]);
            isFirstLoad = false;
            updateAudio();
        });

        const shome = document.querySelectorAll('.scenehome');
        shome.forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = "homepage.html";
            });
        });

        window.addEventListener('beforeunload', () => {
            const allAudios = document.querySelectorAll('audio');
            allAudios.forEach(audio => {
                audio.pause();
            });
        });

        updateAudio();
    } else if (path.includes("towncitizen.html")) {
        //i learn this from video listed in the html
        //but there is huge different from the reference and my part since i alter it for mobile and ipad
        const shome = document.querySelector('.citihome');
        shome.addEventListener('click', () => {
            window.location.href = "homepage.html";
        });
        const nameTriggers = document.querySelectorAll('.character-name');
        const nameTriggers2 = document.querySelectorAll('.character-icon');
        console.log("找到的名字元素数量:", nameTriggers.length);
        let currentActive = null;

        nameTriggers.forEach(trigger => {
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();

                const card = this.closest('.character-card');
                const audio = card.querySelector('.character-audio');

                if (card === currentActive) {
                    card.classList.remove('active');
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    currentActive = null;
                    return;
                }

                if (currentActive) {
                    currentActive.classList.remove('active');
                    const prevAudio = currentActive.querySelector('.character-audio');
                    if (prevAudio) {
                        prevAudio.pause();
                        prevAudio.currentTime = 0;
                    }
                }

                card.classList.add('active');
                currentActive = card;

                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(error => {
                        console.log('音频播放失败:', error);
                    });
                }
            });
        });

        nameTriggers2.forEach(trigger => {
            console.log("添加点击事件到:", trigger.textContent);
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();

                const card = this.closest('.character-card');
                const audio = card.querySelector('.character-audio');

                if (card === currentActive) {
                    card.classList.remove('active');
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                    currentActive = null;
                    return;
                }

                if (currentActive) {
                    currentActive.classList.remove('active');
                    const prevAudio = currentActive.querySelector('.character-audio');
                    if (prevAudio) {
                        prevAudio.pause();
                        prevAudio.currentTime = 0;
                    }
                }

                card.classList.add('active');
                currentActive = card;

                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(error => {
                        console.log('音频播放失败:', error);
                    });
                }
            });
        });

        //i ask claude for the help of click functionaliy since mobile and ipad cannot has hover
        //i ask how to click other area when one is open to switch to another
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.character-card') && currentActive) {
                currentActive.classList.remove('active');

                const audio = currentActive.querySelector('.character-audio');
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }

                currentActive = null;
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && currentActive) {
                currentActive.classList.remove('active');

                const audio = currentActive.querySelector('.character-audio');
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }

                currentActive = null;
            }
        });


    }
})

// i learn most of these js code from the video i listed in the html
//because time is limited at the end, i make only slight alteration for this part
const shell = document.querySelector('.pboxs');
const cells = shell.querySelectorAll('.pbox');
const cellWidth = shell.offsetWidth;
const cellHeight = shell.offsetHeight;
const cellSize = cellHeight;
const cellCount = 23;
const radius = Math.round((cellSize / 1.8) / Math.tan(Math.PI / cellCount));
const theta = 360 / cellCount;


let selectedIndex = 0;

function rotateshell() {
    const angle = theta * selectedIndex * -1;
    shell.style.transform = `translateZ(${-radius}px) rotateX(${-angle}deg)`;

    const cellIndex = selectedIndex < 0 ?
        (cellCount - ((selectedIndex * -1) % cellCount)) :
        (selectedIndex % cellCount);

    cells.forEach((cell, index) => {
        if (cellIndex === index) {
            cell.classList.add('selected');
        } else {
            cell.classList.remove('selected');
        }
    });
}


function selectPrev() {
    selectedIndex--;
    rotateshell();
}

function selectNext() {
    selectedIndex++;
    rotateshell();
}

const prevButton = document.querySelector('.up');
prevButton.addEventListener('click', selectPrev);
const nextButton = document.querySelector('.next');
nextButton.addEventListener('click', selectNext);

function initshell() {
    cells.forEach((cell, i) => {
        const cellAngle = theta * i;
        cell.style.transform = `rotateX(${-cellAngle}deg) translateZ(${radius}px)`;
    });
    rotateshell();
}

initshell();

const shome = document.querySelectorAll('.scenehome');
shome.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = "homepage.html";
    });
});
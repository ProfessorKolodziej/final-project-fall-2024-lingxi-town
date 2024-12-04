// 获取外层容器
const shell = document.querySelector('.pboxs');

// 获取所有子元素
const cells = shell.querySelectorAll('.pbox');

// 获取容器宽度和高度
const cellWidth = shell.offsetWidth;
const cellHeight = shell.offsetHeight;

// 设置子元素大小为容器高度
const cellSize = cellHeight;

// 子元素数量
const cellCount = 23;

// 计算半径 - 使用数学公式计算3D旋转半径
const radius = Math.round((cellSize / 1.8) / Math.tan(Math.PI / cellCount));

// 计算每个子元素的角度
const theta = 360 / cellCount;

// 当前选中的子元素索引
let selectedIndex = 0;

function rotateshell() {
    // 计算旋转角度
    const angle = theta * selectedIndex * -1;

    // 设置容器的旋转和平移效果
    shell.style.transform = `translateZ(${-radius}px) rotateX(${-angle}deg)`;

    // 计算当前选中的子元素索引
    const cellIndex = selectedIndex < 0 ?
        (cellCount - ((selectedIndex * -1) % cellCount)) :
        (selectedIndex % cellCount);

    // 为每个子元素添加或移除选中样式
    cells.forEach((cell, index) => {
        if (cellIndex === index) {
            // 添加选中样式
            cell.classList.add('selected');
        } else {
            // 移除选中样式
            cell.classList.remove('selected');
        }
    });
}

// 选择上一个元素的函数
function selectPrev() {
    // 选中上一个子元素
    selectedIndex--;
    // 旋转容器
    rotateshell();
}

// 选择下一个元素的函数
function selectNext() {
    // 选中下一个子元素
    selectedIndex++;
    // 旋转容器
    rotateshell();
}

// 获取"上一个"按钮
const prevButton = document.querySelector('.up');
// 绑定点击事件
prevButton.addEventListener('click', selectPrev);

// 获取"下一个"按钮
const nextButton = document.querySelector('.next');
// 绑定点击事件
nextButton.addEventListener('click', selectNext);

// 初始化函数
function initshell() {
    cells.forEach((cell, i) => {
        // 计算每个子元素的角度
        const cellAngle = theta * i;
        // 设置每个子元素的旋转和平移效果
        cell.style.transform = `rotateX(${-cellAngle}deg) translateZ(${radius}px)`;
    });
    // 初始化旋转容器
    rotateshell();
}

// 调用初始化函数
initshell();

const shome = document.querySelectorAll('.scenehome');
shome.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = "homepage.html";
    });
});
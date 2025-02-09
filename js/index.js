document.addEventListener('DOMContentLoaded', function() {
    console.log("html 真TM难学！");

    // 背景颜色的不断渐变
    const colors = [
        { start: [196, 222, 233], end: [181, 255, 252] },
        { start: [252, 140, 209], end: [251, 194, 235] },
        { start: [235, 194, 235], end: [166, 193, 238] },
        { start: [238, 196, 253], end: [194, 233, 251] },
        { start: [251, 195, 160], end: [255, 175, 189] },
        { start: [189, 154, 158], end: [250, 208, 196] }
    ];
    let currentIndex = 0;
    let colorStep = 0.01;

    function interpolateColor(color1, color2, factor) {
        if (factor === undefined) factor = 0.5;
        const result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    }

    function changeBackground() {
        const bottomPicture = document.querySelector('.bottom-picture');
        if (!bottomPicture) {
            console.error('.bottom-picture 元素未找到');
            return;
        }

        const startColor = colors[currentIndex].start;
        const endColor = colors[currentIndex].end;
        const interpolatedStart = interpolateColor(startColor, endColor, Math.sin(colorStep));
        const interpolatedEnd = interpolateColor(endColor, startColor, Math.cos(colorStep));
        const colorString1 = `rgb(${interpolatedStart.join(',')})`;
        const colorString2 = `rgb(${interpolatedEnd.join(',')})`;

        bottomPicture.style.background = `linear-gradient(45deg, ${colorString1}, ${colorString2})`;
        colorStep += 0.01;
        if (colorStep >= Math.PI * 2) {
            colorStep = 0;
            currentIndex = (currentIndex + 1) % colors.length;
        }
    }


    document.getElementById('preson1').addEventListener('click', function() {
        window.location.href = './pages/personal.html'; // 替换为你的主页路径
    });
    // 添加背景颜色改变按钮点击事件监听器
    document.getElementById('ChangeColor').addEventListener('click', function() {
        // 改变背景颜色
        resetColors();
        // window.location.href = 'index.html';

        // 播放音乐
        const audio = new Audio('./media/celebrate1.mp3'); // 替换为你的音乐文件路径
        audio.play().catch(error => {
            console.error('播放音乐时出错:', error);
        });
    });

    // 重置颜色函数
    function resetColors() {
        currentIndex = Math.floor(Math.random() * colors.length); // 随机选择一个新的颜色组合
        colorStep = 0.01; // 重置colorStep
        changeBackground(); // 立即应用新颜色
    }

    setInterval(changeBackground, 100); // 每100毫秒更新一次背景色
    changeBackground(); // 初始化背景色
});


const images = [
    '../images/logo-m.webp',
    '../images/logo-l.webp',
    '../images/logo-r.webp'
];
const imgElement = document.getElementById('hoverImage');
let currentIndex = 0;
// 鼠标悬浮事件处理函数
function onMouseOver() {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
}
// 鼠标移出事件处理函数
function onMouseOut() {
    currentIndex = currentIndex;
    imgElement.src = images[currentIndex];
}
// 添加事件监听器
const toolBarLeft = document.querySelector('.tool-bar-left');
toolBarLeft.addEventListener('mouseover', onMouseOver);
toolBarLeft.addEventListener('mouseout', onMouseOut);
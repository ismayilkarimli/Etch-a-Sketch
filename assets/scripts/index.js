const container = document.querySelector('.container');
let slider = document.querySelector('.slider');
let sliderLabel = document.querySelector('.slider-value');
const buttons = document.querySelectorAll('.btn');
let colorWheel = document.querySelector('.selected-color');
let color = colorWheel.value;

let mode = 'color';

const containerStyle = container.style;
sliderLabel.textContent = slider.value + ' x ' + slider.value;
containerStyle.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;

colorWheel.addEventListener('change', () => {
    color = colorWheel.value;
})

buttons.forEach((button) => button.addEventListener('click', detectClickedButton));

function detectClickedButton(e) {
    if (e.target.classList.contains('clear')) {
        redrawBoard(slider.value);
        return
    }
    buttons.forEach(button => button.classList.remove('btn-active'));
    color = colorWheel.value;
    mode = 'color';
    e.target.classList.add('btn-active');
    if (e.target.classList.contains('eraser')) {
        mode = 'eraser';
    } else if (e.target.classList.contains('rainbow-mode')) {
        mode = 'rainbow';
    }
}



redrawBoard(slider.value);

slider.oninput = () => {
    sliderLabel.textContent = slider.value + ' x ' + slider.value;
    containerStyle.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;

    redrawBoard(slider.value);
}

function redrawBoard(sliderValue) {
    container.innerHTML = '';
    const squareWidth = 512 / Number(sliderValue);
    const numberOfSquares = Math.pow(512 / squareWidth, 2);

    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.style.width = `${squareWidth}px`;
        square.style.height = `${squareWidth}px`;
        square.addEventListener('mouseover', (event) => {
            console.log('hey hey hey')
            switch (mode) {
                case 'color':
                    event.target.style.backgroundColor = color;
                    break;
                case 'rainbow':
                    const randomHex = (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                    event.target.style.backgroundColor = `#${randomHex}`;
                    break;
                default:
                    event.target.style.backgroundColor = '#E6E6E6';
            }
        });

        square.classList.add('square');
        container.appendChild(square);
    }
}




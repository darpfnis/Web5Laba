// Swap Blocks X and Y
document.getElementById('swapBlocksButton').addEventListener('click', () => {
    const blockX = document.getElementById('blockX');
    const blockY = document.getElementById('blockY');
    [blockX.innerHTML, blockY.innerHTML] = [blockY.innerHTML, blockX.innerHTML];
});
// Додаємо подвійну кнопку для блоку Y
const blockY = document.querySelector('.blocky');
blockY.addEventListener('dblclick', () => {
    const cssFormContainer = document.getElementById('cssFormContainer');
    cssFormContainer.style.display = cssFormContainer.style.display === 'none' ? 'block' : 'none';
});

// Rectangle Area Calculation Form
const areaForm = document.getElementById('areaForm');
document.getElementById('toggleAreaFormButton').addEventListener('click', () => {
    areaForm.style.display = areaForm.style.display === 'none' ? 'block' : 'none';
});


areaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const area = length * width;

    // Виводимо результат у формі
    document.getElementById('calculationResult').textContent = `Rectangle Area: ${area}`;

    // Додаємо результат у кінець блоку 5
    const areaResultBlock = document.getElementById('areaResultBlock');
    areaResultBlock.textContent = `Rectangle Area: ${area}`;
});

// Minimum Numbers Form
// Function to determine the count of minimum numbers
const minNumbersForm = document.createElement('form');
minNumbersForm.id = 'minNumbersForm';
minNumbersForm.style.display = 'none';
minNumbersForm.innerHTML = `
    <h3>Enter 10 Numbers</h3>
    <label for="numbersInput">Numbers (comma-separated):</label>
    <input type="text" id="numbersInput" placeholder="e.g., 1,2,3,4,5,6,7,8,9,10">
    <button type="submit">Find Minimum</button>
`;

document.querySelector('.block5').appendChild(minNumbersForm);

minNumbersForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const numbers = document.getElementById('numbersInput').value.split(',').map(Number);
    if (numbers.length !== 10 || numbers.some(isNaN)) {
        alert('Please enter exactly 10 valid numbers.');
        return;
    }

    const min = Math.min(...numbers);
    const minCount = numbers.filter(num => num === min).length;
    document.cookie = `minCount=${minCount}; path=/`;
    alert(`Minimum value: ${min}, Count: ${minCount}`);
    location.reload();
});

// Handle cookies on page load
window.addEventListener('load', () => {
    const cookies = document.cookie.split('; ').find(row => row.startsWith('minCount='));
    if (cookies) {
        const minCount = cookies.split('=')[1];
        const saveData = confirm(`Saved Minimum Count: ${minCount}. Save cookies?`);
        if (!saveData) {
            document.cookie = 'minCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
            location.reload();
        } else {
            alert('Cookies are saved. Please reload the page.');
        }
    } else {
        minNumbersForm.style.display = 'block';
    }
});

// Button to toggle form visibility
const toggleFormButton = document.createElement('button');
toggleFormButton.id = 'toggleMinForm';
toggleFormButton.textContent = 'Toggle Minimum Numbers Form';
document.querySelector('.block5').appendChild(toggleFormButton);

toggleFormButton.addEventListener('click', () => {
    if (minNumbersForm.style.display === 'none') {
        minNumbersForm.style.display = 'block';
    } else {
        minNumbersForm.style.display = 'none';
    }
});


// Italicize Block 3 Text
const block3 = document.getElementById('block3');
const italicCheckbox = document.getElementById('italicCheckbox');
italicCheckbox.addEventListener('change', () => {
    if (italicCheckbox.checked) {
        document.addEventListener('keypress', italicizeText);
    } else {
        document.removeEventListener('keypress', italicizeText);
        block3.style.fontStyle = 'normal';
        localStorage.removeItem('isItalic');
    }
});
function italicizeText() {
    block3.style.fontStyle = 'italic';
    localStorage.setItem('isItalic', 'true');
}
if (localStorage.getItem('isItalic') === 'true') {
    block3.style.fontStyle = 'italic';
    italicCheckbox.checked = true;
}

// CSS Customization Form
const cssFormContainer = document.getElementById('cssFormContainer');
document.getElementById('toggleCSSFormButton').addEventListener('click', () => {
    cssFormContainer.style.display = cssFormContainer.style.display === 'none' ? 'block' : 'none';
});
const cssForm = document.getElementById('cssForm');
cssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selector = document.getElementById('cssSelector').value;
    const property = document.getElementById('cssProperty').value;
    const value = document.getElementById('cssValue').value;
    document.querySelectorAll(selector).forEach(elem => {
        elem.style[property] = value;
    });
    localStorage.setItem(`${selector}-${property}`, value);
    addCSSInstructionToBlock2(selector, property, value);
});

// Add/Delete CSS Instruction
function addCSSInstructionToBlock2(selector, property, value) {
    const block2 = document.getElementById('block2');
    const instruction = document.createElement('div');
    instruction.textContent = `${selector} { ${property}: ${value}; }`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        document.querySelectorAll(selector).forEach(elem => {
            elem.style[property] = '';
        });
        localStorage.removeItem(`${selector}-${property}`);
        block2.removeChild(instruction);
    });
    instruction.appendChild(deleteButton);
    block2.appendChild(instruction);
}

// Restore CSS Instructions from LocalStorage
window.addEventListener('load', () => {
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.includes('-')) {
            const [selector, property] = key.split('-');
            const value = localStorage.getItem(key);
            document.querySelectorAll(selector).forEach(elem => {
                elem.style[property] = value;
            });
            addCSSInstructionToBlock2(selector, property, value);
        }
    }
});

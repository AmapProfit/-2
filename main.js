document.addEventListener('DOMContentLoaded', () => {
    const clayButton = document.getElementById('clay-button');
    const clayCount = document.getElementById('clay-count');
    const bricksCount = document.getElementById('bricks-count');
    const heightCount = document.getElementById('height-count');
    const energyCount = document.getElementById('energy-count');

    let clay = 1034781;
    let bricks = 54758;
    let height = 183928;
    let energy = 2324;

    clayButton.addEventListener('click', () => {
        clay++;
        clayCount.textContent = clay.toLocaleString();
    });

    // Навигация по кнопкам внизу
    document.getElementById('tower-icon').addEventListener('click', () => {
        alert('Переход на экран с башней');
    });

    document.getElementById('factory-icon').addEventListener('click', () => {
        alert('Переход на экран с фабрикой');
    });

    document.getElementById('fire-icon').addEventListener('click', () => {
        alert('Переход на экран с обжигом');
    });

    document.getElementById('friends-icon').addEventListener('click', () => {
        alert('Переход на экран с рефералами');
    });
});

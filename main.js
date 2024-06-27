let clay = 0;
let bricks = 0;
let height = 0;
let energy = 5000;

const shelfButton = document.getElementById('shelfButton');
const energyBar = document.getElementById('energyBar');
const energyText = document.getElementById('energy');

shelfButton.addEventListener('click', () => {
    if (energy >= 20) {
        clay += 1;
        energy -= 20;
        document.getElementById('clay').innerText = `Clay: ${clay}`;
        updateEnergy();
    }
});

function updateEnergy() {
    energyText.innerText = `Energy: ${energy}`;
    energyBar.style.width = `${(energy / 5000) * 100}%`;
}

setInterval(() => {
    if (energy < 5000) {
        energy += 1;
        updateEnergy();
    }
}, 1000);

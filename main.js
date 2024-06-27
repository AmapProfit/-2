document.addEventListener('DOMContentLoaded', () => {
    const clayButton = document.getElementById('clay-button');
    const clayCountDisplay = document.getElementById('clay-count');
    const energyCountDisplay = document.getElementById('energy-count');
    const energyBar = document.getElementById('energy-bar');

    let clayCount = 0;
    let energy = 5000;
    const maxEnergy = 5000;
    const energyPerClick = 20;
    const energyRecoveryRate = 1;
    const energyRecoveryInterval = 1000; // 1 second

    clayButton.addEventListener('click', () => {
        if (energy >= energyPerClick) {
            clayCount++;
            energy -= energyPerClick;
            updateDisplays();
        }
    });

    function updateDisplays() {
        clayCountDisplay.textContent = clayCount;
        energyCountDisplay.textContent = `${energy}/${maxEnergy}`;
        energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
    }

    setInterval(() => {
        if (energy < maxEnergy) {
            energy += energyRecoveryRate;
            if (energy > maxEnergy) {
                energy = maxEnergy;
            }
            updateDisplays();
        }
    }, energyRecoveryInterval);

    updateDisplays();
});

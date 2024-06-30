document.addEventListener('DOMContentLoaded', () => {
    const clayButton = document.getElementById('clay-button');
    const clayCountDisplay = document.getElementById('clay-count');
    const energyCountDisplay = document.getElementById('energy-count');
    const energyBar = document.getElementById('energy-bar');

    const boostsIcon = document.getElementById('boosts-icon');
    const boostsMenu = document.getElementById('boosts-menu');
    const backIconBoosts = document.getElementById('back-icon-boosts');

    const friendsIcon = document.getElementById('friends-icon');
    const friendsMenu = document.getElementById('friends-menu');
    const backIconFriends = document.getElementById('back-icon-friends');

    const airdropIcon = document.getElementById('airdrop-icon');
    const airdropMenu = document.getElementById('airdrop-menu');
    const backIconAirdrop = document.getElementById('back-icon-airdrop');

    const fireBoostButton = document.getElementById('daily-boost-fire');
    const energyBoostButton = document.getElementById('daily-boost-energy');
    const fireBoostCountDisplay = document.getElementById('fire-boost-count');
    const energyBoostCountDisplay = document.getElementById('energy-boost-count');
    const balanceDisplay = document.getElementById('balance');
    const boostButton = document.getElementById('boost-button');
    const boostCostDisplay = document.getElementById('boost-cost');
    const boostLevelDisplay = document.getElementById('boost-level');

    const energyBoostUpgradeButton = document.getElementById('energy-boost-button');
    const energyBoostCostDisplay = document.getElementById('energy-boost-cost');
    const energyBoostLevelDisplay = document.getElementById('energy-boost-level');

    let clayCount = 0;
    let energy = 5000;
    const maxEnergy = 5000;
    let energyPerClick = 20;
    let energyRecoveryRate = 1;
    const energyRecoveryInterval = 1000; // 1 second
    let coinsPerClick = 1;

    let fireBoostCount = 3;
    let energyBoostCount = 3;
    const boostDurations = 15000; // 15 seconds

    let currentLevel = 0;
    const boostCosts = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 400000, 750000, 1000000];

    let energyBoostLevel = 0;
    const energyBoostCosts = [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 400000, 750000, 1000000];

    let isBoostActive = false;
    let isEnergyFree = false;

    clayButton.addEventListener('click', () => {
        if (energy >= energyPerClick || isEnergyFree) {
            clayCount += coinsPerClick;
            if (!isEnergyFree) {
                energy -= energyPerClick;
            }
            updateDisplays();
        }
    });

    boostsIcon.addEventListener('click', () => {
        boostsMenu.classList.add('show');
        updateDisplays();
    });

    backIconBoosts.addEventListener('click', () => {
        boostsMenu.classList.remove('show');
    });

    friendsIcon.addEventListener('click', () => {
        friendsMenu.classList.add('show');
    });

    backIconFriends.addEventListener('click', () => {
        friendsMenu.classList.remove('show');
    });

    airdropIcon.addEventListener('click', () => {
        airdropMenu.classList.add('show');
    });

    backIconAirdrop.addEventListener('click', () => {
        airdropMenu.classList.remove('show');
    });

    fireBoostButton.addEventListener('click', () => {
        if (fireBoostCount > 0 && !isBoostActive) {
            fireBoostCount -= 1;
            boostsMenu.classList.remove('show');
            coinsPerClick *= 10;
            isEnergyFree = true;
            isBoostActive = true;
            setTimeout(() => {
                coinsPerClick /= 10;
                isEnergyFree = false;
                isBoostActive = false;
                updateDisplays();
            }, boostDurations);
            updateDisplays();
        }
    });

    energyBoostButton.addEventListener('click', () => {
        if (energyBoostCount > 0 && !isBoostActive) {
            energyBoostCount -= 1;
            boostsMenu.classList.remove('show');
            energy = maxEnergy;
            updateDisplays();
        }
    });

    boostButton.addEventListener('click', () => {
        if (currentLevel < boostCosts.length && clayCount >= boostCosts[currentLevel]) {
            clayCount -= boostCosts[currentLevel];
            currentLevel += 1;
            coinsPerClick += 1;
            updateDisplays();
        }
    });

    energyBoostUpgradeButton.addEventListener('click', () => {
        if (energyBoostLevel < energyBoostCosts.length && clayCount >= energyBoostCosts[energyBoostLevel]) {
            clayCount -= energyBoostCosts[energyBoostLevel];
            energyBoostLevel += 1;
            energyRecoveryRate += 1;
            updateDisplays();
        }
    });

    function updateDisplays() {
        clayCountDisplay.textContent = clayCount;
        energyCountDisplay.textContent = `${energy}/${maxEnergy}`;
        energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
        fireBoostCountDisplay.textContent = `${fireBoostCount}/3`;
        energyBoostCountDisplay.textContent = `${energyBoostCount}/3`;
        balanceDisplay.textContent = clayCount;
        boostCostDisplay.textContent = boostCosts[currentLevel] || 'MAX';
        boostLevelDisplay.textContent = `Level ${currentLevel + 1}`;
        energyBoostCostDisplay.textContent = energyBoostCosts[energyBoostLevel] || 'MAX';
        energyBoostLevelDisplay.textContent = `Level ${energyBoostLevel + 1}`;
    }

    setInterval(() => {
        if (energy < maxEnergy) {
            energy = Math.min(energy + energyRecoveryRate, maxEnergy);
            updateDisplays();
        }
    }, energyRecoveryInterval);

    updateDisplays();
});

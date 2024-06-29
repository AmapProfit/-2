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

    boostsIcon.addEventListener('click', () => {
        boostsMenu.classList.add('show');
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

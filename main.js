document.addEventListener('DOMContentLoaded', () => {
    const clayButton = document.getElementById('clay-button');
    const clayCountDisplay = document.getElementById('clay-count');
    const energyCountDisplay = document.getElementById('energy-count');
    const bricksCountDisplay = document.getElementById('bricks-count');
    const heightCountDisplay = document.getElementById('height-count');
    const boostsIcon = document.getElementById('boosts-icon');
    const boostsMenu = document.getElementById('boosts-menu');
    const backIconBoosts = document.getElementById('back-icon-boosts');
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
    const factoryIcon = document.getElementById('factory-icon');
    const factoryMenu = document.getElementById('factory-menu');
    const backIconFactory = document.getElementById('back-icon-factory');
    const factoryButton = document.getElementById('factory-button');
    const currentClayDisplay = document.getElementById('current-clay');
    const currentBricksDisplay = document.getElementById('current-bricks');
    const towerIcon = document.getElementById('tower-icon');
    const towerMenu = document.getElementById('tower-menu');
    const backIconTower = document.getElementById('back-icon-tower');
    const currentBricksTowerDisplay = document.getElementById('current-bricks-tower');
    const currentHeightDisplay = document.getElementById('current-height');
    const towerBlockContainer = document.querySelector('.tower-block-container');
    const tasksButton = document.querySelector('.tasks');
    const tasksMenu = document.querySelector('.tasks-menu');
    const tasksBackButton = document.querySelector('.tasks-menu .back-icon');
    const submenuButtons = document.querySelectorAll('.submenu-button');
    const taskSections = document.querySelectorAll('.task-section');

    let clayCount = 10000000;
    let energy = 5000;
    const maxEnergy = 5000;
    let energyPerClick = 20;
    let energyRecoveryRate = 1;
    const energyRecoveryInterval = 1000; // 1 second
    let coinsPerClick = 1;
    let bricksCount = 0;
    let heightCount = 0;

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

    setInterval(() => {
        if (energy < maxEnergy && !isEnergyFree) {
            energy = Math.min(energy + energyRecoveryRate, maxEnergy);
            updateDisplays();
        }
    }, energyRecoveryInterval);

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

    factoryIcon.addEventListener('click', () => {
        factoryMenu.classList.add('show');
        updateFactoryDisplay();
    });

    backIconFactory.addEventListener('click', () => {
        factoryMenu.classList.remove('show');
    });

    factoryButton.addEventListener('click', () => {
        if (clayCount >= 25) {
            const bricksToAdd = Math.floor(clayCount / 25);
            bricksCount += bricksToAdd;
            clayCount -= bricksToAdd * 25;
            updateDisplays();
            updateFactoryDisplay();
        }
    });

    towerIcon.addEventListener('click', () => {
        towerMenu.classList.add('show');
        updateTowerDisplay();
    });

    backIconTower.addEventListener('click', () => {
        towerMenu.classList.remove('show');
    });

    tasksButton.addEventListener('click', () => {
        tasksMenu.style.display = 'flex';
        showTaskSection('general');
    });

    tasksBackButton.addEventListener('click', () => {
        tasksMenu.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
        if (towerMenu.classList.contains('show') && event.target === towerMenu) {
            if (bricksCount >= 100) {
                bricksCount -= 100;
                heightCount += 1;
                updateDisplays();
                updateTowerDisplay();

                // Create a new tower block element
                const towerBlock = document.createElement('div');
                towerBlock.classList.add('tower-block');
                towerBlock.textContent = `${heightCount} m`;

                // Insert the new block before the Build Tower button
                towerBlockContainer.appendChild(towerBlock);

                // Scroll the container down to make the new block visible
                towerBlockContainer.scrollTop = towerBlockContainer.scrollHeight;

                // Delay before adding the 'show' class for animation (optional, for smoothness)
                setTimeout(() => {
                    towerBlock.classList.add('show');
                }, 100);
            }
        }
    });

    function updateDisplays() {
        clayCountDisplay.textContent = `Clay: ${clayCount}`;
        energyCountDisplay.textContent = `Energy: ${energy}/${maxEnergy}`;
        bricksCountDisplay.textContent = `Bricks: ${bricksCount}`;
        heightCountDisplay.textContent = `Height: ${heightCount} m`;
        fireBoostCountDisplay.textContent = `Fire Boosts: ${fireBoostCount}`;
        energyBoostCountDisplay.textContent = `Energy Boosts: ${energyBoostCount}`;
        balanceDisplay.textContent = `Balance: ${clayCount}`;
        boostCostDisplay.textContent = `Boost Cost: ${boostCosts[currentLevel] || 'N/A'}`;
        boostLevelDisplay.textContent = `Boost Level: ${currentLevel + 1}`;
        energyBoostCostDisplay.textContent = `Energy Boost Cost: ${energyBoostCosts[energyBoostLevel] || 'N/A'}`;
        energyBoostLevelDisplay.textContent = `Energy Boost Level: ${energyBoostLevel + 1}`;
        currentClayDisplay.textContent = `Current Clay: ${clayCount}`;
        currentBricksDisplay.textContent =         content = `Bricks: ${bricksCount}`;
        currentHeightDisplay.textContent = `Height: ${heightCount}`;
    }

    function updateFactoryDisplay() {
        currentClayDisplay.textContent = `Current Clay: ${clayCount}`;
        currentBricksDisplay.textContent = `Current Bricks: ${bricksCount}`;
    }

    function updateTowerDisplay() {
        currentBricksTowerDisplay.textContent = `Bricks: ${bricksCount}`;
        currentHeightDisplay.textContent = `Height: ${heightCount}`;
    }

    function completeTask(taskName, link) {
        if (taskName === 'telegram') {
            window.open(link, '_blank');
            // Логика проверки подписки на Telegram и начисления награды
        } else if (taskName === 'telegram-partners1') {
            window.open(link, '_blank');
            bricksCount += 1000;
            updateDisplays();
        } else if (taskName === 'youtube') {
            window.open(link, '_blank');
            bricksCount += 1000;
            updateDisplays();
        } else if (taskName === 'twitter') {
            window.open(link, '_blank');
            bricksCount += 1000;
            updateDisplays();
        } else if (taskName === 'tiktok') {
            window.open(link, '_blank');
            bricksCount += 1000;
            updateDisplays();
        }
    }
    const completedTasks = {
        telegram: false,
        youtube: false,
        twitter: false,
        tiktok: false,
        telegrampartners1: false,
    };
    
    function completeTask(taskName, link) {
        if (taskName === 'telegram') {
            if (!completedTasks.telegram) {
                window.open(link, '_blank');
                // Логика проверки подписки на Telegram и начисления награды
                bricksCount += 1000;
                completedTasks.telegram = true; // Устанавливаем флаг выполнения задачи
                updateDisplays();
            } else {
                alert('You have already completed this task.');
            }
        } else if (taskName === 'youtube') {
            if (!completedTasks.youtube) {
                window.open(link, '_blank');
                bricksCount += 1000;
                completedTasks.youtube = true; // Устанавливаем флаг выполнения задачи
                updateDisplays();
            } else {
                alert('You have already completed this task.');
            }
        }   else if (taskName === 'telegrampartners1') {
                if (!completedTasks.telegrampartners1) {
                    window.open(link, '_blank');
                    bricksCount += 1000;
                    completedTasks.telegrampartners1 = true; // Устанавливаем флаг выполнения задачи
                    updateDisplays();
                } else {
                    alert('You have already completed this task.');
                }
        } else if (taskName === 'twitter') {
            if (!completedTasks.twitter) {
                window.open(link, '_blank');
                bricksCount += 1000;
                completedTasks.twitter = true; // Устанавливаем флаг выполнения задачи
                updateDisplays();
            } else {
                alert('You have already completed this task.');
            }
        } else if (taskName === 'tiktok') {
            if (!completedTasks.tiktok) {
                window.open(link, '_blank');
                bricksCount += 1000;
                completedTasks.tiktok = true; // Устанавливаем флаг выполнения задачи
                updateDisplays();
            } else {
                alert('You have already completed this task.');
            }
        }
    }

    function showTaskSection(section) {
        taskSections.forEach(function(sectionEl) {
            sectionEl.style.display = 'none';
        });
        document.getElementById(`${section}-tasks`).style.display = 'block';
        submenuButtons.forEach(function(button) {
            button.classList.remove('active');
        });
        document.querySelector(`.submenu-button[data-section="${section}"]`).classList.add('active');
    }

    submenuButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showTaskSection(section);
        });
    });

    document.querySelectorAll('.task-button').forEach(function(button) {
        button.addEventListener('click', function() {
            const taskName = this.getAttribute('data-task');
            const link = this.getAttribute('data-link');
            completeTask(taskName, link);
        });
    });

    // Функция для выдачи наград за достижение высоты
    const completedLeaderTasks = {
        height10: false,
        height50: false,
        height100: false,
        height500: false,
        height1000: false,
    };
    
    // Функция для выплаты награды за выполнение задачи по достижению определенной высоты
    function claimHeightReward(requiredHeight, rewardBricks) {
        if (heightCount >= requiredHeight && !completedLeaderTasks[`height${requiredHeight}`]) {
            bricksCount += rewardBricks;
            completedLeaderTasks[`height${requiredHeight}`] = true; // Устанавливаем флаг выполнения задачи
            updateDisplays();
        } else {
            alert(`You either haven't reached the required height (${requiredHeight}) or have already claimed this reward.`);
        }
    }
    
    // Добавление слушателей событий для кнопок в секции Leaders
    document.querySelectorAll('.height-reward-button').forEach(function(button) {
        button.addEventListener('click', function() {
            const requiredHeight = parseInt(this.getAttribute('data-height'));
            const rewardBricks = parseInt(this.getAttribute('data-reward'));
            claimHeightReward(requiredHeight, rewardBricks);
        });
    });
    
    // Добавление слушателей событий для кнопок в меню Leaders
    document.querySelectorAll('#leaders-tasks .task-button').forEach(function(button) {
        button.addEventListener('click', function() {
        const requiredHeight = parseInt(this.getAttribute('data-height'));
        const rewardBricks = parseInt(this.getAttribute('data-reward'));
        claimHeightReward(requiredHeight, rewardBricks);
        });
});

    

    updateDisplays();
});


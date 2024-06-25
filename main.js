const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [BootScene, MainScene, MineScene, ProcessScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('towerBase', 'assets/towerBase.png');
        this.load.image('mineButton', 'assets/mineButton.png');
        this.load.image('processButton', 'assets/processButton.png');
        this.load.image('buildButton', 'assets/buildButton.png');
        this.load.image('clay', 'assets/clay.png');
        this.load.image('brick', 'assets/brick.png');
        this.load.image('energy', 'assets/energy.png');
    }

    create() {
        this.scene.start('MainScene');
    }
}

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.add.image(400, 300, 'towerBase');

        this.mineButton = this.add.image(100, 100, 'mineButton').setInteractive();
        this.processButton = this.add.image(200, 100, 'processButton').setInteractive();
        this.buildButton = this.add.image(300, 100, 'buildButton').setInteractive();

        this.mineButton.on('pointerdown', () => this.scene.start('MineScene'));
        this.processButton.on('pointerdown', () => this.scene.start('ProcessScene'));
        this.buildButton.on('pointerdown', this.buildTower, this);

        this.clayText = this.add.text(10, 10, 'Clay: 0', { fontSize: '16px', fill: '#fff' });
        this.brickText = this.add.text(10, 30, 'Bricks: 0', { fontSize: '16px', fill: '#fff' });
        this.energyText = this.add.text(10, 50, 'Energy: 5000/5000', { fontSize: '16px', fill: '#fff' });

        this.clay = 0;
        this.bricks = 0;
        this.energy = 5000;
        this.towerHeight = 0;

        this.towerHeightText = this.add.text(10, 70, 'Tower Height: 0m', { fontSize: '16px', fill: '#fff' });
    }

    buildTower() {
        if (this.bricks >= 100) {
            this.bricks -= 100;
            this.towerHeight += 1;
            this.updateUI();
        }
    }

    updateUI() {
        this.clayText.setText('Clay: ' + this.clay);
        this.brickText.setText('Bricks: ' + this.bricks);
        this.energyText.setText('Energy: ' + this.energy + '/5000');
        this.towerHeightText.setText('Tower Height: ' + this.towerHeight + 'm');
    }
}

class MineScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MineScene' });
    }

    create() {
        this.add.image(400, 300, 'clay');

        this.energyText = this.add.text(10, 10, 'Energy: 5000/5000', { fontSize: '16px', fill: '#fff' });

        this.input.on('pointerdown', this.mineClay, this);
    }

    mineClay() {
        if (game.scene.scenes[1].energy >= 20) {
            game.scene.scenes[1].energy -= 20;
            game.scene.scenes[1].clay += 1;
            game.scene.scenes[1].updateUI();
            this.energyText.setText('Energy: ' + game.scene.scenes[1].energy + '/5000');
        }
    }
}

class ProcessScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ProcessScene' });
    }

    create() {
        this.add.image(400, 300, 'brick');

        this.processButton = this.add.image(200, 200, 'processButton').setInteractive();

        this.processButton.on('pointerdown', this.processClay, this);
    }

    processClay() {
        if (game.scene.scenes[1].clay >= 100) {
            game.scene.scenes[1].clay -= 100;
            game.scene.scenes[1].bricks += 1;
            game.scene.scenes[1].updateUI();
        }
    }
}

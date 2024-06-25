window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [BootScene, MineScene, ProcessScene, BuildScene, TowerScene],
        parent: 'game-container',
        backgroundColor: '#ffffff'
    };

    const game = new Phaser.Game(config);
};

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
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
        this.scene.start('MineScene');
    }
}

class MineScene extends Phaser.Scene {
    constructor() {
        super('MineScene');
    }

    create() {
        this.add.text(100, 100, 'Mine Scene', { fill: '#0f0' });
    }
}

class ProcessScene extends Phaser.Scene {
    constructor() {
        super('ProcessScene');
    }

    create() {
        this.add.text(100, 100, 'Process Scene', { fill: '#0f0' });
    }
}

class BuildScene extends Phaser.Scene {
    constructor() {
        super('BuildScene');
    }

    create() {
        this.add.text(100, 100, 'Build Scene', { fill: '#0f0' });
    }
}

class TowerScene extends Phaser.Scene {
    constructor() {
        super('TowerScene');
    }

    create() {
        this.add.text(100, 100, 'Tower Scene', { fill: '#0f0' });
    }
}


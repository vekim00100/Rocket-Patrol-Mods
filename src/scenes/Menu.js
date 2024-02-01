class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('enemyship', './assets/enemyship.png')
        this.load.image('starfield', './assets/starfield.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        // animeation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00FF00',
            color: '#ff0000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        // display title
        menuConfig.backgroundColor = '#00ff00'
        menuConfig.color = '#ff0000'
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x12a10d).setOrigin(0, 0)
        this.add.text(game.config.width/2, borderUISize * 2, 'ROCKET PATROL', menuConfig).setOrigin(0.5)

        // display menu text
        menuConfig.backgroundColor = '#d900ff'
        menuConfig.color = '#00d9ff'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Press Q to toggle mouse controls', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        // display enemyship
        this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'enemyship')
        

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                enemyshipSpeed: 3.5,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                enemyshipSpeed: 4.5,
                gameTimer: 45000
            }
        this.sound.play('sfx-select')
        this.scene.start('playScene')
        }
    }
}
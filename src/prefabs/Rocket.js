// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.physics.add.existing(this)    // add sprites to the physics engine
        scene.add.existing(this)    // add objects to existing scene
        this.isFiring = false       // track rocket's firing status
        this.moveSpeed = 2          // rocket speed in pixels/frame

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true
            this.sfxShot.play()
        }

        
        // check if Q key is pressed to toggle mouse controls
        if(keyLOCK.isDown) {
            this.enableMouseControls = !this.enableMouseControls
        }

        // mouse control left/right movement
        if(!this.isFiring) {
            // Use Phaser.Input.Mouse.Pointer for mouse controls if enabled
            if(this.enableMouseControls) {
                let pointer = this.scene.input.activePointer
                // move towards the cursor on the x-axis
                if(pointer.x < this.x && this.x >= borderUISize + this.width / 2) {
                    this.x -= this.moveSpeed;
                } else if (pointer.x > this.x && this.x <= game.config.width - borderUISize - this.width / 2) {
                    this.x += this.moveSpeed;
                }
            }
        }
        
        // mouse left click fire button
        let pointer = this.scene.input.activePointer
        if(pointer.isDown) {
            this.isFiring = true
            this.sfxShot.play()
        }
        
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
            this.scene.clock.delay -= 2000      // subtract 2 seconds for missing
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}
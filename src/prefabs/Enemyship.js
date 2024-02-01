// Enemyship prefab
class Enemyship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)                    // add sprites to the physics engine
        scene.add.existing(this)                            // add to existing scene
        this.points = pointValue                            // store pointValue
        this.moveSpeed = game.settings.enemyshipSpeed       // enemyspaceship speed in pixels/frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }
    }

    // reset position
    reset() {
        this.x = game.config.width
    }
}
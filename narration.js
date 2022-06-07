class narration extends Phaser.Scene {
    constructor() {
        super("narration");
    }

    preload() {
        this.load.image("narration", "assets/narration.png");
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "narration");
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(this.keySpace.isDown){
            this.scene.start("sceneTuto")
        }
     }
}
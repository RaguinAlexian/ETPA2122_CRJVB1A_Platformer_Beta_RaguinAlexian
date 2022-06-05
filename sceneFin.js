class sceneFin extends Phaser.Scene {
    constructor() {
        super("sceneFin");
    }

    init(data) {
    }


    preload() {
        this.load.image("Fin", "assets/fin.png")
        this.load.audio("Fete", "sons/Fete.wav")
    }

    create() {
        this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"Fin");

        this.fete = this.sound.add('Fete', { volume: 0.5 }, true)
        this.fete.play()
    }
    update() { }
}
class info extends Phaser.Scene{
    constructor(){
    super("info");
}

preload(){
    this.load.image("informations", "assets/menu/informations.png");
    this.load.image("bouttonReturn", "assets/menu/BouttonReturn.png");
}

create(){


this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"informations").setScale(1.6);

this.returnButton = this.add.image(this.cameras.main.width/2 + 360 ,this.cameras.main.height/2 + 230, 'bouttonReturn').setScale(0.53).setInteractive();

this.returnButton.on('pointerdown', function (pointer) {
    this.scene.scene.start("accueil", {})
});

}
update(){}
}
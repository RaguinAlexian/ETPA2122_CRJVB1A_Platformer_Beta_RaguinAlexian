class accueil extends Phaser.Scene {
    constructor() {
        super("accueil");
    }

    preload() {
        this.load.image("bouttonPlay", "assets/menu/BouttonPlay.png");
        this.load.image("accueil", "assets/menu/accueil.png");
        this.load.tilemapTiledJSON("carte", "map.json");
    }

    create() {
        const carte = this.make.tilemap({ key: 'carte' });

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "accueil");

        this.cursors = this.input.keyboard.createCursorKeys();

        this.startButton = this.add.image(this.cameras.main.width / 2, 250, 'bouttonPlay').setScale(0.53).setInteractive()


        this.startButton.on('pointerdown', function (pointer) {
            carte.getObjectLayer('spawnJoueur').objects.forEach((spawnJoueur) => {
                this.spawnXSortieSceneJoueur = spawnJoueur.x,
                    this.spawnYSortieSceneJoueur = spawnJoueur.y
            });

            this.scene.scene.start("sceneTuto", {
                spawnXSortieSceneJoueur: this.spawnXSortieSceneJoueur,
                spawnYSortieSceneJoueur: this.spawnYSortieSceneJoueur,
            })
        });
    }
    update() { }
}
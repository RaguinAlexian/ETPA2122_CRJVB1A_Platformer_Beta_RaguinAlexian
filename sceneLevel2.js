class sceneLevel2 extends Phaser.Scene {
    constructor() {
        super("sceneLevel2");
    }

    init(data) {
        this.spawnXSortieSceneJoueur = 1340,
            this.spawnYSortieSceneJoueur = 768;
    }

    preload() {
        this.load.image("Phaser_tuilesdejeu", "assets/tuiles.png");
        this.load.image("Phaser_tuilesdejeuBleu", "assets/bleu.png");
        this.load.image("Phaser_tuilesdejeuPtitNuage", "assets/ptitNuage.png");
        this.load.image("Phaser_tuilesdejeuGrosNuage", "assets/grosNuage.png");

        this.load.image("camera", "assets/camera.png");
        this.load.image("now", "assets/now.png");

        this.load.tilemapTiledJSON("carte", "map.json");

        this.load.spritesheet('perso', 'assets/perso.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.audio("Jump", "sons/Jump.wav");
        this.load.audio("Tp", "sons/Malus.mp3");
        this.load.audio("musique", "sons/Luiz.mp3");

        this.load.image("piques", "assets/piques.png")
        this.load.image("piques2", "assets/piques2.png")
        this.load.image("portail", "assets/portail.png")
    }

    create() {
        const carte = this.make.tilemap({ key: 'carte' });
        // importer les TileSet 
        const tileset = carte.addTilesetImage(
            "tuilesJeu",
            "Phaser_tuilesdejeu"
        );

        const tuilesBleu = carte.addTilesetImage(
            "tuilesBleu",
            "Phaser_tuilesdejeuBleu"
        );

        const tuilesPtitNuage = carte.addTilesetImage(
            "tuilesPtitNuage",
            "Phaser_tuilesdejeuPtitNuage"
        );

        const tuilesGrosNuage = carte.addTilesetImage(
            "tuilesGrosNuage",
            "Phaser_tuilesdejeuGrosNuage"
        );

        const bleu = carte.createLayer(
            "bleu",
            tuilesBleu
        );

        const ptitNuage = carte.createLayer(
            "ptitNuage",
            tuilesPtitNuage
        );

        const grosNuage = carte.createLayer(
            "grosNuage",
            tuilesGrosNuage
        );

        const derriere = carte.createLayer(
            "derriere",
            tileset
        );

        const build = carte.createLayer(
            "build",
            tileset
        );

        const ennemis = carte.createLayer(
            "ennemis",
            tileset
        );

        ptitNuage.setScrollFactor(0.9, 0.9)
        grosNuage.setScrollFactor(0.7, 0.7)

        this.vitessePlateforme = 100

        ///////////////////////////////////////////////////////////////

        this.cameraMid = this.physics.add.image(896, 448, 'camera')


        this.player = this.physics.add.sprite(this.spawnXSortieSceneJoueur, this.spawnYSortieSceneJoueur, 'perso').setOrigin(0);
        this.player.body.setSize(44, 56, true)
        this.player.setOffset(10, 8)


        this.physics.add.collider(this.player, build);
        build.setCollisionByProperty({ estSolide: true });

        /* this.physics.add.collider(this.player, ennemis, this.death, null, this);
        ennemis.setCollisionByProperty({ estSolide: true }); */

        this.player.setCollideWorldBounds(true);

        //////////
        //Piques//
        //////////
        
        this.piques = this.physics.add.group({ allowGravity: false });

        carte.getObjectLayer('ennemis').objects.forEach((piques) => {
            this.piques.create(piques.x+16, piques.y+16, 'piques').setPushable(false);
        })

        this.physics.add.collider(build, this.piques);
        this.physics.add.collider(this.player, this.piques, this.death, null, this);

        ////////////////

        this.piques2 = this.physics.add.group({ allowGravity: false });

        carte.getObjectLayer('piquesInverse').objects.forEach((piques2) => {
            this.piques2.create(piques2.x+16, piques2.y+16, 'piques2').setPushable(false);
        })

        this.physics.add.collider(build, this.piques2);
        this.physics.add.collider(this.player, this.piques2, this.death, null, this);

        ////////////////
        ////////////////

        this.cameras.main.zoom = 1.2
        this.physics.world.setBounds(0, 0, 5760, 928);
        this.cameras.main.setBounds(0, 0, 5760, 928);

        this.cameraMid.body.setAllowGravity(false)

        this.anims.create({
            key: 'rightPerso',
            frames: this.anims.generateFrameNumbers('perso', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'turnPerso',
            frames: [{ key: 'perso', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'leftPerso',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        ///////////////////////////////////////////////////////////////
        //////////////////////////SONS////////////////////////////////
        ///////////////////////////////////////////////////////////////

        this.musique = this.sound.add('musique', { volume: 0.25 }, true)
        this.musique.play()

        this.jump = this.sound.add('Jump', { volume: 0.5 }, true)
        this.tp = this.sound.add('Tp', { volume: 0.5 }, true)

        ///////////////////////////////////////////////////////////////
        /////////////////////////TOUCHES///////////////////////////////
        ///////////////////////////////////////////////////////////////

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
        });

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.dead = false;

        this.monTimer = this.time.addEvent({
            delay: 1,
            callback: this.timer,
            callbackScope: this,
            loop: true
        });
        //////////////////////////////////
        this.chrono = 0;
        this.chronoMinute = 0;

        this.now = this.add.image(480, 100, "now");
        this.now.setScale(0.6)
        this.now.setScrollFactor(0);

        this.player.body.setMaxSpeed(1000);

        this.portail = this.add.image(2470, 128, "portail");
    }

    update() {

        if ((this.player.x >= 2406 && this.player.y >= 96 && this.player.y <= 192) || this.keyH.isDown) {
            this.musique.stop();
            this.tp.play();
            this.scene.start("sceneNico");
        }

        this.cameras.main.startFollow(this.player);

        /* this.input.gamepad.once('connected', function (pad) {
            gamepad = pad;
        }, this); */

        this.frameLeftPerso = 'leftPerso'
        this.frameRightPerso = 'rightPerso'
        this.frameTurnPerso = 'turnPerso'

        /*if (gamepad != null) {
            goLeft = gamepad.left
            goRight = gamepad.right
            goUp = gamepad.up
            specialButton = gamepad.X
        }*/

        //if (gamepad == null) {
        var goRight = this.keyD.isDown
        var goLeft = this.keyQ.isDown
        var goUp = this.keyZ.isDown
        var specialButton = this.keySpace.isDown
        var dashButton = this.keyShift.isDown
        //specialButton = cursors.shift.isDown
        //}
        
        if (this.chronoMinute > 2) {
            this.now.setAlpha(1)
        }
        else if(this.chronoMinute > 1 && ((this.chrono > 10 && this.chrono < 20) || (this.chrono > 30 && this.chrono < 40) || (this.chrono > 50 && this.chrono < 60) || (this.chrono > 70 && this.chrono < 80))){
            this.now.setAlpha(0.6)
        }
        else {
            this.now.setAlpha(0)
        }

        if (this.dead == false) {
            if (!(goLeft || goRight)) {
                this.player.setVelocityX(0);
                this.player.anims.play(this.frameTurnPerso, true);
            }

            if (goLeft == true) {
                if (this.chronoMinute < 3) {
                    this.player.setVelocityX(-400);
                    this.player.direction = 'leftPerso';
                    this.player.anims.play(this.frameLeftPerso, true);
                    if (goUp == true && this.player.body.onFloor()) {

                        this.jump.play()
                        this.player.setVelocityY(-500);
                        this.saut = 1;

                    }
                    if (specialButton && this.saut == 1 && !(this.player.body.onFloor())) {

                        this.jump.play()
                        this.player.setVelocityY(-500);
                        this.saut = 2;

                    }
                    if (dashButton && goLeft == true) {

                        this.player.setVelocityX(-800);
                        this.player.setVelocityY(0);
                        this.time.addEvent({
                            delay: 250,
                            callback: () => {
                                this.player.setVelocityX(0);
                            },
                            loop: false
                        })

                    }
                }
                else {
                    this.death()
                }
            }
            else if (goRight == true) {
                if (this.chronoMinute < 3) {
                    this.player.setVelocityX(400);
                    this.player.direction = 'rightPerso';
                    this.player.anims.play(this.frameRightPerso, true);
                    if (goUp == true && this.player.body.onFloor()) {

                        this.jump.play()
                        this.player.setVelocityY(-500);
                        this.saut = 1;

                    }
                    if (specialButton && this.saut == 1 && !(this.player.body.onFloor())) {

                        this.jump.play()
                        this.player.setVelocityY(-500);
                        this.saut = 2;

                    }
                    if (dashButton && goRight == true) {
                        this.player.setVelocityX(800);
                        this.player.setVelocityY(0);
                        this.time.addEvent({
                            delay: 250,
                            callback: () => {
                                this.player.setVelocityX(0);
                            },
                            loop: false
                        })

                    }
                }
                else {
                    this.death()
                }
            }
            else if (goUp == true && this.player.body.onFloor()) {
                if (this.chronoMinute < 3) {
                    this.jump.play()
                    this.player.setVelocityY(-500);
                    this.saut = 1;
                }
                else {
                    this.death()
                }
            }
            else if (specialButton && this.saut == 1 && !(this.player.body.onFloor())) {

                this.jump.play()
                this.player.setVelocityY(-500);
                this.saut = 2;

            }
            else if (goLeft == false) {
                this.player.setVelocityX(0);
                this.player.anims.play(this.frameTurnPerso, true);
            }
            else if (goRight == false) {
                this.player.setVelocityX(0);
                this.player.anims.play(this.frameTurnPerso, true);
            }
            else if (goUp == false) {
                this.player.setVelocityY(0);
                this.player.anims.play(this.frameTurnPerso, true);
            }
            if(this.player.body.onFloor()){
                this.saut = 1;
            }
        }
    }

    death() {
        this.dead = true;
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);
        this.player.setTint(0xff0000);
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.musique.stop();
                this.scene.start("sceneLevel2")
            },
            loop: false
        })
    }

    timer() {
        this.chrono += 1;
        if (this.chrono >= 100) {
            this.chronoMinute += 1
            this.chrono = 0
        }
        if (this.chronoMinute == 4) {
            this.chronoMinute = 0;
        }

    }
}

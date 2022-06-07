class sceneTuto extends Phaser.Scene {
    constructor() {
        super("sceneTuto");
    }

    init(data) {
        this.spawnXSortieSceneJoueur = 6460,
            this.spawnYSortieSceneJoueur = 672;
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
        this.load.audio("Cri", "sons/Wilhelm.wav");
        this.load.audio("musique", "sons/Luiz.mp3");

        this.load.image("piques", "assets/piques.png")
        this.load.image("piques2", "assets/piques2.png")

        this.load.image("textDash", "assets/textDash.png")
        this.load.image("textSaut", "assets/textSaut.png")
        this.load.image("touches", "assets/touches.png")

        this.load.image("porteF", "assets/portesFerme.png")
        this.load.spritesheet('portes', 'assets/portes.png',
            { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('pnj1', 'assets/pnj1.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('pnj2', 'assets/pnj2.png',
            { frameWidth: 64, frameHeight: 64 });
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

        this.textDash = this.add.image(7000, 600, "textDash")
        this.textSaut = this.add.image(7600, 600, "textSaut")
        this.touches = this.add.image(6600, 550, "touches")
        this.touches.setAlpha(0.6)

        ///////////////////

        this.cameraMid = this.physics.add.image(896, 448, 'camera')

        this.portes = this.physics.add.sprite(9440, 540, 'portes').setOrigin(0);
        this.portes.body.setSize(128, 128, true)
        this.physics.add.collider(this.portes, build);
        this.portes.setCollideWorldBounds(true);

        this.pnj1 = this.physics.add.sprite(7232, 540, 'pnj1').setOrigin(0);
        this.pnj1.body.setSize(64, 64, true)
        this.physics.add.collider(this.pnj1, build);
        this.pnj1.setCollideWorldBounds(true);

        this.pnj2 = this.physics.add.sprite(7832, 540, 'pnj2').setOrigin(0);
        this.pnj2.body.setSize(64, 64, true)
        this.physics.add.collider(this.pnj2, build);
        this.pnj2.setCollideWorldBounds(true);

        this.player = this.physics.add.sprite(this.spawnXSortieSceneJoueur, this.spawnYSortieSceneJoueur, 'perso').setOrigin(0);
        this.player.body.setSize(44, 56, true)
        this.player.setOffset(10, 8)

        this.physics.add.collider(this.player, build);
        build.setCollisionByProperty({ estSolide: true });
        this.player.setCollideWorldBounds(true);

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



        this.anims.create({
            key: 'pnj1Right',
            frames: this.anims.generateFrameNumbers('pnj1', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'pnj1Turn',
            frames: [{ key: 'pnj1', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'pnj2Right',
            frames: this.anims.generateFrameNumbers('pnj2', { start: 5, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'pnj2Turn',
            frames: [{ key: 'pnj2', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'porteOuverture',
            frames: this.anims.generateFrameNumbers('portes', { start: 0, end: 3 }),
            frameRate: 6,
        });

        this.anims.create({
            key: 'porteFerme',
            frames: [{ key: 'portes', frame: 0 }],
            frameRate: 20
        });

        //////////
        //Piques//
        //////////

        this.piques = this.physics.add.group({ allowGravity: false });

        carte.getObjectLayer('ennemis').objects.forEach((piques) => {
            this.piques.create(piques.x + 16, piques.y + 16, 'piques').setPushable(false);
        })

        this.physics.add.collider(build, this.piques);
        this.physics.add.collider(this.player, this.piques, this.death, null, this);

        ////////////////

        this.piques2 = this.physics.add.group({ allowGravity: false });

        carte.getObjectLayer('piquesInverse').objects.forEach((piques2) => {
            this.piques2.create(piques2.x + 16, piques2.y + 16, 'piques2').setPushable(false);
        })

        this.physics.add.collider(build, this.piques2);
        this.physics.add.collider(this.player, this.piques2, this.death, null, this);

        ////////////////
        ////////////////

        this.cameras.main.zoom = 1.2
        this.physics.world.setBounds(0, 0, 9600, 928);
        this.cameras.main.setBounds(0, 0, 9600, 928);

        this.cameraMid.body.setAllowGravity(false)

        ///////////////////////////////////////////////////////////////
        //////////////////////////SONS////////////////////////////////
        ///////////////////////////////////////////////////////////////

        this.musique = this.sound.add('musique', { volume: 0.25 }, true)
        this.musique.play()

        this.jump = this.sound.add('Jump', { volume: 0.5 }, true)
        this.tp = this.sound.add('Tp', { volume: 0.5 }, true)
        this.cri = this.sound.add('Cri', { volume: 0.5 }, true)

        ///////////////////////////////////////////////////////////////
        /////////////////////////TOUCHES///////////////////////////////
        ///////////////////////////////////////////////////////////////

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
        });

        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.dead = false;

        this.once = false;
        this.pnjDash1 = false;
        this.pnjDash2 = false;
        this.alive1 = true;
        this.alive2 = true;

        this.monTimer = this.time.addEvent({
            delay: 1,
            callback: this.timer,
            callbackScope: this,
            loop: true
        });
        //////////////////////////////////
        this.chrono = 0;
        this.chronoMinute = 0;
    }

    update() {
        if (this.player.y > 850) {
            this.death()
        }

        if (this.player.x >= 7000) {
            this.touches.setAlpha(0)
        }
        else {
            this.touches.setAlpha(0.6)
            if (this.chronoMinute < 2) {
                this.touches.y += 0.5
            }
            else {
                this.touches.y -= 0.5
            }
        }

        if (this.player.x >= 7600 && this.pnjDash2 == false) {
            this.textSaut.setAlpha(1);
        }
        else {
            this.textSaut.setAlpha(0)
        }
        if (this.player.x >= 7600 && this.pnjDash2 == false && this.alive2 == true) {
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.pnjSautAnimation()
                },
                loop: false
            })
        }
        else if (this.alive == true) {
            this.pnj2.anims.play("pnj2Turn");
        }


        if (this.player.x >= 7100 && this.pnjDash1 == false) {
            this.textDash.setAlpha(1);
        }
        else {
            this.textDash.setAlpha(0)
        }
        if (this.player.x >= 7100 && this.pnjDash1 == false && this.alive1 == true) {
            this.time.addEvent({
                delay: 3000,
                callback: () => {
                    this.pnjDashAnimation()
                },
                loop: false
            })
        }

        if (this.player.x >= 9216 || this.once == false) {
            this.ouverture()
            if (this.player.x >= 9440) {
                this.musique.stop();
                this.scene.start("sceneLevel3");
            }
        }
        else {
            this.portes.anims.play('porteFerme', true)
            this.once = false;
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
        //}

        if (this.dead == false) {
            if (!(goLeft || goRight)) {
                this.player.setVelocityX(0);
                this.player.anims.play(this.frameTurnPerso, true);
            }

            if (goLeft == true) {
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
            else if (goRight == true) {
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
            else if (goUp == true && this.player.body.onFloor()) {
                this.jump.play()
                this.player.setVelocityY(-500);
                this.saut = 1;
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
            if (this.player.body.onFloor()) {
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
                this.scene.start("sceneTuto")
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

    ouverture() {
        if (this.once == false) {
            this.portes.anims.play('porteOuverture', true);
            this.once = true;
        }
    }
    pnjDashAnimation() {
        if (this.pnjDash1 == false && this.alive1 == true) {
            this.pnjDash1 = true;
            this.pnj1.setVelocityX(800);
            this.pnj1.anims.play('pnj1Right', true);
            this.time.addEvent({
                delay: 750,
                callback: () => {
                    this.cri.play();
                    this.pnj1.setVelocityX(0);
                    this.pnj1.destroy();
                    this.alive1 = false;
                },
                loop: false
            })
        }
    }

    pnjSautAnimation() {
        if (this.pnjDash2 == false && this.alive2 == true) {
            this.pnjDash2 = true;
            this.pnj2.setVelocityX(800);
            this.pnj2.anims.play('pnj2Right', true);
            this.time.addEvent({
                delay: 750,
                callback: () => {
                    this.cri.play();
                    this.pnj2.setVelocityX(0);
                    this.pnj2.destroy();
                    this.alive2 = false;
                },
                loop: false
            })
        }
    }

    timer() {
        this.chrono += 0.5;
        if (this.chrono >= 20) {
            this.chronoMinute += 1
            this.chrono = 0
        }
        if (this.chronoMinute == 4) {
            this.chronoMinute = 0;
        }

    }
}

var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    physics: {
    default: 'arcade',
    arcade: {
    gravity: { y: 1000 },
    debug: false
    }},
    pixelArt:true,
    scene: [accueil,info,sceneFin,sceneNico, sceneLevel2, sceneLevel3, sceneLevel4, sceneTuto, narration],
    input : {gamepad:true},
    };

new Phaser.Game(config); 

export default class Player extends Phaser.Physics.Arcade.Sprite {
    oldPosition: {
        x: number;
        y: number;
    } | undefined;
    actualAnims: any;
    constructor(scene: Phaser.Scene, id: number, x: number, y: number) {
        super(scene, x, y, 'avatar', 'avatar/00.png'); // The frame is optional
    }
}

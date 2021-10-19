import Phaser from 'phaser';
const createAvatarAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'avatar-idle-down',
        frames: [{ key: 'avatar', frame: 'avatar/00.png' }]
    });
    anims.create({
        key: 'avatar-idle-up',
        frames: [{ key: 'avatar', frame: 'avatar/08.png' }]
    });
    anims.create({
        key: 'avatar-idle-side-right',
        frames: [{ key: 'avatar', frame: 'avatar/16.png' }]
    });
    anims.create({
        key: 'avatar-idle-side-left',
        frames: [{ key: 'avatar', frame: 'avatar/24.png' }]
    });
    anims.create({
        key: 'avatar-run-down',
        frames: anims.generateFrameNames('avatar', { start: 32, end: 37, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-run-side-right',
        frames: anims.generateFrameNames('avatar', { start: 48, end: 53, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-run-side-left',
        frames: anims.generateFrameNames('avatar', { start: 56, end: 61, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-run-up',
        frames: anims.generateFrameNames('avatar', { start: 40, end: 45, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-punch-side',
        frames: anims.generateFrameNames('avatar', { start: 112, end: 115, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-punch-up',
        frames: anims.generateFrameNames('avatar', { start: 107, end: 104, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
    anims.create({
        key: 'avatar-punch-down',
        frames: anims.generateFrameNames('avatar', { start: 96, end: 99, prefix: 'avatar/', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    });
};

export { createAvatarAnims };

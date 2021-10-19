import { Scene } from 'phaser';
import Player from '@/game/avatar/Avatar';
import {sceneEvents} from "@/game/events/EventCenter";
import {createAvatarAnims} from "@/game/anims/AvatarAnims";

export default class PlayScene extends Scene {
  private cam!: any;
  private avatar!: any;
  private playerMap!: any;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private layer1: any;
  private layer2: any;
  private layer3: any;
  private text!: any;

  constructor() {
    super({key: 'PlayScene'})
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {

    createAvatarAnims(this.anims);
    this.playerMap = {};
    sceneEvents.on('newPlayer', this.newPlayer, this)
    sceneEvents.on('destroyPlayer', this.destroyPlayer, this)
    sceneEvents.on('loadAvatar', this.loadAvatar, this)
    sceneEvents.on('rightIsDown', this.rightIsDown, this)
    sceneEvents.on('leftIsDown', this.leftIsDown, this)
    sceneEvents.on('upIsDown', this.upIsDown, this)
    sceneEvents.on('downIsDown', this.downIsDown, this)
    sceneEvents.on('playerMoved', this.playerActualPosition, this)

    this.cam = this.cameras.main;
    this.cam.fadeIn(500, 0, 0, 0);
    this.cam.zoomTo(2, 500);
    this.cam.setBackgroundColor('#0f3f52');

    const map = this.make.tilemap({key: 'map'});

    const tilesetGrass = map.addTilesetImage('fantasy-grass', 'tiles_grass', 16, 16, 1, 2);
    const tilesetRelief = map.addTilesetImage('fantasy-grass', 'tiles_grass', 16, 16, 1, 2);
    const tilesetDecorative = map.addTilesetImage('fantasy-deco', 'tiles_decorative', 16, 16, 1, 2);

    this.layer1 = map.createStaticLayer('grass', tilesetGrass);
    this.layer3 = map.createStaticLayer('relief', tilesetRelief);
    this.layer2 = map.createStaticLayer('deco', tilesetDecorative);
    this.layer3.setCollisionByProperty({collides: true});
    this.layer1.setCollisionByProperty({collides: true});
    this.layer2.setCollisionByProperty({collides: true});
    // this.avatar = this.add.avatar(600, 200, 'avatar');
    // cam.startFollow(this.avatar);
    //
    // ----- Camera move with mouse -----
    // this.input.on('pointermove', (p: { isDown: any; x: number; prevPosition: { x: number; y: number; }; y: number; }) => {
    //   if (p.isDown) {
    //     this.cam.stopFollow();
    //     this.cam.scrollX -= (p.x - p.prevPosition.x) / this.cam.zoom;
    //     this.cam.scrollY -= (p.y - p.prevPosition.y) / this.cam.zoom;
    //   }
    // });
    this.input.on('pointermove', () => {
      if (this.text) {
        this.text.destroy()
      }
    });
    this.input.on('wheel', (pointer: any, gameObjects: any, deltaX: any, deltaY: number) => {
      if (deltaY > 0) {
        this.cam.zoom -= .1;
      }
      if (deltaY < 0) {
        this.cam.zoom += .1;
      }
    });
  }

  newPlayer(id: number, x: number, y: number) {
    this.playerMap[id] = this.add.existing(new Player(this, id, x, y)).setInteractive();
    this.physics.world.enableBody(this.playerMap[id], Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.playerMap[id].body.setSize(this.playerMap[id].width / 3, this.playerMap[id].height / 2)
    this.playerMap[id].on('pointerdown', () => {
      this.text = this.add.text(this.playerMap[id].x, this.playerMap[id].y, 'Player ID: ' + id + '\nx: ' + this.playerMap[id].x + '\ny: ' + this.playerMap[id].y, {
        resolution: 5,
        fixedHeight: 75,
        fixedWidth: 200,
        fontSize: '20px',
        fontFamily: 'Arial',
        color: '#000000',
        backgroundColor: '#363d25',
        align: 'center',
      })
          .setOrigin(0.5);
    });
    this.playerMap[id].on('pointerup', () => {
      this.text.destroy();
    })
  }

  destroyPlayer(id: number) {
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  }

  loadAvatar(id: number) {
    this.avatar = this.playerMap[id];
    this.avatar.oldPosition = {
      x: this.avatar.x,
      y: this.avatar.y
    }
    this.avatar.anims.play("avatar-idle-down");
    this.avatar.actualAnims = 'avatar-idle-down';
    this.cam.startFollow(this.playerMap[id]);
    this.physics.add.collider(this.avatar, this.layer1);
    this.physics.add.collider(this.avatar, this.layer2);
    this.physics.add.collider(this.avatar, this.layer3);
  }

  rightIsDown () {
    this.avatar.anims.play('avatar-run-side-right', true);
    this.avatar.setVelocity(100, 0);
  }
  leftIsDown () {
    this.avatar.anims.play('avatar-run-side-left', true);
    this.avatar.setVelocity(-100, 0);
  }
  upIsDown () {
    this.avatar.anims.play('avatar-run-up', true);
    this.avatar.setVelocity(0, -100);
  }
  downIsDown () {
    this.avatar.anims.play('avatar-run-down', true);
    this.avatar.setVelocity(0, 100);
  }

  playerActualPosition (player: any, anims: string) {
    this.playerMap[player.id].anims.play(anims, true);
    this.playerMap[player.id].x = player.x;
    this.playerMap[player.id].y = player.y;
  }

  update() {
    if (!this.cursors || !this.avatar)
    {
      return;
    }
    if (this.cursors.right?.isDown) {
      sceneEvents.emit('rightIsDown');
      this.avatar.actualAnims = 'avatar-run-side-right';
    } else if (this.cursors.left?.isDown) {
      sceneEvents.emit('leftIsDown');
      this.avatar.actualAnims = 'avatar-run-side-left';
    } else if (this.cursors.up?.isDown) {
      sceneEvents.emit('upIsDown')
      this.avatar.actualAnims = 'avatar-run-up';
    } else if (this.cursors.down?.isDown) {
      sceneEvents.emit('downIsDown')
      this.avatar.actualAnims = 'avatar-run-down';
    } else
    {
      const parts = this.avatar.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.avatar.anims.play(parts.join('-'))
      this.avatar.actualAnims = parts.join('-');
      this.avatar.setVelocity(0, 0)
    }
    const x = this.avatar.x;
    const y = this.avatar.y;
    if (this.avatar.oldPosition && (x !== this.avatar.oldPosition.x || y !== this.avatar.oldPosition.y)) {
      sceneEvents.emit('playerMovement', { anims: this.avatar.actualAnims, x: this.avatar.x, y: this.avatar.y });
      this.avatar.oldPosition = {
        x: this.avatar.x,
        y: this.avatar.y
      }
    }
  }
}

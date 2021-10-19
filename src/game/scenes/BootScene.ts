import { Scene } from 'phaser'

export default class BootScene extends Scene {

  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('tiles_grass', 'assets/tilemaps/map/RPGW_Grassland_v1.4/MainLevBuild_extruded.png');
    this.load.image('tiles_decorative', 'assets/tilemaps/map/RPGW_Grassland_v1.4/decorative_extruded.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/map/test.json');

    this.load.atlas('avatar', 'assets/character/avatar.png', 'assets/character/avatar.json');
  }

  create () {
    this.scene.start('PlayScene')
  }
}

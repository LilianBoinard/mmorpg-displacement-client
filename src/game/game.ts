import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import GameEvents from "@/game/events/GameEvents";

function launch(containerId: string) {
  const Game = new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  })

  const events = new GameEvents;
  events.sendPing();
  events.newPlayer();
  events.checkPlayers();
  events.checkPlayersPosition();
  return Game;
}

export default launch
export { launch }

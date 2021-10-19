import { io } from "socket.io-client";
import {PhaserEventsCenter} from "@/game/events/PhaserEventsCenter";
export default class SocketEventsCenter extends Phaser.Scene
{
    socket = io("http://localhost:3001", {
    withCredentials: true,
    extraHeaders: {
        "phaser": "event"
    }
    });
    constructor ()
    {
        super({ key: 'SocketEventsCenter' });
        this.socket.on('connect', ()=>{
            console.log("%cKongrats: connected to the server", "color:green; font-size: 15px")
        })
        this.socket.on('disconnect', ()=>{
            console.log("%cPanik: disconnected of the server", "color:red; font-size: 15px")
        })
    }

    sendPing() {
        this.socket.emit('ping');
        this.socket.on('pong', () => {
            console.log("%cping returned good", "color:cyan");
        })
    }

    newPlayer() {
        this.socket.emit('newplayer')
        this.socket.on('allplayers', (data) =>{
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    console.log('add player with infos: id:', data[i].id, 'x:', data[i].x, 'y:', data[i].y);
                    if (data[i].x == 0 && data[i].y == 0) {
                        continue;
                    } else {
                        PhaserEventsCenter.emit('newPlayer', data[i].id, data[i].x, data[i].y);
                        PhaserEventsCenter.emit('loadAvatar', data[i].id);
                    }
                }
            }
        })

    }

    checkPlayers () {
        this.socket.on('newplayer', (data) =>{
            console.log("New player with id:", data);
            PhaserEventsCenter.emit('newPlayer', data.id, data.x, data.y);
        })

        this.socket.on('destroyplayer', (data) =>{
            console.log("Destroy player with id:", data);
            PhaserEventsCenter.emit('destroyPlayer', data);
        })
    }

    checkPlayersPosition () {
        PhaserEventsCenter.on('playerMovement', (data: {id: number; anims: string; x: number; y: number; }) =>{
            this.socket.emit('playermovement', {
                id: data.id,
                anims: data.anims,
                x: data.x,
                y: data.y
            });
        })
        this.socket.on('playermoved', (data, anims) =>{
            PhaserEventsCenter.emit('playerMoved', data, anims);
        })
    }
}

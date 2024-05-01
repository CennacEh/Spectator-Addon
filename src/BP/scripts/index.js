/**
 *  
 * @license MIT
 * @author Cennac
 * @project https://github.com/CennacEh/Spectator-Addon/src/BP/index.js
 */

import './revive-GUI.js'
import { world, system } from '@minecraft/server';


world.afterEvents.entityDie.subscribe(data => {
    let player = data.deadEntity;
    let target = player.target;
	player.sendMessage("§4 §lYou died, tell your teammates to revive you by using a revive beacon");
	player.addTag(`Is-dead`);

	system.runInterval(() => {
		player.runCommand(`gamemode spectator @a[tag="Is-dead"]`);
	}, 20)
});


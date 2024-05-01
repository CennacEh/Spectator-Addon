/**
 *  
 * @license MIT
 * @author Cennac
 * @project https://github.com/CennacEh/Spectator-Addon/src/BP/scripts/revive-GUI.js
 */

import { world, system } from "@minecraft/server"
import { ActionFormData, ModalFormData }from "@minecraft/server-ui"

world.beforeEvents.itemUse.subscribe(data => {
    let player = data.source
    const players = world.getPlayers({ tags: ['Is-dead']})
    const undead = world.getPlayers({ excludeTags: ['Is-dead']})
    if (data.itemStack.typeId == "minecraft:spawn_egg") system.run(() => revive(player))

    function revive(player) {
        let revive = new ModalFormData()

        revive.title("Egg Of Life");
        revive.dropdown('Choose the user to revive', players.map(player => player.nameTag))
        revive.show(player).then(({ formValues: [dropdown] }) => {
            const selectedPlayer = players[dropdown]
        try {
            world.sendMessage(`§2${selectedPlayer.nameTag} got revived by ${player.nameTag}`)
            player.runCommand(`tag ${selectedPlayer.nameTag} remove Is-dead`)
            player.runCommand(`gamemode s ${selectedPlayer.nameTag}`)
            player.runCommand(`clear @s minecraft:spawn_egg 0 1`)
        }
        catch(error) {
            player.sendMessage(`§cUnknown Error. Please report this to Cennac on Discord/Github\n${error}`)
        }
        })
    }
})

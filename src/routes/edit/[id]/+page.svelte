<script lang="ts">
    import { page } from "$app/state";
    import {
        getConfigs,
        updateConfig,
        type Config,
        type ExtendedConfig,
    } from "$lib/db/db";
    import { error } from "@sveltejs/kit";
    import SaveButton from "./SaveButton.svelte";
    import { acts } from "@tadashi/svelte-notification";
    import { editSaved } from "../../reactiveVariables.svelte";

    let id: string = $derived(page.params.id);

    let configs: ExtendedConfig[] = $state([]);
    let index: number = $state(-1);

    async function submitForm(event: Event) {
        event.preventDefault();

        const data: Config = {
            deviceName: configs[index].deviceName,
            hostname: configs[index].hostname,
            sshPort: Number(configs[index].sshPort),
            username: configs[index].username,
            password: configs[index].password,
        };

        try {
            let msg: string | Error = await updateConfig(Number(id), data);
            if (msg instanceof error) {
                throw msg;
            }

            editSaved.value = true;

            acts.add({
                title: "Success",
                message: msg,
                mode: "success",
                lifetime: 5,
            });
        } catch (err: Error | any) {
            acts.add({
                title: "Error",
                message: err.message,
                mode: "danger",
                lifetime: 5,
            });
        }
    }

    $effect(() => {
        if (id) {
            (async () => {
                configs = await getConfigs();
                for (let i = 0; i < configs.length; i++) {
                    if (configs[i].id.toString() == id) {
                        index = i;
                        break;
                    }
                }
            })();
        }
    });
</script>

<div class="edit">
    <span>EDITING CONFIGURATION : {id}</span>
    {#if configs.length > 0}
        <form onsubmit={submitForm}>
            <label for="deviceName">Device Name</label>
            <input
                id="deviceName"
                placeholder="Device Name"
                bind:value={configs[index].deviceName}
                type="text"
                required
            />
            <br />

            <label for="mdnsHostname">mDNS Hostname</label>
            <input
                id="mdnsHostanme"
                placeholder="mDNS Hostame"
                bind:value={configs[index].hostname}
                type="text"
                required
            />
            <code>.local</code>
            <br />

            <label for="sshPort">SSH Port</label>
            <input
                id="sshPort"
                placeholder="SSH Port"
                bind:value={configs[index].sshPort}
                type="number"
                required
            />
            <br />

            <label for="username">Username</label>
            <input
                id="username"
                placeholder="Username"
                bind:value={configs[index].username}
                type="text"
                required
            />
            <br />

            <label for="password">Password</label>
            <input
                id="password"
                placeholder="Password"
                bind:value={configs[index].password}
                type="password"
                required
            />
            <br />
            <SaveButton />
        </form>
    {:else}
        <span>LOADING...</span>
    {/if}
</div>

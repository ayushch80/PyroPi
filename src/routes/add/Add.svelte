<script lang="ts">
    import SaveButton from "./SaveButton.svelte";
    import { acts } from "@tadashi/svelte-notification";
    import { addConfig, getConfigs, type Config } from "$lib/db/db";
    import { error } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    import { newDeviceAdded } from "../reactiveVariables.svelte";

    let deviceName: string = $state("Device");
    let hostname: string = $state("raspberrypi");
    let sshPort: number = $state(22);
    let username: string = $state("");
    let password: string = $state("");

    (async () => {
        let configs = await getConfigs();
        deviceName += ` ${configs.length + 1}`;
    })();

    const submitForm = async (event: Event) => {
        event.preventDefault();

        let data: Config = {
            deviceName,
            hostname,
            sshPort: Number(sshPort),
            username,
            password,
        };

        try {
            let msg: string | Error = await addConfig(data);

            if (msg instanceof error) {
                throw msg;
            }

            newDeviceAdded.value = true;

            acts.add({
                title: "Success",
                message: msg,
                mode: "success",
                lifetime: 5,
            });

            goto("/");
        } catch (err: Error | any) {
            acts.add({
                title: "Error",
                message: err.message,
                mode: "danger",
                lifetime: 5,
            });
        }
    };
</script>

<div class="add-new new">
    <form onsubmit={submitForm}>
        <label for="deviceName">Device Name</label>
        <input
            id="deviceName"
            placeholder="Device Name"
            bind:value={deviceName}
            type="text"
            required
        />
        <br />

        <label for="mdnsHostname">mDNS Hostname</label>
        <input
            id="mdnsHostanme"
            placeholder="mDNS Hostame"
            bind:value={hostname}
            type="text"
            required
        />
        <code>.local</code>
        <br />

        <label for="sshPort">SSH Port</label>
        <input
            id="sshPort"
            placeholder="SSH Port"
            bind:value={sshPort}
            type="number"
            required
        />
        <br />

        <label for="username">Username</label>
        <input
            id="username"
            placeholder="Username"
            bind:value={username}
            type="text"
            required
        />
        <br />

        <label for="password">Password</label>
        <input
            id="password"
            placeholder="Password"
            bind:value={password}
            type="password"
            required
        />
        <br />

        <SaveButton />
    </form>
</div>
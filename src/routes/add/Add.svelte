<script lang="ts">
    import SaveButton from "./SaveButton.svelte";
    import { acts } from "@tadashi/svelte-notification";

    let ip: string | boolean = false;
    let deviceName: string = "";
    let hostname: string = "raspberrypi";
    let sshPort: number = 22;
    let username: string;
    let password: string;

    const submitForm = (event: Event) => {
        event.preventDefault();

        let data: Config = {
            deviceName,
            hostname,
            sshPort: Number(sshPort),
            username,
            password,
        };

        acts.add({
            title: "Success",
            message: "Successfully saved data.",
            mode: "success",
            lifetime: 5,
        });
    };
</script>

<div class="add-new new">
    <form on:submit={submitForm}>
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

<style>
</style>

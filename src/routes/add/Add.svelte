<script lang="ts">
    import SaveButton from "./SaveButton.svelte";

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
            sshPort,
            username,
            password
        }
        console.log(data)
    };
</script>

<SaveButton />
<div class="add-new new">
    <form on:submit={submitForm}>
        <label for="deviceName">Device Name</label>
        <input
            id="deviceName"
            placeholder="Device Name"
            bind:value={deviceName}
        />
        <br />

        <label for="mdnsHostname">mDNS Hostname</label>
        <input
            id="mdnsHostanme"
            placeholder="mDNS Hostame"
            bind:value={hostname}
        />
        <code>.local</code>
        <br />

        <label for="sshPort">SSH Port</label>
        <input id="sshPort" placeholder="SSH Port" bind:value={sshPort} />
        <br />

        <label for="username">Username</label>
        <input id="username" placeholder="Username" bind:value={username} />
        <br />

        <label for="password">Password</label>
        <input id="password" placeholder="Password" bind:value={password} />
        <br />

        <button type="submit">SAVE</button>
        <button type="reset">RESET</button>
    </form>
</div>

<style>
</style>

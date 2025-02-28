<script lang="ts">
    import { pingHostname } from "$lib/functions";
    import SaveButton from "./SaveButton.svelte";

    let ip: string | boolean = false;
    let hostname: string = "raspberrypi";

    const findIP = async (event: Event) => {
        event.preventDefault();
        ip = "Searching..."
        ip = await pingHostname(hostname);
    };
</script>

<SaveButton />
<div class="add-new new">
    <label>
        mDNS Hostname
        <code>
            <input type="text" placeholder="hostname" bind:value={hostname} />
            .local
        </code>
    </label><br />
    <button on:click={findIP} class="button">Find IP</button><br />
    {ip ? ip : ""}
</div>

<style>
    .button {
        border-radius: 0%;
        border: none;

        background: #eee;

        cursor: pointer;
    }
    .button:hover {
        background: #ccc;
    }
    .button:active {
        background: #aaa;
    }
</style>

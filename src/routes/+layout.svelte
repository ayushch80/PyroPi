<script lang="ts">
    import { Notifications } from "@tadashi/svelte-notification";
    import StatusBar from "../components/StatusBar.svelte";
    import Devices from "./Devices.svelte";

    let { children } = $props();
</script>

<Notifications />
<StatusBar />
<div class="root" style="flex: 1;">
    <Devices />
    <div class="vertical-line"></div>
    {@render children()}
</div>

<style>
    .root {
        display: flex;
        flex-direction: row;

        padding: 1em;
    }
    .vertical-line {
        margin-left: 0.5em;
        margin-right: 0.5em;

        width: 1px;
        height: 100%;
        background-color: #ccc;

        overflow: hidden;
    }
</style>

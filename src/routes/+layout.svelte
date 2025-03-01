<script lang="ts">
    import StatusBar from "../components/StatusBar.svelte";
    import Devices from "./Devices.svelte";

    let { children } = $props();
</script>

<StatusBar />
<div class="root" style="flex: 1;">
    <Devices />
    {@render children()}
</div>

<style>
    .root {
        display: flex;
        flex-direction: row;

        padding: 1em;
    }
</style>

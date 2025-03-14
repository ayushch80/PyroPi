<script lang="ts">
    import { getConfigs, type ExtendedConfig } from "$lib/db/db";
    import { IconCpu, IconCaretRightFilled } from "@tabler/icons-svelte";
    import { goto } from "$app/navigation";
    import {
        editSaved,
        selectedDevice,
        newDeviceAdded,
    } from "./reactiveVariables.svelte";

    let configs: ExtendedConfig[] = $state([]);

    (async () => {
        configs = await getConfigs();
    })();

    const gotoDashboard = (event: Event, config: ExtendedConfig) => {
        event.preventDefault();
        selectedDevice.id = config.id;
        goto(`/dashboard/${config.id}`);
    };

    $effect(() => {
        if (newDeviceAdded.value || editSaved.value) {
            getConfigs().then((data) => {
                configs = data;
            });
            newDeviceAdded.value = false;
            editSaved.value = false;
        }
    });
</script>

<div class="devices">
    {#if configs.length > 0}
        {#each configs as deviceConfig}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                class={`device-card${selectedDevice.id == deviceConfig.id ? "-selected" : ""}`}
                onclick={(e) => {
                    gotoDashboard(e, deviceConfig);
                }}
            >
                <span class="cpu-icon"><IconCpu size="2em" /></span>
                <span class="device-name">{deviceConfig.deviceName}</span>
                <span class="hostname">{deviceConfig.hostname}.local</span>
                <span class="right-icon"
                    ><IconCaretRightFilled size="2em" /></span
                >
            </div>
        {/each}
    {:else}
        <span>NO SAVED DEVICES</span>
    {/if}
</div>

<style>
    .devices {
        display: flex;
        flex-direction: column;
    }
    .cpu-icon {
        grid-area: cpu;
        display: grid;

        width: 2.5em;
        align-self: center;
        justify-items: left;
    }
    .right-icon {
        grid-area: right-icon;
        display: grid;

        width: 3em;
        align-self: center;
        justify-items: right;
    }
    .device-name {
        grid-area: device;
        font-weight: bold;
    }
    .hostname {
        grid-area: hostname;
        font-style: monospace;
    }
    .device-card {
        display: grid;
        grid-template-columns: 0.5fr 2fr 0.5fr;
        grid-template-rows: auto auto;
        grid-template-areas:
            "cpu device right-icon"
            "cpu hostname right-icon";

        background: #111;
        padding: 0.75em;

        border-radius: 0.5em;
        margin-bottom: 0.5em;

        cursor: pointer;

        transition: background 0.125s ease-in-out;
    }
    .device-card:hover {
        background: #1a1a2a;
    }
    .device-card-selected {
        display: grid;
        grid-template-columns: 0.5fr 2fr 0.5fr;
        grid-template-rows: auto auto;
        grid-template-areas:
            "cpu device right-icon"
            "cpu hostname right-icon";

        background: #444;
        padding: 0.75em;

        border-radius: 0.5em;
        margin-bottom: 0.5em;

        cursor: pointer;

        transition: background 0.125s ease-in-out;
    }
    .device-card-selected:hover {
        background: #4a4a5a;
    }
</style>

<script lang="ts">
    import { platform, type Platform } from "@tauri-apps/plugin-os";
    import {
        IconChevronLeft,
        IconChevronRight,
        IconHome,
    } from "@tabler/icons-svelte";
    import {
        editSaved,
        historyIndex,
        newDeviceAdded,
        selectedDevice,
    } from "../routes/reactiveVariables.svelte";
    import { link } from "$lib/history";

    let os: Platform = platform();

    // function goBack(event: Event) {
    //     event.preventDefault();
    //     history.back();
    // }
    // function goForeward(event: Event) {
    //     event.preventDefault();
    //     history.forward();
    // }
    // function goHome(event: Event) {
    //     event.preventDefault();
    //     goto('/')
    // }

    const goBack = (event: Event) => {};
    const goForeward = (event: Event) => {};

    const goHome = (event: Event) => {
        const states: object = {
            editSaved,
            newDeviceAdded,
            selectedDevice,
        };
        link("/", states);
        historyIndex.value += 1;
    };
</script>

<nav>
    <button onclick={goBack}><IconChevronLeft color="#ccc" /></button>
    <button onclick={goForeward}><IconChevronRight color="#ccc" /></button>
    <button onclick={goHome}><IconHome color="#ccc" /></button>
    <span style="flex: 1;">{""}</span>
    <span class="highlighted">OS: <code>{os}</code></span>
</nav>
<hr style="width: 99%;" />

<style lang="css">
    nav {
        display: flex;
        padding-top: 0.25em;
        padding-left: 0.25em;
        padding-right: 0.25em;

        flex-direction: row;
        align-content: center;

        color: #ccc;
    }
    nav * {
        margin-right: 0.25em;
    }
    button {
        display: grid;
        place-content: center;

        background: rgba(255, 255, 255, 0);
        border: none;
        border-radius: 0.25em;
        cursor: pointer;

        width: 3em;

        text-decoration: none;

        transition: all 0.125s ease;
    }
    button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .highlighted {
        background: #000;
        color: #fff;
    }
</style>

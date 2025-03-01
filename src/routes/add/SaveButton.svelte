<script lang="ts">
    import { IconDeviceFloppy } from "@tabler/icons-svelte";
</script>

<button class="add-new" type="submit"><IconDeviceFloppy /></button>

<style>
    .add-new {
        --side: 1.75em;

        display: flex;
        text-decoration: none;

        position: absolute;
        right: 1vw;
        bottom: 1vh;

        width: var(--side);
        height: var(--side);

        justify-content: center;
        align-items: center;

        font-size: var(--side);

        cursor: pointer;

        border: none;
        border-radius: 0.25em;

        background: #fff;
        color: #222;

        transition: background 20ms ease-in-out;
    }
    .add-new:active {
        background: #aaa;
    }
</style>

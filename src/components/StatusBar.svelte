<script lang="ts">
    import { platform, type Platform } from "@tauri-apps/plugin-os";

    let os : Platform = platform();
</script>

<nav>
    <span class="highlighted">OS: <code>{os}</code></span>
</nav>

<style>
    .highlighted {
        background: #000;
        color: #fff;
    }
</style>
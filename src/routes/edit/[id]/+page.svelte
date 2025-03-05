<script lang="ts">
    import { page } from "$app/state";
    import { getConfigs, type ExtendedConfig } from "$lib/db/db";
    import SaveButton from "./SaveButton.svelte";

    let id: string = $derived(page.params.id);

    let configs: ExtendedConfig[] = $state([]);
    let currentConfig: ExtendedConfig;
    (async () => {
        configs = await getConfigs();
        for (let i = 0; i < configs.length; i++) {
            if (configs[i].id.toString() == id) {
                currentConfig = configs[i];
            }
        }
    })();
</script>

<SaveButton />
<div class="edit">
    <span>EDITING CONFIGURATION : {id}</span>
</div>
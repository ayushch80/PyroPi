<script lang="ts">
    import { page } from "$app/state";
    import { getConfigs, type ExtendedConfig } from "$lib/db/db";

    let id: string = $derived(page.params.id);
    let configs: ExtendedConfig[] = $state([]);
    let index: number = $state(-1);

    $effect(() => {
        if (id) {
            (async () => {
                configs = await getConfigs();
                for (let i = 0; i < configs.length; i++) {
                    if (configs[i].id.toString() == id) {
                        index = i;
                        break;
                    }
                }
            })();
        }
    });
</script>

{#if index >= 0}
    <div class="dashboard">
        DASHBOARD - {configs[index].deviceName}
    </div>
{:else}
    <span>LOADING...</span>
{/if}

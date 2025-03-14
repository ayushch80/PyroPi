<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getConfigs, type ExtendedConfig } from "$lib/db/db";
    import { selectedDevice } from "../../reactiveVariables.svelte";

    let id: string = $derived(page.params.id);
    // svelte-ignore state_referenced_locally
        selectedDevice.id = id;
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

    const gotoEdit = (event: Event) => {
        event.preventDefault();
        const config: ExtendedConfig = configs[index];
        goto(`/edit/${config.id}`)
    }
</script>

{#if index >= 0}
    <div class="dashboard">
        <div>DASHBOARD - {configs[index].deviceName}</div>
        <button onclick={gotoEdit}>EDIT CONFIG</button>
    </div>
{:else}
    <span>LOADING...</span>
{/if}

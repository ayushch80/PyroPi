<script lang="ts">
    import StatusBar from '../components/StatusBar.svelte';

	let { children } = $props();
</script>

<StatusBar />
{@render children()}
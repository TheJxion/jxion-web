<script lang="ts">
	import '../../app.css';
	import AppLayout from '$layouts/AppLayout.svelte';
	import Toast from '$atoms/Toast.svelte';
</script>

<AppLayout showHeader={false} showFooter={false}>
	<slot />
	<Toast />
</AppLayout>



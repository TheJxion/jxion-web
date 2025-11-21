<script lang="ts">
	import { toast } from '$stores/toast';
	import styles from '@jxion/design/styles/modules/ToastNoir.module.scss';

	$: toasts = $toast;
</script>

<div class={styles.toast}>
	{#each toasts as toastItem (toastItem.id)}
		<div class="{styles.toast__item} {styles[`toast__item--${toastItem.type || 'success'}`]}" role="alert">
			<span class={styles.toast__message}>{toastItem.message}</span>
			<button
				type="button"
				class={styles.toast__close}
				on:click={() => toast.remove(toastItem.id)}
				aria-label="Bildirim kapat"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	{/each}
</div>

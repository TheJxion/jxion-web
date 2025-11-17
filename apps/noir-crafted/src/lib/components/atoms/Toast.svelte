<script lang="ts">
	import { toast } from '$stores/toast';
	import { onMount } from 'svelte';

	$: toasts = $toast;
</script>

<div class="toast-container">
	{#each toasts as toastItem (toastItem.id)}
		<div class="toast toast-{toastItem.type || 'success'}" role="alert">
			<div class="toast-content">
				<span class="toast-message">{toastItem.message}</span>
				<button
					type="button"
					class="toast-dismiss"
					on:click={() => toast.remove(toastItem.id)}
					aria-label="Bildirim kapat"
				>
					×
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 400px;
	}

	.toast {
		background: white;
		border-radius: 8px;
		padding: 1rem 1.25rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		animation: slideIn 0.3s ease-out;
		border-left: 4px solid;
		transition: transform 0.2s, opacity 0.2s;
	}

	.toast:hover {
		transform: translateX(-4px);
	}

	.toast-success {
		border-left-color: #10b981;
	}

	.toast-error {
		border-left-color: #ef4444;
	}

	.toast-info {
		border-left-color: #3b82f6;
	}

	.toast-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.toast-message {
		font-family: 'Satoshi', sans-serif;
		font-size: 0.875rem;
		color: #222222;
		line-height: 1.5;
	}

	.toast-dismiss {
		background: transparent;
		border: none;
		color: #6b7280;
		font-size: 1.25rem;
		line-height: 1;
		cursor: pointer;
		padding: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.toast-dismiss:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>


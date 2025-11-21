<script lang="ts">
	import { content } from '$lib/i18n';
	import styles from '@jxion/design/styles/modules/FooterNoir.module.scss';
	
	export let logoText: string = content.site?.name ?? 'NOIR';
	export let description: string = content.footer?.description ?? '';
	
	// SSR-safe content access with fallbacks
	$: footerSections = content.footer?.sections ?? {};
	$: companySection = footerSections.company ?? { title: 'Kurumsal', links: [] };
	$: customerServiceSection = footerSections.customerService ?? { title: 'Müşteri Hizmetleri', links: [] };
	$: legalSection = footerSections.legal ?? { title: 'Yasal', links: [] };
	$: copyrightText = content.footer?.copyright ?? 'Tüm hakları saklıdır.';
</script>

<footer class={styles.footerNoir}>
	<div class={styles.footerNoir__container}>
		<div class={styles.footerNoir__brand}>
			<h3>{logoText}</h3>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>

		<div class={styles.footerNoir__grid}>
			<div class={styles.footerNoir__column}>
				<h4>{companySection.title}</h4>
				<ul>
					{#each companySection.links || [] as link}
						<li><a href={link.href}>{link.text}</a></li>
					{/each}
				</ul>
			</div>

			<div class={styles.footerNoir__column}>
				<h4>{customerServiceSection.title}</h4>
				<ul>
					{#each customerServiceSection.links || [] as link}
						<li><a href={link.href}>{link.text}</a></li>
					{/each}
				</ul>
			</div>

			<div class={styles.footerNoir__column}>
				<h4>{legalSection.title}</h4>
				<ul>
					{#each legalSection.links || [] as link}
						<li><a href={link.href}>{link.text}</a></li>
					{/each}
				</ul>
			</div>
		</div>

		<div class={styles.footerNoir__bottom}>
			<p>&copy; {new Date().getFullYear()} {logoText}. {copyrightText}</p>
		</div>
	</div>
</footer>

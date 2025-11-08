<script lang="ts">
	import { content } from '$lib/i18n';
	
	export let logoText: string = content.site.name;
	export let description: string = content.footer.description;
</script>

<footer class="bg-noir-black text-white py-12">
	<div class="container-custom">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
			<!-- Brand Column -->
			<div class="space-y-4">
				<h3 class="text-2xl font-bold uppercase tracking-tight">{logoText}</h3>
				<p class="text-noir-gray-400 text-sm leading-relaxed">
					{description}
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">{content.footer.sections.corporate.title}</h4>
				<ul class="space-y-2 text-sm text-noir-gray-400">
					{#each content.footer.sections.corporate.links as link}
						<li><a href={link.href} class="hover:text-white transition-colors">{link.text}</a></li>
					{/each}
				</ul>
			</div>

			<!-- Customer Service -->
			<div>
				<h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">{content.footer.sections.customerService.title}</h4>
				<ul class="space-y-2 text-sm text-noir-gray-400">
					{#each content.footer.sections.customerService.links as link}
						<li><a href={link.href} class="hover:text-white transition-colors">{link.text}</a></li>
					{/each}
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h4 class="font-semibold mb-4 uppercase tracking-wide text-sm">{content.footer.sections.legal.title}</h4>
				<ul class="space-y-2 text-sm text-noir-gray-400">
					{#each content.footer.sections.legal.links as link}
						<li><a href={link.href} class="hover:text-white transition-colors">{link.text}</a></li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Copyright -->
		<div class="border-t border-noir-gray-800 pt-8 text-center text-sm text-noir-gray-500">
			<p>&copy; {new Date().getFullYear()} {logoText}. {content.footer.copyright}</p>
		</div>
	</div>
</footer>

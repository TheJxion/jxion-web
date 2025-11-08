/**
 * Format currency in Turkish Lira
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY'
	}).format(amount);
}

/**
 * Format price without currency symbol (for display)
 */
export function formatPrice(amount: number): string {
	return new Intl.NumberFormat('tr-TR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
}


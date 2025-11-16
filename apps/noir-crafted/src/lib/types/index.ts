/**
 * Noir Crafted Type Definitions
 * Strict TypeScript types for all components and data structures
 */

// Navigation Types
export interface NavItem {
	text: string;
	href: string;
	active?: boolean;
}

export interface NavigationProps {
	items: NavItem[];
	logoText: string;
	logoHref: string;
}

// Product Types
export interface Product {
	id: string;
	name: string;
	category: ProductCategory;
	description: string;
	price: number;
	image: string;
	images?: string[];
	inStock: boolean;
}

export type ProductCategory =
	| 'Kolye' // Necklace
	| 'Bilezik' // Bracelet
	| 'Yüzük' // Ring
	| 'Küpe' // Earring
	| 'Şahmeran' // Shahmaran
	| 'Yetişkin Tokaları' // Adult Hairpins
	| 'Fular'; // Scarf

export interface ProductCardProps {
	product: Product;
	variant?: 'default' | 'compact' | 'featured';
}

export interface ProductSectionProps {
	title: string;
	subtitle?: string;
	products: Product[];
	variant?: 'grid' | 'carousel';
}

// Hero Types
export interface HeroProps {
	title: string;
	subtitle?: string;
	description: string;
	primaryCta: {
		text: string;
		href: string;
	};
	secondaryCta?: {
		text: string;
		href: string;
	};
	imageUrl?: string;
}

// Button Types
export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
	size?: 'sm' | 'md' | 'lg';
	href?: string;
	onClick?: (() => void) | undefined;
	disabled?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
}

// Card Types
export interface CardProps {
	variant?: 'default' | 'elevated' | 'outlined';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	className?: string;
}

// Layout Types
export interface LayoutProps {
	children: any;
	showHeader?: boolean;
	showFooter?: boolean;
}

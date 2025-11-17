/**
 * Noir E-commerce Content Data
 *
 * NOTE: This file is kept for reference/documentation purposes.
 * The noir-site.tsx page now uses an iframe to the deployed noir-crafted SvelteKit app.
 *
 * This content demonstrates the template-driven content structure
 * and can be used as examples for other template-driven sites.
 */

export const noirContent = {
  hero: {
    title: 'The Virgo Collection',
    subtitle:
      'Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren en son koleksiyonumuzu keşfedin.',
    description:
      'Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir.',
    ctaText: 'Koleksiyonu Keşfet',
  },

  collection: {
    title: 'Öne Çıkan Koleksiyon',
    subtitle: 'En sevilen parçalarımızdan bir seçki',
    products: [
      {
        name: 'Virgo Kolye: Yapay Zeka Tasarımı',
        description:
          'Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren özel koleksiyon parçası. Mürdüm Purple detayı ile.',
        price: 1299,
        image: 'https://placehold.co/400x400/4C1C3D/FFD700?text=VIRGO+KOLYE',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Ay Döngüleri Bilezik',
        description:
          'Zamanın ritmini yansıtan tasarım. Ay döngülerinden ilham alan özel koleksiyon. Altın aksanlı.',
        price: 899,
        image: 'https://placehold.co/400x400/000000/FFD700?text=AY+BILEZIK',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Şahmeran Küpe: Efsanevi Güç',
        description:
          'Efsanevi güç ve zarafeti simgeleyen Şahmeran motifli küpe koleksiyonu. Göz alıcı Gold detaylar.',
        price: 799,
        image: 'https://placehold.co/400x400/4C1C3D/FFFFFF?text=SAHMERAN',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Lale Yüzük: Osmanlı Zarafeti',
        description:
          'Türk kültürünün simgesi lale motifli zarif yüzük tasarımı. Klasik koleksiyonun en nadide parçası.',
        price: 599,
        image: 'https://placehold.co/400x400/6A2A53/FFFFFF?text=LALE+YUZUK',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Minimalist Zincir Kolye',
        description:
          'Her kombine uyum sağlayan, sade ve şık tasarım. Günlük kullanım için ideal.',
        price: 450,
        image: 'https://placehold.co/400x400/000000/FFFFFF?text=ZINCIR',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Virgo Manşet Bilezik',
        description:
          'Virgo koleksiyonunun güçlü duruşunu sergileyen geniş manşet bilezik.',
        price: 1599,
        image: 'https://placehold.co/400x400/6A2A53/FFD700?text=MANSET',
        buttonText: 'Sepete Ekle',
      },
      {
        name: 'Klasik Halka Küpe',
        description:
          'Zamansız tasarım, modern dokunuş. Her stile uyum sağlayan klasik küpe.',
        price: 399,
        image: 'https://placehold.co/400x400/4C1C3D/FFFFFF?text=HALKA',
        buttonText: 'Sepete Ekle',
      },
    ],
  },

  whyNoir: {
    title: 'Neden Noir?',
    sections: [
      {
        icon: '✨',
        title: 'Özel Tasarım',
        description:
          'Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir.',
      },
      {
        icon: '🔨',
        title: 'Kaliteli İşçilik',
        description:
          'En kaliteli malzemeler ve geleneksel zanaatkarlık ile modern tasarımın buluşması.',
      },
      {
        icon: '💎',
        title: 'Anlamlı Tasarımlar',
        description:
          'Ay döngüleri, Virgo, lale ve Şahmeran gibi motiflerle örülü hikayeler.',
      },
    ],
  },

  motifs: {
    title: 'Tasarım Motifleri',
    subtitle:
      'Her koleksiyonumuz, derin anlamlar taşıyan motiflerle bezenmiştir',
    items: [
      {
        icon: '🌙',
        name: 'Ay Döngüleri',
        description: 'Zamanın ritmini yansıtan tasarımlar',
        image:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
        href: '#kolye',
      },
      {
        icon: '✨',
        name: 'Virgo',
        description: 'Zarafet ve mükemmellik arayışı',
        image:
          'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
        href: '#yuzuk',
      },
      {
        icon: '🌷',
        name: 'Lale',
        description: 'Türk kültürünün simgesi',
        image:
          'https://images.unsplash.com/photo-1611591437281-8a0f72382c2d?w=600&h=600&fit=crop',
        href: '#bilezik',
      },
      {
        icon: '🐍',
        name: 'Şahmeran',
        description: 'Efsanevi güç ve zarafet',
        image:
          'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop',
        href: '#sahmeran',
      },
    ],
  },

  newsletter: {
    title: 'Yeni Koleksiyonlardan Haberdar Olun',
    subtitle:
      'Özel indirimler ve yeni tasarımlar hakkında ilk siz haberdar olun.',
    placeholder: 'E-posta adresinizi girin',
    buttonText: 'Abone Ol',
  },

  footer: {
    brandName: 'NOIR',
    tagline: 'Zamanın ötesinde takı deneyimi.',
    footerSections: [
      {
        title: 'Kurumsal',
        links: [
          { text: 'Hakkımızda', href: '#hakkimizda' },
          { text: 'İletişim', href: '#iletisim' },
          { text: 'Kariyer', href: '#kariyer' },
        ],
      },
      {
        title: 'Müşteri Hizmetleri',
        links: [
          { text: 'Kargo ve Teslimat', href: '#kargo' },
          { text: 'İade ve Değişim', href: '#iade' },
          { text: 'Sık Sorulan Sorular', href: '#sss' },
        ],
      },
      {
        title: 'Yasal',
        links: [
          { text: 'Gizlilik Politikası', href: '#gizlilik' },
          { text: 'Kullanım Koşulları', href: '#kullanim' },
          { text: 'Çerez Politikası', href: '#cerez' },
        ],
      },
    ],
    copyright: '© 2025 NOIR. Tüm hakları saklıdır. Jxion Framework Powered.',
  },
};

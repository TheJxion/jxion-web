/**
 * Noir Crafted - Master Content Configuration
 *
 * This is the SINGLE SOURCE OF TRUTH for all Noir Crafted content.
 * This file matches the database structure exactly and is used for:
 * 1. Database seeding (via seed-noir-content.mjs)
 * 2. Fallback content when API is unavailable
 * 3. Content structure reference
 *
 * Database Structure:
 * - Path: noir-crafted/content.json
 * - Structure: {site, nav, home, about, contact, faq, cart, checkout, ...}
 *
 * Following Jxion Stack principles:
 * - All content centralized here
 * - Structure matches database JSONB schema
 * - Can be edited via noir-admin ContentEditor
 * - API is primary source, this is fallback
 */

// =============================================================================
// MASTER CONTENT STRUCTURE (matches database schema)
// =============================================================================

export const content = {
  // Site-wide configuration
  site: {
    name: 'NOIR',
    description: 'Zamanın ötesinde takı deneyimi',
    tagline: 'Ay döngülerinden ilham alan, zarif ve anlamlı tasarımlar',
  },

  // Navigation
  nav: {
    home: 'Ana Sayfa',
    collections: 'Koleksiyonlar',
    about: 'Hakkımızda',
    contact: 'İletişim',
    account: 'Hesabım',
    cart: 'Sepet',
  },

  // Homepage content
  home: {
    hero: {
      title: 'Zamanın Ötesinde\nTakı Deneyimi',
      subtitle: 'Lüks Koleksiyon',
      description:
        'Her parça, zarafet ve işçiliğin mükemmel birleşimidir. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlar.',
      primaryCta: 'Koleksiyonu Keşfet',
      secondaryCta: 'Hikayemizi Oku',
      tagline: '{tagline}',
    },
    featured: {
      title: 'Öne Çıkan Koleksiyon',
      subtitle: 'En sevilen parçalarımızdan bir seçki',
      description:
        'Her biri özenle seçilmiş, el işçiliği ile üretilmiş özel parçalar.',
      products: [],
    },
    whyNoir: {
      title: 'Neden Noir?',
      subtitle: 'Zarafeti ve anlamı bir arada sunan tasarımlar',
      sections: [
        {
          icon: '✨',
          title: 'Özel Tasarım',
          description:
            'Her parça, kadın gücünü ve zarafetini kutlayan, özenle tasarlanmış benzersiz eserlerdir.',
        },
        {
          icon: '🔨',
          title: 'El İşçiliği',
          description:
            'Geleneksel zanaatkarlık teknikleri ile modern tasarımın buluşması. Her detay elle işlenir.',
        },
        {
          icon: '💎',
          title: 'Anlamlı Motifler',
          description:
            'Ay döngüleri, Virgo burcu, lale ve Şahmeran gibi derin anlamlar taşıyan motiflerle örülü hikayeler.',
        },
      ],
    },
    motifs: {
      title: 'Tasarım Motifleri',
      subtitle:
        'Her koleksiyonumuz, derin anlamlar taşıyan sembollerle bezenmiştir',
      description:
        'Geçmişten geleceğe uzanan kültürel mirasımızı modern tasarımla buluşturuyoruz.',
      items: [
        {
          icon: '🌙',
          name: 'Ay Döngüleri',
          description:
            'Zamanın ritmini ve kadınlığın döngüsel gücünü yansıtan tasarımlar',
        },
        {
          icon: '♍',
          name: 'Virgo',
          description: 'Mükemmellik arayışı ve zarif detayların burcu',
        },
        {
          icon: '🌷',
          name: 'Lale',
          description: 'Osmanlı sanatının ve Türk kültürünün zarif simgesi',
        },
        {
          icon: '👑',
          name: 'Şahmeran',
          description:
            'Anadolu efsanelerinin güçlü kadın figürü, bilgelik ve zarafet',
        },
      ],
    },
    whatsourimpact: {
      title: {
        regular: 'Müşterilerimizle',
        highlight: 'Birlikte',
        regularContinued: 'Büyüyoruz',
      },
      stats: [
        {
          value: '24K+',
          label: 'Mutlu Müşteri',
          color: 'gold',
        },
        {
          value: '38',
          label: 'Özel Koleksiyon',
          color: 'white',
        },
        {
          value: '4.9/5',
          label: 'Müşteri Memnuniyeti',
          color: 'gold',
        },
        {
          value: '15+',
          label: 'Yıllık Deneyim',
          color: 'white',
        },
      ],
    },
    keyFeatures: {
      title: 'Öne Çıkan Özellikler',
      subtitle: 'Her parça, zarafet ve kalitenin mükemmel birleşimidir',
      items: [
        {
          title: 'El İşçiliği',
          description:
            'Her parça, deneyimli usta zanaatkarlar tarafından geleneksel tekniklerle özenle elle işlenir.',
        },
        {
          title: 'Premium Malzemeler',
          description:
            'Sadece en kaliteli 925 ayar gümüş, 18 ayar altın ve doğal değerli taşlar kullanılır.',
        },
        {
          title: 'Özel Tasarım',
          description:
            'Size özel tasarımlar yapabiliyoruz. Hayalinizdeki takıyı birlikte yaratıyoruz.',
        },
        {
          title: 'Sürdürülebilir',
          description:
            'Çevreye saygılı üretim süreçleri ve etik kaynak tedariki ile sorumlu lüks anlayışı.',
        },
        {
          title: 'Ömür Boyu Garanti',
          description:
            'Tüm parçalarımız ömür boyu garanti kapsamındadır. Bakım ve onarım hizmetlerimiz mevcuttur.',
        },
        {
          title: 'Uzman Danışmanlık',
          description:
            'Deneyimli mücevher uzmanlarımız, size en uygun parçayı seçmenizde rehberlik eder.',
        },
      ],
    },
    newsletter: {
      title: 'Yeni Koleksiyonlardan Haberdar Olun',
      description:
        'Özel indirimler, yeni tasarımlar ve etkinlikler hakkında ilk siz haberdar olun.',
      placeholder: 'E-posta adresiniz',
      button: 'Abone Ol',
      privacyNote:
        'E-posta adresiniz gizli tutulacak ve asla üçüncü taraflarla paylaşılmayacaktır.',
      successMessage: 'Başarıyla abone oldunuz!',
    },
  },

  // About page
  about: {
    hero: {
      title: 'Zarafet ve İşçiliğin Buluştuğu Yer',
      subtitle: "Noir'un Hikayesi",
      description:
        'Noir, zamanın ötesinde takı deneyimi sunan, her parçayı özenle tasarlayan ve el işçiliği ile üreten lüks bir takı markasıdır.',
    },
    story: {
      title: 'Hikayemiz',
      content: `
        Noir, 2009 yılında İstanbul'da kuruldu. Geleneksel Türk işçiliğini modern 
        tasarımla buluşturma vizyonuyla yola çıktık. Her parçamız, zamanın ötesinde 
        bir hikaye anlatır ve kullanıcısına özel anlam taşır.
        
        Ay döngüleri, burçlar, lale ve Şahmeran gibi derin kültürel köklere sahip 
        motifleri, çağdaş bir dille yorumluyoruz. Her tasarım, kadınlığın gücünü, 
        zarafetini ve bağımsızlığını kutlar.
      `,
    },
    values: {
      title: 'Değerlerimiz',
      items: [
        {
          title: 'Kalite',
          description: 'Her parça, en yüksek kalite standartlarında üretilir.',
        },
        {
          title: 'Zarafet',
          description: 'Tasarımlarımız zarafet ve estetik değerleri yansıtır.',
        },
        {
          title: 'Anlam',
          description: 'Her parça, derin kültürel ve sembolik anlamlar taşır.',
        },
      ],
    },
  },

  // Footer
  footer: {
    description:
      'Ay döngülerinden ilham alan, zarif ve anlamlı tasarımlar. Her parça bir hikaye anlatır.',
    contact: {
      address: 'Nişantaşı, İstanbul',
      email: 'info@noir.com.tr',
      phone: '+90 (212) 555 0000',
    },
    links: {
      corporate: [
        { label: 'Hakkımızda', href: '/about' },
        { label: 'İletişim', href: '/contact' },
        { label: 'Kariyer', href: '/careers' },
      ],
      customerService: [
        { label: 'Sipariş Takibi', href: '/orders' },
        { label: 'Kargo & Teslimat', href: '/shipping' },
        { label: 'İade & Değişim', href: '/returns' },
        { label: 'SSS', href: '/faq' },
      ],
      legal: [
        { label: 'Gizlilik Politikası', href: '/privacy' },
        { label: 'Kullanım Koşulları', href: '/terms' },
        { label: 'Çerez Politikası', href: '/cookie' },
      ],
    },
  },

  // Contact page
  contact: {
    title: 'İletişim',
    subtitle: 'Bizimle İletişime Geçin',
    description:
      'Sorularınız, önerileriniz veya özel tasarım talepleriniz için bize ulaşın.',
    form: {
      name: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      subject: 'Konu',
      message: 'Mesajınız',
      submit: 'Gönder',
    },
  },

  // FAQ page
  faq: {
    title: 'Sık Sorulan Sorular',
    description: 'Takı alışverişinizle ilgili sık sorulan sorular ve cevapları',
    items: [],
  },

  // Cart page
  cart: {
    title: 'Alışveriş Sepeti',
    empty: 'Sepetiniz boş',
    subtotal: 'Ara Toplam',
    shipping: 'Kargo',
    total: 'Toplam',
    checkout: 'Ödemeye Geç',
    continueShopping: 'Alışverişe Devam Et',
  },

  // Checkout page
  checkout: {
    title: 'Ödeme',
    actions: {
      back: 'Geri',
      continue: 'Devam',
      placeOrder: 'Siparişi Tamamla',
    },
    steps: {
      shipping: 'Kargo Bilgileri',
      payment: 'Ödeme',
      review: 'Gözden Geçir',
    },
  },

  // Collections page
  collections: {
    allProducts: 'Tüm Ürünler',
    filter: 'Filtrele',
    sort: 'Sırala',
    noProducts: 'Ürün bulunamadı',
  },

  // Product page
  product: {
    addToCart: 'Sepete Ekle',
    addToFavorites: 'Favorilere Ekle',
    inStock: 'Stokta Var',
    outOfStock: 'Stokta Yok',
    care: {
      title: 'Bakım Bilgileri',
    },
  },

  // Favorites page
  favorites: {
    title: 'Favorilerim',
    empty: 'Henüz favori ürününüz yok',
    actions: {
      addToCart: 'Sepete Ekle',
      remove: 'Favorilerden Kaldır',
      viewProduct: 'Ürünü Görüntüle',
    },
  },

  // Auth pages
  auth: {
    login: {
      title: 'Giriş Yap',
      email: 'E-posta',
      password: 'Şifre',
      submit: 'Giriş Yap',
      forgotPassword: 'Şifremi Unuttum',
      noAccount: 'Hesabınız yok mu?',
      register: 'Kayıt Ol',
    },
    register: {
      title: 'Kayıt Ol',
      email: 'E-posta',
      password: 'Şifre',
      confirmPassword: 'Şifre Tekrar',
      submit: 'Kayıt Ol',
      hasAccount: 'Zaten hesabınız var mı?',
      login: 'Giriş Yap',
    },
  },

  // Careers page
  careers: {
    title: 'Kariyer',
    subtitle: 'Noir Ailesine Katılın',
    description: 'Tutkulu, yaratıcı ve detay odaklı ekip arkadaşları arıyoruz.',
    content: '',
  },

  // Shipping page
  shipping: {
    title: 'Kargo ve Teslimat',
    subtitle: 'Teslimat Bilgileri',
    description:
      'Ürünleriniz özenle paketlenir ve hızlı bir şekilde size ulaştırılır.',
    content: '',
  },

  // Returns page
  returns: {
    title: 'İade ve Değişim',
    subtitle: 'İade Politikası',
    description: 'Müşteri memnuniyeti bizim önceliğimizdir.',
    content: '',
  },

  // Terms page
  terms: {
    title: 'Kullanım Koşulları',
    subtitle: 'Yasal Bilgiler',
    description: 'Web sitemizi kullanarak bu koşulları kabul etmiş olursunuz.',
    content: '',
  },

  // Privacy page
  privacy: {
    title: 'Gizlilik Politikası',
    subtitle: 'Kişisel Verilerin Korunması',
    description: 'Gizliliğinize saygı duyuyoruz ve verilerinizi koruyoruz.',
    content: '',
  },

  // Cookie page
  cookie: {
    title: 'Çerez Politikası',
    subtitle: 'Çerez Kullanımı',
    description: 'Web sitemizde çerezler kullanılmaktadır.',
    content: '',
  },

  // UI strings
  ui: {
    addToCart: 'Sepete Ekle',
    addToFavorites: 'Favorilere Ekle',
    addedToCart: 'Ürün sepete eklendi',
    addedToFavorites: 'Ürün favorilere eklendi',
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    success: 'Başarılı',
    close: 'Kapat',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    edit: 'Düzenle',
  },

  // Cinematic scenes for hero animation
  scenes: [
    {
      title: 'NOIR',
      subtitle: 'Zamanın Ötesinde Takı Deneyimi',
      position: 'center',
      camera: { x: 0, y: 2, z: 10 },
      target: { x: 0, y: 5, z: 0 },
      scrollProgress: { start: 0, end: 11.9 },
    },
    {
      title: 'ZARAFET',
      subtitle: 'Elegant. Timeless. Exquisite.',
      position: 'left',
      camera: { x: 3, y: 8, z: 10 },
      target: { x: 0, y: 10, z: 0 },
      scrollProgress: { start: 11.9, end: 23.7 },
    },
    {
      title: 'İŞÇİLİK',
      subtitle: 'El İşçiliği ile Özenle Tasarlandı',
      position: 'right',
      camera: { x: -10, y: 15, z: 0 },
      target: { x: 0, y: 15, z: 0 },
      scrollProgress: { start: 23.7, end: 35.6 },
    },
    {
      title: 'KOLEKSİYON',
      subtitle: 'Ay Döngüleri, Virgo, Lale ve Şahmeran',
      position: 'top-left',
      camera: { x: -10, y: 22, z: 0 },
      target: { x: 0, y: 25, z: 0 },
      scrollProgress: { start: 35.6, end: 45.8 },
    },
    {
      title: '',
      subtitle: '',
      position: 'top-right',
      camera: { x: 5, y: 35, z: 5 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 45.8, end: 52.5 },
      hideText: true,
    },
    {
      title: 'PREMIUM',
      subtitle: 'En Kaliteli Malzemeler',
      position: 'center',
      camera: { x: 5, y: 30, z: 10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 52.5, end: 62.7 },
    },
    {
      title: 'ÖZEL TASARIM',
      subtitle: 'Hayalinizdeki Parçayı Birlikte Yaratıyoruz',
      position: 'bottom-right',
      camera: { x: 5, y: 25, z: 10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 62.7, end: 69.5 },
    },
    {
      title: 'ANLAMLI',
      subtitle: 'Her Parça Bir Hikaye Anlatır',
      position: 'bottom-left',
      camera: { x: 15, y: 20, z: 5 },
      target: { x: 0, y: 24, z: 0 },
      scrollProgress: { start: 69.5, end: 77.9 },
    },
    {
      title: 'LÜKS',
      subtitle: 'Sürdürülebilir Lüks Deneyimi',
      position: 'top',
      camera: { x: 25, y: 15, z: 0 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 77.9, end: 84.7 },
    },
    {
      title: 'KEŞFET',
      subtitle: 'Koleksiyonu Keşfedin',
      position: 'center',
      camera: { x: 20, y: 20, z: -10 },
      target: { x: 0, y: 20, z: 0 },
      scrollProgress: { start: 84.7, end: 100 },
    },
  ],
};

// Products array - can be populated from database or kept empty
// Products are typically managed separately or included in home.featured.products
export const products: any[] = [];

// Export types for TypeScript
export type Content = typeof content;
export type Product = any;

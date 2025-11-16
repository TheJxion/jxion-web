/**
 * Noir Crafted - i18n Content Configuration
 *
 * Single source of truth for all content on the site.
 * Edit this file to change content across the entire application.
 */

export const content = {
  // Site metadata
  site: {
    name: 'NOIR',
    tagline: 'Zamanın ötesinde takı deneyimi.',
    description:
      'Lüks takı koleksiyonu. Ay döngüleri, Virgo, lale ve Şahmeran motifleriyle özel tasarımlar.',
  },

  // Navigation
  nav: {
    home: 'Ana Sayfa',
    kolye: 'Kolye',
    bilezik: 'Bilezik',
    yuzuk: 'Yüzük',
    kupe: 'Küpe',
    sahmeran: 'Şahmeran',
    tokalar: 'Yetişkin Tokaları',
    fular: 'Fular',
  },

  // Home page
  home: {
    hero: {
      title: 'NOIR',
      tagline: 'Elegant. Timeless. Exquisite.',
      subtitle: 'Zamanın Ötesinde<br />Takı Deneyimi',
      description:
        'Her parça, zarafet ve işçiliğin mükemmel birleşimidir. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlar.',
      primaryCta: 'Koleksiyonu Keşfet',
      secondaryCta: 'Hikayemizi Oku',
    },
    featured: {
      title: 'Öne Çıkan Koleksiyon',
      subtitle: 'En sevilen parçalarımızdan bir seçki',
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
          name: 'Ay Döngüleri',
          description: 'Zamanın ritmini yansıtan tasarımlar',
        },
        {
          name: 'Virgo',
          description: 'Zarafet ve mükemmellik arayışı',
        },
        {
          name: 'Lale',
          description: 'Türk kültürünün simgesi',
        },
        {
          name: 'Şahmeran',
          description: 'Efsanevi güç ve zarafet',
        },
      ],
    },
    newsletter: {
      title: 'Yeni Koleksiyonlardan Haberdar Olun',
      description:
        'Özel indirimler ve yeni tasarımlar hakkında ilk siz haberdar olun.',
      placeholder: 'E-posta adresiniz',
      button: 'Abone Ol',
    },
  },

  // About page
  about: {
    title: 'Hakkımızda',
    subtitle: "Noir'un Hikayesi",
    description:
      'Zamanın ötesinde takı deneyimi sunan Noir, zarafet ve işçiliğin mükemmel birleşimidir.',
    content:
      'Noir olarak, her parçamızı özenle tasarlıyor ve en kaliteli malzemelerle üretiyoruz. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlarımız, kadın gücünü ve zarafetini kutluyor.',
    footerContent: 'Bize katılın ve zamanın ötesinde takı deneyimini keşfedin.',
  },

  // Contact page
  contact: {
    title: 'İletişim',
    subtitle: 'Bize Ulaşın',
    description:
      'Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin.',
    content: 'Size en kısa sürede dönüş yapacağız.',
    footerContent: 'Teşekkür ederiz!',
  },

  // FAQ page
  faq: {
    title: 'Sık Sorulan Sorular',
    subtitle: 'Merak Ettikleriniz',
    items: [
      {
        question: 'Kargo süresi ne kadar?',
        answer: 'Siparişleriniz 1-3 iş günü içinde kargoya verilir.',
      },
      {
        question: 'İade politikası nedir?',
        answer: '14 gün içinde iade edebilirsiniz.',
      },
      {
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer:
          'Kredi kartı, banka kartı ve kapıda ödeme seçeneklerimiz mevcuttur.',
      },
    ],
  },

  // Careers page
  careers: {
    title: 'Kariyer',
    subtitle: 'Bizimle Çalışın',
    description:
      'Noir ailesine katılmak ister misiniz? Yaratıcı, tutkulu ve işine aşık insanlar arıyoruz.',
    content:
      'Noir olarak, takı tasarımı ve üretiminde yenilikçi yaklaşımlar benimsiyoruz. Ekibimize katılmak isteyen yetenekli bireyler arıyoruz. Eğer siz de zamanın ötesinde takı deneyimi yaratmaya katkıda bulunmak istiyorsanız, bizimle iletişime geçin.',
    footerContent: 'Başvurularınızı bekliyoruz!',
  },

  // Shipping page
  shipping: {
    title: 'Kargo ve Teslimat',
    subtitle: 'Teslimat Bilgileri',
    description:
      'Siparişleriniz güvenli ve hızlı bir şekilde size ulaştırılır.',
    content:
      "Siparişleriniz 1-3 iş günü içinde kargoya verilir. Kargo süresi, teslimat adresinize göre 2-5 iş günü arasında değişmektedir. Ücretsiz kargo için minimum sipariş tutarı 500 TL'dir.",
    footerContent:
      'Sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
  },

  // Returns page
  returns: {
    title: 'İade ve Değişim',
    subtitle: 'İade Politikası',
    description:
      'Memnun kalmadığınız ürünleri 14 gün içinde iade edebilirsiniz.',
    content:
      'Satın aldığınız ürünleri, kullanılmamış ve orijinal ambalajında olmak şartıyla 14 gün içinde iade edebilirsiniz. İade işlemleri için müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir.',
    footerContent: 'İade işlemleri 3-5 iş günü içinde tamamlanır.',
  },

  // Terms page
  terms: {
    title: 'Kullanım Koşulları',
    subtitle: 'Yasal Bilgiler',
    description:
      'Noir Crafted web sitesini kullanırken aşağıdaki koşulları kabul etmiş sayılırsınız.',
    content:
      'Bu web sitesini kullanarak, tüm yasal koşulları ve kullanım şartlarını kabul etmiş sayılırsınız. Sitede yer alan tüm içerikler telif hakkı koruması altındadır. İzinsiz kullanım yasal işlem gerektirebilir.',
    footerContent: 'Sorularınız için bizimle iletişime geçebilirsiniz.',
  },

  // Privacy page
  privacy: {
    title: 'Gizlilik Politikası',
    subtitle: 'Kişisel Verilerin Korunması',
    description: 'Kişisel verilerinizin güvenliği bizim için önceliklidir.',
    content:
      'Noir Crafted olarak, kişisel verilerinizin güvenliğini sağlamak için gerekli tüm teknik ve idari önlemleri almaktayız. Verileriniz yalnızca hizmet kalitesini artırmak ve siparişlerinizi işlemek için kullanılmaktadır.',
    footerContent:
      'Gizlilik politikamız hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.',
  },

  // Cookie page
  cookie: {
    title: 'Çerez Politikası',
    subtitle: 'Cookie Kullanımı',
    description:
      'Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.',
    content:
      'Noir Crafted web sitesi, site performansını artırmak ve kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır ve kişisel bilgilerinizi içermez.',
    footerContent: 'Çerez ayarlarınızı tarayıcınızdan yönetebilirsiniz.',
  },

  // Footer
  footer: {
    description: 'Zamanın ötesinde takı deneyimi.',
    sections: {
      corporate: {
        title: 'Kurumsal',
        links: [
          { text: 'Hakkımızda', href: '/about' },
          { text: 'İletişim', href: '/contact' },
          { text: 'Kariyer', href: '/careers' },
        ],
      },
      customerService: {
        title: 'Müşteri Hizmetleri',
        links: [
          { text: 'Kargo ve Teslimat', href: '/shipping' },
          { text: 'İade ve Değişim', href: '/returns' },
          { text: 'Sık Sorulan Sorular', href: '/faq' },
        ],
      },
      legal: {
        title: 'Yasal',
        links: [
          { text: 'Gizlilik Politikası', href: '/privacy' },
          { text: 'Kullanım Koşulları', href: '/terms' },
          { text: 'Çerez Politikası', href: '/cookie' },
        ],
      },
    },
    copyright: 'Tüm hakları saklıdır.',
  },

  // Common UI
  ui: {
    addToCart: 'Sepete Ekle',
    discover: 'Keşfet',
    learnMore: 'Daha Fazla',
    outOfStock: 'Stokta Yok',
    cart: 'Sepet',
    favorites: 'Favoriler',
    search: 'Ara',
    filter: 'Filtrele',
    sort: 'Sırala',
    clear: 'Temizle',
    backToHome: 'Ana Sayfaya Dön',
    productNotFound: 'Ürün Bulunamadı',
    productNotFoundDescription:
      'Aradığınız ürün bulunamadı veya kaldırılmış olabilir.',
    noProductsInCategory: 'Bu kategoride henüz ürün bulunmamaktadır.',
    addedToCart: 'Ürün sepete eklendi.',
    continueShopping: 'Alışverişe Devam Et',
    proceedToCheckout: 'Ödemeye Geç',
    myBasket: 'Sepetiniz',
    emptyCart: 'Sepetiniz şu anda boş.',
    emptyCartDescription:
      'Zamanın ötesinde takı deneyimi için sepetinizi oluşturun.',
    checkoutCta: 'Işıltınıza Işık Katın →',
    total: 'Toplam',
    remove: 'Kaldır',
    quantity: 'Adet',
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    signOut: 'Çıkış Yap',
    email: 'E-posta',
    password: 'Şifre',
    loginTitle: 'Hesabınıza Giriş Yapın',
    registerTitle: 'Yeni Hesap Oluşturun',
    alreadyHaveAccount: 'Zaten hesabınız var mı?',
    dontHaveAccount: 'Hesabınız yok mu?',
    loginError: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
    registerError: 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.',
  },

  // Product details
  product: {
    material: {
      title: 'Malzeme',
      description: 'Altın kaplama veya gümüş, özel tasarım detayları ile.',
    },
    care: {
      title: 'Bakım',
      description:
        'Yumuşak bir bez ile temizleyin. Su ve kimyasallardan uzak tutun.',
    },
    related: {
      title: 'Benzer Ürünler',
    },
  },
};

// Type for content
export type Content = typeof content;

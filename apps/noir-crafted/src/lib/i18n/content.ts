/**
 * Noir Crafted - Content Configuration
 *
 * Centralized content for the Noir jewelry e-commerce site.
 * All content is jewelry-focused, high-quality, and production-ready.
 *
 * Following Jxion Stack principles:
 * - Content loaded via ContentManager from API or this fallback
 * - All text centralized here (no hardcoded strings in components)
 * - Structured for easy translation and CMS integration
 */

// =============================================================================
// PRODUCT CATALOG
// =============================================================================

export const products = [
  {
    id: 'ay-dongusu-kolye',
    name: 'Ay Döngüsü Kolye',
    category: 'kolye',
    price: 1299.0,
    description:
      'Ayın evrelerinden ilham alan zarif kolye. Her faz, kadınlığın farklı bir gücünü temsil eder.',
    longDescription: `Ay Döngüsü Kolye, zamanın döngüsel doğasını ve kadınlığın güçlü enerjisini yansıtan özel bir tasarımdır. Sterling gümüş üzerine 14 ayar altın kaplama ile özenle üretilmiştir. Ayın dolunay, hilal ve yeni ay fazları, el işçiliği ile detaylandırılmıştır.`,
    material: 'Sterling Gümüş, 14 Ayar Altın Kaplama',
    dimensions: '45cm zincir uzunluğu, 2.5cm kolye ucu',
    weight: '12g',
    care: 'Yumuşak bir bezle nazikçe temizleyin. Su ve kimyasallardan uzak tutun. Kullanılmadığında kutusunda saklayın.',
    inStock: true,
    featured: true,
    images: [
      '/images/products/ay-dongusu-kolye-1.jpg',
      '/images/products/ay-dongusu-kolye-2.jpg',
      '/images/products/ay-dongusu-kolye-3.jpg',
    ],
    image: '/images/products/ay-dongusu-kolye-1.jpg',
    features: [
      'El işçiliği',
      'Premium gümüş',
      'Altın kaplama',
      'Ömür boyu garanti',
    ],
    tags: ['ay', 'kolye', 'gümüş', 'altın kaplama', 'kadın'],
  },
  {
    id: 'virgo-yuzuk',
    name: 'Virgo Yüzük',
    category: 'yuzuk',
    price: 899.0,
    description:
      'Başak burcunun zarafetini yansıtan özel tasarım yüzük. Mükemmellik ve detay.',
    longDescription: `Virgo Yüzük, Başak burcunun mükemmellik arayışını ve zarif doğasını simgeler. Her detayı özenle işlenmiş bu yüzük, 18 ayar altın kaplama ve doğal zirkon taşlarla süslenmiştir. Burç sembolü el gravürü ile kazınmıştır.`,
    material: '925 Ayar Gümüş, 18 Ayar Altın Kaplama, Doğal Zirkon',
    dimensions: 'Ayarlanabilir (52-58 numara arası)',
    weight: '8g',
    care: 'Temizlik için özel mücevher temizleme solüsyonu kullanın. Darbelere karşı dikkatli olun.',
    inStock: true,
    featured: true,
    images: [
      '/images/products/virgo-yuzuk-1.jpg',
      '/images/products/virgo-yuzuk-2.jpg',
    ],
    image: '/images/products/virgo-yuzuk-1.jpg',
    features: [
      'El gravürü',
      'Doğal zirkon',
      'Ayarlanabilir beden',
      'Özel kutuda',
    ],
    tags: ['virgo', 'başak', 'yüzük', 'burç', 'zirkon'],
  },
  {
    id: 'lale-bilezik',
    name: 'Lale Motifli Bilezik',
    category: 'bilezik',
    price: 1599.0,
    description:
      'Türk kültürünün simgesi lale motifleriyle bezeli zarif bilezik.',
    longDescription: `Lale Motifli Bilezik, Osmanlı sanatının en zarif motifi olan laleyi modern bir yorumla sunar. Her lale yaprağı ayrı ayrı işlenmiş, ince filigran tekniği ile detaylandırılmıştır. 22 ayar altın kaplama ile lüks bir parlaklık.`,
    material: '925 Ayar Gümüş, 22 Ayar Altın Kaplama, Filigran İşçilik',
    dimensions: '18cm uzunluk, ayarlanabilir',
    weight: '15g',
    care: 'Parfüm ve krem uygulandıktan sonra takın. Nemden uzak tutun.',
    inStock: true,
    featured: true,
    images: [
      '/images/products/lale-bilezik-1.jpg',
      '/images/products/lale-bilezik-2.jpg',
      '/images/products/lale-bilezik-3.jpg',
    ],
    image: '/images/products/lale-bilezik-1.jpg',
    features: ['Filigran işçilik', 'Türk motifi', 'Ayarlanabilir', 'El yapımı'],
    tags: ['lale', 'bilezik', 'türk', 'osmanlı', 'filigran'],
  },
  {
    id: 'sahmeran-kupe',
    name: 'Şahmeran Koleksiyonu Küpe',
    category: 'kupe',
    price: 1199.0,
    description:
      "Efsanevi Şahmeran'dan ilham alan muhteşem küpe tasarımı. Güç ve zarafet.",
    longDescription: `Şahmeran Küpe, Anadolu efsanelerinin güçlü kadın figürü Şahmeran'dan ilham alır. Yılan motifleri, yeşil oniks taşları ve altın işlemelerle bezeli bu küpe, güç ve zarafeti bir arada sunar.`,
    material: '18 Ayar Altın, Doğal Yeşil Oniks, El İşlemesi',
    dimensions: '4cm uzunluk, 1.5cm genişlik',
    weight: '10g (çift)',
    care: 'Sık kullanımdan sonra yumuşak bezle silin. Taş kısımlarını ayrı temizleyin.',
    inStock: true,
    featured: true,
    images: [
      '/images/products/sahmeran-kupe-1.jpg',
      '/images/products/sahmeran-kupe-2.jpg',
    ],
    image: '/images/products/sahmeran-kupe-1.jpg',
    features: ['Doğal oniks', 'El işlemesi', 'Efsane motifi', 'Lüks paket'],
    tags: ['şahmeran', 'küpe', 'efsane', 'oniks', 'altın'],
  },
  {
    id: 'zarif-toka-seti',
    name: 'Zarif Toka Seti',
    category: 'aksesuar',
    price: 599.0,
    description: 'Yetişkin kadınlar için özel tasarlanmış zarif toka seti.',
    longDescription: `Zarif Toka Seti, günlük şıklığınıza zarafet katar. İnci detaylı 3'lü set, hem klasik hem modern kombinasyonlara uyum sağlar. Nickel free metal ve el dikişli inci montajı.`,
    material: 'Nickel Free Metal, Doğal İnci, El Dikişli',
    dimensions: '3 adet: 5cm, 7cm, 9cm',
    weight: '20g (set)',
    care: 'Islak bezle silin. İncileri sert yüzeylere sürtmeyin.',
    inStock: true,
    featured: false,
    images: ['/images/products/toka-seti-1.jpg'],
    image: '/images/products/toka-seti-1.jpg',
    features: ['İnci detay', "3'lü set", 'Nickel free', 'Günlük kullanım'],
    tags: ['toka', 'aksesuar', 'inci', 'set'],
  },
  {
    id: 'ipek-fular',
    name: 'İpek Fular - Özel Tasarım',
    category: 'aksesuar',
    price: 799.0,
    description:
      'Lüks ipekten üretilmiş özel tasarım fular. Her mevsim için şık aksesuar.',
    longDescription: `İpek Fular, %100 doğal ipekten üretilmiş, dijital baskı ile desenlendirilmiş lüks bir aksesuar. Ay ve yıldız motifleri Noir'ın imzası taşır. 90x90cm standart kare kesim.`,
    material: '%100 Doğal İpek, Dijital Baskı',
    dimensions: '90cm x 90cm',
    weight: '50g',
    care: 'Kuru temizleme önerilir. Düşük ısıda ütülenebilir.',
    inStock: true,
    featured: false,
    images: ['/images/products/fular-1.jpg', '/images/products/fular-2.jpg'],
    image: '/images/products/fular-1.jpg',
    features: ['%100 ipek', 'Dijital baskı', 'Kare kesim', 'Özel desenli'],
    tags: ['fular', 'ipek', 'aksesuar', 'desen'],
  },
];

// =============================================================================
// SITE CONTENT
// =============================================================================

export const content = {
  // Site metadata
  site: {
    name: 'NOIR',
    tagline: 'Zamanın Ötesinde Takı Deneyimi',
    description:
      'Lüks takı koleksiyonu. Ay döngüleri, Virgo burcu, lale ve Şahmeran motifleriyle özel tasarımlar.',
    keywords: [
      'takı',
      'kolye',
      'yüzük',
      'bilezik',
      'lüks',
      'el yapımı',
      'noir',
    ],
  },

  // Navigation
  nav: {
    home: 'Ana Sayfa',
    collections: 'Koleksiyonlar',
    about: 'Hakkımızda',
    contact: 'İletişim',
    cart: 'Sepet',
    favorites: 'Favoriler',
    account: 'Hesabım',
  },

  // Home page
  home: {
    hero: {
      title: 'Zamanın Ötesinde\nTakı Deneyimi',
      subtitle: 'Lüks Koleksiyon',
      description:
        'Her parça, zarafet ve işçiliğin mükemmel birleşimidir. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlar.',
      primaryCta: 'Koleksiyonu Keşfet',
      secondaryCta: 'Hikayemizi Oku',
    },

    featured: {
      title: 'Öne Çıkan Koleksiyon',
      subtitle: 'En sevilen parçalarımızdan bir seçki',
      description:
        'Her biri özenle seçilmiş, el işçiliği ile üretilmiş özel parçalar.',
      products: products.filter((p) => p.featured),
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
          name: 'Ay Döngüleri',
          description:
            'Zamanın ritmini ve kadınlığın döngüsel gücünü yansıtan tasarımlar',
          icon: '🌙',
        },
        {
          name: 'Virgo',
          description: 'Mükemmellik arayışı ve zarif detayların burcu',
          icon: '♍',
        },
        {
          name: 'Lale',
          description: 'Osmanlı sanatının ve Türk kültürünün zarif simgesi',
          icon: '🌷',
        },
        {
          name: 'Şahmeran',
          description:
            'Anadolu efsanelerinin güçlü kadın figürü, bilgelik ve zarafet',
          icon: '👑',
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
      successMessage: 'Başarıyla abone oldunuz!',
      privacyNote:
        'E-posta adresiniz gizli tutulacak ve asla üçüncü taraflarla paylaşılmayacaktır.',
    },

    whatsourimpact: {
      title: {
        regular: 'Müşterilerimizle',
        highlight: 'Birlikte',
        regularContinued: 'Büyüyoruz',
      },
      stats: [
        { value: '24K+', label: 'Mutlu Müşteri', color: 'gold' },
        { value: '38', label: 'Özel Koleksiyon', color: 'white' },
        { value: '4.9/5', label: 'Müşteri Memnuniyeti', color: 'gold' },
        { value: '15+', label: 'Yıllık Deneyim', color: 'white' },
      ],
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
          title: 'Sürdürülebilirlik',
          description: 'Çevreye ve topluma saygılı, etik üretim süreçleri.',
        },
        {
          title: 'İşçilik',
          description: 'Geleneksel zanaatkarlık teknikleri ile modern tasarım.',
        },
      ],
    },
  },

  // Product pages
  product: {
    material: {
      title: 'Malzeme & İşçilik',
      description:
        'Premium kaliteli malzemeler ve geleneksel el işçiliği ile üretilmiştir.',
    },
    care: {
      title: 'Bakım Talimatları',
      description:
        'Yumuşak bir bezle nazikçe temizleyin. Su, parfüm ve kimyasallardan uzak tutun. Kullanılmadığında özel kutusunda saklayın.',
    },
    related: {
      title: 'Beğenebileceğiniz Ürünler',
    },
    addToCart: 'Sepete Ekle',
    outOfStock: 'Stokta Yok',
    notifyWhenAvailable: 'Stoka Girince Haber Ver',
  },

  // Cart page
  cart: {
    title: 'Sepetim',
    labels: {
      quantity: 'Adet',
      unitPrice: 'Birim Fiyatı',
    },
    empty: {
      title: 'Sepetiniz Boş',
      description:
        'Henüz sepetinize ürün eklemediniz. Koleksiyonumuzu keşfetmek için alışverişe başlayın.',
      cta: 'Alışverişe Başla',
    },
    summary: {
      title: 'Sepet Özeti',
      subtotal: 'Ara Toplam',
      shipping: 'Kargo',
      shippingFree: 'Ücretsiz',
      tax: 'KDV',
      total: 'Toplam',
    },
    actions: {
      continueShopping: 'Alışverişe Devam',
      proceedToCheckout: 'Ödemeye Geç',
      remove: 'Kaldır',
      updateQuantity: 'Güncelle',
    },
    notes: {
      freeShipping: '500₺ ve üzeri siparişlerde kargo ücretsiz',
      secureCheckout: 'Güvenli ödeme sistemi',
    },
  },

  // Checkout page
  checkout: {
    title: 'Ödeme',
    steps: {
      shipping: 'Teslimat Bilgileri',
      payment: 'Ödeme Bilgileri',
      review: 'Sipariş Özeti',
    },
    shipping: {
      fullName: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      address: 'Adres',
      city: 'Şehir',
      postalCode: 'Posta Kodu',
      country: 'Ülke',
    },
    payment: {
      method: 'Ödeme Yöntemi',
      creditCard: 'Kredi Kartı',
      bankTransfer: 'Havale/EFT',
      cardNumber: 'Kart Numarası',
      cardName: 'Kart Üzerindeki İsim',
      expiryDate: 'Son Kullanma Tarihi',
      cvv: 'CVV',
    },
    actions: {
      back: 'Geri',
      continue: 'Devam',
      placeOrder: 'Siparişi Tamamla',
    },
    notes: {
      securePayment: '256-bit SSL şifrelemesi ile güvenli ödeme',
      dataProtection: 'Bilgileriniz KVKK kapsamında korunmaktadır',
    },
  },

  // Favorites page
  favorites: {
    title: 'Favorilerim',
    empty: {
      title: 'Favori Listeniz Boş',
      description:
        'Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz.',
      cta: 'Koleksiyonu Keşfet',
    },
    actions: {
      addToCart: 'Sepete Ekle',
      remove: 'Favorilerden Kaldır',
      viewProduct: 'Ürünü Görüntüle',
    },
  },

  // Collections page
  collections: {
    title: 'Koleksiyonlar',
    allProducts: 'Tüm Ürünler',
    categories: {
      kolye: 'Kolyeler',
      yuzuk: 'Yüzükler',
      bilezik: 'Bilezikler',
      kupe: 'Küpeler',
      aksesuar: 'Aksesuarlar',
    },
    filters: {
      title: 'Filtrele',
      priceRange: 'Fiyat Aralığı',
      material: 'Malzeme',
      inStock: 'Sadece Stokta Olanlar',
      sortBy: 'Sırala',
      sortOptions: {
        featured: 'Öne Çıkanlar',
        priceLow: 'Fiyat: Düşükten Yükseğe',
        priceHigh: 'Fiyat: Yüksekten Düşüğe',
        newest: 'En Yeniler',
      },
    },
    empty: {
      title: 'Bu kategoride ürün bulunamadı',
      description:
        'Lütfen başka bir kategori deneyin veya filtreleri temizleyin.',
      cta: 'Tüm Ürünleri Görüntüle',
    },
  },

  // Contact page
  contact: {
    title: 'İletişim',
    subtitle: 'Size Nasıl Yardımcı Olabiliriz?',
    description:
      'Sorularınız, özel tasarım taleplerin veya işbirliği teklifleriniz için bizimle iletişime geçin.',
    form: {
      name: 'Ad Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      subject: 'Konu',
      message: 'Mesajınız',
      submit: 'Gönder',
      sending: 'Gönderiliyor...',
      success:
        'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      error:
        'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan e-posta gönderin.',
    },
    info: {
      address: 'Nişantaşı, İstanbul',
      phone: '+90 (212) 555 0000',
      email: 'info@noir.com.tr',
      hours: 'Pazartesi - Cumartesi: 10:00 - 19:00',
    },
  },

  // Auth page
  auth: {
    login: {
      title: 'Hesabınıza Giriş Yapın',
      subtitle: 'Siparişlerinizi ve favorilerinizi tek noktadan yönetin.',
      submitLabel: 'Giriş Yap',
      switchLabel: 'Hesabınız yok mu? Kayıt olun',
      successMessage: 'Giriş işleminiz tamamlandı.',
    },
    register: {
      title: 'Yeni Hesap Oluşturun',
      subtitle: 'Noir deneyimini kişiselleştirmek için hesabınızı oluşturun.',
      submitLabel: 'Kayıt Ol',
      switchLabel: 'Zaten hesabınız var mı? Giriş yapın',
      successMessage: 'Hesabınız başarıyla oluşturuldu.',
    },
    form: {
      name: 'Ad Soyad',
      email: 'E-posta',
      password: 'Şifre',
      confirmPassword: 'Şifreyi Doğrulayın',
    },
    validation: {
      nameRequired: 'Ad soyad zorunludur.',
      emailRequired: 'E-posta adresi zorunludur.',
      emailInvalid: 'Geçerli bir e-posta adresi girin.',
      passwordRequired: 'Şifre zorunludur.',
      passwordLength: 'Şifre en az 6 karakter olmalıdır.',
      confirmPasswordRequired: 'Şifre doğrulaması zorunludur.',
      passwordsMismatch: 'Şifreler eşleşmiyor.',
    },
  },

  // FAQ page
  faq: {
    title: 'Sık Sorulan Sorular',
    subtitle: 'Merak Ettikleriniz',
    description: 'Takı alışverişinizle ilgili sık sorulan sorular ve cevapları',
    items: [
      {
        question: 'Kargo süresi ne kadar?',
        answer:
          'Siparişleriniz 1-3 iş günü içinde özel kutusunda kargoya verilir. İstanbul içi aynı gün teslimat seçeneği mevcuttur.',
      },
      {
        question: 'Garanti kapsamı nedir?',
        answer:
          'Tüm ürünlerimiz ömür boyu garanti kapsamındadır. İşçilik hataları, kaplama sorunları ve taş kayıpları garantimiz dahilindedir. Ücretsiz bakım ve onarım hizmeti sunuyoruz.',
      },
      {
        question: 'Özel tasarım yaptırabilir miyim?',
        answer:
          'Evet! Size özel tasarımlar yapıyoruz. Randevu alarak atölyemizi ziyaret edebilir veya online konsültasyon ile hayalinizdeki takıyı birlikte tasarlayabiliriz.',
      },
      {
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer:
          'Tüm kredi kartları, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Kapıda ödeme seçeneği mevcuttur. Taksit seçenekleri için iletişime geçin.',
      },
      {
        question: 'İade ve değişim politikanız nedir?',
        answer:
          'Ürünün teslim tarihinden itibaren 14 gün içinde, kullanılmamış ve orijinal kutusunda olmak kaydıyla iade edebilirsiniz. Değişimler ücretsizdir.',
      },
      {
        question: 'Takıların bakımı nasıl yapılır?',
        answer:
          'Yumuşak bir bezle düzenli olarak temizleyin. Su, parfüm, krem ve kimyasallardan uzak tutun. Kullanılmadığında hava almayan kutusunda saklayın. Ücretsiz bakım hizmeti için mağazamıza getirebilirsiniz.',
      },
    ],
  },

  // UI strings
  ui: {
    // Common
    loading: 'Yükleniyor...',
    error: 'Bir hata oluştu',
    tryAgain: 'Tekrar Dene',
    close: 'Kapat',
    save: 'Kaydet',
    cancel: 'İptal',

    // Cart
    myBasket: 'Sepetim',
    emptyCart: 'Sepetiniz boş',
    emptyCartDescription: 'Henüz sepetinize ürün eklemediniz.',
    addedToCart: 'Ürün sepete eklendi',
    removedFromCart: 'Ürün sepetten kaldırıldı',

    // Product
    addToCart: 'Sepete Ekle',
    outOfStock: 'Stokta Yok',
    inStock: 'Stokta Var',
    newArrival: 'Yeni',
    sale: 'İndirimde',

    // Navigation
    discover: 'Keşfet',
    continueShopping: 'Alışverişe Devam',
    proceedToCheckout: 'Ödemeye Geç',
    backToHome: 'Ana Sayfaya Dön',

    // Account
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    signOut: 'Çıkış Yap',
    myAccount: 'Hesabım',

    // Product detail
    productNotFound: 'Ürün Bulunamadı',
    productNotFoundDescription:
      'Aradığınız ürün bulunamadı, kaldırılmış veya satıştan çekilmiş olabilir.',

    // Favorites
    favorites: 'Favorilerim',
    addToFavorites: 'Favorilere Ekle',
    removeFromFavorites: 'Favorilerden Kaldır',

    // Errors
    pageNotFound: 'Sayfa Bulunamadı',
    serverError: 'Sunucu Hatası',
    networkError: 'Bağlantı Hatası',
  },

  // Footer
  footer: {
    tagline: 'Zamanın ötesinde takı deneyimi',
    description:
      'Ay döngülerinden ilham alan, zarif ve anlamlı tasarımlar. Her parça bir hikaye anlatır.',
    copyright: '© 2025 Noir. Tüm hakları saklıdır.',

    sections: {
      shop: {
        title: 'Alışveriş',
        links: [
          { text: 'Kolyeler', href: '/collections/kolye' },
          { text: 'Yüzükler', href: '/collections/yuzuk' },
          { text: 'Bilezikler', href: '/collections/bilezik' },
          { text: 'Küpeler', href: '/collections/kupe' },
          { text: 'Aksesuarlar', href: '/collections/aksesuar' },
        ],
      },
      company: {
        title: 'Kurumsal',
        links: [
          { text: 'Hakkımızda', href: '/about' },
          { text: 'İletişim', href: '/contact' },
          { text: 'Kariyer', href: '/careers' },
          { text: 'Atölyemiz', href: '/workshop' },
        ],
      },
      customerService: {
        title: 'Müşteri Hizmetleri',
        links: [
          { text: 'Sipariş Takibi', href: '/track-order' },
          { text: 'Kargo & Teslimat', href: '/shipping' },
          { text: 'İade & Değişim', href: '/returns' },
          { text: 'SSS', href: '/faq' },
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

    contact: {
      address: 'Nişantaşı, İstanbul',
      phone: '+90 (212) 555 0000',
      email: 'info@noir.com.tr',
    },

    social: {
      instagram: 'https://instagram.com/noir',
      facebook: 'https://facebook.com/noir',
      pinterest: 'https://pinterest.com/noir',
    },
  },

  // Legal pages
  privacy: {
    title: 'Gizlilik Politikası',
    subtitle: 'Kişisel Verilerinizin Korunması',
    description:
      'Noir olarak kişisel verilerinizin güvenliğini en üst düzeyde tutuyoruz.',
    content: `
      <h3>Veri Toplama ve Kullanım</h3>
      <p>Noir Crafted olarak, müşterilerimizin kişisel verilerini KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında koruyoruz.</p>
      
      <h3>Hangi Verileri Topluyoruz?</h3>
      <ul>
        <li>Ad, soyad ve iletişim bilgileri</li>
        <li>Teslimat adresleri</li>
        <li>Ödeme bilgileri (şifreli olarak)</li>
        <li>Sipariş geçmişi</li>
      </ul>
      
      <h3>Verilerinizi Nasıl Kullanıyoruz?</h3>
      <p>Topladığımız veriler yalnızca siparişlerinizi işlemek, size daha iyi hizmet sunmak ve yasal yükümlülüklerimizi yerine getirmek için kullanılır.</p>
    `,
    footerContent: 'Son güncelleme: Kasım 2025',
  },

  terms: {
    title: 'Kullanım Koşulları',
    subtitle: 'Hizmet Şartlarımız',
    description:
      'Noir Crafted web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.',
    content: `
      <h3>Genel Hükümler</h3>
      <p>Bu web sitesini kullanarak, belirtilen tüm şartları kabul etmiş sayılırsınız.</p>
      
      <h3>Ürün Bilgileri</h3>
      <p>Web sitemizde yer alan ürün görselleri ve açıklamaları bilgilendirme amaçlıdır. Renk tonları ekran ayarlarına göre değişiklik gösterebilir.</p>
      
      <h3>Fiyatlandırma</h3>
      <p>Tüm fiyatlar Türk Lirası (TL) cinsindendir ve KDV dahildir. Fiyatlar önceden haber verilmeksizin değiştirilebilir.</p>
      
      <h3>Fikri Mülkiyet</h3>
      <p>Bu web sitesindeki tüm içerik, tasarımlar ve görseller Noir'a aittir ve telif hakları ile korunmaktadır.</p>
    `,
    footerContent: 'Son güncelleme: Kasım 2025',
  },

  cookie: {
    title: 'Çerez Politikası',
    subtitle: 'Web Sitemizde Çerez Kullanımı',
    description:
      'Daha iyi bir kullanıcı deneyimi sunmak için çerezler kullanıyoruz.',
    content: `
      <h3>Çerezler Nedir?</h3>
      <p>Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır.</p>
      
      <h3>Hangi Çerezleri Kullanıyoruz?</h3>
      <ul>
        <li><strong>Zorunlu Çerezler:</strong> Web sitesinin çalışması için gereklidir (sepet, oturum vb.)</li>
        <li><strong>Analitik Çerezler:</strong> Ziyaretçi istatistiklerini toplar (Google Analytics)</li>
        <li><strong>Tercih Çerezleri:</strong> Dil ve tema tercihlerinizi hatırlar</li>
      </ul>
      
      <h3>Çerezleri Nasıl Yönetebilirsiniz?</h3>
      <p>Tarayıcı ayarlarınızdan çerezleri silebilir veya engelleyebilirsiniz. Ancak bu durumda bazı özellikler çalışmayabilir.</p>
    `,
    footerContent: 'Son güncelleme: Kasım 2025',
  },

  returns: {
    title: 'İade ve Değişim',
    subtitle: 'İade ve Değişim Politikamız',
    description:
      'Ürünlerimizi güvenle satın alabilirsiniz. 14 gün iade ve ücretsiz değişim garantisi.',
    content: `
      <h3>İade Süresi</h3>
      <p>Ürünün teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz.</p>
      
      <h3>İade Koşulları</h3>
      <ul>
        <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır</li>
        <li>Takı kutusunda hasarsız olarak gönderilmelidir</li>
        <li>Fatura ve garanti belgesi eklenmelidir</li>
        <li>Özel yapım ürünler iade edilemez</li>
      </ul>
      
      <h3>Değişim</h3>
      <p>Tüm değişimler ücretsizdir. Beden veya model değişikliği için bizimle iletişime geçin.</p>
      
      <h3>İade Süreci</h3>
      <p>İade talebinizi info@noir.com.tr adresine veya müşteri hizmetleri hattımızdan iletebilirsiniz. İade onayından sonra kargo kodu gönderilir.</p>
    `,
    footerContent: 'Son güncelleme: Kasım 2025',
  },

  shipping: {
    title: 'Kargo ve Teslimat',
    subtitle: 'Teslimat Bilgileri',
    description:
      'Ürünleriniz özenle paketlenir ve hızlı bir şekilde size ulaştırılır.',
    content: `
      <h3>Teslimat Süresi</h3>
      <p>Siparişler 1-3 iş günü içinde özel kutusunda kargoya verilir. İstanbul içi aynı gün teslimat seçeneği mevcuttur.</p>
      
      <h3>Kargo Ücreti</h3>
      <ul>
        <li>500₺ ve üzeri siparişlerde kargo ücretsizdir</li>
        <li>500₺ altı siparişlerde kargo bedeli 29₺</li>
        <li>İstanbul içi aynı gün teslimat: 49₺</li>
      </ul>
      
      <h3>Kargo Firmaları</h3>
      <p>Yurtiçi Kargo, MNG Kargo ve Aras Kargo ile çalışıyoruz. Tercih ettiğiniz kargo firmasını sipariş sırasında seçebilirsiniz.</p>
      
      <h3>Sipariş Takibi</h3>
      <p>Kargoya verildikten sonra takip numarası e-posta ve SMS ile tarafınıza iletilir.</p>
      
      <h3>Özel Paketleme</h3>
      <p>Tüm ürünler lüks marka kutusunda, hediye kartı ile birlikte gönderilir. Ek ücret talep edilmez.</p>
    `,
    footerContent: 'Son güncelleme: Kasım 2025',
  },

  careers: {
    title: 'Kariyer',
    subtitle: 'Noir Ailesine Katılın',
    description: 'Tutkulu, yaratıcı ve detay odaklı ekip arkadaşları arıyoruz.',
    content: `
      <h3>Neden Noir?</h3>
      <p>Noir, sadece bir iş yeri değil, yaratıcılığın ve zanaatkarlığın buluştuğu bir ailedir. Çalışanlarımızın gelişimine yatırım yapar, adil ve destekleyici bir ortam sunarız.</p>
      
      <h3>Açık Pozisyonlar</h3>
      <ul>
        <li><strong>Kuyumcu Ustası</strong> - İstanbul Atölye (Tam zamanlı)</li>
        <li><strong>Ürün Tasarımcısı</strong> - İstanbul (Tam zamanlı)</li>
        <li><strong>Dijital Pazarlama Uzmanı</strong> - İstanbul (Tam/Yarı zamanlı)</li>
        <li><strong>Müşteri Temsilcisi</strong> - İstanbul Mağaza (Tam zamanlı)</li>
      </ul>
      
      <h3>Nasıl Başvurabilirim?</h3>
      <p>CV ve portföyünüzü <a href="mailto:kariyer@noir.com.tr">kariyer@noir.com.tr</a> adresine gönderebilirsiniz.</p>
      
      <h3>Çalışan Avantajları</h3>
      <ul>
        <li>Rekabetçi maaş ve performans primi</li>
        <li>Ürünlerde çalışan indirimi</li>
        <li>Eğitim ve gelişim programları</li>
        <li>Sağlık sigortası</li>
        <li>Esnek çalışma saatleri</li>
      </ul>
    `,
    footerContent: 'Noir, fırsat eşitliğine inanan bir işverendir.',
  },
};

// Export types for TypeScript
export type Content = typeof content;
export type Product = (typeof products)[number];

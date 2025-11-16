const content = {
  // Site metadata
  site: {
    name: "NOIR",
    tagline: "Zamanın ötesinde takı deneyimi.",
    description: "Lüks takı koleksiyonu. Ay döngüleri, Virgo, lale ve Şahmeran motifleriyle özel tasarımlar."
  },
  // Navigation
  nav: {
    kolye: "Kolye",
    bilezik: "Bilezik",
    yuzuk: "Yüzük",
    kupe: "Küpe",
    sahmeran: "Şahmeran",
    tokalar: "Yetişkin Tokaları",
    fular: "Fular"
  },
  // Home page
  home: {
    hero: {
      title: "NOIR",
      subtitle: "Zamanın Ötesinde<br />Takı Deneyimi",
      description: "Her parça, zarafet ve işçiliğin mükemmel birleşimidir. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlar.",
      primaryCta: "Koleksiyonu Keşfet",
      secondaryCta: "Hikayemizi Oku"
    },
    featured: {
      title: "Öne Çıkan Koleksiyon",
      subtitle: "En sevilen parçalarımızdan bir seçki"
    },
    whyNoir: {
      title: "Neden Noir?",
      sections: [
        {
          icon: "✨",
          title: "Özel Tasarım",
          description: "Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir."
        },
        {
          icon: "🔨",
          title: "Kaliteli İşçilik",
          description: "En kaliteli malzemeler ve geleneksel zanaatkarlık ile modern tasarımın buluşması."
        },
        {
          icon: "💎",
          title: "Anlamlı Tasarımlar",
          description: "Ay döngüleri, Virgo, lale ve Şahmeran gibi motiflerle örülü hikayeler."
        }
      ]
    },
    motifs: {
      title: "Tasarım Motifleri",
      subtitle: "Her koleksiyonumuz, derin anlamlar taşıyan motiflerle bezenmiştir",
      items: [
        {
          name: "Ay Döngüleri",
          description: "Zamanın ritmini yansıtan tasarımlar"
        },
        {
          name: "Virgo",
          description: "Zarafet ve mükemmellik arayışı"
        },
        {
          name: "Lale",
          description: "Türk kültürünün simgesi"
        },
        {
          name: "Şahmeran",
          description: "Efsanevi güç ve zarafet"
        }
      ]
    },
    newsletter: {
      title: "Yeni Koleksiyonlardan Haberdar Olun",
      description: "Özel indirimler ve yeni tasarımlar hakkında ilk siz haberdar olun.",
      placeholder: "E-posta adresiniz",
      button: "Abone Ol"
    }
  },
  // Footer
  footer: {
    description: "Zamanın ötesinde takı deneyimi.",
    sections: {
      corporate: {
        title: "Kurumsal",
        links: [
          { text: "Hakkımızda", href: "/about" },
          { text: "İletişim", href: "/contact" },
          { text: "Kariyer", href: "/careers" }
        ]
      },
      customerService: {
        title: "Müşteri Hizmetleri",
        links: [
          { text: "Kargo ve Teslimat", href: "/shipping" },
          { text: "İade ve Değişim", href: "/returns" },
          { text: "Sık Sorulan Sorular", href: "/faq" }
        ]
      },
      legal: {
        title: "Yasal",
        links: [
          { text: "Gizlilik Politikası", href: "/privacy" },
          { text: "Kullanım Koşulları", href: "/terms" },
          { text: "Çerez Politikası", href: "/cookie" }
        ]
      }
    },
    copyright: "Tüm hakları saklıdır."
  },
  // Common UI
  ui: {
    addToCart: "Sepete Ekle",
    discover: "Keşfet",
    outOfStock: "Stokta Yok",
    cart: "Sepet",
    favorites: "Favoriler",
    backToHome: "Ana Sayfaya Dön",
    productNotFound: "Ürün Bulunamadı",
    productNotFoundDescription: "Aradığınız ürün bulunamadı veya kaldırılmış olabilir.",
    noProductsInCategory: "Bu kategoride henüz ürün bulunmamaktadır.",
    addedToCart: "Ürün sepete eklendi.",
    continueShopping: "Alışverişe Devam Et",
    proceedToCheckout: "Ödemeye Geç",
    myBasket: "Sepetiniz",
    emptyCart: "Sepetiniz şu anda boş.",
    emptyCartDescription: "Zamanın ötesinde takı deneyimi için sepetinizi oluşturun.",
    total: "Toplam",
    quantity: "Adet",
    signIn: "Giriş Yap",
    signUp: "Kayıt Ol",
    email: "E-posta",
    password: "Şifre",
    loginTitle: "Hesabınıza Giriş Yapın",
    registerTitle: "Yeni Hesap Oluşturun",
    alreadyHaveAccount: "Zaten hesabınız var mı?",
    dontHaveAccount: "Hesabınız yok mu?"
  },
  // Product details
  product: {
    material: {
      title: "Malzeme",
      description: "Altın kaplama veya gümüş, özel tasarım detayları ile."
    },
    care: {
      title: "Bakım",
      description: "Yumuşak bir bez ile temizleyin. Su ve kimyasallardan uzak tutun."
    },
    related: {
      title: "Benzer Ürünler"
    }
  }
};
export {
  content as c
};

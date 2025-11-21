-- Jxion Database Schema
-- PostgreSQL 15+ compatible
-- Created for noir-crafted e-commerce and content management

-- =============================================================================
-- PRODUCTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  long_description TEXT,
  material VARCHAR(500),
  dimensions VARCHAR(500),
  weight VARCHAR(100),
  care TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  image VARCHAR(1000),
  images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for category and featured searches
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX idx_products_in_stock ON products(in_stock) WHERE in_stock = true;

-- =============================================================================
-- SEED DATA: NOIR CRAFTED PRODUCTS
-- =============================================================================
INSERT INTO products (id, name, category, price, description, long_description, material, dimensions, weight, care, in_stock, featured, image, images, features, tags) VALUES
('ay-dongusu-kolye', 'Ay Döngüsü Kolye', 'kolye', 1299.00, 'Ayın evrelerinden ilham alan zarif kolye. Her faz, kadınlığın farklı bir gücünü temsil eder.', 'Ay Döngüsü Kolye, zamanın döngüsel doğasını ve kadınlığın güçlü enerjisini yansıtan özel bir tasarımdır. Sterling gümüş üzerine 14 ayar altın kaplama ile özenle üretilmiştir. Ayın dolunay, hilal ve yeni ay fazları, el işçiliği ile detaylandırılmıştır.', 'Sterling Gümüş, 14 Ayar Altın Kaplama', '45cm zincir uzunluğu, 2.5cm kolye ucu', '12g', 'Yumuşak bir bezle nazikçe temizleyin. Su ve kimyasallardan uzak tutun. Kullanılmadığında kutusunda saklayın.', true, true, '/images/products/ay-dongusu-kolye-1.jpg', '[ "/images/products/ay-dongusu-kolye-1.jpg", "/images/products/ay-dongusu-kolye-2.jpg", "/images/products/ay-dongusu-kolye-3.jpg" ]'::jsonb, '["El işçiliği", "Premium gümüş", "Altın kaplama", "Ömür boyu garanti"]'::jsonb, '["ay", "kolye", "gümüş", "altın kaplama", "kadın"]'::jsonb),

('virgo-yuzuk', 'Virgo Yüzük', 'yuzuk', 899.00, 'Başak burcunun zarafetini yansıtan özel tasarım yüzük. Mükemmellik ve detay.', 'Virgo Yüzük, Başak burcunun mükemmellik arayışını ve zarif doğasını simgeler. Her detayı özenle işlenmiş bu yüzük, 18 ayar altın kaplama ve doğal zirkon taşlarla süslenmiştir. Burç sembolü el gravürü ile kazınmıştır.', '925 Ayar Gümüş, 18 Ayar Altın Kaplama, Doğal Zirkon', 'Ayarlanabilir (52-58 numara arası)', '8g', 'Temizlik için özel mücevher temizleme solüsyonu kullanın. Darbelere karşı dikkatli olun.', true, true, '/images/products/virgo-yuzuk-1.jpg', '[ "/images/products/virgo-yuzuk-1.jpg", "/images/products/virgo-yuzuk-2.jpg" ]'::jsonb, '["El gravürü", "Doğal zirkon", "Ayarlanabilir beden", "Özel kutuda"]'::jsonb, '["virgo", "başak", "yüzük", "burç", "zirkon"]'::jsonb),

('lale-bilezik', 'Lale Motifli Bilezik', 'bilezik', 1599.00, 'Türk kültürünün simgesi lale motifleriyle bezeli zarif bilezik.', 'Lale Motifli Bilezik, Osmanlı sanatının en zarif motifi olan laleyi modern bir yorumla sunar. Her lale yaprağı ayrı ayrı işlenmiş, ince filigran tekniği ile detaylandırılmıştır. 22 ayar altın kaplama ile lüks bir parlaklık.', '925 Ayar Gümüş, 22 Ayar Altın Kaplama, Filigran İşçilik', '18cm uzunluk, ayarlanabilir', '15g', 'Parfüm ve krem uygulandıktan sonra takın. Nemden uzak tutun.', true, true, '/images/products/lale-bilezik-1.jpg', '[ "/images/products/lale-bilezik-1.jpg", "/images/products/lale-bilezik-2.jpg", "/images/products/lale-bilezik-3.jpg" ]'::jsonb, '["Filigran işçilik", "Türk motifi", "Ayarlanabilir", "El yapımı"]'::jsonb, '["lale", "bilezik", "türk", "osmanlı", "filigran"]'::jsonb),

('sahmeran-kupe', 'Şahmeran Koleksiyonu Küpe', 'kupe', 1199.00, 'Efsanevi Şahmeran''dan ilham alan muhteşem küpe tasarımı. Güç ve zarafet.', 'Şahmeran Küpe, Anadolu efsanelerinin güçlü kadın figürü Şahmeran''dan ilham alır. Yılan motifleri, yeşil oniks taşları ve altın işlemelerle bezeli bu küpe, güç ve zarafeti bir arada sunar.', '18 Ayar Altın, Doğal Yeşil Oniks, El İşlemesi', '4cm uzunluk, 1.5cm genişlik', '10g (çift)', 'Sık kullanımdan sonra yumuşak bezle silin. Taş kısımlarını ayrı temizleyin.', true, true, '/images/products/sahmeran-kupe-1.jpg', '[ "/images/products/sahmeran-kupe-1.jpg", "/images/products/sahmeran-kupe-2.jpg" ]'::jsonb, '["Doğal oniks", "El işlemesi", "Efsane motifi", "Lüks paket"]'::jsonb, '["şahmeran", "küpe", "efsane", "oniks", "altın"]'::jsonb),

('zarif-toka-seti', 'Zarif Toka Seti', 'aksesuar', 599.00, 'Yetişkin kadınlar için özel tasarlanmış zarif toka seti.', 'Zarif Toka Seti, günlük şıklığınıza zarafet katar. İnci detaylı 3''lü set, hem klasik hem modern kombinasyonlara uyum sağlar. Nickel free metal ve el dikişli inci montajı.', 'Nickel Free Metal, Doğal İnci, El Dikişli', '3 adet: 5cm, 7cm, 9cm', '20g (set)', 'Islak bezle silin. İncileri sert yüzeylere sürtmeyin.', true, false, '/images/products/toka-seti-1.jpg', '[ "/images/products/toka-seti-1.jpg" ]'::jsonb, '["İnci detay", "3''lü set", "Nickel free", "Günlük kullanım"]'::jsonb, '["toka", "aksesuar", "inci", "set"]'::jsonb),

('ipek-fular', 'İpek Fular - Özel Tasarım', 'aksesuar', 799.00, 'Lüks ipekten üretilmiş özel tasarım fular. Her mevsim için şık aksesuar.', 'İpek Fular, %100 doğal ipekten üretilmiş, dijital baskı ile desenlendirilmiş lüks bir aksesuar. Ay ve yıldız motifleri Noir''ın imzası taşır. 90x90cm standart kare kesim.', '%100 Doğal İpek, Dijital Baskı', '90cm x 90cm', '50g', 'Kuru temizleme önerilir. Düşük ısıda ütülenebilir.', true, false, '/images/products/fular-1.jpg', '[ "/images/products/fular-1.jpg", "/images/products/fular-2.jpg" ]'::jsonb, '["%100 ipek", "Dijital baskı", "Kare kesim", "Özel desenli"]'::jsonb, '["fular", "ipek", "aksesuar", "desen"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(500),
  password_hash VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- =============================================================================
-- ORDERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipping_address JSONB,
  payment_info JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- =============================================================================
-- ORDER ITEMS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON orders(id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- =============================================================================
-- CONTENT TABLE (for ContentManager)
-- =============================================================================
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  path VARCHAR(500) UNIQUE NOT NULL,
  data JSONB NOT NULL,
  checksum VARCHAR(64),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_path ON content(path);

-- Seed initial content
INSERT INTO content (path, data, checksum) VALUES
('noir-crafted/content.json', '{}'::jsonb, '')
ON CONFLICT (path) DO NOTHING;

-- =============================================================================
-- FAVORITES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- =============================================================================
-- CART TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id VARCHAR(255) REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);

-- =============================================================================
-- NEWSLETTER SUBSCRIBERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT true
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- =============================================================================
-- UPDATE TIMESTAMPS TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


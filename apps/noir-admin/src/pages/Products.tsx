import { useState } from 'react';
import { Edit, Plus, X } from 'lucide-react';
import { products as initialProducts, Product } from '../data';
import { formatCurrency } from '../utils/format';
import { content } from '../lib/content';
import styles from './Products.module.scss';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Kolye' as Product['category'],
    metal: 'Altın Kaplama' as Product['metal'],
    price: '',
    stock: '',
    status: 'Active' as Product['status'],
    description: '',
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        metal: product.metal,
        price: product.price.toString(),
        stock: product.stock.toString(),
        status: product.status,
        description: product.description || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Kolye',
        metal: 'Altın Kaplama',
        price: '',
        stock: '',
        status: 'Active',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                metal: formData.metal,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                status: formData.status,
                description: formData.description,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: formData.name,
        category: formData.category,
        metal: formData.metal,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status,
        image:
          'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
        description: formData.description,
      };
      setProducts([...products, newProduct]);
    }

    handleCloseModal();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerContentTitle}>
            {content.products.title}
          </h1>
          <p className={styles.headerContentSubtitle}>
            {content.products.subtitle}
          </p>
        </div>
        <button onClick={() => handleOpenModal()} className={styles.addButton}>
          <Plus size={20} />
          {content.products.addNew}
        </button>
      </div>

      {/* Products Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Image</th>
                <th className={styles.tableHeaderCell}>Product Name</th>
                <th className={styles.tableHeaderCell}>Category</th>
                <th className={styles.tableHeaderCell}>Metal Type</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Price
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Stock
                </th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--center']}`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--bold']}`}
                  >
                    {product.name}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--muted']}`}
                  >
                    {product.category}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--muted']}`}
                  >
                    {product.metal}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--bold']}`}
                  >
                    {formatCurrency(product.price)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']}`}
                  >
                    {product.stock}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        product.status === 'Active'
                          ? styles['statusBadge--active']
                          : styles['statusBadge--hidden']
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--center']}`}
                  >
                    <button
                      onClick={() => handleOpenModal(product)}
                      className={styles.actionButton}
                      aria-label="Edit product"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingProduct ? 'Edit Product' : 'Yeni Ürün Ekle'}
              </h2>
              <button
                onClick={handleCloseModal}
                className={styles.modalCloseButton}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className={styles.formSelect}
                  >
                    <option value="Kolye">Kolye</option>
                    <option value="Bileklik">Bileklik</option>
                    <option value="Yüzük">Yüzük</option>
                    <option value="Küpe">Küpe</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Metal Type</label>
                  <select
                    value={formData.metal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metal: e.target.value as Product['metal'],
                      })
                    }
                    className={styles.formSelect}
                  >
                    <option value="Altın Kaplama">Altın Kaplama</option>
                    <option value="Gümüş">Gümüş</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Price (₺)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Stock</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Product['status'],
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="Active">Active</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Upload Image (Mock)</label>
                <div className={styles.uploadArea}>
                  <p className={styles.uploadText}>
                    Image upload functionality would be implemented here
                  </p>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

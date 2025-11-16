import { useState } from "react";
import { Edit, Plus, X } from "lucide-react";
import { products as initialProducts, Product } from "../data";
import { formatCurrency } from "../utils/format";
import { content } from "../lib/content";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Kolye" as Product["category"],
    metal: "Altın Kaplama" as Product["metal"],
    price: "",
    stock: "",
    status: "Active" as Product["status"],
    description: "",
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
        description: product.description || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "Kolye",
        metal: "Altın Kaplama",
        price: "",
        stock: "",
        status: "Active",
        description: "",
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
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        description: formData.description,
      };
      setProducts([...products, newProduct]);
    }

    handleCloseModal();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
            {content.products.title}
          </h1>
          <p className="text-noir-gray-600 font-sans">
            {content.products.subtitle}
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-noir-gold hover:bg-[#FFC700] text-noir-black rounded-lg font-sans font-semibold transition-all duration-200 shadow-lg shadow-noir-gold/30"
        >
          <Plus size={20} />
          {content.products.addNew}
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md border border-noir-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-noir-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Image
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Product Name
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Category
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Metal Type
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Price
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Stock
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Status
                </th>
                <th className="text-center py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-gray-600">
                    {product.category}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-gray-600">
                    {product.metal}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black text-right">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-black text-right">
                    {product.stock}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-2 text-noir-gray-600 hover:text-noir-gold hover:bg-noir-gold/10 rounded-lg transition-all duration-200"
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-noir-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-noir-black">
                {editingProduct ? "Edit Product" : "Yeni Ürün Ekle"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-noir-gray-400 hover:text-noir-black transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Product["category"],
                      })
                    }
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                  >
                    <option value="Kolye">Kolye</option>
                    <option value="Bileklik">Bileklik</option>
                    <option value="Yüzük">Yüzük</option>
                    <option value="Küpe">Küpe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                    Metal Type
                  </label>
                  <select
                    value={formData.metal}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metal: e.target.value as Product["metal"],
                      })
                    }
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                  >
                    <option value="Altın Kaplama">Altın Kaplama</option>
                    <option value="Gümüş">Gümüş</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                    Price (₺)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Product["status"],
                    })
                  }
                  className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                >
                  <option value="Active">Active</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-sans"
                />
              </div>

              <div>
                <label className="block text-sm font-sans font-semibold text-noir-black mb-2">
                  Upload Image (Mock)
                </label>
                <div className="border-2 border-dashed border-noir-gray-300 rounded-lg p-8 text-center">
                  <p className="text-noir-gray-500 font-sans text-sm">
                    Image upload functionality would be implemented here
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-noir-gray-300 text-noir-black rounded-lg font-sans font-semibold hover:bg-noir-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-noir-gold hover:bg-[#FFC700] text-noir-black rounded-lg font-sans font-semibold transition-all duration-200 shadow-lg shadow-noir-gold/30"
                >
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

import { useState } from "react";
import { Eye, X } from "lucide-react";
import { orders as initialOrders, Order } from "../data";
import { formatCurrency, formatDate } from "../utils/format";
import { content } from "../lib/content";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleMarkAsDelivered = (orderId: number) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "Delivered" as const } : o
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: "Delivered" as const });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
          {content.orders.title}
        </h1>
        <p className="text-noir-gray-600 font-sans">
          {content.orders.subtitle}
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md border border-noir-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-noir-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Customer Name
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Product Count
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Total
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Payment Status
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Date
                </th>
                <th className="text-center py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black">
                    #{order.id}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-black">
                    {order.customer}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-black text-right">
                    {order.items}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black text-right">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                        order.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Delivered"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-gray-600">
                    {order.date}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="p-2 text-noir-gray-600 hover:text-noir-gold hover:bg-noir-gold/10 rounded-lg transition-all duration-200"
                      aria-label="View order details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-noir-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-noir-black">
                Order #{selectedOrder.id} Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 text-noir-gray-400 hover:text-noir-black transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-noir-black mb-4">
                  Customer Information
                </h3>
                <div className="bg-noir-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Name:
                    </span>
                    <span className="font-sans text-sm font-semibold text-noir-black">
                      {selectedOrder.customer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Email:
                    </span>
                    <span className="font-sans text-sm text-noir-black">
                      {selectedOrder.customerEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Date:
                    </span>
                    <span className="font-sans text-sm text-noir-black">
                      {formatDate(selectedOrder.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-noir-black mb-4">
                  Products
                </h3>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-noir-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-sans text-sm font-semibold text-noir-black">
                          {product.name}
                        </p>
                        <p className="font-sans text-xs text-noir-gray-600">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                      <p className="font-sans text-sm font-semibold text-noir-black">
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-noir-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-base text-noir-gray-700">
                      Subtotal:
                    </span>
                    <span className="font-sans text-base text-noir-black">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-base text-noir-gray-700">
                      Status:
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                        selectedOrder.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : selectedOrder.status === "Delivered"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-noir-gray-200">
                    <span className="font-sans text-lg font-bold text-noir-black">
                      Total:
                    </span>
                    <span className="font-serif text-xl font-bold text-noir-black">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedOrder.status !== "Delivered" && (
                <div className="pt-4">
                  <button
                    onClick={() => handleMarkAsDelivered(selectedOrder.id)}
                    className="w-full px-6 py-3 bg-noir-gold hover:bg-[#FFC700] text-noir-black rounded-lg font-sans font-semibold transition-all duration-200 shadow-lg shadow-noir-gold/30"
                  >
                    Teslim Edildi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

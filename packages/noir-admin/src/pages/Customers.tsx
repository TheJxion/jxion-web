import { useState } from "react";
import { Eye, X } from "lucide-react";
import { customers, orders } from "../data";
import { formatCurrency, formatDate } from "../utils/format";
import { content } from "../lib/content";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<
    (typeof customers)[0] | null
  >(null);

  const handleViewDetails = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  const getCustomerOrders = (customerEmail: string) => {
    return orders.filter((order) => order.customerEmail === customerEmail);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
          {content.customers.title}
        </h1>
        <p className="text-noir-gray-600 font-sans">
          {content.customers.subtitle}
        </p>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md border border-noir-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-noir-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Name
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Email
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Total Orders
                </th>
                <th className="text-right py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Lifetime Value
                </th>
                <th className="text-left py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Member Since
                </th>
                <th className="text-center py-4 px-6 font-sans text-sm font-semibold text-noir-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black">
                    {customer.name}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-gray-600">
                    {customer.email}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-black text-right">
                    {customer.totalOrders}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm font-semibold text-noir-black text-right">
                    {formatCurrency(customer.lifetimeValue)}
                  </td>
                  <td className="py-4 px-6 font-sans text-sm text-noir-gray-600">
                    {formatDate(customer.memberSince)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleViewDetails(customer)}
                      className="p-2 text-noir-gray-600 hover:text-noir-gold hover:bg-noir-gold/10 rounded-lg transition-all duration-200"
                      aria-label="View customer details"
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-noir-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-noir-black">
                Customer Details
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
                <div className="bg-noir-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Name:
                    </span>
                    <span className="font-sans text-sm font-semibold text-noir-black">
                      {selectedCustomer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Email:
                    </span>
                    <span className="font-sans text-sm text-noir-black">
                      {selectedCustomer.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Member Since:
                    </span>
                    <span className="font-sans text-sm text-noir-black">
                      {formatDate(selectedCustomer.memberSince)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Total Orders:
                    </span>
                    <span className="font-sans text-sm font-semibold text-noir-black">
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-noir-gray-600">
                      Lifetime Value:
                    </span>
                    <span className="font-sans text-sm font-semibold text-noir-gold">
                      {formatCurrency(selectedCustomer.lifetimeValue)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-noir-black mb-4">
                  Recent Orders
                </h3>
                <div className="space-y-3">
                  {getCustomerOrders(selectedCustomer.email).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-noir-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-sans text-sm font-semibold text-noir-black">
                          Order #{order.id}
                        </p>
                        <p className="font-sans text-xs text-noir-gray-600">
                          {formatDate(order.date)} • {order.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-sm font-semibold text-noir-black">
                          {formatCurrency(order.total)}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-sans font-medium ${
                            order.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Delivered"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

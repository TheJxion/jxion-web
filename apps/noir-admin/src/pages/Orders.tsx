import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { orders as initialOrders, Order } from '../data';
import { formatCurrency, formatDate } from '../utils/format';
import { content } from '../lib/content';
import styles from './Orders.module.scss';

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
        o.id === orderId ? { ...o, status: 'Delivered' as const } : o
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: 'Delivered' as const });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{content.orders.title}</h1>
        <p className={styles.headerSubtitle}>{content.orders.subtitle}</p>
      </div>

      {/* Orders Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Order ID</th>
                <th className={styles.tableHeaderCell}>Customer Name</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Product Count
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Total
                </th>
                <th className={styles.tableHeaderCell}>Payment Status</th>
                <th className={styles.tableHeaderCell}>Date</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--center']}`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--bold']}`}
                  >
                    #{order.id}
                  </td>
                  <td className={styles.tableCell}>{order.customer}</td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']}`}
                  >
                    {order.items}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--bold']}`}
                  >
                    {formatCurrency(order.total)}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${
                        order.status === 'Paid'
                          ? styles['statusBadge--paid']
                          : order.status === 'Delivered'
                          ? styles['statusBadge--delivered']
                          : styles['statusBadge--pending']
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--muted']}`}
                  >
                    {order.date}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--center']}`}
                  >
                    <button
                      onClick={() => handleViewDetails(order)}
                      className={styles.actionButton}
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
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Order #{selectedOrder.id} Details
              </h2>
              <button
                onClick={handleCloseModal}
                className={styles.modalCloseButton}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalContent}>
              {/* Customer Info */}
              <div>
                <h3 className={styles.sectionTitle}>Customer Information</h3>
                <div className={styles.infoCard}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Name:</span>
                    <span className={styles.infoRowValue}>
                      {selectedOrder.customer}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Email:</span>
                    <span className={styles.infoRowValue}>
                      {selectedOrder.customerEmail}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Date:</span>
                    <span className={styles.infoRowValue}>
                      {formatDate(selectedOrder.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className={styles.sectionTitle}>Products</h3>
                <div className={styles.productList}>
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                      <div>
                        <p className={styles.productInfoName}>{product.name}</p>
                        <p className={styles.productInfoMeta}>
                          Quantity: {product.quantity}
                        </p>
                      </div>
                      <p className={styles.productPrice}>
                        {formatCurrency(product.price * product.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryRowLabel}>Subtotal:</span>
                  <span className={styles.summaryRowValue}>
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryRowLabel}>Status:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      selectedOrder.status === 'Paid'
                        ? styles['statusBadge--paid']
                        : selectedOrder.status === 'Delivered'
                        ? styles['statusBadge--delivered']
                        : styles['statusBadge--pending']
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div
                  className={`${styles.summaryRow} ${styles['summaryRow--total']}`}
                >
                  <span className={styles.summaryRowLabel}>Total:</span>
                  <span className={styles.summaryRowValue}>
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {selectedOrder.status !== 'Delivered' && (
                <button
                  onClick={() => handleMarkAsDelivered(selectedOrder.id)}
                  className={styles.actionButtonFull}
                >
                  Teslim Edildi
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { customers, orders } from '../data';
import { formatCurrency, formatDate } from '../utils/format';
import { content } from '../lib/content';
import styles from './Customers.module.scss';

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
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{content.customers.title}</h1>
        <p className={styles.headerSubtitle}>{content.customers.subtitle}</p>
      </div>

      {/* Customers Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Name</th>
                <th className={styles.tableHeaderCell}>Email</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Total Orders
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Lifetime Value
                </th>
                <th className={styles.tableHeaderCell}>Member Since</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--center']}`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--bold']}`}
                  >
                    {customer.name}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--muted']}`}
                  >
                    {customer.email}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']}`}
                  >
                    {customer.totalOrders}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--bold']}`}
                  >
                    {formatCurrency(customer.lifetimeValue)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--muted']}`}
                  >
                    {formatDate(customer.memberSince)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--center']}`}
                  >
                    <button
                      onClick={() => handleViewDetails(customer)}
                      className={styles.actionButton}
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
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Customer Details</h2>
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
                      {selectedCustomer.name}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Email:</span>
                    <span className={styles.infoRowValue}>
                      {selectedCustomer.email}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Member Since:</span>
                    <span className={styles.infoRowValue}>
                      {formatDate(selectedCustomer.memberSince)}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Total Orders:</span>
                    <span className={styles.infoRowValue}>
                      {selectedCustomer.totalOrders}
                    </span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoRowLabel}>Lifetime Value:</span>
                    <span className={styles.infoRowValueGold}>
                      {formatCurrency(selectedCustomer.lifetimeValue)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h3 className={styles.sectionTitle}>Recent Orders</h3>
                <div className={styles.orderList}>
                  {getCustomerOrders(selectedCustomer.email).map((order) => (
                    <div key={order.id} className={styles.orderItem}>
                      <div>
                        <p className={styles.orderInfoTitle}>
                          Order #{order.id}
                        </p>
                        <p className={styles.orderInfoMeta}>
                          {formatDate(order.date)} • {order.items} items
                        </p>
                      </div>
                      <div className={styles.orderDetails}>
                        <p className={styles.orderPrice}>
                          {formatCurrency(order.total)}
                        </p>
                        <span
                          className={`${styles.orderStatus} ${
                            order.status === 'Paid'
                              ? styles['orderStatus--paid']
                              : order.status === 'Delivered'
                              ? styles['orderStatus--delivered']
                              : styles['orderStatus--pending']
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

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';
import { sales, orders, products } from '../data';
import { formatCurrency, formatPercentage } from '../utils/format';
import { content } from '../lib/content';
import styles from './Dashboard.module.scss';

export default function Dashboard() {
  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const activeProducts = products.filter(p => p.status === 'Active').length;
    
    // Calculate monthly revenue growth
    const lastMonth = sales[sales.length - 1].revenue;
    const previousMonth = sales[sales.length - 2].revenue;
    const growth = ((lastMonth - previousMonth) / previousMonth) * 100;

    return {
      totalSales,
      totalOrders,
      activeProducts,
      growth,
    };
  }, []);

  const topSellingProducts = useMemo(() => {
    // Calculate top selling products from orders
    const productSales: Record<number, { name: string; category: string; sales: number; revenue: number }> = {};
    
    orders.forEach(order => {
      order.products.forEach(product => {
        if (!productSales[product.id]) {
          const productData = products.find(p => p.id === product.id);
          productSales[product.id] = {
            name: productData?.name || product.name,
            category: productData?.category || '',
            sales: 0,
            revenue: 0,
          };
        }
        productSales[product.id].sales += product.quantity;
        productSales[product.id].revenue += product.price * product.quantity;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, []);

  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, []);

  const kpiCards = [
    {
      title: content.dashboard.kpi.totalSales,
      value: formatCurrency(stats.totalSales),
      icon: DollarSign,
      iconClass: styles['kpiIcon--gold'],
    },
    {
      title: content.dashboard.kpi.totalOrders,
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      iconClass: styles['kpiIcon--blue'],
    },
    {
      title: content.dashboard.kpi.activeProducts,
      value: stats.activeProducts.toString(),
      icon: Package,
      iconClass: styles['kpiIcon--green'],
    },
    {
      title: content.dashboard.kpi.monthlyRevenueGrowth,
      value: formatPercentage(stats.growth),
      icon: TrendingUp,
      iconClass: stats.growth >= 0 ? styles['kpiIcon--green'] : styles['kpiIcon--red'],
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          {content.dashboard.title}
        </h1>
        <p className={styles.headerSubtitle}>
          {content.dashboard.subtitle}
        </p>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={styles.kpiCard}
            >
              <div className={styles.kpiHeader}>
                <div className={card.iconClass}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className={styles.kpiTitle}>
                {card.title}
              </h3>
              <p className={styles.kpiValue}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables Grid */}
      <div className={styles.contentGrid}>
        {/* Sales Overview Chart */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {content.dashboard.salesOverview}
          </h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis 
                dataKey="month" 
                stroke="#737373"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#737373"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#FFD700" 
                strokeWidth={3}
                dot={{ fill: '#FFD700', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {content.dashboard.topSellingProducts}
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>
                    {content.dashboard.table.product}
                  </th>
                  <th className={styles.tableHeaderCell}>
                    {content.dashboard.table.category}
                  </th>
                  <th className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}>
                    {content.dashboard.table.sales}
                  </th>
                  <th className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}>
                    {content.dashboard.table.revenue}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      {product.name}
                    </td>
                    <td className={`${styles.tableCell} ${styles['tableCell--muted']}`}>
                      {product.category}
                    </td>
                    <td className={`${styles.tableCell} ${styles['tableCell--right']}`}>
                      {product.sales}
                    </td>
                    <td className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--bold']}`}>
                      {formatCurrency(product.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          {content.dashboard.recentOrders}
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>
                  {content.dashboard.table.orderId}
                </th>
                <th className={styles.tableHeaderCell}>
                  {content.dashboard.table.customer}
                </th>
                <th className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}>
                  {content.dashboard.table.total}
                </th>
                <th className={styles.tableHeaderCell}>
                  {content.dashboard.table.date}
                </th>
                <th className={styles.tableHeaderCell}>
                  {content.dashboard.table.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    #{order.id}
                  </td>
                  <td className={styles.tableCell}>
                    {order.customer}
                  </td>
                  <td className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--bold']}`}>
                    {formatCurrency(order.total)}
                  </td>
                  <td className={`${styles.tableCell} ${styles['tableCell--muted']}`}>
                    {order.date}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


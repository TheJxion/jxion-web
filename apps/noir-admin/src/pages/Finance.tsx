import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { sales, orders } from '../data';
import { formatCurrency, formatPercentage } from '../utils/format';
import { content } from '../lib/content';
import styles from './Finance.module.scss';

const COLORS = ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4'];

export default function Finance() {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  const financeStats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const monthlyAverage =
      sales.reduce((sum, s) => sum + s.revenue, 0) / sales.length;
    const lastMonth = sales[sales.length - 1].revenue;
    const previousMonth = sales[sales.length - 2].revenue;
    const growth = ((lastMonth - previousMonth) / previousMonth) * 100;
    const returnsRate = 2.5; // Mock returns rate

    return {
      totalRevenue,
      monthlyAverage,
      growth,
      returnsRate,
    };
  }, []);

  const expenseData = [
    { name: 'Product Costs', value: 45000 },
    { name: 'Marketing', value: 15000 },
    { name: 'Logistics', value: 8000 },
    { name: 'Taxes', value: 12000 },
  ];

  const profitData = useMemo(() => {
    return sales.map((sale) => {
      const expenses =
        expenseData.reduce((sum, e) => sum + e.value, 0) / sales.length;
      const profit = sale.revenue - expenses;
      const margin = (profit / sale.revenue) * 100;
      return {
        month: sale.month,
        revenue: sale.revenue,
        expense: expenses,
        profit: profit,
        margin: margin,
      };
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerContentTitle}>{content.finance.title}</h1>
          <p className={styles.headerContentSubtitle}>
            {content.finance.subtitle}
          </p>
        </div>
        <div className={styles.viewToggle}>
          <button
            onClick={() => setViewMode('monthly')}
            className={`${styles.toggleButton} ${
              viewMode === 'monthly' ? styles['toggleButton--active'] : ''
            }`}
          >
            {content.finance.monthly}
          </button>
          <button
            onClick={() => setViewMode('yearly')}
            className={`${styles.toggleButton} ${
              viewMode === 'yearly' ? styles['toggleButton--active'] : ''
            }`}
          >
            {content.finance.yearly}
          </button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Total Revenue</h3>
          <p className={styles.statValue}>
            {formatCurrency(financeStats.totalRevenue)}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Monthly Average</h3>
          <p className={styles.statValue}>
            {formatCurrency(financeStats.monthlyAverage)}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Growth</h3>
          <p
            className={`${styles.statValue} ${
              financeStats.growth >= 0
                ? styles['statValue--positive']
                : styles['statValue--negative']
            }`}
          >
            {formatPercentage(financeStats.growth)}
          </p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statLabel}>Returns Rate</h3>
          <p className={styles.statValue}>
            {formatPercentage(financeStats.returnsRate)}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className={styles.chartsGrid}>
        {/* Monthly Income Chart */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Monthly Income</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sales}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FFD700"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Expense Breakdown</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profit Overview Table */}
      <div className={styles.tableCard}>
        <h2 className={styles.tableTitle}>Profit Overview</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Month</th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Revenue
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Expense
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Profit
                </th>
                <th
                  className={`${styles.tableHeaderCell} ${styles['tableHeaderCell--right']}`}
                >
                  Margin %
                </th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((row, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{row.month}</td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']}`}
                  >
                    {formatCurrency(row.revenue)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${styles['tableCell--right']} ${styles['tableCell--muted']}`}
                  >
                    {formatCurrency(row.expense)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${
                      styles['tableCell--right']
                    } ${styles['tableCell--bold']} ${
                      row.profit >= 0
                        ? styles['tableCell--positive']
                        : styles['tableCell--negative']
                    }`}
                  >
                    {formatCurrency(row.profit)}
                  </td>
                  <td
                    className={`${styles.tableCell} ${
                      styles['tableCell--right']
                    } ${styles['tableCell--bold']} ${
                      row.margin >= 0
                        ? styles['tableCell--positive']
                        : styles['tableCell--negative']
                    }`}
                  >
                    {formatPercentage(row.margin)}
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

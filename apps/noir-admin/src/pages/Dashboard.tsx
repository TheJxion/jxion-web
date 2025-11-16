import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, ShoppingBag, DollarSign } from 'lucide-react';
import { sales, orders, products } from '../data';
import { formatCurrency, formatPercentage } from '../utils/format';
import { content } from '../lib/content';

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
      color: 'text-noir-gold',
      bgColor: 'bg-noir-gold/10',
    },
    {
      title: content.dashboard.kpi.totalOrders,
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: content.dashboard.kpi.activeProducts,
      value: stats.activeProducts.toString(),
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: content.dashboard.kpi.monthlyRevenueGrowth,
      value: formatPercentage(stats.growth),
      icon: TrendingUp,
      color: stats.growth >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.growth >= 0 ? 'bg-green-100' : 'bg-red-100',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
          {content.dashboard.title}
        </h1>
        <p className="text-noir-gray-600 font-sans">
          {content.dashboard.subtitle}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${card.color} w-6 h-6`} />
                </div>
              </div>
              <h3 className="text-sm font-sans text-noir-gray-600 mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-serif font-bold text-noir-black">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            {content.dashboard.salesOverview}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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

        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            {content.dashboard.topSellingProducts}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-noir-gray-200">
                  <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                    {content.dashboard.table.product}
                  </th>
                  <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                    {content.dashboard.table.category}
                  </th>
                  <th className="text-right py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                    {content.dashboard.table.sales}
                  </th>
                  <th className="text-right py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                    {content.dashboard.table.revenue}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                  >
                    <td className="py-3 px-2 font-sans text-sm text-noir-black">
                      {product.name}
                    </td>
                    <td className="py-3 px-2 font-sans text-sm text-noir-gray-600">
                      {product.category}
                    </td>
                    <td className="py-3 px-2 font-sans text-sm text-noir-black text-right">
                      {product.sales}
                    </td>
                    <td className="py-3 px-2 font-sans text-sm font-semibold text-noir-black text-right">
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
      <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
        <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
          {content.dashboard.recentOrders}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-noir-gray-200">
                <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                  {content.dashboard.table.orderId}
                </th>
                <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                  {content.dashboard.table.customer}
                </th>
                <th className="text-right py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                  {content.dashboard.table.total}
                </th>
                <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                  {content.dashboard.table.date}
                </th>
                <th className="text-left py-3 px-2 font-sans text-sm font-semibold text-noir-gray-700">
                  {content.dashboard.table.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                >
                  <td className="py-3 px-2 font-sans text-sm text-noir-black">
                    #{order.id}
                  </td>
                  <td className="py-3 px-2 font-sans text-sm text-noir-black">
                    {order.customer}
                  </td>
                  <td className="py-3 px-2 font-sans text-sm font-semibold text-noir-black text-right">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3 px-2 font-sans text-sm text-noir-gray-600">
                    {order.date}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                        order.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Delivered'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
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


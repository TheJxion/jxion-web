import { useState, useMemo } from "react";
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
} from "recharts";
import { sales, orders } from "../data";
import { formatCurrency, formatPercentage } from "../utils/format";
import { content } from "../lib/content";

const COLORS = ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4"];

export default function Finance() {
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");

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
    { name: "Product Costs", value: 45000 },
    { name: "Marketing", value: 15000 },
    { name: "Logistics", value: 8000 },
    { name: "Taxes", value: 12000 },
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noir-black mb-2">
            {content.finance.title}
          </h1>
          <p className="text-noir-gray-600 font-sans">
            {content.finance.subtitle}
          </p>
        </div>
        <div className="flex gap-2 bg-noir-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 ${
              viewMode === "monthly"
                ? "bg-noir-gold text-noir-black shadow-md"
                : "text-noir-gray-600 hover:text-noir-black"
            }`}
          >
            {content.finance.monthly}
          </button>
          <button
            onClick={() => setViewMode("yearly")}
            className={`px-4 py-2 rounded-md font-sans text-sm font-medium transition-all duration-200 ${
              viewMode === "yearly"
                ? "bg-noir-gold text-noir-black shadow-md"
                : "text-noir-gray-600 hover:text-noir-black"
            }`}
          >
            {content.finance.yearly}
          </button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h3 className="text-sm font-sans text-noir-gray-600 mb-2">
            Total Revenue
          </h3>
          <p className="text-2xl font-serif font-bold text-noir-black">
            {formatCurrency(financeStats.totalRevenue)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h3 className="text-sm font-sans text-noir-gray-600 mb-2">
            Monthly Average
          </h3>
          <p className="text-2xl font-serif font-bold text-noir-black">
            {formatCurrency(financeStats.monthlyAverage)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h3 className="text-sm font-sans text-noir-gray-600 mb-2">Growth</h3>
          <p
            className={`text-2xl font-serif font-bold ${
              financeStats.growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatPercentage(financeStats.growth)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h3 className="text-sm font-sans text-noir-gray-600 mb-2">
            Returns Rate
          </h3>
          <p className="text-2xl font-serif font-bold text-noir-black">
            {formatPercentage(financeStats.returnsRate)}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            Monthly Income
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#737373"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
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

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
          <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
            Expense Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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
                  backgroundColor: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit Overview Table */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
        <h2 className="text-xl font-serif font-semibold text-noir-black mb-6">
          Profit Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-noir-gray-200">
                <th className="text-left py-3 px-4 font-sans text-sm font-semibold text-noir-gray-700">
                  Month
                </th>
                <th className="text-right py-3 px-4 font-sans text-sm font-semibold text-noir-gray-700">
                  Revenue
                </th>
                <th className="text-right py-3 px-4 font-sans text-sm font-semibold text-noir-gray-700">
                  Expense
                </th>
                <th className="text-right py-3 px-4 font-sans text-sm font-semibold text-noir-gray-700">
                  Profit
                </th>
                <th className="text-right py-3 px-4 font-sans text-sm font-semibold text-noir-gray-700">
                  Margin %
                </th>
              </tr>
            </thead>
            <tbody>
              {profitData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-noir-gray-100 hover:bg-noir-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-sans text-sm text-noir-black">
                    {row.month}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-noir-black text-right">
                    {formatCurrency(row.revenue)}
                  </td>
                  <td className="py-3 px-4 font-sans text-sm text-noir-gray-600 text-right">
                    {formatCurrency(row.expense)}
                  </td>
                  <td
                    className={`py-3 px-4 font-sans text-sm font-semibold text-right ${
                      row.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(row.profit)}
                  </td>
                  <td
                    className={`py-3 px-4 font-sans text-sm font-semibold text-right ${
                      row.margin >= 0 ? "text-green-600" : "text-red-600"
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

'use client';

import { useEffect, useState } from 'react';
import {
  Package,
  IndianRupee,
  AlertTriangle,
  ShoppingCart,
  Truck,
  Factory,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusBadgeClass, getStatusLabel } from '@/lib/utils';
import Link from 'next/link';

interface DashboardData {
  totalProducts: number;
  inventoryValue: number;
  lowStockProducts: number;
  pendingSalesOrders: number;
  pendingPurchaseOrders: number;
  activeManufacturing: number;
  recentSalesOrders: Array<{
    id: number;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    customer: { name: string } | null;
  }>;
  recentPurchaseOrders: Array<{
    id: number;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    supplier: { name: string } | null;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-header-left">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Overview of your inventory operations</p>
          </div>
        </div>
        <div className="stat-cards">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="stat-card">
              <div className="skeleton" style={{ width: 44, height: 44 }} />
              <div className="stat-card-info">
                <div className="skeleton" style={{ width: 80, height: 12, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: 120, height: 24 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your inventory operations</p>
        </div>
        <div className="page-header-actions">
          <Link href="/sales" className="btn btn-primary" id="dashboard-new-sale">
            <ShoppingCart /> New Sale Order
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card" id="stat-total-products">
          <div className="stat-card-icon blue">
            <Package size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Total Products</div>
            <div className="stat-card-value">{data.totalProducts}</div>
          </div>
        </div>

        <div className="stat-card" id="stat-inventory-value">
          <div className="stat-card-icon green">
            <IndianRupee size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Inventory Value</div>
            <div className="stat-card-value currency">{formatCurrency(data.inventoryValue)}</div>
          </div>
        </div>

        <div className="stat-card" id="stat-low-stock">
          <div className="stat-card-icon red">
            <AlertTriangle size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Low Stock Items</div>
            <div className="stat-card-value">{data.lowStockProducts}</div>
            <div className="stat-card-trend">Below 50 units</div>
          </div>
        </div>

        <div className="stat-card" id="stat-pending-sales">
          <div className="stat-card-icon amber">
            <ShoppingCart size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Pending Sales</div>
            <div className="stat-card-value">{data.pendingSalesOrders}</div>
          </div>
        </div>

        <div className="stat-card" id="stat-pending-purchases">
          <div className="stat-card-icon purple">
            <Truck size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Pending Purchases</div>
            <div className="stat-card-value">{data.pendingPurchaseOrders}</div>
          </div>
        </div>

        <div className="stat-card" id="stat-active-mfg">
          <div className="stat-card-icon indigo">
            <Factory size={22} />
          </div>
          <div className="stat-card-info">
            <div className="stat-card-label">Active Manufacturing</div>
            <div className="stat-card-value">{data.activeManufacturing}</div>
            <div className="stat-card-trend">WIP Batches</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Sales */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} />
              Recent Sales Orders
            </div>
            <Link href="/sales" className="btn btn-ghost btn-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentSalesOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                    <td>{order.customer?.name || '—'}</td>
                    <td className="currency">{formatCurrency(order.totalAmount)}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.recentSalesOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: 24 }}>
                      No recent sales orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Truck size={16} />
              Recent Purchase Orders
            </div>
            <Link href="/purchases" className="btn btn-ghost btn-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Supplier</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentPurchaseOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600 }}>{order.orderNumber}</td>
                    <td>{order.supplier?.name || '—'}</td>
                    <td className="currency">{formatCurrency(order.totalAmount)}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.recentPurchaseOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: 24 }}>
                      No recent purchase orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

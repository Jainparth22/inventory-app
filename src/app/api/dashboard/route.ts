import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const [
    totalProducts,
    totalInventoryValue,
    lowStockProducts,
    pendingSalesOrders,
    pendingPurchaseOrders,
    activeManufacturing,
    recentSalesOrders,
    recentPurchaseOrders,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.aggregate({
      _sum: {
        price: true,
      },
    }),
    prisma.product.count({
      where: { quantity: { lt: 50 } },
    }),
    prisma.order.count({
      where: {
        type: 'sale',
        status: { not: 'completed' },
      },
    }),
    prisma.order.count({
      where: {
        type: 'purchase',
        status: { not: 'completed' },
      },
    }),
    prisma.manufacturing.count({
      where: { status: 'in_progress' },
    }),
    prisma.order.findMany({
      where: { type: 'sale' },
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.order.findMany({
      where: { type: 'purchase' },
      include: { supplier: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  // Calculate actual inventory value (price * quantity for each product)
  const products = await prisma.product.findMany();
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return NextResponse.json({
    totalProducts,
    inventoryValue,
    lowStockProducts,
    pendingSalesOrders,
    pendingPurchaseOrders,
    activeManufacturing,
    recentSalesOrders,
    recentPurchaseOrders,
  });
}

import { Boxes, ClipboardList, CreditCard, FileBarChart, FileText, LayoutDashboard, Receipt, Settings, ShoppingCart, TrendingUp, Truck, Users } from 'lucide-react'

export const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { group: 'Buying' },
  { label: 'Suppliers', icon: Truck },
  { label: 'Purchase Orders', icon: ClipboardList },
  { label: 'Purchases', icon: ShoppingCart },
  { group: 'Workshop' },
  { label: 'Inventory', icon: Boxes },
  { label: 'Customers', icon: Users },
  { group: 'Selling' },
  { label: 'Quotations', icon: FileText },
  { label: 'Sales', icon: TrendingUp },
  { label: 'Invoices', icon: Receipt },
  { group: 'Money' },
  { label: 'Payments & Dues', icon: CreditCard, badge: 4 },
  { label: 'Reports', icon: FileBarChart },
  { label: 'Settings', icon: Settings },
]

export const transactions = [
  { id: 'INV-2024-089', party: 'Apex Auto Works', amount: '₹48,500', status: 'Paid', date: 'Today, 10:42 AM' },
  { id: 'PO-2024-156', party: 'Bosch India Ltd.', amount: '₹1,24,800', status: 'Pending', date: 'Today, 9:18 AM' },
  { id: 'INV-2024-088', party: 'Metro Motors', amount: '₹32,750', status: 'Overdue', date: 'Yesterday' },
  { id: 'INV-2024-087', party: 'Kumar Auto Parts', amount: '₹18,200', status: 'Paid', date: 'Yesterday' },
]

export const lowStock = [
  { name: 'Brake pad set, front', sku: 'BP-FR-102', stock: 8, reorder: 10 },
  { name: 'Engine oil 5W-30 (4 L)', sku: 'EO-530-4L', stock: 12, reorder: 15 },
  { name: 'Clutch plate assembly', sku: 'CP-ASM-44', stock: 3, reorder: 5 },
]

// revenue / expenses in ₹ thousands
export const periods = {
  'This month': { labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'], revenue: [180, 240, 210, 213], expenses: [120, 150, 160, 134] },
  'Last 3 months': { labels: ['Jul', 'Aug', 'Sep'], revenue: [610, 720, 843], expenses: [430, 510, 564] },
  'This year': { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], revenue: [420, 390, 510, 560, 540, 620, 610, 720, 843], expenses: [310, 300, 360, 400, 380, 440, 430, 510, 564] },
}

export const ledger = [
  { label: 'Outstanding dues', value: '₹2,18,400', note: '4 invoices, 1 overdue' },
  { label: 'Purchases this month', value: '₹5,64,200', note: '9 orders received' },
  { label: 'Items below reorder level', value: '24', note: 'Clutch plates are the most urgent' },
]

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', stock: 45, status: 'In Stock', price: '₹299.99', cost: '₹150.00' },
  { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', stock: 12, status: 'Low Stock', price: '₹199.50', cost: '₹90.00' },
  { id: 3, name: 'Minimalist Desk Lamp', category: 'Home', stock: 0, status: 'Out of Stock', price: '₹49.99', cost: '₹20.00' },
  { id: 4, name: 'Mechanical Keyboard Switch Set', category: 'Electronics', stock: 124, status: 'In Stock', price: '₹34.99', cost: '₹12.00' },
  { id: 5, name: 'Stainless Steel Water Bottle', category: 'Accessories', stock: 85, status: 'In Stock', price: '₹24.00', cost: '₹8.50' },
];

const Products = () => {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products Inventory</h1>
          <p className="text-muted">Manage your catalog, stock levels, and pricing.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="glass-panel">
        <div className="flex justify-between items-center mb-6">
          <div className="input-group" style={{ margin: 0, width: '350px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search products by name or category..." 
                style={{ paddingLeft: '2.5rem', background: 'rgba(15, 23, 42, 0.8)' }}
              />
            </div>
          </div>
          <button className="btn btn-outline">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: 'var(--glass-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Product Name</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Stock</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Price</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Cost</th>
                <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'var(--transition)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{product.category}</td>
                  <td style={{ padding: '1rem' }}>{product.stock}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge ${product.status === 'In Stock' ? 'badge-success' : product.status === 'Low Stock' ? 'badge-warning' : 'badge-danger'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{product.price}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{product.cost}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn-icon-custom" style={{ padding: '0.35rem' }} title="Edit"><Edit2 size={16} /></button>
                      <button className="btn-icon-custom" style={{ padding: '0.35rem', color: 'var(--danger)' }} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;

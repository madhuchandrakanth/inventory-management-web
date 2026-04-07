import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Edit, Tag, AlertCircle } from 'lucide-react';
import { ProductsService } from '../services/products-service';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock_quantity: number;
  status: string;
}

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);



  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProductsWithSignal = async () => {
      try {
        setIsPageLoading(true);
        const data = await ProductsService.getProducts();
        const resData = data as { items?: Product[] };
        setProducts(Array.isArray(data) ? (data as Product[]) : resData.items || []);
      } catch (error: unknown) {
        const err = error as Error;
        if (err.name !== 'AbortError') {
          console.warn("Failed to fetch products. Using mock data or empty list.");
        }
        setProducts([]);
      } finally {
        setIsPageLoading(false);
      }
    };
    
    fetchProductsWithSignal();
    
    return () => {
      controller.abort();
    };
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'in stock': return 'badge-success';
      case 'low stock': return 'badge-warning';
      case 'out of stock': return 'badge-danger';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products Inventory</h1>
          <p className="text-muted">Manage stock quantities, item descriptions, and categorization.</p>
        </div>
      </div>

      {isPageLoading ? (
        <div className="flex items-center justify-center p-12 text-muted">Loading products...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Create Product Card */}
          <div
            className="glass-panel flex flex-col items-center justify-center cursor-pointer"
            style={{ minHeight: '140px', border: '2px dashed var(--border-color)', background: 'transparent', padding: '1rem' }}
            onClick={() => navigate('/products/new')}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
          >
            <div className="btn-icon-custom mb-2" style={{ background: 'var(--primary-color)', color: 'white', padding: '0.75rem' }}>
              <Plus size={20} />
            </div>
            <h3 className="font-bold text-base">Add Product</h3>
          </div>

          {/* Existing Products List */}
          {products.map((product) => (
            <div key={product.id} className="glass-panel flex flex-col justify-between" style={{ minHeight: '140px', padding: '1rem' }}>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div style={{ background: 'var(--bg-main)', padding: '0.5rem', borderRadius: '10px' }}>
                    <Package size={18} color="var(--primary-color)" />
                  </div>
                  <span className={`badge ${getStatusBadgeClass(product.status)}`} style={{ fontSize: '0.65rem' }}>
                    {product.status}
                  </span>
                </div>
                <h3 className="font-bold text-md mb-1 truncate" title={product.name}>{product.name}</h3>
                
                <div className="flex items-center gap-2 text-muted text-xs">
                  <span className="font-semibold text-[var(--text-main)]">₹{product.price}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Tag size={10} />
                    <span className="truncate">{product.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-[var(--border-color)] flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-muted">
                  <AlertCircle size={12} className={product.stock_quantity <= 10 ? 'text-[var(--warning)]' : ''}/>
                  <span>Stock: {product.stock_quantity}</span>
                </div>
                <button
                  className="btn-icon-custom p-1"
                  style={{ borderRadius: '6px' }}
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                  title="Update Product"
                >
                  <Edit size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

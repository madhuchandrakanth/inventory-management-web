import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FeedbackAlert from '../components/FeedbackAlert';
import { ProductsService, type ProductPayload } from '../services/products-service';

interface ProductData extends ProductPayload {
  id: string;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductPayload>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    stock_quantity: 0,
    status: 'In Stock',
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!isEditing) return;
      try {
        setIsInitializing(true);
        // We fetch all products to find the specific one since no getById API is explicitly specified yet
        const data = await ProductsService.getProducts();
        const resData = data as { items?: ProductData[] };
        const productsList = Array.isArray(data) ? (data as ProductData[]) : resData.items || [];
        const product = productsList.find((p) => p.id === id);

        if (product) {
          setFormData({
            name: product.name || '',
            sku: product.sku || '',
            category: product.category || '',
            price: product.price || 0,
            stock_quantity: product.stock_quantity || 0,
            status: product.status || 'In Stock',
          });
        } else {
          setError("Product not found.");
        }
      } catch {
        setError("Failed to fetch product details.");
      } finally {
        setIsInitializing(false);
      }
    };

    fetchProductDetails();
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { value } = e.target;
    const { name, type } = e.target;

    // Convert numeric fields appropriately
    if (type === 'number') {
       value = value === '' ? '' : Number(value).toString();
    }

    setFormData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.sku || !formData.category) {
      setError("Please fill out Name, SKU, and Category.");
      return false;
    }
    if (formData.price < 0) {
      setError("Price cannot be negative.");
      return false;
    }
    if (formData.stock_quantity < 0) {
      setError("Stock quantity cannot be negative.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    // Infer status intelligently if stock drops
    let finalStatus = formData.status;
    if (formData.stock_quantity === 0) finalStatus = 'Out of Stock';
    else if (formData.stock_quantity <= 10 && finalStatus === 'In Stock') finalStatus = 'Low Stock';
    else if (formData.stock_quantity > 10 && finalStatus !== 'In Stock') finalStatus = 'In Stock';

    const payload = { ...formData, status: finalStatus };

    try {
      setIsLoading(true);
      if (isEditing) {
        await ProductsService.updateProduct(id as string, payload);
      } else {
        await ProductsService.createProduct(payload);
      }
      navigate('/products');
    } catch {
      setError(`Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return <div className="p-12 text-center text-muted">Loading product data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button className="btn-icon-custom" onClick={() => navigate('/products')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? 'Update Product Details' : 'Register New Product'}</h1>
          <p className="text-muted">Enter product metrics, cost parameters, and categorization.</p>
        </div>
      </div>

      <div className="glass-panel">
        {error && <FeedbackAlert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-6">
            
            <div className="col-span-2" style={{ gridColumn: '1 / -1' }}>
              <h4 className="text-lg font-semibold border-b border-[var(--border-color)] pb-2 mb-4">Core Attributes</h4>
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="name">Product Name *</label>
              <input id="name" name="name" type="text" className="input-field" placeholder="e.g. Parle-G Biscuits" required value={formData.name} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="sku">Stock Keeping Unit (SKU) *</label>
              <input id="sku" name="sku" type="text" className="input-field" placeholder="e.g. PAR-G-250" required value={formData.sku} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="category">Category *</label>
              <input id="category" name="category" type="text" className="input-field" placeholder="e.g. Snacks / FMCG" required value={formData.category} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="status">Current Status</label>
              <select id="status" name="status" className="input-field" value={formData.status} onChange={handleInputChange} required disabled={isLoading}>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="col-span-2 mt-4" style={{ gridColumn: '1 / -1' }}>
              <h4 className="text-lg font-semibold border-b border-[var(--border-color)] pb-2 mb-4">Pricing & Inventory</h4>
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="price">Unit Price (₹) *</label>
              <input id="price" name="price" type="number" step="0.01" min="0" className="input-field" required value={formData.price} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="stock_quantity">Available Quantity *</label>
              <input id="stock_quantity" name="stock_quantity" type="number" min="0" className="input-field" required value={formData.stock_quantity} onChange={handleInputChange} disabled={isLoading} />
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-[var(--border-color)]">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/products')} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEditing ? 'Update Attributes' : 'Register Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

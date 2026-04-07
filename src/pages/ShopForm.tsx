import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FeedbackAlert from '../components/FeedbackAlert';
import { ShopsService, type ShopPayload } from '../services/shops-service';
import { SessionService } from '../services/session-service';

interface AddressDetails {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  address_id: string;
}

interface ShopData {
  shop_id: string;
  name: string;
  type: string;
  owner_id: string;
  address_id: string;
  address_details: AddressDetails;
}

const ShopForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ShopPayload>({
    name: '',
    type: 'Retail',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchShopDetails = async () => {
      if (!isEditing) return;
      try {
        setIsInitializing(true);
        // We fetch all shops to find the specific one since no getById API is explicitly created yet
        const data = await ShopsService.getShops(getUser()?.user_id || '');
        const resData = data as { items?: ShopData[] };
        const shops = Array.isArray(data) ? (data as ShopData[]) : resData.items || [];
        const shop = shops.find((s) => s.shop_id === id);

        if (shop) {
          const addr = shop.address_details || {} as AddressDetails;
          setFormData({
            name: shop.name || '',
            type: shop.type || 'Retail',
            address: addr.address || '',
            city: addr.city || '',
            district: '',
            state: addr.state || '',
            pincode: addr.zip_code || '',
          });
        } else {
          setError("Shop not found.");
        }
      } catch (error: unknown) {
        const err = error as Error;
        if (err.name !== 'AbortError') {
          setError("Failed to fetch shop details.");
        }
      } finally {
        setIsInitializing(false);
      }
    };

    fetchShopDetails();
    
    return () => {
      controller.abort();
    };
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getUser = () => {
    const user = SessionService.getUser();
    if (!user) {
      navigate('/login');
      return null;
    }
    return user;
  }

  const validateForm = () => {
    if (!formData.name || !formData.type || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      let payload: ShopPayload = {
        owner_id: getUser()?.user_id || '',
        ...formData
      }
      if (isEditing) {
        await ShopsService.updateShop(id as string, payload);
      } else {
        await ShopsService.createShop(payload);
      }
      navigate('/shops');
    } catch {
      setError(`Failed to ${isEditing ? 'update' : 'create'} shop. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return <div className="p-12 text-center text-muted">Loading shop data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button className="btn-icon-custom" onClick={() => navigate('/shops')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? 'Update Shop Details' : 'Register New Shop'}</h1>
          <p className="text-muted">Enter the requested details below to manage your store parameters.</p>
        </div>
      </div>

      <div className="glass-panel">
        {error && <FeedbackAlert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2" style={{ gridColumn: '1 / -1' }}>
              <h4 className="text-lg font-semibold border-b border-[var(--border-color)] pb-2 mb-4">Basic Information</h4>
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="name">Shop Name *</label>
              <input id="name" name="name" type="text" className="input-field" placeholder="e.g. Mahalakshmi Stores" required value={formData.name} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="input-group col-span-2 md:col-span-1">
              <label className="input-label" htmlFor="type">Shop Type *</label>
              <select id="type" name="type" className="input-field" value={formData.type} onChange={handleInputChange} required disabled={isLoading}>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>

            <div className="col-span-2 mt-4" style={{ gridColumn: '1 / -1' }}>
              <h4 className="text-lg font-semibold border-b border-[var(--border-color)] pb-2 mb-4">Location Details</h4>
            </div>

            <div className="input-group col-span-2" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label" htmlFor="address">Address / Street *</label>
              <input id="address" name="address" type="text" className="input-field" placeholder="e.g. 1st Main Road, XYZ Layout" required value={formData.address} onChange={handleInputChange} disabled={isLoading} />
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="input-group">
                <label className="input-label" htmlFor="city">City/District *</label>
                <input id="city" name="city" type="text" className="input-field" placeholder="e.g. Bangalore" required value={formData.city} onChange={handleInputChange} disabled={isLoading} />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="state">State *</label>
                <input id="state" name="state" type="text" className="input-field" placeholder="e.g. Karnataka" required value={formData.state} onChange={handleInputChange} disabled={isLoading} />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="pincode">Pincode *</label>
                <input id="pincode" name="pincode" type="text" className="input-field" placeholder="e.g. 560001" required value={formData.pincode} onChange={handleInputChange} disabled={isLoading} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-[var(--border-color)]">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/shops')} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : (isEditing ? 'Update Details' : 'Create Shop')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopForm;

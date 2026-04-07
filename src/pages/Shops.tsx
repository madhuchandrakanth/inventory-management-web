import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Video, Edit } from 'lucide-react';
import { ShopsService } from '../services/shops-service';
import { SessionService } from '../services/session-service';

interface AddressDetails {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  address_id: string;
}

interface Shop {
  shop_id: string;
  name: string;
  type: string;
  owner_id: string;
  address_id: string;
  created_at: string;
  updated_at: string;
  address_details: AddressDetails;
}

const Shops = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);



  useEffect(() => {
    const controller = new AbortController();
    
    const fetchShopsWithSignal = async () => {
      try {
        setIsPageLoading(true);
        const user = SessionService.getUser();
        if (!user) {
          navigate('/login');
          return;
        }
        const data = await ShopsService.getShops(user.user_id);
        const res = data as { items?: Shop[] };
        setShops(Array.isArray(data) ? (data as Shop[]) : res.items || []);
      } catch (error: unknown) {
        const err = error as Error;
        if (err.name !== 'AbortError') {
          console.warn("Failed to fetch shops. Using empty list or backend is offline.");
        }
      } finally {
        setIsPageLoading(false);
      }
    };
    
    fetchShopsWithSignal();
    
    return () => {
      controller.abort();
    };
  }, [navigate]);

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Shops</h1>
          <p className="text-muted">Manage your retail and wholesale stores and monitor systems.</p>
        </div>
      </div>

      {isPageLoading ? (
        <div className="flex items-center justify-center p-12 text-muted">Loading shops...</div>
      ) : (
        <div className="row">

          {/* Create Shop Card (Reduced Size) */}
          <div
            className="glass-panel col-12 d-flex flex-column justify-content-center align-items-center cursor-pointer mb-3"
            style={{ minHeight: '140px', border: '2px dashed var(--border-color)', background: 'transparent', padding: '1rem' }}
            onClick={() => navigate('/shops/new')}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary-color)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
          >
            <div className="btn-icon-custom mb-2" style={{ background: 'var(--primary-color)', color: 'white', padding: '0.75rem' }}>
              <Plus size={20} />
            </div>
            <h3 className="font-bold text-base">New Shop</h3>
          </div>

          {/* Existing Shops List (Reduced Size) */}
          {shops.map((shop) => (
            <div key={shop.shop_id} className="col-6 mb-3" style={{ minHeight: '140px', padding: '1rem' }}>
              <div className="glass-panel h-100 d-flex justify-content-between">
                <div>
                  <h3 className="font-bold text-md mb-1 truncate" title={shop.name}>{shop.name}</h3>

                  <div className="flex items-center gap-1 text-sm text-muted mb-2">
                    <MapPin size={12  } />
                    <span className="truncate" title={`${shop.address_details.city}, ${shop.address_details.state}`}>
                      {shop.address_details.city}, {shop.address_details.state}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[var(--border-color)] d-flex justify-content-end ">
                  <button
                    className="btn btn-outline text-xs px-2  justify-center"
                    onClick={() => console.log('Monitor view triggered for', shop.shop_id)}
                  >
                    <Video size={40} />
                  </button>
                  <button
                    className="btn btn-outline  text-xs px-2 justify-center ms-2"
                    onClick={() => navigate(`/shops/${shop.shop_id}/edit`)}
                  >
                    <Edit size={40} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shops;

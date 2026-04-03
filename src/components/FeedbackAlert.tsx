import React from 'react';

interface FeedbackAlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
}

const FeedbackAlert: React.FC<FeedbackAlertProps> = ({ type, message }) => {
  if (!message) return null;

  const bgClass = 
    type === 'success' ? 'badge-success' : 
    type === 'warning' ? 'badge-warning' : 
    'badge-danger';

  return (
    <div className={`badge ${bgClass} w-full mb-4`} style={{ padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
};

export default FeedbackAlert;

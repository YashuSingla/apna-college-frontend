import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success' ? 'bg-green-500' :
    type === 'error'   ? 'bg-red-500' :
                         'bg-blue-500';

  return (
    <div className={`fixed top-5 right-5 z-50 px-4 py-2 rounded text-white shadow-lg transition ${bgColor}`}>
      {message}
    </div>
  );
}

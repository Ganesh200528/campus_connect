import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

export default function StatusBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Verified':
      case 'Accepted':
      case 'Confirmed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending':
      case 'Proposed':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Self-reported':
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'Verified':
        return <CheckCircle2 size={14} className="mr-1" />;
      case 'Accepted':
      case 'Confirmed':
        return <CheckCircle2 size={14} className="mr-1" />;
      case 'Pending':
      case 'Proposed':
        return <Clock size={14} className="mr-1" />;
      case 'Rejected':
        return <XCircle size={14} className="mr-1" />;
      case 'Self-reported':
      default:
        return <AlertCircle size={14} className="mr-1" />;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}>
      {getIcon()}
      {status}
    </span>
  );
}

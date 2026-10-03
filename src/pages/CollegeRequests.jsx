import { useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import StatusBadge from '../components/StatusBadge';
import { MessageSquare, Calendar, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollegeRequests() {
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  
  const requests = api.getRequestsByCollege(user.id);

  const handleStatusUpdate = (id, status) => {
    api.updateRequestStatus(id, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incoming Requests</h1>
          <p className="text-gray-500 mt-1">Review and respond to recruitment requests from companies.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Requirements</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map(req => {
                const company = api.getCompanyById(req.companyId);
                return (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company?.name}</div>
                      <div className="text-xs text-gray-500">{company?.industry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.role}</div>
                      <div className="text-xs text-gray-500">{req.openings} openings • Min {req.minPercentage}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.preferredDate}
                      <div className="text-xs text-gray-400">{req.mode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        {req.status === 'Pending' && (
                          <>
                            <button onClick={() => handleStatusUpdate(req.id, 'Accepted')} className="text-green-600 hover:text-green-900 flex items-center gap-1">
                              <Check size={16} /> Accept
                            </button>
                            <button onClick={() => handleStatusUpdate(req.id, 'Rejected')} className="text-red-600 hover:text-red-900 flex items-center gap-1">
                              <X size={16} /> Reject
                            </button>
                          </>
                        )}
                        {req.status === 'Accepted' && (
                          <Link to={`/app/chat/${req.id}`} className="text-blue-600 hover:text-blue-900 flex items-center gap-1" title="Open Chat">
                            <MessageSquare size={16} /> Chat
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No incoming requests at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

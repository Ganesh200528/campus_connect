import { useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { Inbox, CheckCircle, Calendar, Building2 } from 'lucide-react';

export default function CollegeDashboard() {
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);

  // Derived stats
  const requests = api.getRequestsByCollege(user.id);
  const incomingRequests = requests.filter(r => r.status === 'Pending').length;
  const acceptedRequests = requests.filter(r => r.status === 'Accepted').length;
  const drives = api.getDrives().filter(d => requests.some(r => r.id === d.requestId));
  const scheduledDrives = drives.filter(d => d.status === 'Confirmed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user.name}. Overview of placement activities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Incoming Requests" value={incomingRequests} icon={Inbox} />
        <StatCard title="Accepted Companies" value={acceptedRequests} icon={CheckCircle} />
        <StatCard title="Scheduled Drives" value={scheduledDrives} icon={Calendar} />
        <StatCard title="Total Companies" value={api.getCompanies().length} icon={Building2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.slice(0, 5).map(req => {
                  const company = api.getCompanyById(req.companyId);
                  return (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{company?.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{req.role}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{req.preferredDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={req.status} />
                      </td>
                    </tr>
                  )
                })}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No requests received yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Drives</h2>
          <div className="space-y-4">
            {drives.slice(0, 4).map(drive => {
              const req = requests.find(r => r.id === drive.requestId);
              const comp = api.getCompanyById(req?.companyId);
              return (
                <div key={drive.id} className="p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm text-gray-900">{comp?.name}</span>
                    <span className="text-xs text-primary font-medium">{drive.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{req?.role} • {drive.mode}</p>
                  <StatusBadge status={drive.status} />
                </div>
              )
            })}
            {drives.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming drives scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useContext, useMemo, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { createApi } from '../api';
import StatusBadge from '../components/StatusBadge';
import { Shield, Building2, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  
  const [activeTab, setActiveTab] = useState('companies');
  
  const companies = api.getCompanies();
  const colleges = api.getColleges();

  const handleUpdateCompany = (id, status) => {
    api.updateCompany(id, { status });
  };

  const handleUpdateCollege = (id, status) => {
    api.updateCollege(id, { status });
  };

  const renderTable = (items, type) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                    {item.name.charAt(0)}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {type === 'company' ? item.industry : item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {item.status !== 'Verified' && (
                  <button onClick={() => type === 'company' ? handleUpdateCompany(item.id, 'Verified') : handleUpdateCollege(item.id, 'Verified')} className="text-green-600 hover:text-green-900 mr-4 flex items-center gap-1 inline-flex">
                    <CheckCircle size={16} /> Verify
                  </button>
                )}
                {item.status !== 'Rejected' && (
                  <button onClick={() => type === 'company' ? handleUpdateCompany(item.id, 'Rejected') : handleUpdateCollege(item.id, 'Rejected')} className="text-red-600 hover:text-red-900 flex items-center gap-1 inline-flex">
                    <XCircle size={16} /> Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-primary" /> Admin Verification Panel
          </h1>
          <p className="text-gray-500 mt-1">Verify or reject company and college profiles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total Companies" value={companies.length} icon={Building2} />
        <StatCard title="Total Colleges" value={colleges.length} icon={GraduationCap} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px px-6">
            <button
              onClick={() => setActiveTab('companies')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === 'companies'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Companies
            </button>
            <button
              onClick={() => setActiveTab('colleges')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'colleges'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manage Colleges
            </button>
          </nav>
        </div>
        
        {activeTab === 'companies' ? renderTable(companies, 'company') : renderTable(colleges, 'college')}
      </div>
    </div>
  );
}

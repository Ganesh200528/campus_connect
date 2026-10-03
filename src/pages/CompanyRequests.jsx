import { useState, useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import StatusBadge from '../components/StatusBadge';
import { Plus, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyRequests() {
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  
  const requests = api.getRequestsByCompany(user.id);
  const colleges = api.getColleges();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    collegeId: '', role: '', openings: '', branches: '', batchYear: '', minPercentage: '',
    skills: '', preferredDate: '', mode: 'On-campus', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addRequest({
      ...formData,
      companyId: user.id,
      branches: formData.branches.split(',').map(s => s.trim()),
      skills: formData.skills.split(',').map(s => s.trim())
    });
    setIsModalOpen(false);
    setFormData({
      collegeId: '', role: '', openings: '', branches: '', batchYear: '', minPercentage: '',
      skills: '', preferredDate: '', mode: 'On-campus', message: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-500 mt-1">Manage your recruitment requests to colleges.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map(req => {
                const college = api.getCollegeById(req.collegeId);
                return (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.role}</div>
                      <div className="text-sm text-gray-500">{req.openings} openings • {req.mode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{college?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.preferredDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        {req.status === 'Accepted' && (
                          <>
                            <Link to={`/app/chat/${req.id}`} className="text-blue-600 hover:text-blue-900 flex items-center gap-1" title="Open Chat">
                              <MessageSquare size={16} /> Chat
                            </Link>
                          </>
                        )}
                        <Link to={`/app/drives`} className="text-gray-600 hover:text-gray-900 flex items-center gap-1" title="View Timeline">
                          <Calendar size={16} /> Timeline
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    You haven't sent any recruitment requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Recruitment Request</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target College</label>
                <select required value={formData.collegeId} onChange={e => setFormData({...formData, collegeId: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select a college...</option>
                  {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                  <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. of Openings</label>
                  <input type="number" required value={formData.openings} onChange={e => setFormData({...formData, openings: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Branches (comma separated)</label>
                  <input type="text" required value={formData.branches} onChange={e => setFormData({...formData, branches: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. CS, IT" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Batch Year</label>
                  <input type="number" required value={formData.batchYear} onChange={e => setFormData({...formData, batchYear: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Percentage / CGPA</label>
                  <input type="number" required value={formData.minPercentage} onChange={e => setFormData({...formData, minPercentage: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Drive Date</label>
                  <input type="date" required value={formData.preferredDate} onChange={e => setFormData({...formData, preferredDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma separated)</label>
                  <input type="text" required value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="React, Node.js" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drive Mode</label>
                  <select required value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                    <option value="On-campus">On-campus</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message to TPO</label>
                <textarea required rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-medium">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

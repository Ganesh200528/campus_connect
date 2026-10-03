import { useState, useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import StatusBadge from '../components/StatusBadge';
import { Calendar as CalendarIcon, Video, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function DriveScheduling() {
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  
  // Get all relevant requests first
  const requests = user.role === 'company' ? api.getRequestsByCompany(user.id) : api.getRequestsByCollege(user.id);
  const activeRequests = requests.filter(r => r.status === 'Accepted');
  
  // Get drives for these requests
  const drives = api.getDrives().filter(d => requests.some(r => r.id === d.requestId));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestId: '', date: '', mode: 'Online', linkOrVenue: '', rounds: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addDrive({
      ...formData,
      rounds: formData.rounds.split(',').map(s => s.trim())
    });
    setIsModalOpen(false);
    setFormData({ requestId: '', date: '', mode: 'Online', linkOrVenue: '', rounds: '' });
  };

  const confirmDrive = (id) => {
    api.updateDriveStatus(id, 'Confirmed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Drives</h1>
          <p className="text-gray-500 mt-1">Manage and track upcoming recruitment drives.</p>
        </div>
        {user.role === 'company' && (
          <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <CalendarIcon size={18} /> Schedule Drive
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {drives.map(drive => {
          const request = requests.find(r => r.id === drive.requestId);
          const otherParty = user.role === 'company' ? api.getCollegeById(request?.collegeId)?.name : api.getCompanyById(request?.companyId)?.name;
          
          return (
            <div key={drive.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{request?.role} Drive</h3>
                  <StatusBadge status={drive.status} />
                </div>
                <p className="text-gray-600 font-medium mb-1">with {otherParty}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                  <span className="flex items-center gap-1"><CalendarIcon size={16} /> {drive.date}</span>
                  <span className="flex items-center gap-1">
                    {drive.mode === 'Online' ? <Video size={16} /> : <MapPin size={16} />}
                    {drive.mode} - {drive.linkOrVenue}
                  </span>
                </div>
                <div className="mt-4">
                   <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Assessment Rounds</p>
                   <div className="flex flex-wrap gap-2">
                     {drive.rounds.map((round, i) => (
                       <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700 border border-gray-200">
                         {i+1}. {round}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
              
              <div className="md:border-l md:border-gray-100 md:pl-6 flex flex-col justify-center min-w-[140px]">
                 {drive.status === 'Proposed' && user.role === 'college' ? (
                   <button onClick={() => confirmDrive(drive.id)} className="w-full bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                     <CheckCircle size={18} /> Confirm
                   </button>
                 ) : drive.status === 'Proposed' ? (
                   <div className="text-center text-amber-600 flex flex-col items-center">
                     <Clock size={24} className="mb-1" />
                     <span className="text-sm font-medium">Awaiting Confirmation</span>
                   </div>
                 ) : (
                   <div className="text-center text-green-600 flex flex-col items-center">
                     <CheckCircle size={24} className="mb-1" />
                     <span className="text-sm font-medium">Confirmed</span>
                   </div>
                 )}
              </div>
            </div>
          )
        })}
        {drives.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <CalendarIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No drives scheduled</h3>
            <p className="text-gray-500">When requests are accepted, you can schedule drives here.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Schedule a Drive</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Accepted Request</label>
                <select required value={formData.requestId} onChange={e => setFormData({...formData, requestId: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Select...</option>
                  {activeRequests.map(r => (
                    <option key={r.id} value={r.id}>{r.role} with {api.getCollegeById(r.collegeId)?.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drive Date</label>
                <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                <select required value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                  <option value="Online">Online</option>
                  <option value="On-campus">On-campus</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{formData.mode === 'Online' ? 'Meeting Link' : 'Venue Details'}</label>
                <input type="text" required value={formData.linkOrVenue} onChange={e => setFormData({...formData, linkOrVenue: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder={formData.mode === 'Online' ? 'https://zoom.us/...' : 'Main Auditorium'} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Rounds (comma separated)</label>
                <input type="text" required value={formData.rounds} onChange={e => setFormData({...formData, rounds: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Aptitude, Coding, HR" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-medium">Propose Date</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

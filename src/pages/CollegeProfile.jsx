import { useState, useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import TagInput from '../components/TagInput';
import StatusBadge from '../components/StatusBadge';
import { MapPin, Users, BookOpen, Save, User } from 'lucide-react';

export default function CollegeProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);

  const profileId = id || user.id;
  const isEditingOwnProfile = !id && user.role === 'college';
  const collegeData = api.getCollegeById(profileId);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', city: '', state: '', establishedYear: '', type: '', totalStudents: '',
    facilities: [], tpoName: '', tpoEmail: '', tpoPhone: '', branches: []
  });

  useEffect(() => {
    if (collegeData) {
      setFormData(collegeData);
    } else if (isEditingOwnProfile) {
      setIsEditing(true);
    }
  }, [collegeData, isEditingOwnProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collegeData) {
      api.updateCollege(profileId, formData);
    } else {
      api.addCollege({ ...formData, id: profileId });
    }
    setIsEditing(false);
  };

  const addBranch = () => {
    setFormData({ ...formData, branches: [...formData.branches, { name: '', batchYear: new Date().getFullYear(), count: 0 }] });
  };

  const updateBranch = (index, field, value) => {
    const newBranches = [...formData.branches];
    newBranches[index][field] = value;
    setFormData({ ...formData, branches: newBranches });
  };

  const removeBranch = (index) => {
    setFormData({ ...formData, branches: formData.branches.filter((_, i) => i !== index) });
  };

  if (!collegeData && !isEditingOwnProfile) {
    return <div className="p-8 text-center text-gray-500">College not found.</div>;
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">College Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
                <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" required value={formData.city || ''} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State (Code)</label>
                  <input type="text" required value={formData.state || ''} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select required value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary bg-white">
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Autonomous">Autonomous</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Est. Year</label>
                  <input type="number" required value={formData.establishedYear || ''} onChange={e => setFormData({...formData, establishedYear: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Students</label>
                  <input type="number" required value={formData.totalStudents || ''} onChange={e => setFormData({...formData, totalStudents: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">TPO Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required value={formData.tpoName || ''} onChange={e => setFormData({...formData, tpoName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={formData.tpoEmail || ''} onChange={e => setFormData({...formData, tpoEmail: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" required value={formData.tpoPhone || ''} onChange={e => setFormData({...formData, tpoPhone: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Branches */}
          <div>
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold">Branches & Counts</h3>
              <button type="button" onClick={addBranch} className="text-sm text-primary font-medium hover:underline">+ Add Branch</button>
            </div>
            <div className="space-y-4">
              {formData.branches?.map((branch, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Branch Name</label>
                    <input type="text" required value={branch.name} onChange={e => updateBranch(index, 'name', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="e.g. Computer Science" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-gray-500 mb-1">Batch</label>
                    <input type="number" required value={branch.batchYear} onChange={e => updateBranch(index, 'batchYear', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-gray-500 mb-1">Count</label>
                    <input type="number" required value={branch.count} onChange={e => updateBranch(index, 'count', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <button type="button" onClick={() => removeBranch(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mb-0.5">X</button>
                </div>
              ))}
              {(!formData.branches || formData.branches.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No branches added yet.</p>
              )}
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Campus Facilities</h3>
            <TagInput tags={formData.facilities || []} onChange={tags => setFormData({...formData, facilities: tags})} placeholder="Add facility (e.g., Auditorium, Lab)..." />
          </div>

          <div className="flex justify-end gap-3 pt-6">
            {collegeData && (
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                Cancel
              </button>
            )}
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
              <Save size={18} /> Save Profile
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200"></div>
        <div className="px-6 sm:px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-md border border-gray-100 flex items-center justify-center">
               <div className="w-full h-full bg-blue-50 text-primary rounded-lg flex items-center justify-center font-bold text-4xl">
                  {collegeData.name.charAt(0)}
               </div>
            </div>
            {isEditingOwnProfile && (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 bg-white">
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{collegeData.name}</h1>
            <StatusBadge status={collegeData.status} />
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1"><MapPin size={16} className="text-gray-400" /> {collegeData.city}, {collegeData.state}</span>
            <span className="flex items-center gap-1"><BookOpen size={16} className="text-gray-400" /> {collegeData.type} • Est. {collegeData.establishedYear}</span>
            <span className="flex items-center gap-1"><Users size={16} className="text-gray-400" /> {collegeData.totalStudents} Students</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
             <div>
                <h3 className="font-semibold text-gray-900 mb-4">Eligible Branches</h3>
                <div className="space-y-3">
                  {collegeData.branches?.map((branch, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{branch.name}</p>
                        <p className="text-xs text-gray-500">Batch of {branch.batchYear}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {branch.count} students
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!collegeData.branches || collegeData.branches.length === 0) && <p className="text-sm text-gray-500">No branch data available.</p>}
                </div>
             </div>

             <div>
                <h3 className="font-semibold text-gray-900 mb-3">Placement Contact (TPO)</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm border border-gray-100">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{collegeData.tpoName}</p>
                      <p className="text-xs text-gray-500">Training & Placement Officer</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 pl-13">
                    <p>Email: <a href={`mailto:${collegeData.tpoEmail}`} className="text-primary hover:underline">{collegeData.tpoEmail}</a></p>
                    <p>Phone: {collegeData.tpoPhone}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {collegeData.facilities?.map((f, i) => (
                    <span key={i} className="px-2.5 py-1 border border-gray-200 rounded-md text-sm text-gray-700">{f}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

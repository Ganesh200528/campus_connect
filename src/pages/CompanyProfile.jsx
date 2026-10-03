import { useState, useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import TagInput from '../components/TagInput';
import StatusBadge from '../components/StatusBadge';
import { MapPin, Building, Briefcase, Globe, Info, Save } from 'lucide-react';

export default function CompanyProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  const navigate = useNavigate();

  // If no ID is passed, assume it's the logged-in user viewing/editing their own profile
  const profileId = id || user.id;
  const isEditingOwnProfile = !id && user.role === 'company';
  const companyData = api.getCompanyById(profileId);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', industry: '', hq: '', size: '', website: '', workMode: '', salaryRange: '',
    locations: [], roles: [], recruitmentProcess: [], hiringYears: []
  });

  useEffect(() => {
    if (companyData) {
      setFormData(companyData);
    } else if (isEditingOwnProfile) {
      setIsEditing(true); // Force edit if profile doesn't exist
    }
  }, [companyData, isEditingOwnProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyData) {
      api.updateCompany(profileId, formData);
    } else {
      api.addCompany({ ...formData, id: profileId });
    }
    setIsEditing(false);
  };

  if (!companyData && !isEditingOwnProfile) {
    return <div className="p-8 text-center text-gray-500">Company not found.</div>;
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Company Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <input type="text" required value={formData.industry || ''} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headquarters (HQ)</label>
              <input type="text" required value={formData.hq || ''} onChange={e => setFormData({...formData, hq: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <input type="text" placeholder="e.g., 500-1000" value={formData.size || ''} onChange={e => setFormData({...formData, size: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
              <select value={formData.workMode || ''} onChange={e => setFormData({...formData, workMode: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary bg-white">
                <option value="">Select Mode</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard Salary Range</label>
              <input type="text" placeholder="e.g., 10-15 LPA" value={formData.salaryRange || ''} onChange={e => setFormData({...formData, salaryRange: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Locations</label>
            <TagInput tags={formData.locations || []} onChange={tags => setFormData({...formData, locations: tags})} placeholder="Add location..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Job Roles Offered</label>
            <TagInput tags={formData.roles || []} onChange={tags => setFormData({...formData, roles: tags})} placeholder="Add role..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recruitment Process Rounds</label>
            <TagInput tags={formData.recruitmentProcess || []} onChange={tags => setFormData({...formData, recruitmentProcess: tags})} placeholder="Add round (e.g., Coding Test)..." />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            {companyData && (
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

  // View Mode
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="px-6 sm:px-8 pb-8 relative">
          <div className="flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-xl p-1 shadow-md border border-gray-100 flex items-center justify-center">
               <div className="w-full h-full bg-blue-50 text-primary rounded-lg flex items-center justify-center font-bold text-4xl">
                  {companyData.name.charAt(0)}
               </div>
            </div>
            {isEditingOwnProfile && (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 bg-white">
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
            <StatusBadge status={companyData.status} />
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1"><Briefcase size={16} className="text-gray-400" /> {companyData.industry}</span>
            <span className="flex items-center gap-1"><MapPin size={16} className="text-gray-400" /> {companyData.hq}</span>
            <span className="flex items-center gap-1"><Building size={16} className="text-gray-400" /> {companyData.size} Employees</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
             <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Info size={18} className="text-primary"/> Overview</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-gray-500">Work Mode</dt><dd className="font-medium">{companyData.workMode || 'N/A'}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Salary Range</dt><dd className="font-medium">{companyData.salaryRange || 'N/A'}</dd></div>
                </dl>
                
                <h3 className="font-semibold text-gray-900 mt-6 mb-3">Office Locations</h3>
                <div className="flex flex-wrap gap-2">
                  {companyData.locations?.map((loc, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-md text-sm text-gray-700">{loc}</span>
                  ))}
                  {!companyData.locations?.length && <span className="text-sm text-gray-500">Not specified</span>}
                </div>
             </div>

             <div>
                <h3 className="font-semibold text-gray-900 mb-3">Roles & Process</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Roles Offered</p>
                  <div className="flex flex-wrap gap-2">
                    {companyData.roles?.map((role, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-50 text-primary rounded-md text-sm font-medium">{role}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Recruitment Process</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 text-gray-700">
                    {companyData.recruitmentProcess?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

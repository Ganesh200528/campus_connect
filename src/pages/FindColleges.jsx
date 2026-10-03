import { useState, useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { createApi } from '../api';
import { Search, MapPin, Building, Users, Filter } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { Link } from 'react-router-dom';

export default function FindColleges() {
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  const colleges = api.getColleges();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');

  const states = [...new Set(colleges.map(c => c.state))].sort();

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          college.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState ? college.state === filterState : true;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Colleges</h1>
          <p className="text-gray-500 mt-1">Discover and connect with premier colleges.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by college name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none appearance-none"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredColleges.map(college => (
          <Link key={college.id} to={`/app/colleges/${college.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full transition-all group-hover:shadow-md group-hover:border-blue-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-lg flex items-center justify-center font-bold text-xl">
                    {college.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{college.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {college.city}, {college.state}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <StatusBadge status={college.status} />
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  <Building size={12} className="mr-1" /> {college.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Students</p>
                  <p className="font-medium text-gray-900 flex items-center">
                    <Users size={14} className="mr-1 text-gray-400" />
                    {college.totalStudents.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Est. Year</p>
                  <p className="font-medium text-gray-900">{college.establishedYear}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredColleges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No colleges found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

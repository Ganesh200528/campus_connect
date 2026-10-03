import { createContext, useState, useEffect } from 'react';
import { mockCompanies, mockColleges, mockRequests, mockChats, mockDrives } from '../data/mockData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [requests, setRequests] = useState([]);
  const [chats, setChats] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    // Load from localStorage or use mock initial data
    const loadData = (key, initialData) => {
      const stored = localStorage.getItem(`cc_${key}`);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(`cc_${key}`, JSON.stringify(initialData));
      return initialData;
    };

    setCompanies(loadData('companies', mockCompanies));
    setColleges(loadData('colleges', mockColleges));
    setRequests(loadData('requests', mockRequests));
    setChats(loadData('chats', mockChats));
    setDrives(loadData('drives', mockDrives));
  }, []);

  const updateData = (key, data, setter) => {
    setter(data);
    localStorage.setItem(`cc_${key}`, JSON.stringify(data));
  };

  return (
    <DataContext.Provider value={{
      companies, setCompanies: (d) => updateData('companies', d, setCompanies),
      colleges, setColleges: (d) => updateData('colleges', d, setColleges),
      requests, setRequests: (d) => updateData('requests', d, setRequests),
      chats, setChats: (d) => updateData('chats', d, setChats),
      drives, setDrives: (d) => updateData('drives', d, setDrives),
    }}>
      {children}
    </DataContext.Provider>
  );
};

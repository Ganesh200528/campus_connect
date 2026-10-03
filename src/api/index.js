export const createApi = (context) => {
  const {
    companies, setCompanies,
    colleges, setColleges,
    requests, setRequests,
    chats, setChats,
    drives, setDrives
  } = context;

  // Generic helper to generate ID
  const generateId = (prefix) => `${prefix}${Date.now()}`;

  return {
    // Company API
    getCompanies: () => companies,
    getCompanyById: (id) => companies.find(c => c.id === id),
    addCompany: (data) => {
      const newCompany = { ...data, id: generateId('c'), status: 'Self-reported' };
      setCompanies([...companies, newCompany]);
      return newCompany;
    },
    updateCompany: (id, data) => {
      setCompanies(companies.map(c => c.id === id ? { ...c, ...data } : c));
    },

    // College API
    getColleges: () => colleges,
    getCollegeById: (id) => colleges.find(c => c.id === id),
    addCollege: (data) => {
      const newCollege = { ...data, id: generateId('col'), status: 'Self-reported' };
      setColleges([...colleges, newCollege]);
      return newCollege;
    },
    updateCollege: (id, data) => {
      setColleges(colleges.map(c => c.id === id ? { ...c, ...data } : c));
    },

    // Requests API
    getRequests: () => requests,
    getRequestsByCompany: (companyId) => requests.filter(r => r.companyId === companyId),
    getRequestsByCollege: (collegeId) => requests.filter(r => r.collegeId === collegeId),
    addRequest: (data) => {
      const newReq = { ...data, id: generateId('req'), status: 'Pending' };
      setRequests([...requests, newReq]);
      return newReq;
    },
    updateRequestStatus: (id, status) => {
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    },

    // Chats API
    getChatByRequestId: (reqId) => chats.find(c => c.requestId === reqId),
    addMessage: (reqId, senderId, text) => {
      const chat = chats.find(c => c.requestId === reqId);
      const message = { senderId, text, timestamp: new Date().toISOString() };
      if (chat) {
        setChats(chats.map(c => c.requestId === reqId ? { ...c, messages: [...c.messages, message] } : c));
      } else {
        setChats([...chats, { id: generateId('chat'), requestId: reqId, messages: [message] }]);
      }
    },

    // Drives API
    getDrives: () => drives,
    getDrivesByRequestId: (reqId) => drives.filter(d => d.requestId === reqId),
    addDrive: (data) => {
      const newDrive = { ...data, id: generateId('d'), status: 'Proposed' };
      setDrives([...drives, newDrive]);
      return newDrive;
    },
    updateDriveStatus: (id, status) => {
      setDrives(drives.map(d => d.id === id ? { ...d, status } : d));
    },
  };
};

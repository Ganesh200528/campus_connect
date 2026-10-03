import { useState, useContext, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { createApi } from '../api';
import { Send, ArrowLeft, Paperclip } from 'lucide-react';

export default function ChatView() {
  const { requestId } = useParams();
  const { user } = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const api = useMemo(() => createApi(dataContext), [dataContext]);
  const navigate = useNavigate();
  
  const requests = api.getRequests();
  const request = requests.find(r => r.id === requestId);
  const chat = api.getChatByRequestId(requestId);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!request) return <div className="p-8">Request not found.</div>;

  const otherPartyName = user.role === 'company' 
    ? api.getCollegeById(request.collegeId)?.name 
    : api.getCompanyById(request.companyId)?.name;

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    api.addMessage(requestId, user.id, newMessage);
    setNewMessage('');
  };

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-gray-900">{otherPartyName}</h2>
          <p className="text-xs text-gray-500">Regarding: {request.role} Drive</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {chat?.messages?.map((msg, idx) => {
          const isMe = msg.senderId === user.id;
          return (
            <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
        {(!chat || chat.messages.length === 0) && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-primary transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-primary focus:ring-0 text-sm outline-none transition-colors"
          />
          <button type="submit" disabled={!newMessage.trim()} className="p-2 bg-primary text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-primary transition-colors">
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}

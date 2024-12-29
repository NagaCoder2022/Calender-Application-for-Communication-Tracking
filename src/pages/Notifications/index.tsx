import React from 'react';
import { useStore } from '../../store';
import { getOverdueCommunications, getTodayCommunications } from '../../utils/communications';
import { format } from 'date-fns';

export function Notifications() {
  const { communications, companies, communicationMethods } = useStore();
  
  const overdueCommunications = getOverdueCommunications(communications);
  const todayCommunications = getTodayCommunications(communications);

  const renderCommunicationList = (comms: typeof communications, title: string, bgColor: string) => (
    <div className={`rounded-lg shadow ${bgColor} p-6 mb-6`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {comms.map(comm => {
          const company = companies.find(c => c.id === comm.companyId);
          const method = communicationMethods.find(m => m.id === comm.methodId);
          
          return (
            <div key={comm.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{company?.name}</span>
                <span className="text-sm text-gray-500 ml-2">via {method?.name}</span>
              </div>
              <span className="text-sm">{format(new Date(comm.date), 'MMM d, yyyy')}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
      
      {overdueCommunications.length > 0 && (
        renderCommunicationList(overdueCommunications, 'Overdue Communications', 'bg-red-50')
      )}
      
      {todayCommunications.length > 0 && (
        renderCommunicationList(todayCommunications, "Today's Communications", 'bg-yellow-50')
      )}
      
      {overdueCommunications.length === 0 && todayCommunications.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No pending notifications
        </div>
      )}
    </div>
  );
}
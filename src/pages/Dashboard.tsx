import React from 'react';
import { useStore } from '../store';
import { getOverdueCommunications, getTodayCommunications } from '../utils/communications';
import { format } from 'date-fns';

export function Dashboard() {
  const { companies, communications, communicationMethods } = useStore();
  
  const getLastFiveCommunications = (companyId: string) => {
    return communications
      .filter((c) => c.companyId === companyId && c.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const getNextCommunication = (companyId: string) => {
    return communications
      .filter((c) => c.companyId === companyId && !c.completed)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  const getCommunicationStatus = (companyId: string) => {
    const nextComm = getNextCommunication(companyId);
    if (!nextComm) return 'none';
    
    if (getOverdueCommunications([nextComm]).length > 0) return 'overdue';
    if (getTodayCommunications([nextComm]).length > 0) return 'today';
    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Company Communications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage your communications with companies
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Five Communications
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Next Communication
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {companies.map((company) => {
                    const status = getCommunicationStatus(company.id);
                    const rowClassName = 
                      status === 'overdue' ? 'bg-red-50' :
                      status === 'today' ? 'bg-yellow-50' :
                      '';

                    return (
                      <tr key={company.id} className={rowClassName}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {company.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div className="flex space-x-2">
                            {getLastFiveCommunications(company.id).map((comm) => {
                              const method = communicationMethods.find((m) => m.id === comm.methodId);
                              return (
                                <div
                                  key={comm.id}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  title={comm.notes}
                                >
                                  {method?.name} ({format(new Date(comm.date), 'MMM d')})
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {(() => {
                            const nextComm = getNextCommunication(company.id);
                            if (!nextComm) return 'No scheduled communications';
                            
                            const method = communicationMethods.find((m) => m.id === nextComm.methodId);
                            return (
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {method?.name} ({format(new Date(nextComm.date), 'MMM d')})
                              </div>
                            );
                          })()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
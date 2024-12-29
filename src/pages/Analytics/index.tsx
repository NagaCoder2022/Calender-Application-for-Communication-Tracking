import React from 'react';
import { useStore } from '../../store';
import { getOverdueCommunications } from '../../utils/communications';

export function Analytics() {
  const { communications, companies, communicationMethods } = useStore();

  const methodStats = communicationMethods.map(method => {
    const methodComms = communications.filter(c => c.methodId === method.id);
    return {
      ...method,
      total: methodComms.length,
      completed: methodComms.filter(c => c.completed).length,
    };
  });

  const overdueByCompany = companies.map(company => {
    const companyComms = communications.filter(c => c.companyId === company.id);
    return {
      ...company,
      overdue: getOverdueCommunications(companyComms).length,
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Communication Methods</h2>
          <div className="space-y-4">
            {methodStats.map(stat => (
              <div key={stat.id} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">{stat.name}</span>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-900">{stat.completed} completed</span>
                  <span className="text-sm text-gray-900">{stat.total} total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overdue Communications</h2>
          <div className="space-y-4">
            {overdueByCompany.map(company => (
              <div key={company.id} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">{company.name}</span>
                <span className="text-sm text-gray-900">{company.overdue} overdue</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
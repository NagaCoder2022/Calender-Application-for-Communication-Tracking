import React from 'react';
import { useStore } from '../../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function CommunicationChart() {
  const { communications, communicationMethods } = useStore();

  const data = communicationMethods.map(method => {
    const methodComms = communications.filter(c => c.methodId === method.id);
    return {
      name: method.name,
      total: methodComms.length,
      completed: methodComms.filter(c => c.completed).length,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Communication Methods Usage</h2>
      <div className="w-full overflow-x-auto">
        <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" fill="#4F46E5" name="Completed" />
          <Bar dataKey="total" fill="#818CF8" name="Total" />
        </BarChart>
      </div>
    </div>
  );
}
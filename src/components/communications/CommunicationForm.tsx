import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../store';
import { Communication } from '../../types';

interface CommunicationFormProps {
  onSubmit: (data: Partial<Communication>) => void;
  onCancel: () => void;
  selectedCompanies: string[];
}

export function CommunicationForm({ onSubmit, onCancel, selectedCompanies }: CommunicationFormProps) {
  const { communicationMethods } = useStore();
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data: any) => {
    const communications = selectedCompanies.map(companyId => ({
      id: crypto.randomUUID(),
      companyId,
      methodId: data.methodId,
      date: data.date,
      notes: data.notes,
      completed: false,
    }));

    communications.forEach(onSubmit);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Communication Method</label>
        <select
          {...register('methodId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {communicationMethods.map(method => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save Communication
        </button>
      </div>
    </form>
  );
}
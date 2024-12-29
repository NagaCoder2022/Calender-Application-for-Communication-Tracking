import React from 'react';
import { useStore } from '../../store';
import { CommunicationMethod } from '../../types';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';

interface Props {
  onEdit: (method: CommunicationMethod) => void;
}

export function CommunicationMethodList({ onEdit }: Props) {
  const { communicationMethods } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="px-6 py-3 grid grid-cols-4 gap-4">
            <div className="font-semibold">Name</div>
            <div className="font-semibold">Description</div>
            <div className="font-semibold flex items-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sequence
            </div>
            <div className="font-semibold text-right">Actions</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {communicationMethods
            .sort((a, b) => a.sequence - b.sequence)
            .map((method) => (
              <div key={method.id} className="px-6 py-4 grid grid-cols-4 gap-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{method.name}</span>
                  {method.isMandatory && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Mandatory
                    </span>
                  )}
                </div>
                <div className="text-gray-500">{method.description}</div>
                <div className="text-gray-500">{method.sequence}</div>
                <div className="text-right space-x-3">
                  <button
                    onClick={() => onEdit(method)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Company } from '../../types';
import { Building2, MapPin, Linkedin, Phone, Mail, Clock } from 'lucide-react';

interface Props {
  company: Company;
  onSelect: () => void;
  isSelected: boolean;
}

export function CompanyCard({ company, onSelect, isSelected }: Props) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      }`}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Building2 className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-900">{company.name}</h3>
          </div>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{company.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Linkedin className="h-4 w-4 mr-2" />
            <a
              href={company.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              LinkedIn Profile
            </a>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Communication every {company.communicationPeriodicity} days</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <div className="flex flex-wrap gap-2">
                {company.emails.map((email, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {email}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <div className="flex flex-wrap gap-2">
                {company.phoneNumbers.map((phone, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {phone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number;
}

export interface Communication {
  id: string;
  companyId: string;
  methodId: string;
  date: string;
  notes: string;
  completed: boolean;
}

export interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
}

export interface CommunicationResponse {
  id: string;
  communicationId: string;
  responseType: 'success' | 'followup' | 'none';
  notes: string;
  createdAt: string;
}
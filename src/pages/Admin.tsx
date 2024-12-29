import React from 'react';
import { UserManagement } from '../components/admin/UserManagement';
import { useStore } from '../store';

export function Admin() {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You need admin privileges to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      <UserManagement />
    </div>
  );
}
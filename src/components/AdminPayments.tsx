// src/components/AdminPayments.tsx
import React, { useState } from 'react';

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'verified' | 'failed';
  transaction_ref?: string;
  verified_at?: string;
  created_at: string;
}

interface AdminPaymentsProps {
  payments: Payment[];
}

const AdminPayments: React.FC<AdminPaymentsProps> = ({ payments }) => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleVerifyPayment = (paymentId: string) => {
    // Implement verify payment logic
    console.log('Verify payment:', paymentId);
    // Example: fetch(`/api/payments/${paymentId}/verify`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
    setSelectedPayment(null);
  };

  const handleFailPayment = (paymentId: string) => {
    // Implement fail payment logic
    console.log('Fail payment:', paymentId);
    // Example: fetch(`/api/payments/${paymentId}/fail`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
    setSelectedPayment(null);
  };

  const pendingPayments = payments.filter(payment => payment.status === 'pending');

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Manage Payments</h2>

      {/* Pending Payments List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Pending Payments</h3>
        {pendingPayments.length === 0 ? (
          <p className="text-gray-400">No pending payments.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reference</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {pendingPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-800">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{payment.user_id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-400">₦{payment.amount}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{payment.transaction_ref || 'N/A'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{new Date(payment.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleFailPayment(payment.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                      >
                        Fail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Verification/Failure Confirmation Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-green-400 mb-4">Confirm Verification</h3>
            <p className="mb-4">Are you sure you want to verify the payment for User ID: {selectedPayment.user_id} (₦{selectedPayment.amount})?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerifyPayment(selectedPayment.id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
              >
                Confirm Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
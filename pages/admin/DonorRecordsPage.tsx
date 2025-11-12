
import React, { useState, useEffect } from 'react';
import { getDonors, downloadCSV } from '../../utils/mockApi';
import { DonationFormData, DonationStatus } from '../../types';

const DonorRecordsPage: React.FC = () => {
    const [allDonors, setAllDonors] = useState<DonationFormData[]>([]);
    const [filteredDonors, setFilteredDonors] = useState<DonationFormData[]>([]);
    
    const [statusFilter, setStatusFilter] = useState<DonationStatus | 'all'>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDonors = async () => {
            setIsLoading(true);
            try {
                const data = await getDonors();
                setAllDonors(data);
                setFilteredDonors(data);
            } catch (error) {
                console.error("Failed to fetch donors:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDonors();
    }, []);

    const handleFilter = () => {
        let donors = allDonors;
        if (statusFilter !== 'all') {
            donors = donors.filter(d => d.status === statusFilter);
        }
        if (startDate) {
            donors = donors.filter(d => new Date(d.date) >= new Date(startDate));
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            donors = donors.filter(d => new Date(d.date) <= end);
        }
        setFilteredDonors(donors);
    };

    const clearFilters = () => {
        setStatusFilter('all');
        setStartDate('');
        setEndDate('');
        setFilteredDonors(allDonors);
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Donor Records</h1>
                <button 
                    onClick={() => downloadCSV(filteredDonors, 'donor_records.csv')}
                    className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-semibold shadow"
                >
                    Download as CSV
                </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
                            <option value="all">All</option>
                            <option value="Successful">Successful</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                    </div>
                     <div className="flex space-x-2 col-span-1 md:col-span-2">
                        <button onClick={handleFilter} className="bg-custom-purple-700 text-white hover:bg-custom-purple-800 px-4 py-2 rounded-lg font-semibold w-full">Filter</button>
                        <button onClick={clearFilters} className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold w-full">Clear</button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isLoading ? (
                            <tr><td colSpan={5} className="text-center py-4">Loading donors...</td></tr>
                        ) : filteredDonors.map(donor => (
                            <tr key={donor.id}>
                                {/* FIX: Use camelCase 'fullName' to match DonationFormData type. */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{Number(donor.amount).toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        donor.status === 'Successful' ? 'bg-green-100 text-green-800' :
                                        donor.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                     }`}>
                                        {donor.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donor.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isLoading && filteredDonors.length === 0 && <p className="text-center py-4 text-gray-500">No records found.</p>}
            </div>
        </div>
    );
};

export default DonorRecordsPage;
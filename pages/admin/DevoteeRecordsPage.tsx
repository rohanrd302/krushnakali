
import React, { useState, useMemo } from 'react';
import { getDevotees, downloadCSV } from '../../utils/mockApi';
import { DevoteeFormData } from '../../types';

const DevoteeRecordsPage: React.FC = () => {
    const allDevotees = useMemo(() => getDevotees(), []);
    const [filteredDevotees, setFilteredDevotees] = useState<DevoteeFormData[]>(allDevotees);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        let devotees = allDevotees;
        if (startDate) {
            devotees = devotees.filter(d => new Date(d.registrationDate) >= new Date(startDate));
        }
        if (endDate) {
            devotees = devotees.filter(d => new Date(d.registrationDate) <= new Date(endDate));
        }
        setFilteredDevotees(devotees);
    };

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setFilteredDevotees(allDevotees);
    };
    
    return (
        <div>
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Devotee Records</h1>
                <button 
                    onClick={() => downloadCSV(filteredDevotees, 'devotee_records.csv')}
                    className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-semibold shadow"
                >
                    Download as CSV
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleFilter} className="bg-custom-purple-700 text-white hover:bg-custom-purple-800 px-4 py-2 rounded-lg font-semibold w-full">Filter</button>
                        <button onClick={clearFilters} className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold w-full">Clear</button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birth Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDevotees.map(devotee => (
                            <tr key={devotee.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{devotee.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{devotee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{devotee.mobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{devotee.birthDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(devotee.registrationDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredDevotees.length === 0 && <p className="text-center py-4 text-gray-500">No records found.</p>}
            </div>
        </div>
    );
};

export default DevoteeRecordsPage;
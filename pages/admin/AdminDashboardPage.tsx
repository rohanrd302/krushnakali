
import React, { useState, useEffect } from 'react';
import { getDonors, getDevotees } from '../../utils/mockApi';
import { DonationFormData, DevoteeFormData } from '../../types';

const StatCard: React.FC<{ title: string; amount: string; period: string; icon: string }> = ({ title, amount, period, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-custom-purple-100 p-3 rounded-full">
            <span className="text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-custom-purple-900">{amount}</p>
            <p className="text-xs text-gray-400">{period}</p>
        </div>
    </div>
);

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ today: 0, month: 0, year: 0, todayCount: 0 });
    const [recentDonations, setRecentDonations] = useState<DonationFormData[]>([]);
    const [recentDevotees, setRecentDevotees] = useState<DevoteeFormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const donors = await getDonors();
                const devotees = await getDevotees();

                const successfulDonors = donors.filter(d => d.status === 'Successful');
                const now = new Date();
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                const thisYear = new Date(now.getFullYear(), 0, 1);

                const todayDonations = successfulDonors.filter(d => new Date(d.date) >= today);
                const monthDonations = successfulDonors.filter(d => new Date(d.date) >= thisMonth);
                const yearDonations = successfulDonors.filter(d => new Date(d.date) >= thisYear);

                const todaySum = todayDonations.reduce((acc, curr) => acc + Number(curr.amount), 0);
                const monthSum = monthDonations.reduce((acc, curr) => acc + Number(curr.amount), 0);
                const yearSum = yearDonations.reduce((acc, curr) => acc + Number(curr.amount), 0);

                setStats({
                    today: todaySum,
                    month: monthSum,
                    year: yearSum,
                    todayCount: todayDonations.length
                });

                setRecentDonations([...donors].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5));
                // FIX: Use camelCase 'registrationDate' to match DevoteeFormData type.
                setRecentDevotees([...devotees].sort((a,b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()).slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

    if (isLoading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Today's Donations" amount={formatCurrency(stats.today)} period={`from ${stats.todayCount} successful donations`} icon="☀️" />
                <StatCard title="This Month's Donations" amount={formatCurrency(stats.month)} period="Month-to-date" icon="🗓️" />
                <StatCard title="This Year's Donations" amount={formatCurrency(stats.year)} period={`Fiscal Year ${new Date().getFullYear()}`} icon="🏆" />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Donations</h2>
                     <ul className="divide-y divide-gray-200">
                        {recentDonations.map(donation => (
                            <li key={donation.id} className="py-3 flex justify-between items-center">
                                <div>
                                    {/* FIX: Use camelCase 'fullName' to match DonationFormData type. */}
                                    <p className="font-semibold text-gray-800">{donation.fullName}</p>
                                    <p className="text-sm text-gray-500">{new Date(donation.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-custom-purple-700">{formatCurrency(Number(donation.amount))}</p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        donation.status === 'Successful' ? 'bg-green-100 text-green-800' :
                                        donation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>{donation.status}</span>
                                </div>
                            </li>
                        ))}
                     </ul>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                     <h2 className="text-xl font-bold text-gray-800 mb-4">New Devotee Registrations</h2>
                     <ul className="divide-y divide-gray-200">
                        {recentDevotees.map(devotee => (
                             <li key={devotee.id} className="py-3">
                                <p className="font-semibold text-gray-800">{devotee.name}</p>
                                {/* FIX: Use camelCase 'registrationDate' to match DevoteeFormData type. */}
                                <p className="text-sm text-gray-500">Registered on: {new Date(devotee.registrationDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
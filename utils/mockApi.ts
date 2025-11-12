
import { DevoteeFormData, DonationFormData, TempleSettings } from '../types';

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }
    return response.json();
};

// --- API Functions ---

// Devotees
export const getDevotees = async (): Promise<DevoteeFormData[]> => {
    const response = await fetch('/.netlify/functions/get-devotees');
    return handleResponse(response);
};

export const addDevotee = async (devotee: Omit<DevoteeFormData, 'id' | 'registrationDate'>): Promise<any> => {
    const response = await fetch('/.netlify/functions/add-devotee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(devotee),
    });
    return handleResponse(response);
};

// Donors
export const getDonors = async (): Promise<DonationFormData[]> => {
    const response = await fetch('/.netlify/functions/get-donors');
    return handleResponse(response);
};

export const addDonor = async (donor: Omit<DonationFormData, 'id' | 'date'>): Promise<any> => {
    const response = await fetch('/.netlify/functions/add-donor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donor),
    });
    return handleResponse(response);
};


// Settings
export const getSettings = async (): Promise<TempleSettings> => {
    const response = await fetch('/.netlify/functions/get-settings');
    const settings = await handleResponse(response);
    // The config is stored in a 'config' property in the DB response
    return settings.config;
};

export const updateSettings = async (newSettings: TempleSettings): Promise<any> => {
     const response = await fetch('/.netlify/functions/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
    });
    return handleResponse(response);
};

// CSV Export Utility (remains client-side)
export const downloadCSV = <T extends object>(data: T[], filename: string): void => {
    if (data.length === 0) {
        alert("No data to download.");
        return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => JSON.stringify(row[header as keyof T], (key, value) => value === null ? '' : value)).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

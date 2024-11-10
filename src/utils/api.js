// src/utils/api.js (or any utility file)

export async function fetchHealthData() {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze-health-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch health data');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

import { useEffect, useState } from 'react';
import { fetchHealthData } from '@/utils/api';

function HealthDataComponent() {
    const [healthData, setHealthData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchHealthData();
                setHealthData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getData();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!healthData) return <div>Loading...</div>;

    return (
        <div>
            <h2>Health Data Analysis</h2>
            <pre>{JSON.stringify(healthData, null, 2)}</pre>
            {/* Add UI components to display analysisResults and summary */}
        </div>
    );
}

export default HealthDataComponent;

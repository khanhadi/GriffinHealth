import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HealthAnalyzer } from '../lib/health-analysis';
import type { HealthData } from '../types/health';

export default function AnalysisButton() {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const analyzer = new HealthAnalyzer(
        import.meta.env.PUBLIC_OPENAI_API_KEY
      );

      // Example health data structure
      const healthData: HealthData = {
        heart_rate: [
          { value: 72, startDate: '2024-11-10', endDate: '2024-11-10' },
        ],
        distance_walking_running: [],
        steps: [],
        respiratory_rate: [],
        audio_exposure: [],
        awake_duration: [],
        core_duration: [],
        deep_duration: [],
        rem_duration: [],
      };

      const analysis = await analyzer.analyzeHealthData(healthData);

      // Dispatch event with results
      window.dispatchEvent(
        new CustomEvent('healthAnalysisComplete', {
          detail: analysis.results,
        })
      );
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error appropriately
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Button onClick={handleAnalysis} disabled={isAnalyzing}>
      {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
    </Button>
  );
}

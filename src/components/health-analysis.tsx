import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, Activity, Heart, Moon, Wind, Volume2 } from 'lucide-react';
import { HealthAnalyzer } from '@/lib/health-analysis';
import type { AnalysisResult, HealthData } from '@/types/health';

// Helper function to generate dates for the last 7 days
const getRecentDates = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();
};

const formatMetricName = (metric: string): string => {
  return metric
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
// Generate realistic sample health data
const generateSampleHealthData = (): HealthData => {
  const dates = getRecentDates(7);

  return {
    heart_rate: dates.flatMap((date) => {
      // Generate multiple heart rate readings per day
      return Array.from({ length: 24 }, (_, i) => ({
        value: Math.floor(60 + Math.random() * 40), // Random between 60-100
        startDate: `${date}T${i.toString().padStart(2, '0')}:00:00`,
        endDate: `${date}T${i.toString().padStart(2, '0')}:00:00`,
      }));
    }),

    respiratory_rate: dates.map((date) => ({
      value: Math.floor(12 + Math.random() * 8), // Random between 12-20
      startDate: `${date}T00:00:00`,
      endDate: `${date}T23:59:59`,
    })),

    steps: dates.map((date) => ({
      value: Math.floor(5000 + Math.random() * 7000), // Random between 5000-12000
      startDate: `${date}T00:00:00`,
      endDate: `${date}T23:59:59`,
    })),

    distance_walking_running: dates.map((date) => ({
      value: (2 + Math.random() * 4).toFixed(2), // Random between 2-6 km
      startDate: `${date}T00:00:00`,
      endDate: `${date}T23:59:59`,
    })),

    audio_exposure: dates.flatMap((date) => {
      // Multiple audio readings per day
      return Array.from({ length: 12 }, (_, i) => ({
        value: Math.floor(40 + Math.random() * 35), // Random between 40-75 dB
        startDate: `${date}T${(i * 2).toString().padStart(2, '0')}:00:00`,
        endDate: `${date}T${(i * 2 + 1).toString().padStart(2, '0')}:59:59`,
      }));
    }),

    // Sleep data for each night
    awake_duration: dates.map((date) => ({
      value: Math.floor(10 + Math.random() * 20), // 10-30 minutes
      startDate: `${date}T00:00:00`,
      endDate: `${date}T00:30:00`,
    })),

    core_duration: dates.map((date) => ({
      value: Math.floor(180 + Math.random() * 60), // 3-4 hours
      startDate: `${date}T01:00:00`,
      endDate: `${date}T05:00:00`,
    })),

    deep_duration: dates.map((date) => ({
      value: Math.floor(60 + Math.random() * 60), // 1-2 hours
      startDate: `${date}T02:00:00`,
      endDate: `${date}T04:00:00`,
    })),

    rem_duration: dates.map((date) => ({
      value: Math.floor(90 + Math.random() * 30), // 1.5-2 hours
      startDate: `${date}T05:00:00`,
      endDate: `${date}T07:00:00`,
    })),
  };
};

const specialtyIcons: Record<string, any> = {
  CARDIAC: Heart,
  ACTIVITY: Activity,
  SLEEP: Moon,
  RESPIRATORY: Wind,
  AUDIO: Volume2,
} as const;

const specialtyColors: Record<string, string> = {
  CARDIAC: 'text-red-500',
  ACTIVITY: 'text-green-500',
  SLEEP: 'text-purple-500',
  RESPIRATORY: 'text-blue-500',
  AUDIO: 'text-orange-500',
} as const;

export default function HealthAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string>('');

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setError('');
    setProgress(0);

    try {
      const apiKey = import.meta.env.PUBLIC_OPENAI_API_KEY;
      if (!apiKey) throw new Error('OpenAI API key is not configured');

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 300);

      const analyzer = new HealthAnalyzer(apiKey);
      const healthData = generateSampleHealthData();
      const { results } = await analyzer.analyzeHealthData(healthData);

      clearInterval(progressInterval);
      setProgress(100);
      setResults(results);

      // Reset progress after animation
      setTimeout(() => setProgress(0), 500);
    } catch (err) {
      setError('Failed to analyze health data. Please try again.');
      console.error('Analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">AI Health Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive analysis of your health metrics across multiple
              categories
            </p>
          </div>
          <Button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            size="lg"
            className="gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        {isAnalyzing && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              Analyzing your health data...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {results.map((analysis, index) => {
          const IconComponent = specialtyIcons[analysis.specialty] ?? Activity;
          const colorClass =
            specialtyColors[analysis.specialty] ?? 'text-blue-500';

          return (
            <Card key={index} className="overflow-hidden">
              <div className="border-b bg-muted/40 p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full bg-background p-2 ${colorClass}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {analysis.specialty}
                  </h3>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {/* Statistics */}
                <div className="grid gap-4">
                  {Object.entries(analysis.statistics).map(
                    ([metric, stats]) => (
                      <div key={metric} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">
                            {formatMetricName(metric)}
                          </span>
                          <Badge variant="secondary">
                            {stats.average} {stats.unit || ''}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Range:</span>
                          <span className="font-medium">
                            {stats.min} - {stats.max}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="mb-3 font-medium text-muted-foreground">
                    AI's Recommendation
                  </h4>
                  <ul className="space-y-2">
                    {analysis.comments.map((comment, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="select-none">•</span>
                        <span>{comment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

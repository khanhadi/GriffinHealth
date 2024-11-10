// src/lib/health-analysis.ts
import { OpenAI } from 'openai';

// Type definitions
interface HealthMetric {
  value: string | number;
  startDate: string;
  endDate: string;
}

interface HealthData {
  heart_rate: HealthMetric[];
  distance_walking_running: HealthMetric[];
  steps: HealthMetric[];
  respiratory_rate: HealthMetric[];
  audio_exposure: HealthMetric[];
  awake_duration: HealthMetric[];
  core_duration: HealthMetric[];
  deep_duration: HealthMetric[];
  rem_duration: HealthMetric[];
}

interface AnalysisResult {
  specialty: string;
  statistics: Record<
    string,
    {
      average: string;
      min: number;
      max: number;
      total: string;
    }
  >;
  comments: string[];
}

// Specialist agents configuration
const specialistAgents = {
  CARDIAC: {
    role: 'Cardiac Specialist AI analyzing heart health patterns, ECG data.',
    metrics: ['heart_rate'],
  },
  SLEEP: {
    role: 'Sleep health AI analyzing sleep duration across stages.',
    metrics: [
      'awake_duration',
      'core_duration',
      'deep_duration',
      'rem_duration',
    ],
  },
  ACTIVITY: {
    role: 'Activity health AI analyzing walking speed, steps, and distance.',
    metrics: ['distance_walking_running', 'steps'],
  },
  RESPIRATORY: {
    role: 'Respiratory health AI analyzing respiratory rate data.',
    metrics: ['respiratory_rate'],
  },
  AUDIO: {
    role: 'Environmental audio exposure AI analyzing sound levels.',
    metrics: ['audio_exposure'],
  },
};

export class HealthAnalyzer {
  private openai: OpenAI;

  constructor(apiKey: string | undefined) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  private calculateStatistics(metricsData: Record<string, HealthMetric[]>) {
    const stats: Record<string, any> = {};

    for (const [metric, records] of Object.entries(metricsData)) {
      const values = records
        .map((record) => parseFloat(record.value.toString()))
        .filter((val) => !isNaN(val));

      if (values.length > 0) {
        stats[metric] = {
          average: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(
            2
          ),
          min: Math.min(...values),
          max: Math.max(...values),
          total: values.reduce((a, b) => a + b, 0).toFixed(2),
        };
      }
    }

    return stats;
  }

  private async analyzeWithAgent(
    specialty: string,
    agent: any,
    healthData: HealthData
  ) {
    const relevantMetrics: Record<string, HealthMetric[]> = {};
    for (const metric of agent.metrics) {
      if (healthData[metric as keyof HealthData]) {
        relevantMetrics[metric] = healthData[metric as keyof HealthData];
      }
    }

    const stats = this.calculateStatistics(relevantMetrics);
    const prompt = `
      As a ${agent.role}, analyze the following health metrics:
      ${JSON.stringify(stats, null, 2)}
      
      Provide key insights and actionable recommendations.
    `;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: agent.role },
        { role: 'user', content: prompt },
      ],
    });

    return {
      specialty,
      statistics: stats,
      comments: this.extractComments(response.choices[0].message.content || ''),
    };
  }

  private extractComments(text: string): string[] {
    const insights = text.match(
      /(recommend|suggest|advis(e|ing)|should)\s[^.,]*[.,]/gi
    );
    return insights
      ? insights.map((comment) => comment.trim())
      : ['No specific comments'];
  }

  public async analyzeHealthData(healthData: HealthData) {
    const analyses = await Promise.all(
      Object.entries(specialistAgents).map(([specialty, agent]) =>
        this.analyzeWithAgent(specialty, agent, healthData)
      )
    );

    return {
      results: analyses,
      summary: `Analysis complete across ${analyses.length} health categories.`,
    };
  }
}

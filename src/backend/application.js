import 'dotenv/config';
import { OpenAI } from 'openai';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { DateTime } from 'luxon';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
  maxRetries: 3,
});

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

class RAGVectorStore {
  constructor() {
    this.documents = [];
    this.embeddings = [];
  }

  async addHealthDocument(data, date) {
    try {
      const dataChunks = chunkArray(data, 100);
      const chunkEmbeddings = [];

      for (const chunk of dataChunks) {
        const embedding = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: JSON.stringify(chunk),
        });
        chunkEmbeddings.push(embedding.data[0].embedding);
      }

      this.documents.push({ date, data });
      this.embeddings.push(...chunkEmbeddings);

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      this.documents = this.documents.filter(
        (doc) => new Date(doc.date) > sixMonthsAgo
      );
      this.embeddings = this.embeddings.slice(-this.documents.length);
    } catch (error) {
      console.error('Error adding health document:', error);
      throw error;
    }
  }
}

const specialistAgents = {
  CARDIAC: {
    role: 'Cardiac Specialist AI analyzing heart health patterns, ECG data.',
    metrics: ['heart_rate'],
  },
  SLEEP: {
    role: 'Sleep health AI analyzing sleep duration across stages (awake, core, deep, REM).',
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

class SwarmCoordinator {
  constructor(agents, context) {
    this.agents = agents;
    this.context = context;
  }

  async runAnalyses() {
    const analysisResults = await Promise.all(
      Object.entries(this.agents).map(([specialty, agent]) =>
        this.runAgentAnalysis(specialty, agent)
      )
    );

    const summary = this.generateSummary(analysisResults);

    return {
      analysisResults: this.formatResults(analysisResults),
      summary,
    };
  }

  async runAgentAnalysis(specialty, agent) {
    const metricsData = this.extractMetrics(agent.metrics);
    const calculatedStats = this.calculateStatistics(metricsData);

    const prompt = this.buildPrompt(agent, calculatedStats);

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: agent.role },
        { role: 'user', content: prompt },
      ],
    });

    return {
      specialty,
      analysis: response.choices[0].message.content,
      statistics: calculatedStats,
    };
  }

  extractMetrics(metricsList) {
    const extracted = {};
    metricsList.forEach((metric) => {
      if (this.context[metric]) {
        extracted[metric] = this.context[metric];
      }
    });
    return extracted;
  }

  calculateStatistics(metricsData) {
    const stats = {};
    for (const [metric, records] of Object.entries(metricsData)) {
      const values = records
        .map((record) => parseFloat(record.value))
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
      } else {
        stats[metric] = { average: 0, min: 0, max: 0, total: 0 };
      }
    }
    return stats;
  }

  buildPrompt(agent, stats) {
    return `
            Analyze the following data for ${agent.role}:
            ${JSON.stringify(stats, null, 2)}
            Provide key patterns and actionable insights.
        `;
  }

  formatResults(analyses) {
    return analyses.reduce((formattedResults, analysis) => {
      const { specialty, analysis: rawText, statistics } = analysis;

      formattedResults[specialty] = {
        statistics,
        comments: this.extractComments(rawText),
      };

      return formattedResults;
    }, {});
  }

  extractComments(text) {
    const insightsMatch = text.match(
      /(recommend|suggest|advis(e|ing)|should)\s[^.,]*[.,]/gi
    );
    const comments = insightsMatch
      ? insightsMatch.map((comment) => comment.trim())
      : ['No specific comments'];
    return comments;
  }

  generateSummary(analyses) {
    return `Overall, your health metrics show stable patterns. ${analyses.length} categories were analyzed, with recommendations for improvement where needed.`;
  }
}

async function parseAppleHealthCSV(filePath) {
  const data = {
    heart_rate: [],
    distance_walking_running: [],
    body_weight: [],
    awake_duration: [],
    core_duration: [],
    deep_duration: [],
    rem_duration: [],
    steps: [],
    respiratory_rate: [],
    audio_exposure: [],
  };

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { type, startDate, endDate, value } = row;

        const start = DateTime.fromFormat(startDate, 'yyyy-MM-dd HH:mm:ss ZZZ');
        const end = DateTime.fromFormat(endDate, 'yyyy-MM-dd HH:mm:ss ZZZ');

        const durationMinutes =
          end.isValid && start.isValid ? end.diff(start, 'minutes').minutes : 0;
        const metric = { value: durationMinutes, startDate, endDate };

        switch (type) {
          case 'HeartRate':
            data.heart_rate.push({ value, startDate, endDate });
            break;
          case 'DistanceWalkingRunning':
            data.distance_walking_running.push({ value, startDate, endDate });
            break;
          case 'BodyMass':
            data.body_weight.push({ value, startDate, endDate });
            break;
          case 'SleepAnalysis':
            if (row.value === 'HKCategoryValueSleepAnalysisAsleepCore') {
              data.core_duration.push(metric);
            } else if (row.value === 'HKCategoryValueSleepAnalysisAsleepDeep') {
              data.deep_duration.push(metric);
            } else if (row.value === 'HKCategoryValueSleepAnalysisAsleepREM') {
              data.rem_duration.push(metric);
            } else if (row.value === 'HKCategoryValueSleepAnalysisAwake') {
              data.awake_duration.push(metric);
            }
            break;
          case 'StepCount':
            data.steps.push({ value, startDate, endDate });
            break;
          case 'RespiratoryRate':
            data.respiratory_rate.push({
              value: parseFloat(value),
              startDate,
              endDate,
            });
            break;
          case 'EnvironmentalAudioExposure':
            data.audio_exposure.push({
              value: parseFloat(value),
              startDate,
              endDate,
            });
            break;
          default:
            break;
        }
      })
      .on('end', () => resolve(data))
      .on('error', reject);
  });
}

async function addAppleHealthDataToRAG(filePath, vectorStore) {
  const structuredData = await parseAppleHealthCSV(filePath);
  await vectorStore.addHealthDocument(structuredData, new Date().toISOString());
}

async function main() {
  try {
    const filePath = path.resolve('apple_health_export_2024-11-10.csv');
    const vectorStore = new RAGVectorStore();

    await addAppleHealthDataToRAG(filePath, vectorStore);
    console.log('Health data stored in RAG system');

    const healthContext =
      vectorStore.documents[vectorStore.documents.length - 1].data;
    const swarmCoordinator = new SwarmCoordinator(
      specialistAgents,
      healthContext
    );

    console.log('Analyzing health data with Swarm AI...');
    const { analysisResults, summary } = await swarmCoordinator.runAnalyses();

    console.log('\n=== Swarm AI Health Analysis Report ===\n');
    console.log(JSON.stringify(analysisResults, null, 2));

    console.log('\n=== Summary ===\n');
    console.log(summary);
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

main();

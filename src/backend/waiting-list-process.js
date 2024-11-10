const OpenAI = require('openai');
const fs = require('fs');

class PriorityAssessmentSystem {
    constructor(openai) {
        this.openai = openai;
        this.priorityAgents = {
            URGENCY: {
                role: "Urgency Assessment Specialist analyzing waiting times and deterioration patterns",
                metrics: ['weeks_waiting', 'health_trends']
            },
            CLINICAL: {
                role: "Clinical Risk Specialist analyzing medical specialty and condition progression",
                metrics: ['specialty', 'status']
            },
            COMPLIANCE: {
                role: "NHS Guidelines Specialist ensuring compliance with waiting time targets",
                metrics: ['priority', 'breach_flag']
            }
        };
    }

    async assessPatientPriority(patientData, healthTrends) {
        const swarmCoordinator = new PrioritySwarmCoordinator(
            this.priorityAgents,
            patientData,
            healthTrends,
            this.openai
        );
        return await swarmCoordinator.runAssessment();
    }

    async processBatchPriorities(waitingListData, healthTrendsData) {
        const results = [];

        for (const patient of waitingListData.waiting_list_data) {
            const patientHealthTrends = healthTrendsData[patient.Patient_ID] || {};

            const assessment = await this.assessPatientPriority(patient, patientHealthTrends);

            results.push({
                Patient_ID: patient.Patient_ID,
                current_priority: patient.Priority,
                recommended_priority: assessment.recommendedPriority,
                change_required: patient.Priority !== assessment.recommendedPriority,
                reasoning: assessment.reasoning,
                risk_level: assessment.riskLevel,
                action_needed: assessment.actionNeeded
            });
        }

        return results;
    }
}

class PrioritySwarmCoordinator {
    constructor(agents, patientData, healthTrends, openai) {
        this.agents = agents;
        this.patientData = patientData;
        this.healthTrends = healthTrends;
        this.openai = openai;
    }

    async runAssessment() {
        const analysisResults = await Promise.all(
            Object.entries(this.agents).map(([specialty, agent]) =>
                this.runAgentAnalysis(specialty, agent)
            )
        );

        return this.synthesizeResults(analysisResults);
    }

    async runAgentAnalysis(specialty, agent) {
        const prompt = this.buildAnalysisPrompt(agent);

        const response = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are an ${agent.role}. Analyze the patient data and recommend any priority changes needed.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return {
            specialty,
            analysis: response.choices[0].message.content
        };
    }

    buildAnalysisPrompt(agent) {
        return `
        Analyze the following patient data:
        Patient Information:
        ${JSON.stringify(this.patientData, null, 2)}
        
        Health Trends:
        ${JSON.stringify(this.healthTrends, null, 2)}
        
        Consider:
        1. Current wait time vs target for specialty
        2. Health deterioration patterns
        3. Clinical urgency indicators
        4. NHS guidelines compliance
        
        Provide:
        1. Recommended priority level (Routine/Urgent/Cancer/Two Week Wait)
        2. Reasoning for recommendation
        3. Risk assessment
        4. Required actions
        `;
    }

    synthesizeResults(analysisResults) {
        const priorities = [];
        const reasonings = [];
        const risks = [];
        const actions = [];

        analysisResults.forEach(result => {
            const analysis = this.parseAnalysis(result.analysis);
            if (analysis.priority) priorities.push(analysis.priority);
            if (analysis.reasoning) reasonings.push(analysis.reasoning);
            if (analysis.risk) risks.push(analysis.risk);
            if (analysis.action) actions.push(analysis.action);
        });

        // Determine final priority based on highest urgency level
        const priorityLevels = {
            'Routine': 1,
            'Urgent': 2,
            'Cancer': 3,
            'Two Week Wait': 4
        };

        const recommendedPriority = priorities.reduce((highest, current) => {
            return priorityLevels[current] > priorityLevels[highest] ? current : highest;
        }, 'Routine');

        return {
            recommendedPriority,
            reasoning: reasonings.join(' '),
            riskLevel: this.aggregateRiskLevel(risks),
            actionNeeded: actions.join('; ')
        };
    }

    parseAnalysis(analysisText) {
        // Extract key information from the AI response
        const priority = (analysisText.match(/priority.*?:\s*(Routine|Urgent|Cancer|Two Week Wait)/i) || [])[1];
        const reasoning = (analysisText.match(/reasoning.*?:\s*(.*?)(?=\n|$)/i) || [])[1];
        const risk = (analysisText.match(/risk.*?:\s*(.*?)(?=\n|$)/i) || [])[1];
        const action = (analysisText.match(/action.*?:\s*(.*?)(?=\n|$)/i) || [])[1];

        return { priority, reasoning, risk, action };
    }

    aggregateRiskLevel(risks) {
        const riskScores = risks.map(risk => {
            if (risk.toLowerCase().includes('high')) return 3;
            if (risk.toLowerCase().includes('medium')) return 2;
            return 1;
        });

        const averageRisk = riskScores.reduce((a, b) => a + b, 0) / riskScores.length;
        if (averageRisk > 2.5) return 'High';
        if (averageRisk > 1.5) return 'Medium';
        return 'Low';
    }
}

// Example usage
async function main() {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            timeout: 30000,
            maxRetries: 3
        });

        // Load your waiting list JSON data
        const waitingListData = JSON.parse(fs.readFileSync('waiting_list.json'));

        // Load or generate health trends data (from your existing system)
        const healthTrendsData = {}; // This would come from your existing health trends analysis

        const prioritySystem = new PriorityAssessmentSystem(openai);

        console.log('Starting priority assessment...');
        const assessmentResults = await prioritySystem.processBatchPriorities(
            waitingListData,
            healthTrendsData
        );

        // Output results
        console.log('\n=== Priority Assessment Results ===\n');
        console.log(JSON.stringify(assessmentResults, null, 2));

        // Save results to file
        fs.writeFileSync(
            'priority_assessment_results.json',
            JSON.stringify(assessmentResults, null, 2)
        );
        console.log('\nResults saved to priority_assessment_results.json');

    } catch (error) {
        console.error('Error in priority assessment:', error);
    }
}

module.exports = {
    PriorityAssessmentSystem,
    PrioritySwarmCoordinator
};

if (require.main === module) {
    main();
}
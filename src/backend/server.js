// backend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { RAGVectorStore, SwarmCoordinator, specialistAgents, addAppleHealthDataToRAG } = require('./application'); // Adjust imports if necessary

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS to allow requests from your frontend

// Endpoint to handle health data analysis
app.post('/analyze-health-data', async (req, res) => {
    try {
        const filePath = path.resolve(__dirname, 'apple_health_export_2024-11-10.csv');
        const vectorStore = new RAGVectorStore();

        await addAppleHealthDataToRAG(filePath, vectorStore);
        const healthContext = vectorStore.documents[vectorStore.documents.length - 1].data;
        const swarmCoordinator = new SwarmCoordinator(specialistAgents, healthContext);

        const { analysisResults, summary } = await swarmCoordinator.runAnalyses();
        res.json({ analysisResults, summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});

# Griffin Health

## Tackling NHS Waitlists: A Time-Sensitive Challenge

How many people around us have suffered or even lost their lives waiting for an overdue medical appointment? Healthcare is often a race against time, yet thousands of individuals are stuck in queues, their needs sometimes escalating as they wait. For many, these delays mean worsening conditions and, in severe cases, a tragic outcome that might have been prevented with earlier intervention. Long NHS waitlists have made healthcare a challenge, not just for patients but for the doctors and healthcare staff working to meet an overwhelming demand. Recognising the critical need to streamline care, our team aimed to tackle this issue by developing a smarter, more dynamic way to prioritise patient needs. We believe no one should have to wait for essential care, especially when technology can help us address the gap.

## Efficient Care, Faster Results: Griffin Health's Approach

Griffin Health is here to make waiting for care a thing of the past. Picture this: a smart dashboard that gives doctors real-time health insights and enabling them to focus on patients who need immediate attention. With seamless integration of Apple Health data, Griffin Health aims to provide a comprehensive view of a patient’s wellness. Powered by AI agents, it doesn’t just track patient health but also learns from it, offering predictions and suggestions that help GPs make faster, smarter decisions. No more endless waiting — just proactive care when it matters the most, because in healthcare, every second counts.

## Theme: Travelling Through Time

Griffin Health perfectly aligns with the theme "Travelling Through Time." By analysing past trends and anticipating future needs, it empowers doctors to make informed decisions. In doing so, Griffin Health makes 'travel through the time of life' easier for patients by offering them a seamless healthcare experience :)

---

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your OpenAI API key:
```env
PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
```

3. Start the development server:
```bash
npm run dev
```

---

## Key Features

1. AI-Powered Health Insights and Future Predictions with Swarm Agents

Griffin Health's AI Analysis section integrates a range of AI swarm agents to provide real-time monitoring and dynamic prioritisation. These agents include:

- Sleep Agent: Analyses sleep duration across stages (awake, deep, core, REM) to detect irregularities.
- Respiratory Agent: Monitors respiratory data to identify breathing issues or lung problems.
- Cardiac Agent: Evaluates heart health and ECG data to spot potential cardiovascular risks.
- Activity Agent: Tracks walking speed, steps, and distance to assess mobility and overall fitness.
- Audio Exposure Agent: Analyses the sounds a patient hears to detect possible hearing-related issues or exposure to harmful noise.

By continuously analysing these health indicators, the AI agents detect concerning trends and initiate automatic priority reassessments when needed. This proactive system ensures that patients requiring urgent care are promptly identified, helping GPs make faster, more informed decisions and ultimately, provide quicker appointments to the patients who need them the most.

2. Vector-Based Health Data Storage with RAG

In the backend of Griffin Health, we use a vector-based health data storage system powered by Retrieval-Augmented Generation (RAG). This approach stores and indexes health data using OpenAI embeddings, allowing for efficient retrieval and analysis of historical health trends. Following up on the learnings from our 'Reply' workshop during the GreatUniHack, we chose RAG because it offers more reliable and precise handling of datasets compared to large language models (LLMs). By leveraging RAG, we ensure that health data is not only stored effectively but also easily accessed and analysed, enabling more accurate insights for both doctors and patients.

3. Dashboards and Appointment Scheduling - Frontend

Griffin Health offers visually engaging, interactive dashboards for both doctors and patients, displaying vital health data through dynamic charts and graphs. The soothing teal-green and white color scheme enhances the interface’s aesthetic appeal, making it both attractive and easy to navigate. The appointment scheduling page makes it simple to manage and prioritise appointments. This intuitive design enhances the user experience by turning complex health data into clear, actionable insights.

4. Apple Health Integration

Griffin Health aimed to integrate Apple Health data to provide a comprehensive, real-time view of patient health, tracking metrics like heart rate, sleep, and activity for more informed, proactive care. As part of the process, we developed a simple Swift app to request user permission for accessing Apple Health data and securely transmitting it to our server for analysis. Although, time constraints and server issues prevented full integration into the final project, we were able to test the system using real health data collected from a team member's Apple Watch. This ensured our approach was rooted in real-world data, aligning closely with practical application scenarios.

---

## Technology Stack

- Programming Languages: HTML, CSS, JavaScript, TypeScript
- Libraries/Frameworks: React, Astro, shadcn/ui, OpenAI API
- Tools: RAG, Swarm AI

---

## Conclusion

To end our project documentation, our team would like to say thank you for this incredible opportunity! Our first hackathon experience at GreatUniHack was a lot of fun — we loved brainstorming ideas, learning new things, and working together to bring our ideas to life. We’ve got a bunch of other features in mind, but our main goal was to create a solid and innovative proof of concept giving the time constraints. Hopefully, Leeds Griffins was a great representation of the University of Leeds :)💚

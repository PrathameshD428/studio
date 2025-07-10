# Domestika AI - Your Creative AI Companion

This is a Next.js application built with Firebase Studio. It's an AI companion designed to help creatives learn faster, practice better, and share more confidently.

## Core Features

*   **Skill Navigator**: Provides personalized course and project recommendations based on the user's current skill level, learning goals, and interests.
*   **Project Spark**: Generates creative project ideas to inspire users and help them overcome creative blocks.
*   **Critique AI**: Offers AI-driven feedback on user-submitted projects, evaluating aspects like composition, color, and technique.
*   **Connect Hub**: A directory of creative peers and experts, enabling users to find collaborators and mentors.
*   **My Journey**: A visual timeline of the user's progress, including completed courses, projects, and achievements.
*   **Share Space**: A community gallery where users can showcase their work and discover projects from other creatives.

## Local Development Setup

Follow these instructions to run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- npm (comes with Node.js)

### 1. Install Dependencies

Open your terminal in the project's root directory and run:

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Google's Generative AI and requires an API key to function.

1.  **Get an API key** from [Google AI Studio](https://aistudio.google.com/app/apikey). It's free.

2.  **Create an environment file**. In the project's root directory, you'll find a file named `.env.example`. Make a copy of this file and name it `.env`. You can do this from your terminal:
    ```bash
    cp .env.example .env
    ```

3.  **Add your API key**. Open the new `.env` file and replace `YOUR_API_KEY_HERE` with the actual API key you obtained from Google AI Studio.

    Your `.env` file should look like this:
    ```
    GOOGLE_API_KEY="aIzaSy..."
    ```
    
    **Important:** The AI features of the app will not work without a valid API key in your `.env` file.

### 3. Run the Development Servers

**Option A: Using VS Code (Recommended)**

This project includes an enhanced launch configuration for VS Code to make debugging easy.

1.  Open the project in VS Code.
2.  Go to the "Run and Debug" view (the bug icon on the left sidebar, or Ctrl+Shift+D).
3.  Select **"Debug: All"** from the dropdown menu at the top.
4.  Press the green play button (F5).

This single action will start both the Next.js web app and the Genkit AI backend, with debuggers attached to both. The web app will open automatically in your browser.


**Option B: Using the Terminal**

You need to run two servers in parallel in separate terminal windows.

**Terminal 1: Start the AI Backend (Genkit)**
```bash
npm run genkit:dev
```

**Terminal 2: Start the Web App (Next.js)**
```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Known Gaps and Next Experiments

While the core features provide a strong foundation, there are several areas for future development and experimentation:

*   **Deeper Personalization**: The current onboarding is form-based. A more interactive, conversational onboarding flow could gather richer data for a more tailored experience from day one.
*   **True Co-creation Tools**: "Critique AI" is a feedback tool. The next step is a true co-creation feature, where the AI acts as a creative partner in real-time (e.g., suggesting color palettes, generating sketch variations, or helping write creative briefs).
*   **Dynamic Social Interaction**: The "Connect Hub" and "Share Space" are currently static. The next experiments would involve adding real-time comments, direct messaging, and group formation to foster a more vibrant community.
*   **Gamified Journey**: "My Journey" is a timeline. We can evolve this by adding gamification elements like skill trees, XP systems, and community-based challenges to boost engagement and motivation.
*   **Metrics and Analytics**: Implement a full metrics dashboard to track user engagement with each feature, course completion rates, and the impact of AI suggestions on user projects. This will be crucial for data-driven iteration.
*   **Strategy & Roadmap Deck**: A formal presentation detailing the long-term vision, target user segments, competitive analysis, and a quarter-by-quarter feature roadmap is needed for stakeholder alignment.

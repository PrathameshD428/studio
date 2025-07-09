# Doma AI - Your Creative AI Companion

This is a Next.js application built with Firebase Studio. It's an AI companion designed to help creatives learn faster, practice better, and share more confidently.

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

This project uses Google's Generative AI. You'll need an API key.

1.  Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Create a file named `.env` in the project root by copying the example file:
    ```bash
    cp .env.example .env
    ```
3.  Add your API key to the `.env` file.

### 3. Run the Development Servers

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

### Using VS Code

This project includes a launch configuration for VS Code.
1.  Open the project in VS Code.
2.  Go to the "Run and Debug" view (Ctrl+Shift+D).
3.  Select "Debug Next.js App" from the dropdown and press F5. This will start the web app with the debugger attached.

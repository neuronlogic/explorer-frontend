# NASChain Explorer

## Getting Started

This section provides a step-by-step guide on how to set up your environment, install dependencies, and run the project

### Step 1: Clone the Repository

Start by cloning the repository to your local machine:

```
git clone <repository-url>
cd <project-directory-name>
```

### Step 2: Configure Environment Variables

Before running the project, you must configure environment-specific variables for development and
production environments.

- **Development Environment**:

  Copy the `.env.development.local.example` file, renaming it to `.env.development.local`:

  ```
  cp .env.development.local.example .env.development.local
  ```

  Open this file and add the development model viewer URL:

  ```
  REACT_APP_MODEL_VIEWER=http://localhost:8080
  ```

- **Production Environment**:

  Copy the `.env.production.local.example` file, renaming it to `.env.production.local`:

  ```
  cp .env.production.local.example .env.production.local
  ```

  Then, set the production model viewer URL:

  ```
  REACT_APP_MODEL_VIEWER=Your_model_viewer_url
  ```

Ensure these files are not committed to the repository to protect sensitive information.

### Step 3: Install Dependencies

Install the project's dependencies by running:

```
npm install
```

This command installs all necessary dependencies required for the project to run.

### Step 5: Start the Development Server

To start the project in development mode, run:

```
npm start
```

This will start the React development server, typically available at
[http://localhost:3000](http://localhost:3000). Navigate to this URL in your browser to view the
application.

Ensure the [your model visualizer](https://github.com/neuronlogic/model-visualizer) is already running on 8080 port
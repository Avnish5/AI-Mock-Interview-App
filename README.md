
# AI-Mock-Interview App

AI-Mock-Interview is an innovative platform built with Next.js that allows users to practice for job interviews with AI-generated mock interviews. Users can sign up or log in, create mock interviews tailored to their desired role, tech stack, and experience level, and receive AI-generated feedback and ratings on their responses.

You can check out the website live here: [AI-Mock-Interview App](https://ai-mock-interview-lnreq56uq-avnish-kumars-projects-1ae1d03d.vercel.app/)



## Features

- **User Authentication:** Secure sign-up and sign-in functionality using email.

- **Custom Mock Interviews:** Create mock interviews based on role, tech stack, and experience level.

- **AI-Generated Questions**: Receive questions generated by AI tailored to the chosen parameters.

- **Response Submission:** Submit answers to the AI-generated questions.

- **AI Feedback and Rating:** Get constructive feedback and ratings on your answers from AI.


## Technology used

**Next.js:** React framework for server-side rendering and static site generation.

**React:** Frontend library for building user interfaces.

**Node.js:** JavaScript runtime for backend services.

**Google Gemini API:** For generating interview questions and providing feedback .

**Clerk:** Authentication and user management platform for handling user sign-up, sign-in, and session management.

**PostgreSQL Neon:** A managed PostgreSQL database solution for storing user data and interview details.


## Installation

**1. Clone the Repository:**

```bash
  git clone https://github.com/Avnish5/AI-Mock-Interview-App.git
```

**2. Navigate to the Project Directory:**

```bash
  cd ai-mock-interview-app
```
**3. Install Dependencies:**

```bash
  npm install
  # or
  yarn install
```

**4. Set Up Environment Variables:**

Create a .env.local file in the root directory and add your environment variables. This includes credentials for your PostgreSQL Neon database, Clerk, and the Google Gemini API. 

```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=

  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

  NEXT_PUBLIC_DRIZZLE_DB_URL=

  NEXT_PUBLIC_GEMINI_API_KEY=
```

**5. Run the Development Server:**

```bash
  npm run dev
  
```

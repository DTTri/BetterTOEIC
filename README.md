# Project: BetterTOEIC

## Overview
BetterTOEIC is a comprehensive TOEIC (Test of English for International Communication) learning platform that provides:

### Core Features
- **TOEIC L&R Tests**: Full-length and mini TOEIC Listening & Reading tests with automatic scoring.
- **TOEIC S&W Tests**: Speaking & Writing tests with AI-powered evaluation and feedback.
- **Practice Exercises**: Part-specific practice tests and lessons for targeted improvement.
- **Vocabulary Learning**: Topic-based vocabulary with audio, images, and examples.
- **Learning Roadmap**: Personalized learning paths based on user's current and target levels.
- **Forum**: Community discussion platform for learners.
- **AI Chat Assistant**: TOEIC-focused chatbot for learning support.
- **File Management**: AWS S3 integration for audio, image, and document uploads

### Test Structure
- **L&R Tests**: 200 questions (100 Listening + 100 Reading) across 7 parts.
- **S&W Tests**: 19 questions (11 Speaking + 8 Writing) across 8 parts.
- **Practice**: Part-specific exercises (Parts 1-7) with explanations.
- **Vocabulary**: Organized by topics with multimedia content.

### Authentication & Authorization
- JWT-based authentication with refresh tokens.
- Email verification system.
- Password reset functionality.
- Admin and user role management.

### Data Storage
- MongoDB for primary data storage.
- AWS S3 for file storage (audio, images, test content).
- Redis for caching and session management.

### AI Integration
- Hugging Face models for S&W test evaluation.
- Speech-to-text for speaking test transcription.
- AI-powered scoring and feedback generation.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- AWS S3 SDK
- Redis
- Hugging Face Transformers

### Frontend
- React (TypeScript)
- Tailwind CSS
- Other popular React libraries (e.g., React Router, Axios)

### Database
- MongoDB

### File Storage
- AWS S3

### Caching
- Redis

### Artificial Intelligence (AI)
- Hugging Face Models
- Speech-to-Text APIs

## Servers

### Backend
- **Local Development Server**: `http://localhost:8000/api`
- **Production Server**: `https://bettertoeic-nodejsserver.onrender.com/api`

### Frontend
- **Local Development Server**: `http://localhost:3000`
- **Production Server**: `https://bettertoeic.id.vn/`

## Development Setup

### Backend
1.  Clone repository.
2.  Navigate to the `server` directory.
3.  Install dependencies: `npm install`.
4.  Create a `.env` file to configure the necessary environment variables (MongoDB URI, AWS credentials, JWT secrets, etc.).
5.  Start the server: `npm run dev`.

### Frontend
1.  Clone repository.
2.  Navigate to the `client` directory.
3.  Install dependencies: `npm install`.
4.  Create a `.env` file to configure the necessary environment variables.
5.  Start the application: `npm start`.

## ❔ **How to name a branch**

- Start the branch name with a prefix `{type}/`
- Follow `{type}/` with a description of the feature or the issue related to it.
- Example:

```bash
git checkout -b feature/add-login-button
git checkout -b bug/issue-#5
```

## ❔ **How to push**

- Role commit
  `{type}: {subject}`
  - type: build | chore | ci | docs | feat | fix | perf | refactor | revert | style | test
  - subject: 'Write a short, imperative tense description of the change'
- Automatic: check lint and format pre-commit

- Example:

```bash
git commit -m "{type}: {subject}"
```

Description
|**Types**| **Description** |
|:---| :--- |
|feat| A new feature|
|fix| A bug fix|
|docs| Documentation only changes|
|style| Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
|refactor| A code change that neither fixes a bug nor adds a feature |
|perf| A code change that improves performance |
|test| Adding missing tests or correcting existing tests |
|build| Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
|ci| 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
|chore| Other changes that don't modify src or test files |
|revert| Reverts a previous commit |

## License
This project is licensed under the MIT License.
- **URL**: https://opensource.org/licenses/MIT
# CodeSpark AI 🚀

> AI-powered course generation platform that creates comprehensive programming curricula in minutes

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Genkit-orange)](https://firebase.google.com/docs/genkit)

## 🎯 Overview

CodeSpark AI transforms course creation from hours to minutes by leveraging artificial intelligence to generate structured programming curricula. Simply provide a topic and learning phase, and get a complete course outline with lessons, micro-lessons, and curated resources.

## ✨ Features

- **🤖 AI-Powered Generation**: Instant course creation using Google AI and Genkit framework
- **📝 Editable Content**: Customize every aspect of generated courses
- **🔗 Shareable Links**: Share courses with unique, read-only URLs
- **💾 Local Storage**: Client-side persistence for courses and activities
- **🎨 Modern UI**: Responsive design with Radix UI and Tailwind CSS
- **🌙 Theme Support**: Light/dark mode switching
- **⚡ Robust Fallbacks**: Mock course generation when AI services are unavailable

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### AI Integration
- **Google AI** - LLM services
- **Genkit** - AI application framework
- **Zod** - Schema validation

### Form Handling
- **React Hook Form** - Form state management
- **Zod Validation** - Input validation schemas

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ramadan-Elgamal/CodeSpark.git
   cd CodeSpark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Add your Google AI API key to `.env.local`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── ai/
│   ├── flows/
│   │   └── generate-course.ts    # AI course generation logic
│   └── genkit.ts                 # Genkit configuration
├── app/
│   ├── actions.ts                # Server actions
│   ├── dashboard/                # Dashboard pages
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/                # Dashboard components
│   ├── landing/                  # Landing page components
│   └── ui/                       # Reusable UI components
└── lib/
    └── utils.ts                  # Utility functions
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run genkit:dev   # Start Genkit development server
```

## 🎨 Key Components

### Course Generation Flow
The platform uses a structured approach to course generation:

1. **User Input**: Topic and learning phase selection
2. **Validation**: Zod schema validation for input safety
3. **AI Processing**: Google AI generates structured course content
4. **Fallback System**: Mock course generation for reliability
5. **Storage**: Client-side persistence with localStorage

### AI Integration
- **Structured Prompts**: Schema-driven AI prompts ensure consistent output
- **Type Safety**: Full TypeScript integration with Zod schemas
- **Error Handling**: Comprehensive fallback systems for service failures

## 📊 Course Structure

Generated courses include:
- **Course Metadata**: Title, summary, learning phase
- **Lessons**: Main course sections with detailed descriptions
- **Micro-lessons**: Granular sub-topics within each lesson
- **Resources**: Curated free and paid learning materials
- **Project Integration**: Support for project-based learning paths

## 🔒 Data Management

- **Client-side Storage**: All data stored in browser localStorage
- **Activity Tracking**: User actions logged for dashboard insights
- **No Backend Required**: Fully client-side application
- **Privacy-First**: No user data sent to external servers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI team for Genkit framework
- Radix UI for accessible components
- Vercel for Next.js framework
- Tailwind CSS for styling system

## 📞 Support

For support, email [ramadanelgamal21@gmail.com] or open an issue on GitHub.

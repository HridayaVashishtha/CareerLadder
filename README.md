# 🎓 Career Ladder - AI Placement & Risk Predictor

A premium SaaS platform for predicting student placement chances, salary expectations, and EMI repayment readiness. Built with **Next.js 16.2.4** and **glassmorphism UI design**, featuring an elegant modern dashboard with real-time AI-powered insights.

## ✨ Features

### Core Predictions
- **Placement Timeline**: Predict placement chances at 3, 6, and 12 months
- **Salary Estimation**: Expected salary range with peer benchmarking
- **Risk Assessment**: EMI repayment risk levels based on placement timing
- **SHAP Explainability**: Understand which factors drive predictions

### Dashboard & Insights
- **4-Metric Dashboard**: Placement readiness, chance timeline, salary, EMI risk
- **AI Recommendations**: Personalized career improvement suggestions
- **Skill Gap Analysis**: Visual progress tracking for critical competencies
- **Career Profile**: Academic background, experience, certifications, skills
- **Job Opportunities**: AI-matched job listings with fit scoring
- **Interview Zone**: Mock interviews, HR Q&As, resume feedback
- **EMI Planning**: What-if simulator for loan repayment scenarios
- **Skill Learning Path**: Month-by-month learning recommendations

### Design System
- **Glassmorphism UI**: Premium frosted glass cards with backdrop blur
- **Color-Coded Metrics**: Purple (primary), Green (success), Amber (salary), Orange (risk)
- **Glow Effects**: Soft shadows and hover animations
- **Responsive Design**: Mobile-first approach with smooth breakpoints
- **Accessibility**: Semantic HTML, proper contrast, keyboard navigation

## 🚀 Quick Start

### Backend Setup
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Generate data and train models:
   ```bash
   python scripts/generate_data.py
   python scripts/precompute_cohorts.py
   python scripts/train_model.py
   ```

3. Start Flask API server:
   ```bash
   python backend/api.py
   ```
   API runs on `http://127.0.0.1:5000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section & features |
| `/assessment` | 4-step student profile form |
| `/dashboard` | Main dashboard with metrics & insights |
| `/dashboard/profile` | Career profile with academics & skills |
| `/dashboard/jobs` | AI-matched job opportunities |
| `/dashboard/loan-wellness` | EMI planning & simulator |
| `/dashboard/skill-up` | Personalized learning path |
| `/dashboard/interview` | Mock interviews & resume feedback |

## 🎨 Design Architecture

### Glassmorphism Components
- **Glass Cards**: `bg-white/[0.05] backdrop-blur-2xl border border-white/10`
- **Glowing Borders**: `hover:border-[color]-400/40 hover:shadow-lg shadow-[color]/20`
- **Smooth Transitions**: `transition-all duration-300`
- **Color System**: Purple (primary), Green (success), Amber (salary), Orange (risk)

### Typography Scale
- `text-4xl md:text-6xl lg:text-7xl` - Hero headlines
- `text-2xl font-bold` - Section titles
- `text-sm uppercase tracking-wider` - Labels

### Spacing System
- `py-24` - Major section padding (96px)
- `px-4` - Responsive horizontal padding
- `gap-6` - Grid gaps (24px)

## 🏗️ Project Structure

```
CareerLadder/
├── backend/
│   ├── api.py           # Flask API server
│   └── config/
│       └── mappings.py  # Configuration
├── frontend-next/       # Next.js 16.2.4 application
│   ├── app/
│   │   ├── page.tsx     # Landing page
│   │   ├── dashboard/   # Dashboard pages
│   │   └── globals.css  # Production-grade CSS
│   ├── components/      # Reusable components
│   ├── lib/            # API client & constants
│   └── package.json
├── data/               # Student data CSV
├── models/            # Trained ML models
├── scripts/           # Data generation & training
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/predict` | Get placement predictions & salary estimates |
| `POST` | `/whatif` | Simulate EMI scenarios |
| `GET` | `/health` | Health check |

### Request Example
```json
{
  "cgpa": 8.2,
  "internships": 2,
  "certifications": ["AWS", "GCP"],
  "graduation_year": 2026
}
```

## 📦 Tech Stack

### Frontend
- **Next.js 16.2.4** - React framework with Turbopack
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Professional SVG icons
- **Glassmorphism** - Premium modern UI design

### Backend
- **Python 3.7+** - Core language
- **Flask** - Web framework
- **Scikit-learn** - ML models
- **Pandas** - Data processing
- **SHAP** - Model explainability

## 🔧 Development Commands

### Frontend
```bash
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Production build
npm run lint            # Run ESLint
```

### Backend
```bash
python backend/api.py           # Start API
python scripts/generate_data.py # Generate data
python scripts/train_model.py   # Train models
```

## 🎯 Performance

- **Build Time**: ~11.5s (production build)
- **Dev Server**: Ready in ~2s
- **Bundle Size**: 359 packages, 0 vulnerabilities
- **Pages Prerendered**: 9 static routes

## 📝 Environment Setup

### Python (Backend)
```bash
# Optional: Anthropic API key for AI summaries
export ANTHROPIC_API_KEY=your_api_key_here
```

### Node.js (Frontend)
- Node 18+ recommended
- npm 9+ or yarn/pnpm

## 🎨 Customization

### Colors
Edit theme variables in `app/globals.css`:
```css
:root {
  --primary: #8b5cf6;        /* Purple */
  --text: #f8fafc;           /* White */
  --bg: #030712;             /* Dark */
}
```

### Typography
Fonts configured in `globals.css`:
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI';
```

## 📊 Features in Development
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] User authentication
- [ ] Database persistence
- [ ] Email notifications

## 📄 License

Built for education loan students. © 2026 CareerLadder.

## 🤝 Contributing

Contributions welcome! Please ensure:
- Code follows ESLint rules
- Types are properly defined
- Components are documented
- Tests pass before submission
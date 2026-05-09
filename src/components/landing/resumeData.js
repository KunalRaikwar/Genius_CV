export const resumeData = {
  modern: {
    name: 'Rahul Kumar', title: 'Senior Frontend Developer', email: 'rahul.kumar@email.com',
    phone: '+91 99876 54321', location: 'Bangalore, Karnataka', linkedin: 'linkedin.com/in/rahulkumar',
    summary: 'Creative frontend developer with 5+ years building pixel-perfect, accessible web applications. Expert in React ecosystem, performance optimization, and design systems. Led UI architecture at Swiggy serving 50M+ users.',
    skills: [
      { name: 'React / Next.js', w: 95 }, { name: 'JavaScript / TypeScript', w: 90 },
      { name: 'CSS / Tailwind / SCSS', w: 92 }, { name: 'Redux / Zustand', w: 85 },
      { name: 'Webpack / Vite', w: 80 }, { name: 'Jest / Cypress', w: 78 },
    ],
    experience: [
      { role: 'Senior Frontend Engineer', company: 'Swiggy', period: '2022–Present', bullets: [
        'Led redesign of checkout flow, increasing conversion rate by 18%',
        'Built component library used across 12 product teams with 200+ components',
        'Reduced bundle size by 45% through code splitting and tree shaking',
        'Mentored 6 junior developers and conducted 50+ code reviews weekly',
      ]},
      { role: 'Frontend Developer', company: 'Razorpay', period: '2020–2022', bullets: [
        'Developed merchant dashboard serving 8M+ businesses with real-time analytics',
        'Implemented A/B testing framework that improved signup flow by 25%',
        'Built custom charting library reducing third-party dependency by 60%',
      ]},
    ],
    education: { degree: 'B.Tech Computer Science', school: 'NIT Surathkal', year: '2016–2020', gpa: '8.9/10' },
    projects: [
      { name: 'Design System Library', tech: 'React, Storybook, TypeScript', desc: 'Open-source UI library with 500+ GitHub stars and 50+ components' },
      { name: 'Portfolio Generator', tech: 'Next.js, MDX, Vercel', desc: 'Auto-generates developer portfolios from GitHub profiles' },
    ],
    certs: ['Google UX Design Certificate', 'AWS Cloud Practitioner', 'Meta Frontend Developer'],
    languages: 'English (Fluent) • Hindi (Native) • Kannada (Conversational)',
  },
  minimal: {
    name: 'Sneha Patel', title: 'Product Designer — UX/UI', email: 'sneha.patel@email.com',
    phone: '+91 87654 32109', location: 'Mumbai, Maharashtra', linkedin: 'linkedin.com/in/snehapatel',
    summary: 'Award-winning product designer with 6+ years crafting intuitive digital experiences for fintech, e-commerce, and SaaS products. Passionate about user research, accessibility, and design thinking. Portfolio at snehapatel.design.',
    skills: [
      { name: 'Figma / Sketch', w: 96 }, { name: 'User Research', w: 90 },
      { name: 'Prototyping / Framer', w: 88 }, { name: 'Design Systems', w: 92 },
      { name: 'HTML / CSS', w: 80 }, { name: 'Adobe Creative Suite', w: 85 },
    ],
    experience: [
      { role: 'Lead Product Designer', company: 'PhonePe', period: '2022–Present', bullets: [
        'Redesigned core payment flow for 400M+ users, reducing drop-offs by 32%',
        'Built and maintained design system with 300+ tokens and 150+ components',
        'Led user research initiatives conducting 100+ interviews across 5 markets',
        'Managed team of 4 designers and collaborated with 8 engineering squads',
      ]},
      { role: 'UI/UX Designer', company: 'Myntra', period: '2019–2022', bullets: [
        'Designed mobile-first shopping experience used by 30M+ monthly users',
        'Created accessibility guidelines adopted company-wide improving WCAG compliance',
        'Conducted usability testing and A/B experiments improving checkout by 22%',
      ]},
    ],
    education: { degree: 'B.Des Communication Design', school: 'NID Ahmedabad', year: '2015–2019', gpa: '9.1/10' },
    projects: [
      { name: 'Accessibility Toolkit', tech: 'Figma Plugin, JavaScript', desc: 'Plugin for automated accessibility audits used by 2K+ designers' },
      { name: 'Design Mentorship Platform', tech: 'Webflow, Notion API', desc: 'Connected 500+ aspiring designers with industry mentors' },
    ],
    certs: ['Google UX Design Professional', 'Interaction Design Foundation', 'Nielsen Norman Group UX'],
    languages: 'English (Fluent) • Hindi (Native) • Gujarati (Native)',
  },
  developer: {
    name: 'Arjun Mehta', title: 'Backend Engineer — Cloud & DevOps', email: 'arjun.mehta@email.com',
    phone: '+91 76543 21098', location: 'Hyderabad, Telangana', linkedin: 'linkedin.com/in/arjunmehta',
    summary: 'Performance-driven backend engineer with 5+ years designing scalable distributed systems and microservices architecture. Expert in Python, Go, and cloud-native development. Handled systems processing 100K+ requests per second at Zerodha.',
    skills: [
      { name: 'Python / Django / Flask', w: 94 }, { name: 'Go / Gin', w: 85 },
      { name: 'PostgreSQL / Redis', w: 90 }, { name: 'Docker / Kubernetes', w: 88 },
      { name: 'AWS / GCP / Terraform', w: 86 }, { name: 'gRPC / REST / GraphQL', w: 82 },
    ],
    experience: [
      { role: 'Senior Backend Engineer', company: 'Zerodha', period: '2022–Present', bullets: [
        'Architected order matching engine handling 100K+ trades/second with 99.99% uptime',
        'Designed event-driven architecture reducing order latency from 50ms to 8ms',
        'Led migration from monolith to 25+ microservices serving 10M+ users',
        'Implemented circuit breaker patterns reducing cascading failures by 90%',
      ]},
      { role: 'Software Engineer', company: 'Atlassian', period: '2020–2022', bullets: [
        'Built real-time notification system delivering 50M+ notifications daily',
        'Optimized database queries reducing p99 response time from 2s to 200ms',
        'Developed CI/CD pipelines reducing deployment time from 45min to 8min',
      ]},
    ],
    education: { degree: 'M.Tech Computer Science', school: 'IIIT Hyderabad', year: '2016–2020', gpa: '9.3/10' },
    projects: [
      { name: 'Distributed Task Queue', tech: 'Go, Redis, gRPC', desc: 'Open-source job scheduler handling 1M+ tasks daily with 2K+ GitHub stars' },
      { name: 'API Gateway', tech: 'Python, Kong, Docker', desc: 'Custom gateway with rate limiting, auth, and observability for microservices' },
    ],
    certs: ['AWS Solutions Architect Professional', 'Certified Kubernetes Administrator', 'Google Cloud Engineer'],
    languages: 'English (Fluent) • Hindi (Native) • Telugu (Conversational)',
  },
  fresher: {
    name: 'Priya Verma', title: 'Computer Science Graduate — Aspiring SDE', email: 'priya.verma@email.com',
    phone: '+91 65432 10987', location: 'Delhi, India', linkedin: 'linkedin.com/in/priyaverma',
    summary: 'Motivated CS graduate from IIT Delhi with strong foundation in data structures, algorithms, and full-stack development. Built 8+ projects including AI-powered applications. Ranked in top 5% on LeetCode with 500+ problems solved. Eager to contribute to innovative engineering teams.',
    skills: [
      { name: 'Java / C++ / Python', w: 88 }, { name: 'Data Structures & Algo', w: 92 },
      { name: 'React / JavaScript', w: 80 }, { name: 'SQL / MongoDB', w: 78 },
      { name: 'Git / Linux / Docker', w: 75 }, { name: 'Machine Learning Basics', w: 70 },
    ],
    experience: [
      { role: 'Software Engineering Intern', company: 'Microsoft', period: 'May–Aug 2024', bullets: [
        'Built feature flag management system used by 15+ product teams',
        'Developed REST APIs in C# reducing manual configuration time by 70%',
        'Wrote 95% test coverage for new microservice using xUnit framework',
        'Presented intern project demo to VP of Engineering and 200+ employees',
      ]},
      { role: 'Open Source Contributor', company: 'Google Summer of Code', period: 'Jun–Sep 2023', bullets: [
        'Contributed to TensorFlow.js improving model inference speed by 15%',
        'Implemented 3 new layer types used by 10K+ developers globally',
        'Wrote comprehensive documentation and migration guides for v4 release',
      ]},
    ],
    education: { degree: 'B.Tech Computer Science & Engineering', school: 'IIT Delhi', year: '2020–2024', gpa: '9.1/10' },
    projects: [
      { name: 'AI Code Review Bot', tech: 'Python, GPT API, GitHub Actions', desc: 'Automated code reviewer providing suggestions on pull requests — 200+ users' },
      { name: 'Campus Connect App', tech: 'React Native, Firebase, Node.js', desc: 'Social platform for 5000+ college students with events and marketplace' },
    ],
    certs: ['Google Data Analytics Certificate', 'HackerRank Problem Solving (Gold)', 'LeetCode Knight Badge (Top 5%)'],
    languages: 'English (Fluent) • Hindi (Native)',
  },
  executive: {
    name: 'Vikram Gupta', title: 'Engineering Manager — Platform & Infrastructure', email: 'vikram.gupta@email.com',
    phone: '+91 54321 09876', location: 'Gurugram, Haryana', linkedin: 'linkedin.com/in/vikramgupta',
    summary: 'Strategic engineering leader with 10+ years managing high-performing teams of 20+ engineers. Delivered platform infrastructure at Uber and Paytm serving 100M+ users. Expert in scaling organizations, driving technical vision, and aligning engineering with business goals.',
    skills: [
      { name: 'Team Leadership (20+)', w: 95 }, { name: 'System Design / Architecture', w: 92 },
      { name: 'Agile / Scrum / Kanban', w: 90 }, { name: 'Stakeholder Management', w: 88 },
      { name: 'Python / Java / Go', w: 82 }, { name: 'Cloud Infrastructure', w: 85 },
    ],
    experience: [
      { role: 'Senior Engineering Manager', company: 'Uber India', period: '2021–Present', bullets: [
        'Led platform team of 22 engineers across 4 squads delivering rider & driver apps',
        'Drove 99.99% uptime SLA for payments processing $2B+ annual transactions',
        'Reduced hiring cycle from 45 to 18 days by revamping interview process',
        'Achieved 92% team retention through mentorship and growth frameworks',
      ]},
      { role: 'Engineering Manager', company: 'Paytm', period: '2018–2021', bullets: [
        'Managed 15-person team building merchant payment solutions for 20M+ businesses',
        'Delivered wallet-to-bank transfer feature generating ₹500Cr+ monthly volume',
        'Established engineering best practices reducing production incidents by 65%',
      ]},
    ],
    education: { degree: 'MBA Technology Management', school: 'ISB Hyderabad', year: '2016–2018', gpa: 'Dean\'s List' },
    projects: [
      { name: 'Engineering Competency Framework', tech: 'Strategy, Documentation', desc: 'Created org-wide career ladder adopted by 200+ engineers across 8 teams' },
      { name: 'Tech Hiring Pipeline', tech: 'Process Design, Tooling', desc: 'Automated hiring workflow reducing time-to-offer by 60%' },
    ],
    certs: ['Stanford Executive Program in Technology', 'Certified Scrum Master (CSM)', 'AWS Solutions Architect'],
    languages: 'English (Fluent) • Hindi (Native) • Punjabi (Conversational)',
  },
  creative: {
    name: 'Kavya Nair', title: 'UX Researcher & Content Strategist', email: 'kavya.nair@email.com',
    phone: '+91 43210 98765', location: 'Pune, Maharashtra', linkedin: 'linkedin.com/in/kavyanair',
    summary: 'Empathetic UX researcher and content strategist with 4+ years translating user insights into product strategy. Led research programs at Zomato and Notion impacting 30M+ users. Expertise in mixed-method research, journey mapping, and content design.',
    skills: [
      { name: 'User Research / Interviews', w: 94 }, { name: 'Usability Testing', w: 90 },
      { name: 'Content Strategy', w: 88 }, { name: 'Data Analysis / SQL', w: 82 },
      { name: 'Figma / Miro / FigJam', w: 86 }, { name: 'Survey Design / Qualtrics', w: 80 },
    ],
    experience: [
      { role: 'Senior UX Researcher', company: 'Zomato', period: '2022–Present', bullets: [
        'Led generative research for food delivery redesign impacting 30M+ monthly users',
        'Established research ops process reducing insight delivery time from 3 weeks to 5 days',
        'Conducted 200+ user interviews across 8 cities for Hyperpure B2B product',
        'Created research repository used by 50+ designers and PMs for decision-making',
      ]},
      { role: 'UX Researcher', company: 'Notion India', period: '2021–2022', bullets: [
        'Designed and executed diary studies uncovering 15 unmet user needs',
        'Built persona framework adopted across product and marketing teams globally',
        'Ran competitive analysis across 20+ tools informing product roadmap priorities',
      ]},
    ],
    education: { degree: 'M.A. Human-Computer Interaction', school: 'IDC IIT Bombay', year: '2017–2021', gpa: '9.4/10' },
    projects: [
      { name: 'Research Playbook', tech: 'Notion, Dovetail, Figma', desc: 'Open-source UX research methodology guide used by 1K+ researchers' },
      { name: 'Voice of Customer Dashboard', tech: 'Python, Streamlit, NLP', desc: 'Automated sentiment analysis tool processing 10K+ reviews monthly' },
    ],
    certs: ['UXPA Certified Usability Analyst', 'Google UX Research Certificate', 'NNg Research Practitioner'],
    languages: 'English (Fluent) • Hindi (Fluent) • Malayalam (Native)',
  },
};

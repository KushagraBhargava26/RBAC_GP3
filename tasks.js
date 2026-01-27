// Milestone 1: Data Preparation & Vector DB (Weeks 1-2) ✅ COMPLETED
// Milestone 2: Backend Auth & Search (Weeks 3-4) ✅ COMPLETED
// Milestone 4: Frontend & Deployment (Weeks 7-8) ⏳ NOT STARTED
// ---------------------------------------------------------

// Team Members
const teamMembers = [
    'Arshad Pasha', 'Depuru Joshika Reddy', 'Guru Karthik Reddy Marthala',
    'Kavya Ghantasala', 'Kushagra Bhargava', 'Mandha Shirisha',
    'Sri Saranya Chandrapati', 'Vinuthna Jangam'
];

// =====================================================
// WEEK 8 TASKS (Module 8: System Integration & Deployment)
// =====================================================
const week8Tasks = [
    // 1. Arshad (LEAD) - Backend Deployment
    {
        id: 801,
        title: 'Deploy FastAPI Backend to Render',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Deploy the Python backend to the cloud.<br><br>
1. Prepare requirements.txt and runtime.txt.<br>
2. Configure Render.com web service.<br>
3. Set up environment variables (Prod).<br>
4. Verify API endpoints in production.<br><br>
<strong>📌 Output:</strong> Live Backend URL (e.g., https://rbac-api.onrender.com)`,
        deepExplanation: `
<h3>🚀 Backend Deployment Guide</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ LEAD TASK - The foundation for live access!</p>
<hr>
<h4>🔹 STEP 1: Prepare for Deployment</h4>
<p>Create <code>runtime.txt</code> in root:</p>
<pre><code>python-3.9.18</code></pre>
<p>Ensure <code>requirements.txt</code> has <code>uvicorn</code> and <code>gunicorn</code>.</p>

<h4>🔹 STEP 2: Push to GitHub</h4>
<pre><code>git checkout main
git push origin main</code></pre>

<h4>🔹 STEP 3: Deploy on Render</h4>
1. Go to dashboard.render.com
2. New + -> Web Service
3. Connect GitHub Repo
4. <strong>Build Command:</strong> <code>pip install -r requirements.txt</code>
5. <strong>Start Command:</strong> <code>uvicorn main:app --host 0.0.0.0 --port 10000</code>
6. Add Environment Variables (OPENAI_KEY, SECRET_KEY, etc.)

<h4>🔹 STEP 4: Verification</h4>
Test <code>/docs</code> on the live URL.
`
    },

    // 2. Bhargava (HARD) - Frontend Deployment
    {
        id: 802,
        title: 'Deploy Next.js Frontend to Vercel',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Deploy the UI to Vercel global CDN.<br><br>
1. Configure Vercel project.<br>
2. Connect to GitHub repository.<br>
3. Set up production ENV variables.<br>
4. Fix build errors and optimize assets.<br><br>
<strong>📌 Output:</strong> Live Frontend URL (e.g., https://rbac-chatbot.vercel.app)`,
        deepExplanation: `
<h3>🚀 Frontend Deployment Guide</h3>
<p style="color: #fbbf24; font-weight: bold;">Make our beautiful UI live for the world!</p>
<hr>
<h4>🔹 STEP 1: Vercel Setup</h4>
1. Go to vercel.com -> Add New -> Project
2. Import the Git Repository
3. Framework Preset: Next.js

<h4>🔹 STEP 2: Environment Config</h4>
Add the backend URL from Arshad's task:
<pre><code>NEXT_PUBLIC_API_URL=https://your-backend.onrender.com</code></pre>

<h4>🔹 STEP 3: Deploy</h4>
Click <strong>Deploy</strong> and watch the build logs.
Fix any TypeScript errors if the build fails.

<hr>
<p style="color: #22c55e;">✅ SUCCESS: App is running on the edge!</p>
`
    },

    // 3. Kavya (HARD) - API Integration
    {
        id: 803,
        title: 'Full Stack API Integration',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Connect Frontend Chat UI to Backend RAG.<br><br>
1. Create API service layer in Next.js.<br>
2. Connect Chat component to <code>/rag/query</code>.<br>
3. Handle streaming responses (if implemented) or loading states.<br>
4. Display real data from backend.<br><br>
<strong>📌 Output:</strong> A working functional chatbot.`,
        deepExplanation: `
<h3>🔗 API Integration Logic</h3>
<p>Connect the brain (Backend) to the face (Frontend).</p>
<hr>
<h4>🔹 React Query / Axios</h4>
Use <strong>TanStack Query</strong> for caching and state management.

<pre><code>// hooks/useChat.ts
export const useChat = () => {
  return useMutation({
    mutationFn: async (message) => {
      const response = await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL}/query\`,
        { query: message }
      );
      return response.data;
    }
  });
}</code></pre>
`
    },

    // 4. Joshika (HARD) - Auth Integration
    {
        id: 804,
        title: 'Authentication & Session Handling',
        assignee: 'Depuru Joshika Reddy',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Secure the frontend with JWT.<br><br>
1. Integrate Login form with <code>/auth/login</code>.<br>
2. Store JWT securely (HttpOnly cookie or secure storage).<br>
3. Create Protected Routes middleware.<br>
4. Handle session expiration/logout.<br><br>
<strong>📌 Output:</strong> Secure login flow working in production.`,
        deepExplanation: `
<h3>🔐 Auth Implementation</h3>
<hr>
<h4>🔹 JWT Handling</h4>
Do not store sensitive tokens in localStorage if possible. Use cookies or memory.

<h4>🔹 Protected Routes</h4>
Create a wrapper component:
<pre><code>const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  return children;
};</code></pre>
`
    },

    // 5. Vinuthna (HARD) - Performance & Optimization
    {
        id: 805,
        title: 'Performance Optimization & Lighthouse',
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Make the app buttery smooth.<br><br>
1. Optimize images (Next/Image).<br>
2. Implement code splitting / lazy loading.<br>
3. Run Google Lighthouse audit.<br>
4. Achieve >90 performance score.<br><br>
<strong>📌 Output:</strong> High-performance web app.`,
        deepExplanation: `
<h3>⚡ Speed Optimization</h3>
<hr>
<p><strong>Tasks:</strong></p>
1. Use <code>next/image</code> for all assets.
2. Implement <code>React.lazy()</code> for heavy components (charts, PDF viewers).
3. Minimize main thread work.
4. Verify with Chrome DevTools > Lighthouse.
`
    },

    // 6. Shirisha (HARD) - E2E Testing
    {
        id: 806,
        title: 'End-to-End System Testing',
        assignee: 'Mandha Shirisha',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Verify the entire system workflow.<br><br>
1. Test Finance User flow (Login -> Ask Finance Q -> Get Answer).<br>
2. Test HR User flow.<br>
3. Verify unauthorized access denial.<br>
4. Report bugs to team.<br><br>
<strong>📌 Output:</strong> Final Test Report (Pass/Fail).`,
        deepExplanation: `
<h3>🧪 Quality Assurance</h3>
<hr>
<p><strong>Test Scenarios:</strong></p>
1. <strong>Happy Path:</strong> Login as Arshad (C-Level) -> Ask about anything -> Success.
2. <strong>Security Path:</strong> Login as Intern -> Ask about CEO salary -> "Access Denied".
3. <strong>Edge Case:</strong> Empty queries, network failure.
`
    },

    // 7. Karthik (HARD) - Error Handling
    {
        id: 807,
        title: 'Global Error Handling & Notifications',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Add polish with user feedback.<br><br>
1. Implement Toast notifications (Sonner/Hot Toast).<br>
2. Create 404 and 500 Error pages.<br>
3. Handle API timeout/failures gracefully.<br>
4. Add Loading skeletons.<br><br>
<strong>📌 Output:</strong> Robust UI that handles errors gracefully.`,
        deepExplanation: `
<h3>🔔 User Feedback System</h3>
<hr>
<p>Use <strong>Sonner</strong> for beautiful toasts.</p>
<pre><code>toast.error('Failed to login. Please check credentials.');
toast.success('Document processed successfully!');</code></pre>
`
    },

    // 8. Saranya (HARD) - Documentation
    {
        id: 808,
        title: 'Final System Documentation & Demo',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Prepare for project submission.<br><br>
1. Create valid README.md with setup instructions.<br>
2. Record Walkthrough Demo Video.<br>
3. Document API endpoints and UI features.<br>
4. Finalize GitHub repo.<br><br>
<strong>📌 Output:</strong> Complete Project Package.`,
        deepExplanation: `
<h3>📚 Final Deliverables</h3>
<hr>
1. <strong>README.md:</strong> Badges, Screenshots, Setup Guide.
2. <strong>Demo Video:</strong> 3-5 minute loom/recording showing:
   - Login
   - Role switching
   - RAG response
   - Citation check
`
    }
];

// =====================================================
// WEEK 7 TASKS (Module 7: Premium Next.js Frontend)
// =====================================================
const week7Tasks = [
    // 1. Arshad (LEAD) - Project Setup
    {
        id: 701,
        title: 'Initialize Next.js 14 + Shadcn/UI Project',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Create the foundation for Premium UI.<br><br>
1. Initialize Next.js App Router (TypeScript).<br>
2. Install Tailwind CSS & Shadcn/UI.<br>
3. Set up folder structure (components, lib, app).<br>
4. Create global theme (Fonts, Colors).<br><br>
<strong>📌 Output:</strong> Working Next.js repo ready for team.`,
        deepExplanation: `
<h3>📘 Lead Task: Project Initialization</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ FOUNDATION TASK - Do this first!</p>
<hr>
<h4>🔹 STEP 1: Create Project</h4>
<pre><code>npx create-next-app@latest rbac-frontend --typescript --tailwind --eslint</code></pre>

<h4>🔹 STEP 2: Install UI Library</h4>
<pre><code>npx shadcn-ui@latest init</code></pre>
Select <strong>Slate</strong> or <strong>Zinc</strong> color theme.

<h4>🔹 STEP 3: Install Core Deps</h4>
<pre><code>npm install framer-motion lucide-react axios clsx tailwind-merge</code></pre>

<h4>🔹 STEP 4: Create Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
src/
├── app/          (Next.js App Router)
├── components/   (Reusable UI parts)
│   ├── ui/       (Shadcn basic components: buttons, inputs)
│   ├── premium/  (Custom complex components)
├── lib/          (Utils, API clients)
├── public/       (Images, fonts)
</pre>

<h4>🔹 STEP 5: Push to GitHub</h4>
Create <code>rbac-frontend</code> repo and push.
`
    },

    // 2. Bhargava (HARD) - Auth UI
    {
        id: 702,
        title: 'Design Premium Login & Register Pages',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Create a "Wow" factor login screen.<br><br>
1. Create <code>app/(auth)/login/page.tsx</code>.<br>
2. Use Glassmorphism effects with Tailwind.<br>
3. Add background animations (particles/gradients).<br>
4. Build Login/Signup forms with validation.<br><br>
<strong>📌 Output:</strong> /login and /register pages.`,
        deepExplanation: `
<h3>🎨 Premium Auth Design</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/app/(auth)/login/page.tsx</code></p>
<p><strong>Design Tips:</strong></p>
- Use a dark rich background with a glowing gradient mesh.
- Make the login card translucent using <code>backdrop-blur-md bg-white/10</code>.
- Use <strong>Framer Motion</strong> to slide the card up on load:
<pre><code>
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
  <LoginForm />
</motion.div>
</code></pre>
`
    },

    // 3. Kavya (HARD) - Chat Interface
    {
        id: 703,
        title: 'Build Interactive Chat Interface',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Build a ChatGPT-like experience.<br><br>
1. Create <code>src/components/premium/ChatInterface.tsx</code>.<br>
2. Message Bubble components (User/Bot styles).<br>
3. Typing indicators (animated dots).<br>
4. Markdown rendering for bot responses.<br><br>
<strong>📌 Output:</strong> Main Chat Component.`,
        deepExplanation: `
<h3>💬 Chat UI Components</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/components/premium/ChatInterface.tsx</code></p>
- <strong>Dependency:</strong> Install <code>react-markdown</code> for rendering AI responses.
- <strong>Styling:</strong>
  - User Bubble: <code>bg-blue-600 text-white rounded-tr-none</code>
  - Bot Bubble: <code>bg-slate-800 text-slate-200 rounded-tl-none</code>
- <strong>Animation:</strong> Use <code>AnimatePresence</code> from Framer Motion for smooth message entry.
`
    },

    // 4. Joshika (HARD) - Sidebar Navigation
    {
        id: 704,
        title: 'Dynamic Role-Based Sidebar',
        assignee: 'Depuru Joshika Reddy',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Navigation that adapts to the user.<br><br>
1. Create <code>src/components/premium/Sidebar.tsx</code>.<br>
2. Show User Profile section (Avatar + Name).<br>
3. Display Role Badge (e.g., "Finance Team").<br>
4. List accessible document categories based on role.<br><br>
<strong>📌 Output:</strong> Sidebar Component.`,
        deepExplanation: `
<h3>🧭 Smart Navigation</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/components/premium/Sidebar.tsx</code></p>
- <strong>Icons:</strong> Use <strong>Lucide React</strong> (e.g., <code><LayoutDashboard /></code>, <code><FileText /></code>).
- <strong>Logic:</strong>
<pre><code>
const navItems = {
  finance: [{ label: 'Q3 Reports', icon: <FileText /> }],
  hr: [{ label: 'Resumes', icon: <UserPlus /> }]
};
// Render items based on currentUser.role
</code></pre>
`
    },

    // 5. Vinuthna (HARD) - Dashboard Widgets
    {
        id: 705,
        title: 'Analytics Dashboard Widgets',
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Visual data for C-Level users.<br><br>
1. Create <code>src/components/premium/DashboardWidgets.tsx</code>.<br>
2. Integrate <strong>Recharts</strong> library.<br>
3. Create "Documents Indexed" chart.<br>
4. Create "Recent Queries" list.<br><br>
<strong>📌 Output:</strong> Dashboard Page components.`,
        deepExplanation: `
<h3>📊 Data Visualization</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/components/premium/DashboardWidgets.tsx</code></p>
- <strong>Dependency:</strong> <code>npm install recharts</code>
- <strong>Components:</strong>
  - <code><StatCard label="Total Queries" value="1,240" trend="+12%" /></code>
  - <code><ActivityChart data={dailyUsageData} /></code>
- <strong>Design:</strong> Use <code>bg-slate-900 border-slate-800</code> for dark mode cards.
`
    },

    // 6. Shirisha (HARD) - Document Browser
    {
        id: 706,
        title: 'Document Source Browser UI',
        assignee: 'Mandha Shirisha',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Interface to view knowledge base.<br><br>
1. Create <code>src/app/documents/page.tsx</code>.<br>
2. Create Grid/List view of documents.<br>
3. Implement Search/Filter by department.<br>
4. Add "View Content" modal using Shadcn Dialog.<br><br>
<strong>📌 Output:</strong> Knowledge Base page.`,
        deepExplanation: `
<h3>📂 Document Explorer</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/app/documents/page.tsx</code></p>
- <strong>Components:</strong>
  - <code><DocumentCard title="Q3 Financials" type="PDF" /></code>
- <strong>Interaction:</strong>
  - Add a "Search Documents" input bar using Shadcn Input.
  - Clicking a document should open a <code><Dialog></code> with document details and metadata tags.
`
    },

    // 7. Karthik (HARD) - User Settings
    {
        id: 707,
        title: 'User Settings & Profile UI',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Personalization options.<br><br>
1. Create <code>src/app/settings/page.tsx</code>.<br>
2. Dark/Light mode toggle (using next-themes).<br>
3. Profile update form.<br>
4. Change password UI.<br><br>
<strong>📌 Output:</strong> Settings Page.`,
        deepExplanation: `
<h3>⚙️ Settings & Preferences</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/app/settings/page.tsx</code></p>
- <strong>Structure:</strong> Use <strong>Shadcn Tabs</strong> to separate:
  - <strong>Account:</strong> Change Name, Email.
  - <strong>Appearance:</strong> Theme Toggle (Sun/Moon).
  - <strong>Security:</strong> Change Password.
- <strong>Theme Toggle:</strong>
<pre><code>const { setTheme } = useTheme()
<Button onClick={() => setTheme("dark")}>Dark Mode</Button></code></pre>
`
    },

    // 8. Saranya (HARD) - Citation UI
    {
        id: 708,
        title: 'Source Attribution & Citation UI',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        status: 'not-started',
        description: `<strong>Goal:</strong> Make RAG transparent.<br><br>
1. Create <code>src/components/premium/CitationBadge.tsx</code>.<br>
2. Design citation badges (e.g., [1]).<br>
3. Create hover popovers showing source excerpt.<br>
4. Ensure clean typography.<br><br>
<strong>📌 Output:</strong> Citation Components.`,
        deepExplanation: `
<h3>📖 Citation UX</h3>
<hr>
<p><strong>Folder to Create:</strong> <code>src/components/premium/CitationBadge.tsx</code></p>
- <strong>UX Pattern:</strong>
  - When the bot says "Revenue is up [1]", user sees a small badge.
  - Hovering [1] triggers a <strong>Shadcn HoverCard</strong>.
- <strong>Content:</strong>
  - Show "Source: Q3 Report.pdf (Page 4)"
  - Show snippet of the text used for generation.
`
    }
];

// =====================================================
// WEEK 6 TASKS (Module 6: RAG Pipeline & LLM Integration)
// =====================================================
const week6Tasks = [
    // 1. Arshad (LEAD/HARD) - RAG Pipeline Implementation
    {
        id: 601,
        title: 'Implement Complete RAG Pipeline',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Build the full RAG pipeline with role-based filtering.<br><br>
1. Authenticate user and get role.<br>
2. Filter documents by role permissions.<br>
3. Retrieve relevant chunks from vector DB.<br>
4. Augment prompt with context.<br>
5. Generate response with LLM.<br><br>
<strong>📌 Output:</strong> rag_pipeline.py with complete workflow.`,
        deepExplanation: `
<h3>📘 Complete Guide: RAG Pipeline Implementation</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This is the core RAG system!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   └── src/
│       └── auth/                    ← Use authentication from Week 5
├── week 6/                          ← Create this folder
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">rag_pipeline.py</span>     ← YOUR FILE
│   ├── config/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">pipeline_config.json</span> ← YOUR CONFIG
│   └── output/
</pre>

<h4>🔹 STEP 3: Create pipeline_config.json</h4>
<pre><code>{
  "max_chunks": 5,
  "similarity_threshold": 0.3,
  "max_response_tokens": 500,
  "temperature": 0.7,
  "include_sources": true
}</code></pre>

<h4>🔹 STEP 4: Create rag_pipeline.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class RAGPipeline that:
1. Takes user_id and query as input
2. Authenticates user and gets their role
3. Filters vector DB results by role permissions
4. Retrieves top-K relevant chunks
5. Builds augmented prompt with context
6. Calls LLM API to generate response
7. Adds source citations to response
8. Returns: {response, sources, confidence_score, processing_time}

Include methods:
- authenticate_user(user_id)
- filter_by_rbac(user_role, chunks)
- build_context(query, chunks)
- generate_response(prompt)
- add_citations(response, sources)"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RAG pipeline implementation - Week 6"
git push origin arshad/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete RAG pipeline working end-to-end.</p>
`
    },

    // 2. Bhargava (HARD) - LLM Integration
    {
        id: 602,
        title: 'LLM Integration & API Management',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Integrate free LLM for response generation.<br><br>
1. Select and configure LLM (HuggingFace/OpenAI free tier).<br>
2. Create API wrapper for LLM calls.<br>
3. Handle rate limiting and errors.<br>
4. Implement response streaming.<br><br>
<strong>📌 Output:</strong> llm_client.py with API integration.`,
        deepExplanation: `
<h3>📘 Complete Guide: LLM Integration</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ CRITICAL - This powers the chatbot responses!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">llm_client.py</span>       ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">llm_config.json</span>     ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create llm_config.json</h4>
<pre><code>{
  "provider": "huggingface",
  "model": "microsoft/DialoGPT-medium",
  "max_tokens": 500,
  "temperature": 0.7,
  "api_key_env": "HF_API_KEY"
}</code></pre>

<h4>🔹 STEP 4: Create llm_client.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class LLMClient that:
1. Supports multiple LLM providers (HuggingFace, OpenAI free)
2. Loads configuration from llm_config.json
3. Has method generate(prompt, max_tokens, temperature)
4. Handles API rate limiting with retry logic
5. Implements timeout handling
6. Logs all API calls (tokens used, latency)
7. Falls back to alternative provider on failure

Use requests library and proper error handling."
</div>

<h4>🔹 STEP 5: Install Dependencies</h4>
<pre><code>pip install openai huggingface_hub transformers</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add LLM integration module - Week 6"
git push origin bhargava/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: LLM generates coherent responses.</p>
`
    },

    // 3. Kavya (HARD) - Prompt Engineering
    {
        id: 603,
        title: 'System Prompts & Context Templates',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Design effective prompts for RAG.<br><br>
1. Create system prompt templates.<br>
2. Design context injection format.<br>
3. Build role-specific prompts.<br>
4. Test prompt effectiveness.<br><br>
<strong>📌 Output:</strong> prompt_templates.py + templates.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Prompt Engineering</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ CRITICAL - Good prompts = Good answers!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">prompt_templates.py</span> ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">templates.json</span>       ← YOUR TEMPLATES
</pre>

<h4>🔹 STEP 3: Create templates.json</h4>
<pre><code>{
  "system_prompt": "You are an internal company assistant with access to confidential documents. Answer questions based ONLY on the provided context. Always cite your sources.",
  "context_template": "CONTEXT:\\n{context}\\n\\nQUESTION: {query}\\n\\nANSWER:",
  "role_prompts": {
    "finance": "You have access to financial reports and data.",
    "hr": "You have access to HR policies and employee data.",
    "marketing": "You have access to marketing campaigns and analytics."
  }
}</code></pre>

<h4>🔹 STEP 4: Create prompt_templates.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class PromptBuilder that:
1. Loads templates.json
2. Has method build_prompt(query, context_chunks, user_role)
3. Formats context with source citations
4. Injects role-specific instructions
5. Limits context to max token count
6. Returns formatted prompt ready for LLM

Include templates for:
- Question answering
- Summarization
- Comparison queries"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add prompt templates module - Week 6"
git push origin kavya/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Prompts generate accurate, sourced responses.</p>
`
    },

    // 4. Joshika (MEDIUM) - Source Attribution
    {
        id: 604,
        title: 'Source Citation & Document Attribution',
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Add source citations to responses.<br><br>
1. Extract source metadata from chunks.<br>
2. Format citations in response.<br>
3. Link to original documents.<br>
4. Display confidence scores.<br><br>
<strong>📌 Output:</strong> citation_system.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Source Attribution</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make responses transparent with sources</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">citation_system.py</span> ← YOUR FILE
│   └── output/
</pre>

<h4>🔹 STEP 3: Create citation_system.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class CitationSystem that:
1. Takes retrieved chunks with metadata
2. Extracts source file, department, page/section
3. Generates numbered citations [1], [2], etc.
4. Creates citation block at end of response
5. Links citations to chunk IDs
6. Formats output as: {text_with_citations, sources_list}

Example output:
'According to the Q4 report [1], revenue increased...'
Sources:
[1] Finance/quarterly_report.md - Section 3"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add citation system - Week 6"
git push origin joshika/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Responses include proper source citations.</p>
`
    },

    // 5. Vinuthna (MEDIUM) - Confidence Scoring
    {
        id: 605,
        title: 'Confidence Scoring & Relevance Metrics',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Calculate confidence scores for responses.<br><br>
1. Score based on retrieval similarity.<br>
2. Factor in source reliability.<br>
3. Display confidence level to user.<br>
4. Flag low-confidence responses.<br><br>
<strong>📌 Output:</strong> confidence_scorer.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Confidence Scoring</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Help users know how confident to be</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">confidence_scorer.py</span> ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">scoring_weights.json</span>  ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create scoring_weights.json</h4>
<pre><code>{
  "similarity_weight": 0.5,
  "source_count_weight": 0.2,
  "recency_weight": 0.1,
  "specificity_weight": 0.2,
  "thresholds": {
    "high": 0.8,
    "medium": 0.5,
    "low": 0.3
  }
}</code></pre>

<h4>🔹 STEP 4: Create confidence_scorer.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class ConfidenceScorer that:
1. Takes retrieved chunks with similarity scores
2. Calculates weighted confidence score (0-1)
3. Factors: avg_similarity, num_sources, content_specificity
4. Returns: {score, level (high/medium/low), factors}
5. Flags responses below threshold with warning
6. Prints: 'Confidence: 0.85 (HIGH) ✅'"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add confidence scoring - Week 6"
git push origin vinuthna/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Confidence scores accurately reflect answer quality.</p>
`
    },

    // 6. Shirisha (MEDIUM) - RAG Testing
    {
        id: 606,
        title: 'RAG Pipeline Testing & Validation',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test complete RAG pipeline.<br><br>
1. Create test queries for each role.<br>
2. Validate response accuracy.<br>
3. Test RBAC enforcement in RAG.<br>
4. Measure end-to-end latency.<br><br>
<strong>📌 Output:</strong> rag_tests.py + RAG_TEST_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: RAG Pipeline Testing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make sure the whole pipeline works!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">rag_tests.py</span>           ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_queries.json</span>      ← YOUR QUERIES
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">RAG_TEST_REPORT.md</span>     ← YOUR REPORT
</pre>

<h4>🔹 STEP 3: Create rag_tests.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python test suite for RAG pipeline that:
1. Tests end-to-end: query → auth → retrieve → generate → cite
2. Validates RBAC: Finance user shouldn't see HR data in response
3. Checks citations are accurate
4. Measures total latency (target < 3s)
5. Tests with 10 sample queries across departments
6. Saves results to test_results.json
7. Prints pass/fail summary"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RAG pipeline tests - Week 6"
git push origin shirisha/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All RAG tests pass with < 3s latency.</p>
`
    },

    // 7. Karthik (EASY) - Response Formatting
    {
        id: 607,
        title: 'Response Formatting & Display',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Format LLM responses for display.<br><br>
1. Clean up raw LLM output.<br>
2. Format markdown/HTML.<br>
3. Highlight key information.<br>
4. Structure source citations.<br><br>
<strong>📌 Output:</strong> response_formatter.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Response Formatting</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIER task - Format the output nicely!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   └── src/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">response_formatter.py</span> ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create response_formatter.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class ResponseFormatter that:
1. Takes raw LLM response text
2. Converts markdown to HTML if needed
3. Highlights important numbers/dates
4. Formats citation references as links
5. Adds confidence badge (high/medium/low)
6. Returns formatted response ready for UI

Simple input/output transformation."
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add response formatter - Week 6"
git push origin karthik/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Responses are nicely formatted.</p>
`
    },

    // 8. Saranya (EASY) - Week 6 Documentation
    {
        id: 608,
        title: 'Week 6 RAG Pipeline Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Document the RAG pipeline.<br><br>
1. Document pipeline architecture.<br>
2. Create flow diagrams.<br>
3. Document API endpoints.<br>
4. Write usage examples.<br><br>
<strong>📌 Output:</strong> RAG_PIPELINE_DOCS.md + WEEK6_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: RAG Documentation</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIER task - Document everything!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week6</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 6/
│   └── docs/
│       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">RAG_PIPELINE_DOCS.md</span>  ← YOUR FILE
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK6_SUMMARY.md</span>      ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create Documentation</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create comprehensive RAG Pipeline documentation in Markdown:

1. **Architecture Overview**
   - ASCII diagram: User → Auth → Retrieve → Filter → Generate → Respond

2. **Component Descriptions**
   - LLM Client, Prompt Builder, Citation System, Confidence Scorer

3. **API Reference**
   - POST /rag/query - Full RAG pipeline
   - Request/Response formats

4. **Usage Examples**
   - Finance user query example
   - HR user query example

5. **Configuration Guide**
   - How to change LLM provider
   - How to tune confidence thresholds"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RAG pipeline documentation - Week 6"
git push origin saranya/week6</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete RAG documentation.</p>
`
    }
];

// =====================================================
// WEEK 5 TASKS (Module 5: User Authentication & RBAC Middleware)
// =====================================================
const week5Tasks = [
    // 1. Arshad (LEAD/HARD) - FastAPI Backend Setup
    {
        id: 501,
        title: 'Initialize FastAPI Backend Application',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Set up FastAPI backend with middleware.<br><br>
1. Initialize FastAPI project structure.<br>
2. Configure CORS and middleware.<br>
3. Set up routing and endpoints.<br>
4. Integrate with existing modules.<br><br>
<strong>📌 Output:</strong> main.py + FastAPI application structure.`,
        deepExplanation: `
<h3>📘 Complete Guide: FastAPI Backend Setup</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This is the backend foundation!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/                          ← Create this folder
│   ├── src/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">main.py</span>             ← YOUR FILE (FastAPI app)
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">config.py</span>           ← YOUR FILE (Settings)
│   │   ├── routes/
│   │   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">__init__.py</span>     ← Route definitions
│   │   └── middleware/
│   │       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">__init__.py</span>     ← Middleware setup
│   └── requirements.txt
</pre>

<h4>🔹 STEP 3: Create main.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a FastAPI application that:
1. Creates FastAPI app instance with title 'RBAC Chatbot API'
2. Configures CORS for frontend access
3. Adds logging middleware
4. Includes routers for: /auth, /query, /health
5. Has startup/shutdown events for DB connections
6. Returns OpenAPI docs at /docs

Include:
- uvicorn run configuration
- Environment variable loading
- Proper error handlers"
</div>

<h4>🔹 STEP 4: Install Dependencies</h4>
<pre><code>pip install fastapi uvicorn python-dotenv</code></pre>

<h4>🔹 STEP 5: Run the Server</h4>
<pre><code>cd "week 5/src"
uvicorn main:app --reload</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add FastAPI backend setup - Week 5"
git push origin arshad/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: FastAPI running at http://localhost:8000</p>
`
    },

    // 2. Bhargava (HARD) - JWT Authentication
    {
        id: 502,
        title: 'JWT-Based Authentication System',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Implement secure JWT authentication.<br><br>
1. Create JWT token generation/validation.<br>
2. Implement login/logout endpoints.<br>
3. Handle token refresh.<br>
4. Secure password hashing.<br><br>
<strong>📌 Output:</strong> auth.py with JWT implementation.`,
        deepExplanation: `
<h3>📘 Complete Guide: JWT Authentication</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ SECURITY CRITICAL - Handle with care!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   ├── src/
│   │   └── auth/
│   │       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">jwt_handler.py</span>   ← YOUR FILE
│   │       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">password.py</span>      ← YOUR FILE
│   │       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">routes.py</span>        ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">auth_config.json</span>     ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create auth_config.json</h4>
<pre><code>{
  "secret_key": "your-secret-key-here",
  "algorithm": "HS256",
  "access_token_expire_minutes": 30,
  "refresh_token_expire_days": 7
}</code></pre>

<h4>🔹 STEP 4: Create jwt_handler.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write Python JWT authentication module that:
1. Uses PyJWT library
2. Creates access and refresh tokens
3. Encodes user_id, role, exp in token
4. Validates tokens and returns payload
5. Handles expired/invalid tokens with proper errors
6. Uses bcrypt for password hashing

Functions:
- create_access_token(user_id, role)
- create_refresh_token(user_id)
- verify_token(token)
- hash_password(password)
- verify_password(plain, hashed)"
</div>

<h4>🔹 STEP 5: Install Dependencies</h4>
<pre><code>pip install PyJWT bcrypt passlib</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add JWT authentication - Week 5"
git push origin bhargava/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Secure JWT auth working.</p>
`
    },

    // 3. Kavya (HARD) - RBAC Middleware
    {
        id: 503,
        title: 'RBAC Middleware & Permission Verification',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Build RBAC middleware for endpoints.<br><br>
1. Create middleware to check permissions.<br>
2. Verify role before endpoint access.<br>
3. Block unauthorized requests.<br>
4. Log access attempts.<br><br>
<strong>📌 Output:</strong> rbac_middleware.py`,
        deepExplanation: `
<h3>📘 Complete Guide: RBAC Middleware</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ SECURITY CRITICAL - Protects all endpoints!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   ├── src/
│   │   └── middleware/
│   │       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">rbac_middleware.py</span>  ← YOUR FILE
│   │       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">dependencies.py</span>     ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">permissions.json</span>        ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create permissions.json</h4>
<pre><code>{
  "endpoints": {
    "/query/finance": ["finance", "c-level"],
    "/query/hr": ["hr", "c-level"],
    "/query/marketing": ["marketing", "c-level"],
    "/query/general": ["employees", "finance", "hr", "marketing", "engineering", "c-level"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create rbac_middleware.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write FastAPI RBAC middleware that:
1. Extracts JWT from Authorization header
2. Decodes token to get user role
3. Checks if role is allowed for the requested endpoint
4. Returns 403 Forbidden if unauthorized
5. Logs all access attempts (allowed/denied)
6. Uses FastAPI Depends() for injection

Create decorator: @require_role(['finance', 'c-level'])"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC middleware - Week 5"
git push origin kavya/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: RBAC blocks unauthorized access.</p>
`
    },

    // 4. Joshika (MEDIUM) - User Database
    {
        id: 504,
        title: 'User Database & Data Storage',
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Set up SQLite user database.<br><br>
1. Create user table schema.<br>
2. Implement CRUD operations.<br>
3. Add sample user accounts.<br>
4. Hash stored passwords.<br><br>
<strong>📌 Output:</strong> database.py + users.db`,
        deepExplanation: `
<h3>📘 Complete Guide: User Database</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Store user data securely</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   ├── src/
│   │   └── database/
│   │       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">database.py</span>     ← YOUR FILE
│   │       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">models.py</span>       ← YOUR FILE
│   │       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">seed_data.py</span>    ← YOUR FILE
│   └── data/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">users.db</span>            ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create database.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write Python SQLite database module that:
1. Creates users table: id, username, email, password_hash, role, created_at
2. Has CRUD functions: create_user, get_user, update_user, delete_user
3. Includes seed_data.py with sample users for each role
4. Uses SQLAlchemy ORM
5. Passwords are hashed (never stored plain)

Sample users to create:
- admin@company.com (c-level)
- finance@company.com (finance)
- hr@company.com (hr)
- marketing@company.com (marketing)
- employee@company.com (employees)"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add user database - Week 5"
git push origin joshika/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: User database with sample accounts.</p>
`
    },

    // 5. Vinuthna (MEDIUM) - Access Audit Logging
    {
        id: 505,
        title: 'Access Audit Logging System',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Log all access attempts for audit.<br><br>
1. Log login attempts (success/fail).<br>
2. Log endpoint access with role.<br>
3. Log permission denials.<br>
4. Create audit report generator.<br><br>
<strong>📌 Output:</strong> audit_logger.py + audit.log`,
        deepExplanation: `
<h3>📘 Complete Guide: Audit Logging</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Track all access for security</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">audit_logger.py</span>  ← YOUR FILE
│   └── logs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">audit.log</span>        ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create audit_logger.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write Python audit logging module that:
1. Logs to both file and console
2. Logs: timestamp, user_id, role, action, endpoint, status
3. Has methods: log_login, log_access, log_denial
4. Rotates log files daily
5. Creates summary report function
6. Format: [2024-01-19 10:30:00] [INFO] user=123 role=finance action=query endpoint=/query/finance status=allowed"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add audit logging - Week 5"
git push origin vinuthna/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All access is logged for audit.</p>
`
    },

    // 6. Shirisha (MEDIUM) - Authentication Testing
    {
        id: 506,
        title: 'Authentication & Authorization Testing',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test auth system thoroughly.<br><br>
1. Test login/logout flows.<br>
2. Test JWT token validation.<br>
3. Test RBAC permission checks.<br>
4. Document test results.<br><br>
<strong>📌 Output:</strong> auth_tests.py + AUTH_TEST_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Auth Testing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make sure auth is bulletproof!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">auth_tests.py</span>        ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_config.json</span>     ← YOUR CONFIG
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">AUTH_TEST_REPORT.md</span>  ← YOUR REPORT
</pre>

<h4>🔹 STEP 3: Create auth_tests.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write pytest test suite for authentication that tests:
1. Login with valid credentials → returns JWT
2. Login with invalid password → 401 error
3. Access protected endpoint with valid token → 200
4. Access protected endpoint without token → 401
5. Access finance endpoint as HR user → 403
6. Access finance endpoint as C-Level → 200
7. Expired token → 401

Use httpx or requests library, print pass/fail summary."
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add auth tests - Week 5"
git push origin shirisha/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All auth tests pass.</p>
`
    },

    // 7. Karthik (EASY) - Login Endpoints
    {
        id: 507,
        title: 'Login & Session Endpoints',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Create basic login endpoints.<br><br>
1. POST /auth/login endpoint.<br>
2. POST /auth/logout endpoint.<br>
3. GET /auth/me (current user).<br>
4. POST /auth/refresh token.<br><br>
<strong>📌 Output:</strong> auth_routes.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Auth Endpoints</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIER task - Create standard auth routes!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   └── src/
│       └── routes/
│           └── <span style="background: #22c55e; color: black; padding: 2px 4px;">auth_routes.py</span>  ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create auth_routes.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write FastAPI auth routes that:
1. POST /auth/login - takes username/password, returns JWT
2. POST /auth/logout - invalidates token
3. GET /auth/me - returns current user info from token
4. POST /auth/refresh - exchanges refresh token for new access token

Use Pydantic models for request/response schemas.
Import and use jwt_handler from Bhargava's code."
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add auth routes - Week 5"
git push origin karthik/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Auth endpoints working.</p>
`
    },

    // 8. Saranya (EASY) - Week 5 Documentation
    {
        id: 508,
        title: 'Week 5 Authentication Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Document the authentication system.<br><br>
1. Document auth flow with diagrams.<br>
2. API endpoint reference.<br>
3. Security best practices.<br>
4. Week 5 summary report.<br><br>
<strong>📌 Output:</strong> AUTH_DOCS.md + WEEK5_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Auth Documentation</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIER task - Document the auth system!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week5</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 5/
│   └── docs/
│       ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">AUTH_DOCS.md</span>       ← YOUR FILE
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK5_SUMMARY.md</span>   ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create Documentation</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create comprehensive Authentication documentation in Markdown:

1. **Authentication Flow**
   - ASCII diagram: Login → JWT → Request → Verify → Access

2. **API Endpoints**
   - POST /auth/login
   - POST /auth/logout
   - GET /auth/me
   - POST /auth/refresh

3. **JWT Token Structure**
   - Header, Payload, Signature explanation

4. **RBAC Permission Matrix**
   - Which roles can access which endpoints

5. **Security Considerations**
   - Token expiration
   - Password hashing
   - HTTPS requirement"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add authentication documentation - Week 5"
git push origin saranya/week5</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete auth documentation.</p>
`
    }
];

// =====================================================
// WEEK 4 TASKS (Module 4: Role-Based Search & Query Processing)
// =====================================================
const week4Tasks = [
    // 1. Arshad (LEAD) - RBAC Filtering Logic
    {
        id: 401,
        title: 'Build RBAC Filtering Logic for Document Access',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Implement role-based access control filtering.<br><br>
1. Build RBAC filtering module for vector search.<br>
2. Implement role hierarchy: C-Level > Department > Employee.<br>
3. Filter search results based on user roles.<br>
4. Integrate with embedding search pipeline.<br><br>
<strong>📌 Output:</strong> rbac_filter.py with role-based search filtering.`,
        deepExplanation: `
<h3>📘 Complete Guide: RBAC Filtering Logic</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - Critical security component for access control.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── output/
│       └── vector_db/              ← Use this for search
├── week 4/                         ← Create this folder
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">rbac_filter.py</span>       ← YOUR FILE
│   ├── config/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">role_hierarchy.json</span>  ← YOUR CONFIG
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">filtered_results/</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create role_hierarchy.json</h4>
<pre><code>mkdir -p "week 4/config"</code></pre>

<p>Create <code>week 4/config/role_hierarchy.json</code>:</p>
<pre><code>{
  "hierarchy": {
    "c-level": 100,
    "finance": 50,
    "hr": 50,
    "marketing": 50,
    "engineering": 50,
    "employees": 10
  },
  "department_access": {
    "c-level": ["Finance", "HR", "marketing", "engineering", "general"],
    "finance": ["Finance", "general"],
    "hr": ["HR", "general"],
    "marketing": ["marketing", "general"],
    "engineering": ["engineering", "general"],
    "employees": ["general"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create rbac_filter.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class called RBACFilter that:
1. Loads role_hierarchy.json for access permissions
2. Has method filter_by_role(user_role, search_results) that:
   - Takes a list of search results with 'department' metadata
   - Filters out results user doesn't have access to
   - Returns only accessible documents
3. Implements role hierarchy: C-Level sees all, departments see their own + general
4. Has method get_accessible_departments(user_role)
5. Includes logging for access attempts (allowed/denied)
6. Test with sample data for Finance user querying HR docs (should be denied)

Use json and logging libraries."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC filtering module - Week 4"
git push origin arshad/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: RBAC filtering blocks unauthorized access.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Vector database, embedding code from Week 3.</p>
`
    },

    // 2. Bhargava - Query Preprocessing
    {
        id: 402,
        title: 'Query Preprocessing & Normalization',
        assignee: 'Kushagra Bhargava',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Preprocess user queries before search.<br><br>
1. Normalize incoming queries (lowercase, remove special chars).<br>
2. Extract keywords and entities.<br>
3. Expand abbreviations and synonyms.<br>
4. Prepare query for semantic search.<br><br>
<strong>📌 Output:</strong> query_processor.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Query Preprocessing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Clean and prepare user queries for search</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">query_processor.py</span>    ← YOUR FILE
│   ├── config/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">synonyms.json</span>         ← YOUR CONFIG
│   └── output/
</pre>

<h4>🔹 STEP 3: Create synonyms.json</h4>
<pre><code>{
  "abbr": {
    "q1": "quarter 1",
    "q2": "quarter 2",
    "q3": "quarter 3",
    "q4": "quarter 4",
    "roi": "return on investment",
    "hr": "human resources",
    "api": "application programming interface"
  },
  "synonyms": {
    "profit": ["revenue", "earnings", "income"],
    "employee": ["staff", "worker", "team member"],
    "policy": ["rule", "guideline", "procedure"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create query_processor.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class QueryProcessor that:
1. Loads synonyms.json for abbreviation expansion
2. Has method preprocess(query) that:
   - Converts to lowercase
   - Removes special characters except basic punctuation
   - Normalizes whitespace
   - Expands abbreviations (Q1 → quarter 1)
3. Has method extract_keywords(query) using simple NLP
4. Has method expand_synonyms(query) to add related terms
5. Returns processed query ready for semantic search
6. Prints: 'Original: X → Processed: Y'

Use re (regex) and json libraries."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add query preprocessing module - Week 4"
git push origin bhargava/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Query processor normalizes and expands queries.</p>
`
    },

    // 3. Karthik - Relevant Chunk Selection
    {
        id: 403,
        title: 'Relevant Chunk Selection Algorithm',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Select most relevant chunks for each query.<br><br>
1. Implement similarity scoring with thresholds.<br>
2. Rank chunks by relevance score.<br>
3. Select top-K chunks for context.<br>
4. Handle edge cases (no relevant docs).<br><br>
<strong>📌 Output:</strong> chunk_selector.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Chunk Selection Algorithm</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Select the best chunks for RAG context</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunk_selector.py</span>     ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">selection_config.json</span> ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create selection_config.json</h4>
<pre><code>{
  "top_k": 5,
  "similarity_threshold": 0.3,
  "max_context_tokens": 2000,
  "diversity_weight": 0.2
}</code></pre>

<h4>🔹 STEP 4: Create chunk_selector.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class ChunkSelector that:
1. Loads selection_config.json for parameters
2. Has method select_chunks(query_embedding, all_chunks, user_role) that:
   - Calculates cosine similarity between query and each chunk
   - Filters chunks below similarity threshold
   - Applies RBAC filter for user's role
   - Returns top-K most relevant chunks
3. Has method calculate_similarity(embedding1, embedding2)
4. Handles edge case: returns fallback message if no relevant chunks
5. Prints: 'Selected X chunks with avg similarity Y'

Use numpy for similarity calculations."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add chunk selection algorithm - Week 4"
git push origin karthik/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Top-K relevant chunks selected for each query.</p>
`
    },

    // 4. Kavya - Role Permission Testing
    {
        id: 404,
        title: 'Role Permission Validation & Testing',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Test and validate role-based access.<br><br>
1. Create test cases for each role.<br>
2. Verify Finance cannot access HR docs.<br>
3. Verify C-Level can access all.<br>
4. Document test results.<br><br>
<strong>📌 Output:</strong> rbac_tests.py + RBAC_TEST_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Role Permission Testing</h3>
<p style="color: #f87171; font-weight: bold;">🔒 Critical: Verify security boundaries are working!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── tests/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">rbac_tests.py</span>        ← YOUR FILE
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">RBAC_TEST_REPORT.md</span>  ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_results.json</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create Test Cases</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python test suite for RBAC validation that:
1. Tests these scenarios:
   - Finance user queries finance docs → ALLOWED ✅
   - Finance user queries HR docs → DENIED ❌
   - HR user queries employee data → ALLOWED ✅
   - Marketing user queries finance → DENIED ❌
   - C-Level queries all departments → ALLOWED ✅
   - Employee queries general handbook → ALLOWED ✅

2. For each test:
   - Create mock search results with department metadata
   - Call RBAC filter
   - Verify correct docs are returned/blocked

3. Save results to test_results.json with:
   {test_name, role, query_type, expected, actual, passed}

4. Print summary: 'Tests Passed: X/Y'

Use unittest or pytest framework."
</div>

<h4>🔹 STEP 4: Create RBAC_TEST_REPORT.md</h4>
<p>Document all test cases, their purpose, results, and any issues found.</p>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC validation tests - Week 4"
git push origin kavya/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All RBAC tests pass with zero unauthorized access.</p>
`
    },

    // 5. Shirisha - Search Integration
    {
        id: 405,
        title: 'Integrate Search Pipeline Components',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Combine all search components into pipeline.<br><br>
1. Integrate query processor → embedding → search → RBAC filter.<br>
2. Create unified search interface.<br>
3. Add error handling for each stage.<br>
4. Test end-to-end flow.<br><br>
<strong>📌 Output:</strong> search_pipeline.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Pipeline Integration</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Connect all the puzzle pieces!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   ├── query_processor.py    ← Bhargava's (import)
│   │   ├── rbac_filter.py        ← Arshad's (import)
│   │   ├── chunk_selector.py     ← Karthik's (import)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">search_pipeline.py</span>   ← YOUR FILE
│   └── output/
</pre>

<h4>🔹 STEP 3: Create search_pipeline.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class SearchPipeline that:
1. Imports and initializes: QueryProcessor, RBACFilter, ChunkSelector
2. Has method search(query, user_role) that:
   - Step 1: Preprocess query
   - Step 2: Generate query embedding
   - Step 3: Search vector database
   - Step 4: Filter by RBAC
   - Step 5: Select top-K chunks
   - Step 6: Return results with metadata
3. Has proper error handling for each step
4. Logs each step: 'Step X: [description] completed'
5. Returns { results: [...], total_found, filtered_count, processing_time }

Include a main() function for testing."
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search pipeline integration - Week 4"
git push origin shirisha/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete search pipeline working end-to-end.</p>
`
    },

    // 6. Saranya - Role Configuration Documentation
    {
        id: 406,
        title: 'Role Configuration & Hierarchy Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Document complete RBAC configuration.<br><br>
1. Document role hierarchy with diagrams.<br>
2. Create permission matrix table.<br>
3. Document search flow with RBAC.<br>
4. Add configuration guide.<br><br>
<strong>📌 Output:</strong> RBAC_CONFIGURATION.md`,
        deepExplanation: `
<h3>📘 Complete Guide: RBAC Configuration Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Document the complete RBAC system</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">RBAC_CONFIGURATION.md</span> ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create RBAC_CONFIGURATION.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive RBAC Configuration Guide in Markdown:

1. **Role Hierarchy Diagram**
   - ASCII art showing: C-Level (100) → Department Heads (50) → Employees (10)
   - Explain access levels

2. **Permission Matrix**
   | Role | Finance | HR | Marketing | Engineering | General |
   |------|---------|-----|-----------|-------------|---------|
   | c-level | ✅ | ✅ | ✅ | ✅ | ✅ |
   | finance | ✅ | ❌ | ❌ | ❌ | ✅ |
   ... (all roles)

3. **Search Flow with RBAC**
   - Diagram: Query → Preprocess → Search → RBAC Filter → Results

4. **Configuration Files Reference**
   - role_hierarchy.json structure
   - How to add new roles
   - How to modify permissions

5. **Security Considerations**
   - Why RBAC is important
   - Common pitfalls to avoid"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC configuration documentation - Week 4"
git push origin saranya/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete RBAC documentation.</p>
`
    },

    // 7. Vinuthna - Search Quality Benchmarking
    {
        id: 407,
        title: 'Search Quality & Performance Benchmarking',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test search quality and performance.<br><br>
1. Create benchmark queries for each role.<br>
2. Measure retrieval latency.<br>
3. Evaluate relevance of results.<br>
4. Create performance report.<br><br>
<strong>📌 Output:</strong> benchmark.py + SEARCH_BENCHMARK_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Quality Benchmarking</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Measure how well the search works!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark.py</span>             ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_queries.json</span>   ← YOUR QUERIES
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">SEARCH_BENCHMARK_REPORT.md</span> ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_results.json</span>   ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create benchmark_queries.json</h4>
<pre><code>{
  "queries": [
    {"query": "What was Q4 2024 revenue?", "role": "finance", "expected_dept": "Finance"},
    {"query": "What is the leave policy?", "role": "hr", "expected_dept": "HR"},
    {"query": "Marketing campaign ROI", "role": "marketing", "expected_dept": "marketing"},
    {"query": "API architecture", "role": "engineering", "expected_dept": "engineering"},
    {"query": "Employee handbook", "role": "employees", "expected_dept": "general"}
  ]
}</code></pre>

<h4>🔹 STEP 4: Create benchmark.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python benchmarking script that:
1. Loads benchmark_queries.json
2. For each query:
   - Measures search latency in milliseconds
   - Checks if results match expected department
   - Calculates relevance score (similarity)
3. Computes metrics:
   - Average latency
   - P95 latency
   - Accuracy (correct department %)
   - Average relevance score
4. Saves to benchmark_results.json
5. Prints table: | Query | Latency | Accuracy | Relevance |

Use time module for latency measurement."
</div>

<h4>🔹 STEP 5: Create SEARCH_BENCHMARK_REPORT.md</h4>
<p>Document: methodology, results, graphs, recommendations.</p>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search benchmarking module - Week 4"
git push origin vinuthna/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Benchmark shows < 500ms retrieval latency.</p>
`
    },

    // 8. Joshika - Week 4 Summary
    {
        id: 408,
        title: 'Week 4 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Compile the Week 4 summary.<br><br>
1. Collect all deliverables from team.<br>
2. Summarize RBAC implementation.<br>
3. Document search quality results.<br>
4. Prepare for Milestone 3.<br><br>
<strong>📌 Output:</strong> WEEK4_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 4 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIEST task - Compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK4_SUMMARY.md</span>     ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Wait for Team Members</h4>
<p>Ask each person for their status. Summarize the deliverables.</p>

<h4>🔹 STEP 4: Create WEEK4_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 4 Summary Report in Markdown for Module 4: Role-Based Search & Query Processing:

1. **Module Overview**
   - Objective: Implement RBAC filtering, query processing, search pipeline

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | RBAC Filtering | rbac_filter.py | ✅ |
   ... (all 8 members)

3. **Key Metrics**
   - Search latency: < 500ms ✅
   - RBAC test pass rate: 100%
   - Zero unauthorized access

4. **Deliverables Checklist**
   - [x] RBAC filter module
   - [x] Query processor
   - [x] Search pipeline
   - [x] Validation tests
   - [x] Performance benchmarks

5. **Milestone 2 Completion**
   - Week 3: Vector DB ✅
   - Week 4: RBAC Search ✅

6. **Next Steps (Milestone 3)**
   - Week 5: FastAPI Authentication
   - Week 6: RAG Pipeline & LLM"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 4 Summary Report"
git push origin joshika/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK4_SUMMARY.md with all contributions.</p>
`
    }
];

// =====================================================
// WEEK 3 TASKS (Module 3: Vector Database & Embeddings)
// =====================================================
const week3Tasks = [
    // 1. Arshad (LEAD) - Embedding Generation
    {
        id: 301,
        title: 'Generate Vector Embeddings for All Chunks',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Generate embeddings for all document chunks.<br><br>
1. Load chunked documents from Week 2.<br>
2. Initialize sentence-transformers model (all-MiniLM-L6-v2).<br>
3. Generate embeddings for each chunk.<br>
4. Save embeddings with metadata.<br><br>
<strong>📌 Output:</strong> embeddings.py + chunk_embeddings.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector Embedding Generation</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This creates the core search functionality.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   └── output/
│       └── chunked_documents.json  ← Your INPUT (from Week 2)
├── week 3/                         ← Create this folder
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">embeddings.py</span>        ← YOUR FILE
│   ├── output/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunk_embeddings.json</span> ← YOUR OUTPUT
│   └── README.md
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 3/src"
mkdir -p "week 3/output"</code></pre>

<h4>🔹 STEP 4: Create embeddings.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../week 2/output/chunked_documents.json'
2. Initializes SentenceTransformer model 'all-MiniLM-L6-v2'
3. For each chunk:
   - Generate embedding vector (384 dimensions)
   - Store with chunk_id, content, source_file, embedding
4. Save to '../output/chunk_embeddings.json'
5. Print progress: 'Generated embedding for chunk X/Y'
6. Print summary: 'Total embeddings: X, Dimension: 384'

Use sentence-transformers library and proper error handling."
</div>

<h4>🔹 STEP 5: Install Required Libraries</h4>
<pre><code>pip install sentence-transformers torch</code></pre>

<h4>🔹 STEP 6: Run & Verify</h4>
<pre><code>cd "week 3/src"
python embeddings.py</code></pre>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add embedding generation module - Week 3"
git push origin arshad/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All chunks have 384-dimensional embeddings.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Week 2 output files, other team's code.</p>
`
    },

    // 2. Bhargava - Vector Database Setup
    {
        id: 302,
        title: 'Initialize Vector Database (Chroma)',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Set up ChromaDB for vector storage.<br><br>
1. Install and configure ChromaDB.<br>
2. Create collection with proper schema.<br>
3. Prepare for embedding indexing.<br><br>
<strong>📌 Output:</strong> vector_db_setup.py + configured database`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector Database Setup</h3>
<p style="color: #f87171; font-weight: bold;">📁 Critical: This is the foundation for semantic search!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">vector_db_setup.py</span>  ← YOUR FILE
│   ├── output/
│   │   └── vector_db/           ← ChromaDB storage folder
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">db_config.json</span>      ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create db_config.json</h4>
<pre><code>{
  "collection_name": "rbac_documents",
  "persist_directory": "../output/vector_db",
  "embedding_dimension": 384,
  "distance_metric": "cosine"
}</code></pre>

<h4>🔹 STEP 4: Create vector_db_setup.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Installs and imports chromadb
2. Creates a persistent Chroma client in '../output/vector_db'
3. Creates a collection called 'rbac_documents' with cosine similarity
4. Defines metadata schema:
   - chunk_id (string)
   - source_file (string)
   - department (string)
   - accessible_roles (list)
5. Has helper functions:
   - get_collection() - returns the collection
   - add_documents(chunks, embeddings, metadata)
   - query(embedding, n_results=5)
6. Prints: 'Vector database initialized at: [path]'

Use chromadb library with proper error handling."
</div>

<h4>🔹 STEP 5: Install ChromaDB</h4>
<pre><code>pip install chromadb</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add vector database setup - Week 3"
git push origin bhargava/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: ChromaDB collection created and ready.</p>
`
    },

    // 3. Karthik - Index Embeddings
    {
        id: 303,
        title: 'Index Embeddings into Vector Database',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Load embeddings into ChromaDB.<br><br>
1. Load embeddings from Arshad's output.<br>
2. Load tagged chunks from Week 2.<br>
3. Index into ChromaDB with metadata.<br><br>
<strong>📌 Output:</strong> index_embeddings.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Index Embeddings</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Put embeddings into the vector database</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   ├── embeddings.py         ← Arshad's (INPUT)
│   │   ├── vector_db_setup.py    ← Bhargava's (IMPORT)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">index_embeddings.py</span>  ← YOUR FILE
│   └── output/
│       ├── chunk_embeddings.json ← INPUT
│       └── vector_db/            ← OUTPUT
</pre>

<h4>🔹 STEP 3: Create index_embeddings.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/chunk_embeddings.json'
2. Loads tagged metadata from '../week 2/output/tagged_chunks.json'
3. Imports vector_db_setup.py to get the collection
4. For each chunk:
   - Extract embedding, content, metadata
   - Add to ChromaDB collection with:
     ids=[chunk_id], embeddings=[...], documents=[content],
     metadatas=[{department, accessible_roles, source}]
5. Index in batches of 100 for efficiency
6. Print progress: 'Indexed batch X/Y'
7. Print summary: 'Total indexed: X documents'

Use proper batch processing and error handling."
</div>

<h4>🔹 STEP 4: Run After Getting Input Files</h4>
<pre><code>cd "week 3/src"
python index_embeddings.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add embedding indexing module - Week 3"
git push origin karthik/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All embeddings indexed with metadata in ChromaDB.</p>
`
    },

    // 4. Kavya - Semantic Search Implementation
    {
        id: 304,
        title: 'Implement Semantic Search Functionality',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Build the core search interface.<br><br>
1. Create search function using embeddings.<br>
2. Query vector database.<br>
3. Return ranked results with scores.<br><br>
<strong>📌 Output:</strong> semantic_search.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Semantic Search</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make the search actually work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   ├── vector_db_setup.py   ← Bhargava's (IMPORT)
│   │   ├── embeddings.py        ← Arshad's (for query embedding)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">semantic_search.py</span>  ← YOUR FILE
│   └── output/
</pre>

<h4>🔹 STEP 3: Create semantic_search.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class SemanticSearch that:
1. Initializes with SentenceTransformer model and ChromaDB collection
2. Has method search(query, n_results=5) that:
   - Converts query text to embedding
   - Queries ChromaDB for similar documents
   - Returns list of {chunk_id, content, score, metadata}
3. Has method search_with_filter(query, department, n_results=5)
4. Calculates and returns similarity scores
5. Includes a test function with sample queries:
   - 'What is the Q4 revenue?'
   - 'Employee leave policy'
   - 'Marketing campaign results'

Print results in a formatted table."
</div>

<h4>🔹 STEP 4: Test the Search</h4>
<pre><code>cd "week 3/src"
python semantic_search.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add semantic search functionality - Week 3"
git push origin kavya/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Semantic search returns relevant results.</p>
`
    },

    // 5. Shirisha - Search Quality Testing
    {
        id: 305,
        title: 'Search Quality Testing & Validation',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test search functionality quality.<br><br>
1. Create test queries for each department.<br>
2. Validate relevance of results.<br>
3. Measure search latency.<br><br>
<strong>📌 Output:</strong> search_tests.py + SEARCH_QA_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Quality Testing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make sure search actually works correctly!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">search_tests.py</span>      ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_queries.json</span>    ← YOUR QUERIES
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">SEARCH_QA_REPORT.md</span>  ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_results.json</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create test_queries.json</h4>
<pre><code>[
  {"query": "quarterly revenue report", "expected_dept": "Finance"},
  {"query": "employee benefits policy", "expected_dept": "HR"},
  {"query": "marketing campaign ROI", "expected_dept": "marketing"},
  {"query": "API documentation", "expected_dept": "engineering"},
  {"query": "company handbook", "expected_dept": "general"}
]</code></pre>

<h4>🔹 STEP 4: Create search_tests.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python test script that:
1. Loads test_queries.json
2. For each query:
   - Run semantic search
   - Measure latency in milliseconds
   - Check if top result is from expected department
   - Calculate relevance score
3. Save results to test_results.json:
   {query, expected_dept, actual_dept, latency_ms, passed, score}
4. Calculate: pass rate, avg latency, avg score
5. Print summary table

Include assertions for: latency < 500ms, correct department matching."
</div>

<h4>🔹 STEP 5: Create SEARCH_QA_REPORT.md</h4>
<p>Document: test methodology, results, issues found, recommendations.</p>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search quality testing - Week 3"
git push origin shirisha/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Search tests pass with high accuracy.</p>
`
    },

    // 6. Saranya - Vector DB Documentation
    {
        id: 306,
        title: 'Vector Database Architecture Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Document the vector database setup.<br><br>
1. Document embedding model choice.<br>
2. Create architecture diagram.<br>
3. Document query flow.<br><br>
<strong>📌 Output:</strong> VECTOR_DB_ARCHITECTURE.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector DB Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Document how the vector database works</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">VECTOR_DB_ARCHITECTURE.md</span> ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create VECTOR_DB_ARCHITECTURE.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive Vector Database Architecture document in Markdown:

1. **Overview**
   - What is a vector database?
   - Why ChromaDB?
   - Use case for RBAC chatbot

2. **Embedding Model**
   - Model: all-MiniLM-L6-v2
   - Dimension: 384
   - Why this model? (speed, quality, size)

3. **Architecture Diagram**
   - ASCII art: Document → Chunk → Embed → Index → Query
   
4. **Collection Schema**
   - Fields: chunk_id, content, embedding, metadata
   - Metadata: department, accessible_roles, source

5. **Query Flow**
   - Step 1: User query → Embedding
   - Step 2: Similarity search
   - Step 3: Filter by metadata
   - Step 4: Return results

6. **Performance Considerations**
   - Batch indexing
   - Query optimization
   - Scaling strategies"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add vector database architecture docs - Week 3"
git push origin saranya/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete architecture documentation.</p>
`
    },

    // 7. Vinuthna - Performance Benchmarking
    {
        id: 307,
        title: 'Embedding & Search Performance Benchmarking',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Benchmark embedding and search performance.<br><br>
1. Measure embedding generation time.<br>
2. Measure search latency.<br>
3. Create performance report.<br><br>
<strong>📌 Output:</strong> benchmark.py + PERFORMANCE_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Performance Benchmarking</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Measure how fast everything runs!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── tests/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark.py</span>          ← YOUR FILE
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">PERFORMANCE_REPORT.md</span> ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_results.json</span> ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create benchmark.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python benchmarking script that:
1. Measures embedding generation:
   - Time to embed 1 document
   - Time to embed 10 documents
   - Average time per document
2. Measures search performance:
   - Time for 10 queries
   - Average query latency
   - P95 latency
3. Measures indexing:
   - Time to index 100 documents
4. Saves results to benchmark_results.json
5. Prints table:
   | Operation | Time (ms) | Throughput |
   |-----------|-----------|------------|
   | Embed 1   | X         | Y docs/sec |

Use time and statistics modules."
</div>

<h4>🔹 STEP 4: Create PERFORMANCE_REPORT.md</h4>
<p>Include: methodology, results, graphs (if possible), recommendations.</p>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add performance benchmarking - Week 3"
git push origin vinuthna/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Performance meets targets (< 500ms search).</p>
`
    },

    // 8. Joshika - Week 3 Summary
    {
        id: 308,
        title: 'Week 3 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Compile the Week 3 summary.<br><br>
1. Collect all deliverables.<br>
2. Summarize vector DB implementation.<br>
3. Document performance metrics.<br><br>
<strong>📌 Output:</strong> WEEK3_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 3 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIEST task - Compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK3_SUMMARY.md</span>     ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create WEEK3_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 3 Summary Report in Markdown for Module 3: Vector Database & Embeddings:

1. **Module Overview**
   - Objective: Generate embeddings, index into vector DB, enable semantic search

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | Embeddings | embeddings.py | ✅ |
   | Bhargava | Vector DB Setup | vector_db_setup.py | ✅ |
   ... (all 8 members)

3. **Technical Summary**
   - Embedding model: all-MiniLM-L6-v2
   - Vector DB: ChromaDB
   - Total documents indexed: X
   - Search latency: < Xms

4. **Deliverables Checklist**
   - [x] Embedding generation module
   - [x] Vector database setup
   - [x] Semantic search implementation
   - [x] Performance benchmarks
   - [x] Architecture documentation

5. **Next Steps (Week 4)**
   - RBAC filtering
   - Query processing"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 3 Summary Report"
git push origin joshika/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK3_SUMMARY.md with all contributions.</p>
`
    }
];

// =====================================================
// WEEK 2 TASKS (Module 2: Document Preprocessing) ✅ COMPLETED
// =====================================================
const week2Tasks = [
    // 1. Arshad (HARDEST) - Document Chunking & Tokenization
    {
        id: 201,
        title: 'Document Chunking & Tokenization (300-512 tokens)',
        assignee: 'Arshad Pasha',
        priority: 'high',
        description: `<strong>Goal:</strong> Split documents into optimal chunks for RAG.<br><br>
1. Load cleaned documents from preprocessing.<br>
2. Implement chunking logic (300-512 tokens per chunk).<br>
3. Add sequential identifiers to each chunk.<br>
4. Preserve context overlap between chunks.<br>
5. Test tokenization accuracy.<br><br>
<strong>📌 Output:</strong> Chunked document files with token counts.`,
        deepExplanation: `
<h3>📘 Complete Guide: Document Chunking & Tokenization</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This is the HARDEST task. You will coordinate with others.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week2</code></pre>

<h4>🔹 STEP 2: Understand Your Folder Structure</h4>
<p>Below is the project structure. <span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES (Create these)</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← Source data (DON'T MODIFY)
│       ├── Finance/
│       ├── HR/
│       ├── marketing/
│       ├── engineering/
│       └── general/
├── week 2/                      ← Create this folder
│   ├── src/                     ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunking.py</span>         ← YOUR FILE
│   ├── output/                  ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunked_documents.json</span> ← YOUR OUTPUT
│   └── README.md
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code># In your terminal, navigate to project root
cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create chunking.py</h4>
<p>Create file: <code>week 2/src/chunking.py</code></p>

<p><strong>📋 Copy this ChatGPT Prompt to generate the code:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Reads all markdown (.md) files from a folder called '../week 1/data/' recursively
2. Uses tiktoken library to count tokens
3. Splits each document into chunks of 300-512 tokens
4. Adds overlap of 50 tokens between chunks
5. Assigns a unique chunk_id like 'chunk_0001', 'chunk_0002'
6. Saves output as JSON with structure: {chunk_id, content, source_file, token_count}
7. Uses RecursiveCharacterTextSplitter from langchain

Include proper error handling and progress printing."
</div>

<h4>🔹 STEP 5: Install Required Libraries</h4>
<pre><code>pip install tiktoken langchain langchain-text-splitters</code></pre>

<h4>🔹 STEP 6: Run Your Script</h4>
<pre><code>cd "week 2/src"
python chunking.py</code></pre>

<h4>🔹 STEP 7: Verify Output</h4>
<p>Check that <code>week 2/output/chunked_documents.json</code> exists and contains chunks.</p>

<h4>🔹 STEP 8: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add document chunking module - Week 2"
git push origin arshad/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: You have chunked_documents.json with all chunks between 300-512 tokens.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Other team members' files or the original data in week 1/data/</p>
`
    },

    // 2. Bhargava (Medium) - Parse Markdown Documents
    {
        id: 202,
        title: 'Parse Markdown Documents from GitHub',
        assignee: 'Kushagra Bhargava',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract content from all .md files.<br><br>
1. Read all markdown files from week 1/data/.<br>
2. Parse titles, headings, and content.<br>
3. Save extracted data in structured format.<br><br>
<strong>📌 Output:</strong> parsed_markdown.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Parse Markdown Documents</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Extract all .md files into structured JSON</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← READ FROM HERE (DON'T MODIFY)
│       ├── Finance/
│       │   └── *.md files
│       ├── HR/
│       │   └── *.md files
│       ├── marketing/
│       ├── engineering/
│       └── general/
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parse_markdown.py</span>    ← YOUR FILE
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parsed_markdown.json</span>  ← YOUR OUTPUT
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders (if not exists)</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create parse_markdown.py</h4>
<p>Create file: <code>week 2/src/parse_markdown.py</code></p>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Recursively finds all .md (markdown) files in '../week 1/data/' folder
2. For each file, extracts:
   - filename
   - full file path
   - title (first # heading)
   - all section headings (## headings)
   - full content
   - department (based on folder: Finance, HR, marketing, engineering, general)
3. Saves everything to a JSON file called '../output/parsed_markdown.json'
4. Prints progress: 'Parsed: filename.md'

Use glob for file finding and proper UTF-8 encoding."
</div>

<h4>🔹 STEP 5: Run Your Script</h4>
<pre><code>cd "week 2/src"
python parse_markdown.py</code></pre>

<h4>🔹 STEP 6: Verify Output</h4>
<p>Open <code>week 2/output/parsed_markdown.json</code> and verify it has all markdown files.</p>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add markdown parsing module - Week 2"
git push origin bhargava/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: parsed_markdown.json contains all markdown files with titles and content.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: CSV files (that's Karthik's job), original data files, other folders.</p>
`
    },

    // 3. Karthik (Medium) - Parse CSV Documents
    {
        id: 203,
        title: 'Parse CSV Documents from GitHub',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract and structure CSV data.<br><br>
1. Find all CSV files in week 1/data/.<br>
2. Load each CSV using pandas.<br>
3. Convert to text format for RAG.<br><br>
<strong>📌 Output:</strong> parsed_csv.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Parse CSV Documents</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Convert all CSV files to text format for RAG</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← READ CSV FROM HERE
│       ├── Finance/
│       │   └── *.csv files      ← Your source
│       ├── HR/
│       │   └── *.csv files      ← Your source
│       └── ...
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parse_csv.py</span>         ← YOUR FILE
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parsed_csv.json</span>       ← YOUR OUTPUT
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create parse_csv.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script using pandas that:
1. Finds all .csv files recursively in '../week 1/data/' folder
2. For each CSV file:
   - Load with pandas
   - Get column names
   - Get row count
   - Convert each row to text format: 'Column1: value1; Column2: value2; ...'
   - Determine department from folder path (Finance, HR, etc.)
3. Save to JSON with structure:
   {filename, filepath, department, columns, row_count, text_content}
4. Output file: '../output/parsed_csv.json'
5. Print: 'Processed: filename.csv (X rows)'

Handle encoding issues with errors='ignore'."
</div>

<h4>🔹 STEP 5: Install pandas (if needed)</h4>
<pre><code>pip install pandas</code></pre>

<h4>🔹 STEP 6: Run & Verify</h4>
<pre><code>cd "week 2/src"
python parse_csv.py</code></pre>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add CSV parsing module - Week 2"
git push origin karthik/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: parsed_csv.json with all CSV data as text.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Markdown files (Bhargava's job), anything else.</p>
`
    },

    // 4. Kavya (Medium) - Text Cleaning
    {
        id: 204,
        title: 'Text Cleaning & Normalization',
        assignee: 'Kavya Ghantasala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Clean all extracted text data.<br><br>
1. Normalize whitespace.<br>
2. Remove special characters.<br>
3. Handle encoding issues.<br><br>
<strong>📌 Output:</strong> cleaned_documents.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Text Cleaning & Normalization</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Clean the parsed data from Bhargava & Karthik</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   ├── parse_markdown.py    ← Bhargava's (INPUT)
│   │   ├── parse_csv.py         ← Karthik's (INPUT)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">text_cleaning.py</span>     ← YOUR FILE
│   └── output/
│       ├── parsed_markdown.json ← Your INPUT
│       ├── parsed_csv.json      ← Your INPUT
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">cleaned_documents.json</span> ← YOUR OUTPUT
</pre>

<p style="color: #fbbf24;">⚠️ NOTE: You need Bhargava & Karthik's output first. Coordinate with them!</p>

<h4>🔹 STEP 3: Create text_cleaning.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/parsed_markdown.json' and '../output/parsed_csv.json'
2. For each document's content, apply these cleaning steps:
   - Normalize unicode using unicodedata.normalize('NFKC', text)
   - Remove special characters except basic punctuation (.,!?;:-)
   - Normalize whitespace (multiple spaces → single space)
   - Normalize newlines (multiple newlines → double newline)
   - Strip leading/trailing whitespace
3. Combine both into one list
4. Save as '../output/cleaned_documents.json' with structure:
   {id, source_type (markdown/csv), filename, department, cleaned_content, original_length, cleaned_length}
5. Print statistics: 'Total docs: X, Characters removed: Y'

Use re (regex) and unicodedata libraries."
</div>

<h4>🔹 STEP 4: Run After Getting Input Files</h4>
<pre><code>cd "week 2/src"
python text_cleaning.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add text cleaning module - Week 2"
git push origin kavya/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: cleaned_documents.json with all text normalized.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Original parsing scripts, other files.</p>
`
    },

    // 5. Shirisha (Medium) - Role-based Metadata
    {
        id: 205,
        title: 'Role-based Metadata Assignment',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Tag each chunk with role permissions.<br><br>
1. Create role definitions.<br>
2. Analyze document to determine department.<br>
3. Assign accessible_roles metadata.<br><br>
<strong>📌 Output:</strong> tagged_chunks.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Role-based Metadata Assignment</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Add RBAC permissions to each document chunk</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   ├── chunking.py           ← Arshad's (wait for his output)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">metadata_tagging.py</span>   ← YOUR FILE
│   ├── output/
│   │   ├── chunked_documents.json ← Your INPUT
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">tagged_chunks.json</span>     ← YOUR OUTPUT
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">role_mappings.json</span>     ← YOUR CONFIG FILE
</pre>

<h4>🔹 STEP 3: Create config folder and role_mappings.json</h4>
<pre><code>mkdir -p "week 2/config"</code></pre>

<p>Create <code>week 2/config/role_mappings.json</code>:</p>
<pre><code>{
  "departments": {
    "Finance": ["finance", "c-level"],
    "HR": ["hr", "c-level"],
    "marketing": ["marketing", "c-level"],
    "engineering": ["engineering", "c-level"],
    "general": ["employees", "finance", "hr", "marketing", "engineering", "c-level"]
  },
  "keywords": {
    "finance": ["financial", "budget", "revenue", "quarterly", "profit", "expense"],
    "hr": ["employee", "salary", "policy", "leave", "benefits", "hiring"],
    "marketing": ["campaign", "marketing", "brand", "customer", "sales"],
    "engineering": ["technical", "api", "code", "system", "architecture", "deploy"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create metadata_tagging.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/chunked_documents.json' (list of chunks with content, source_file)
2. Loads '../config/role_mappings.json' for department→roles mapping
3. For each chunk:
   - Detect department from source_file path or keywords in content
   - Add metadata: {department, accessible_roles: [...], source, chunk_id}
4. Save as '../output/tagged_chunks.json'
5. Print summary: 'Finance: X chunks, HR: Y chunks, ...'

Use keyword matching and folder path detection."
</div>

<h4>🔹 STEP 5: Run & Verify</h4>
<pre><code>cd "week 2/src"
python metadata_tagging.py</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add role-based metadata tagging - Week 2"
git push origin shirisha/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: tagged_chunks.json with accessible_roles for each chunk.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Chunking logic, parsing scripts, other files.</p>
`
    },

    // 6. Saranya (Medium) - Metadata Mapping Document
    {
        id: 206,
        title: 'Create Metadata Mapping Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        description: `<strong>Goal:</strong> Document the metadata structure.<br><br>
1. Create mapping table (chunk → roles).<br>
2. Document department classification.<br>
3. Create role hierarchy visual.<br><br>
<strong>📌 Output:</strong> METADATA_MAPPING.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Metadata Mapping Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Create comprehensive RBAC documentation</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILE</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── docs/                     ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">METADATA_MAPPING.md</span>   ← YOUR FILE
│   ├── output/
│   │   └── tagged_chunks.json    ← Reference this (Shirisha's output)
│   └── config/
│       └── role_mappings.json    ← Reference this (Shirisha's config)
</pre>

<h4>🔹 STEP 3: Create docs folder</h4>
<pre><code>mkdir -p "week 2/docs"</code></pre>

<h4>🔹 STEP 4: Create METADATA_MAPPING.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive Markdown documentation file for RBAC metadata mapping that includes:

1. **Role Hierarchy Section**
   - Visual ASCII diagram showing: C-Level → Department Heads → Employees
   - Table: Role | Access Level | Description

2. **Department-Role Mapping Table**
   - Columns: Department | Documents | Accessible Roles
   - Rows for: Finance, HR, Marketing, Engineering, General

3. **Document Classification Rules**
   - How documents are classified by folder path
   - Keyword-based classification rules
   - Default classification for unmatched docs

4. **Chunk Metadata Schema**
   - JSON schema example showing: chunk_id, content, department, accessible_roles, source

5. **Access Control Matrix**
   - Matrix showing which role can access which department's docs
   - Use ✅ and ❌ symbols

6. **Examples Section**
   - Example: Finance user querying → what they see vs don't see
   - Example: C-Level user → sees everything

Make it professional with proper Markdown formatting."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC metadata mapping documentation - Week 2"
git push origin saranya/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete METADATA_MAPPING.md documentation.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Code files, config files (just reference them).</p>
`
    },

    // 7. Vinuthna (Medium) - Validation Report
    {
        id: 207,
        title: 'Preprocessing Validation & QA Report',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        description: `<strong>Goal:</strong> Validate all preprocessing work.<br><br>
1. Check chunk token ranges.<br>
2. Validate metadata assignments.<br>
3. Document issues found.<br><br>
<strong>📌 Output:</strong> PREPROCESSING_QA_REPORT.md + validation.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Preprocessing Validation & QA</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Test everyone's work and create QA report</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">validation.py</span>          ← YOUR FILE
│   ├── output/
│   │   ├── tagged_chunks.json     ← Test this
│   │   ├── cleaned_documents.json ← Test this
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">validation_results.json</span> ← YOUR OUTPUT
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">PREPROCESSING_QA_REPORT.md</span> ← YOUR REPORT
</pre>

<h4>🔹 STEP 3: Create validation.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python validation script that:
1. Loads '../output/tagged_chunks.json'
2. Performs these validations:
   - Token count check: all chunks should be 300-512 tokens (use tiktoken)
   - Metadata check: all chunks have 'department' and 'accessible_roles'
   - Role check: accessible_roles is not empty
   - Content check: no empty content
3. Counts issues by type
4. Saves results to '../output/validation_results.json':
   {total_chunks, passed, failed, issues: [{chunk_id, issue_type, details}]}
5. Prints summary with pass/fail counts

Install tiktoken if needed for token counting."
</div>

<h4>🔹 STEP 4: Run Validation</h4>
<pre><code>pip install tiktoken
cd "week 2/src"
python validation.py</code></pre>

<h4>🔹 STEP 5: Create QA Report</h4>
<p>Create <code>week 2/docs/PREPROCESSING_QA_REPORT.md</code> with:</p>
<ul>
<li>Summary statistics</li>
<li>Pass/Fail counts</li>
<li>List of issues found</li>
<li>Recommendations</li>
</ul>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add preprocessing validation and QA report - Week 2"
git push origin vinuthna/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Validation script + QA report completed.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Other team's code files.</p>
`
    },

    // 8. Joshika (EASIEST) - Summary Report
    {
        id: 208,
        title: 'Week 2 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        description: `<strong>Goal:</strong> Compile the Week 2 summary.<br><br>
1. Collect all deliverables.<br>
2. Summarize preprocessing results.<br>
3. Create WEEK2_SUMMARY.md.<br><br>
<strong>📌 Output:</strong> WEEK2_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 2 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 This is the EASIEST task - Just compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILE</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── docs/
│   │   ├── METADATA_MAPPING.md        ← Saranya's
│   │   ├── PREPROCESSING_QA_REPORT.md ← Vinuthna's
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK2_SUMMARY.md</span>          ← YOUR FILE
│   ├── output/
│   │   ├── parsed_markdown.json       ← Bhargava's
│   │   ├── parsed_csv.json            ← Karthik's
│   │   ├── cleaned_documents.json     ← Kavya's
│   │   ├── chunked_documents.json     ← Arshad's
│   │   └── tagged_chunks.json         ← Shirisha's
│   └── src/
│       └── (all scripts)
</pre>

<h4>🔹 STEP 3: Wait for Team Members</h4>
<p>Ask each person for their status. This is YOUR job as report writer.</p>

<h4>🔹 STEP 4: Create WEEK2_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 2 Summary Report in Markdown format for Module 2: Document Preprocessing & Metadata Tagging. Include:

1. **Module Overview**
   - Objective: Parse documents, clean text, chunk, assign metadata

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | Chunking | chunked_documents.json | ✅ |
   | Bhargava | Markdown Parsing | parsed_markdown.json | ✅ |
   ... (all 8 members)

3. **Statistics Section**
   - Total documents processed: X
   - Total chunks created: X
   - Average tokens per chunk: X
   - Departments covered: 5

4. **Deliverables Checklist**
   - [x] Preprocessing module
   - [x] Cleaned document chunks
   - [x] Role-based metadata
   - [x] QA report

5. **Issues & Resolutions**
   - Any problems encountered

6. **Next Steps (Week 3 Preview)**
   - Vector embeddings
   - Database indexing

Use professional formatting, emojis for visual appeal."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 2 Summary Report"
git push origin joshika/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK2_SUMMARY.md with all contributions.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Any code files, just read and summarize.</p>
`
    }
];

// =====================================================
// WEEK 1 TASKS (Module 1: Environment Setup) - COMPLETED
// =====================================================
const week1Tasks = [
    {
        id: 101,
        title: 'Module 1 Lead: Monitoring & Supervision',
        assignee: 'Arshad Pasha',
        priority: 'high',
        description: `<strong>Goal:</strong> Monitor Week 1 deliverables.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3><p>Environment setup and data exploration done.</p>`
    },
    {
        id: 102,
        title: 'Repository & Folder Structure',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        description: `<strong>Goal:</strong> Initialize project.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3><p>Folder structure created in week 1/data/</p>`
    },
    {
        id: 103,
        title: 'Finance & CSV Data Exploration',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore financial data.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 104,
        title: 'HR Documentation Analysis',
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore HR documents.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 105,
        title: 'Marketing Documentation',
        assignee: 'Kavya Ghantasala',
        priority: 'low',
        description: `<strong>Goal:</strong> Explore Marketing data.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 106,
        title: 'Engineering & Tech Docs',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore tech docs.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 107,
        title: 'Role-to-Document Mapping',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        description: `<strong>Goal:</strong> Create RBAC foundation.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 108,
        title: 'Week 1 Summary Report',
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        description: `<strong>Goal:</strong> Consolidate findings.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    }
];

// Combine all tasks (Milestone 4, then 3, then 2, then 1)
const defaultTasks = [...week8Tasks, ...week7Tasks, ...week6Tasks, ...week5Tasks, ...week4Tasks, ...week3Tasks, ...week2Tasks, ...week1Tasks];

// STATE
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;
let week1Collapsed = true;
let week2Collapsed = true;
let week3Collapsed = true;
let week4Collapsed = true;
let week5Collapsed = true;
let week6Collapsed = true;
let week7Collapsed = false; // Expanded by default
let week8Collapsed = false; // Expanded by default

// DOM Elements
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const tasksContainer = document.getElementById('tasksContainer');
const emptyState = document.getElementById('emptyState');
const modalTitle = document.getElementById('modalTitle');
const filterTabs = document.querySelectorAll('.filter-tab');
const deepModal = document.getElementById('deepExplanationModal');

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
    // Only run task management logic if the container exists (i.e., we are on tasks.html)
    if (document.getElementById('tasksContainer')) {
        loadTasks();
        setupEventListeners();
        setupNavigation();
    }
});

function loadTasks() {
    const stored = localStorage.getItem('rbac_tasks_milestone4_v3');
    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        tasks = [...defaultTasks];
        saveTasks();
    }
    renderTasks();
    updateStats();
}

function saveTasks() {
    localStorage.setItem('rbac_tasks_milestone4_v3', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function seedDatabase() {
    if (confirm("Reload ALL tasks with Milestone 4 (Weeks 7-8)? This resets all changes.")) {
        // Clear old localStorage keys
        localStorage.removeItem('rbac_tasks_milestone1_v3');
        localStorage.removeItem('rbac_tasks_milestone2_v1');
        localStorage.removeItem('rbac_tasks_milestone3_v1');
        localStorage.removeItem('rbac_tasks_milestone3_v2');
        tasks = [...defaultTasks];
        saveTasks();
        alert("Tasks reloaded with all 4 Milestones (Weeks 1-8)!");
    }
}
window.seedDatabase = seedDatabase;

// CRUD
function createTask(taskData) {
    const newId = Date.now();
    const newTask = { ...taskData, id: newId };
    tasks.unshift(newTask);
    saveTasks();
}

function updateTask(id, updates) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        saveTasks();
    }
}

function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        openModal({ ...task, description: cleanDesc });
    }
}

function toggleDescription(id) {
    const descEl = document.getElementById(`desc-${id}`);
    const btnEl = document.getElementById(`btn-${id}`);
    if (descEl.classList.contains('expanded')) {
        descEl.classList.remove('expanded');
        btnEl.textContent = 'See Full Description ⬇';
    } else {
        descEl.classList.add('expanded');
        btnEl.textContent = 'Hide Description ⬆';
    }
}
window.toggleDescription = toggleDescription;

function showDeepExplanation(id) {
    const task = tasks.find(t => t.id === id);
    if (task && task.deepExplanation) {
        document.getElementById('deepModalContent').innerHTML = task.deepExplanation;
        document.getElementById('deepExplanationModal').classList.add('active');
    } else {
        alert('No deep explanation available.');
    }
}
window.showDeepExplanation = showDeepExplanation;

function closeDeepModal() {
    document.getElementById('deepExplanationModal').classList.remove('active');
}
window.closeDeepModal = closeDeepModal;

function toggleWeek(weekNum) {
    if (weekNum === 1) {
        week1Collapsed = !week1Collapsed;
    } else if (weekNum === 2) {
        week2Collapsed = !week2Collapsed;
    } else if (weekNum === 3) {
        week3Collapsed = !week3Collapsed;
    } else if (weekNum === 4) {
        week4Collapsed = !week4Collapsed;
    } else if (weekNum === 5) {
        week5Collapsed = !week5Collapsed;
    } else if (weekNum === 6) {
        week6Collapsed = !week6Collapsed;
    } else if (weekNum === 7) {
        week7Collapsed = !week7Collapsed;
    } else if (weekNum === 8) {
        week8Collapsed = !week8Collapsed;
    }
    renderTasks();
}
window.toggleWeek = toggleWeek;

function handleFormSubmit(e) {
    e.preventDefault();
    const rawDesc = document.getElementById('taskDescription').value;
    const formattedDesc = rawDesc.replace(/\n/g, '<br>');

    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: formattedDesc,
        assignee: document.getElementById('assignee').value,
        priority: document.getElementById('priority').value,
        deepExplanation: ''
    };

    if (editingTaskId) {
        updateTask(editingTaskId, taskData);
    } else {
        createTask(taskData);
    }
    closeModal();
}

// RENDER
function renderTasks() {
    const week8 = tasks.filter(t => t.id >= 800 && t.id < 900);
    const week7 = tasks.filter(t => t.id >= 700 && t.id < 800);
    const week6 = tasks.filter(t => t.id >= 600 && t.id < 700);
    const week5 = tasks.filter(t => t.id >= 500 && t.id < 600);
    const week4 = tasks.filter(t => t.id >= 400 && t.id < 500);
    const week3 = tasks.filter(t => t.id >= 300 && t.id < 400);
    const week2 = tasks.filter(t => t.id >= 200 && t.id < 300);
    const week1 = tasks.filter(t => t.id >= 100 && t.id < 200);

    let html = `
    <!-- MILESTONE 4: Frontend & Deployment (Not Started) -->
    <div class="milestone-header" style="background: linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(100, 116, 139, 0.1)); border-color: rgba(148, 163, 184, 0.3);">
        <h2 style="color: #94a3b8;">⏳ Milestone 4: Frontend & Deployment (Weeks 7-8) - NOT STARTED</h2>
    </div>

    <!-- WEEK 8 (Not Started) -->
    <div class="week-section">
        <div class="week-header" onclick="toggleWeek(8)">
            <span class="week-toggle">${week8Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 8: System Integration, Testing & Deployment</h3>
            <span class="week-status" style="background: rgba(148, 163, 184, 0.2); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.4);">⏳ Not Started</span>
            <span class="task-count">${week8.length} tasks</span>
        </div>
        <div class="week-tasks ${week8Collapsed ? 'collapsed' : ''}">
            ${week8.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 7 (Not Started) -->
    <div class="week-section">
        <div class="week-header" onclick="toggleWeek(7)">
            <span class="week-toggle">${week7Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 7: Premium Next.js Frontend Development</h3>
            <span class="week-status" style="background: rgba(148, 163, 184, 0.2); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.4);">⏳ Not Started</span>
            <span class="task-count">${week7.length} tasks</span>
        </div>
        <div class="week-tasks ${week7Collapsed ? 'collapsed' : ''}">
            ${week7.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- MILESTONE 3: RAG Pipeline & LLM (Completed) -->
    <div class="milestone-header" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1)); border-color: rgba(34, 197, 94, 0.3); margin-top: 3rem;">
        <h2 style="color: #22c55e;">✅ Milestone 3: RAG Pipeline & LLM (Weeks 5-6) - COMPLETED</h2>
    </div>


    <!-- WEEK 6 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(6)">
            <span class="week-toggle">${week6Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 6: RAG Pipeline & LLM Integration</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week6.length} tasks</span>
        </div>
        <div class="week-tasks ${week6Collapsed ? 'collapsed' : ''}">
            ${week6.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 5 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(5)">
            <span class="week-toggle">${week5Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 5: User Authentication & RBAC Middleware</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week5.length} tasks</span>
        </div>
        <div class="week-tasks ${week5Collapsed ? 'collapsed' : ''}">
            ${week5.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- MILESTONE 2: Backend Auth & Search (Completed) -->
    <div class="milestone-header" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1)); border-color: rgba(34, 197, 94, 0.3); margin-top: 3rem;">
        <h2 style="color: #22c55e;">✅ Milestone 2: Backend Auth & Search (Weeks 3-4) - COMPLETED</h2>
    </div>

    <!-- WEEK 4 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(4)">
            <span class="week-toggle">${week4Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 4: Role-Based Search & Query Processing</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week4.length} tasks</span>
        </div>
        <div class="week-tasks ${week4Collapsed ? 'collapsed' : ''}">
            ${week4.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 3 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(3)">
            <span class="week-toggle">${week3Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 3: Vector Database & Embedding Generation</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week3.length} tasks</span>
        </div>
        <div class="week-tasks ${week3Collapsed ? 'collapsed' : ''}">
            ${week3.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- MILESTONE 1: Data Preparation & Vector DB (Completed) -->
    <div class="milestone-header" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1)); border-color: rgba(34, 197, 94, 0.3); margin-top: 3rem;">
        <h2 style="color: #22c55e;">✅ Milestone 1: Data Preparation & Vector DB (Weeks 1-2) - COMPLETED</h2>
    </div>

    <!-- WEEK 2 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(2)">
            <span class="week-toggle">${week2Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 2: Document Preprocessing & Metadata Tagging</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week2.length} tasks</span>
        </div>
        <div class="week-tasks ${week2Collapsed ? 'collapsed' : ''}">
            ${week2.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 1 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(1)">
            <span class="week-toggle">${week1Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 1: Environment Setup & Data Exploration</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week1.length} tasks</span>
        </div>
        <div class="week-tasks ${week1Collapsed ? 'collapsed' : ''}">
            ${week1.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>
    `;

    tasksContainer.innerHTML = html;
    tasksContainer.style.display = 'block';
    emptyState.style.display = 'none';
}

function createTaskHTML(task) {
    const names = task.assignee.split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const priorityClass = `priority-${task.priority}`;

    // Determine status badge
    let statusBadge = '';
    if (task.status === 'completed') {
        statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(34, 197, 94, 0.4);">✅ Completed</span>`;
    } else if (task.status === 'in-progress') {
        statusBadge = `<span style="background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.4);">🔵 In Progress</span>`;
    } else if (task.status === 'not-started') {
        statusBadge = `<span style="background: rgba(148, 163, 184, 0.2); color: #94a3b8; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(148, 163, 184, 0.4);">⏳ Not Started</span>`;
    }

    return `
    <div class="task-card ${priorityClass}">
        <div class="task-header">
            <div style="flex-grow:1">${statusBadge}</div>
            <div class="task-actions">
                <button onclick="editTask(${task.id})" class="btn-icon" title="Edit">✏️</button>
                <button onclick="deleteTask(${task.id})" class="btn-icon delete" title="Delete">🗑️</button>
            </div>
        </div>
        
        <h3 class="task-title">${task.title}</h3>
        
        <div class="task-desc-wrapper">
            <p class="task-desc" id="desc-${task.id}">${task.description}</p>
            <button class="read-more-btn" id="btn-${task.id}" onclick="toggleDescription(${task.id})">See Full Description ⬇</button>
        </div>

        ${task.deepExplanation ? `<button class="deep-explain-btn" onclick="showDeepExplanation(${task.id})">📘 Deep Explanation (Step-by-Step)</button>` : ''}

        <div class="task-footer">
            <div class="task-meta">
                <div class="task-assignee">
                    <div class="assignee-avatar">${initials}</div>
                    ${task.assignee}
                </div>
            </div>
        </div>
    </div>
    `;
}

function updateStats() {
    const totalEl = document.getElementById('totalTasks');
    if (!totalEl) return;
    totalEl.textContent = tasks.length;
}

function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
}

function setupEventListeners() {
    if (addTaskBtn) addTaskBtn.addEventListener('click', () => openModal());
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (taskModal) taskModal.addEventListener('click', (e) => { if (e.target === taskModal) closeModal(); });
    if (taskForm) taskForm.addEventListener('submit', handleFormSubmit);
    if (deepModal) {
        deepModal.addEventListener('click', (e) => { if (e.target === deepModal) closeDeepModal(); });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeDeepModal();
        }
    });
}

function openModal(task = null) {
    taskModal.classList.add('active');
    if (task) {
        editingTaskId = task.id;
        modalTitle.textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        document.getElementById('taskDescription').value = cleanDesc;
        document.getElementById('assignee').value = task.assignee;
        document.getElementById('priority').value = task.priority;
    } else {
        editingTaskId = null;
        modalTitle.textContent = 'Add New Task';
        taskForm.reset();
    }
}

function closeModal() {
    taskModal.classList.remove('active');
    taskForm.reset();
    editingTaskId = null;
}

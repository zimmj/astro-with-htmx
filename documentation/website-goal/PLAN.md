# Personal Website Plan - Digital Nomad & Software Engineer

## Vision

A knowledge-sharing and ideas-driven website that documents the journey of a digital nomad software engineer. Focus on thoughtful writing, observations, and insights at the intersection of technology, travel, and personal growth.

**This is NOT about:**
- Traditional portfolio/projects
- Career ladder climbing
- Selling services
- Showing off accomplishments

**This IS about:**
- Thinking out loud
- Sharing what you're learning
- Making connections between ideas
- Building genuine relationships with readers
- Documenting the nomadic journey

---

## Core Pages

### 1. Home (`/`)
**Purpose**: First impression and gateway to content

**Content:**
- Compelling headline about learning, exploring, thinking
- "Currently in [City, Country]" badge with link to Polarsteps
- Brief introduction (2-3 sentences about who you are)
- Latest thought/article preview
- Quick navigation to main sections
- Call-to-action: "Read my thoughts", "Follow my journey"

**Tone**: Welcoming, curious, authentic

---

### 2. About (`/about`)
**Purpose**: Your story and philosophy

**Content:**
- Personal journey: how you became a developer + nomad
- What fascinates you (technology, culture, systems, patterns)
- How travel shapes your thinking and work
- Your philosophy on remote work, learning, and life
- What you're exploring right now
- Why you share knowledge
- Contact/social links

**Tone**: Personal but not diary-like, vulnerable, thoughtful

**Note**: Less resume, more personal philosophy

---

### 3. Writing (`/writing` or `/thoughts`)
**Purpose**: Main content hub - your brain on the internet

**Content Types:**
- **Essays** - Long-form deep dives (2000+ words)
- **Observations** - Medium-length insights (500-1000 words)
- **Notes** - Short thoughts and patterns (200-500 words)
- **Questions** - Open-ended explorations without answers

**Topics:**
- How different cultures approach technology
- Remote work philosophy and practices
- Software engineering insights and patterns
- Digital minimalism and intentional tech use
- Time zone management and async communication
- Building sustainable work-life integration
- Technology's impact on travel and vice versa
- Productivity without hustle culture
- Learning and skill acquisition while traveling
- Cultural observations through a developer's lens

**Features:**
- Search and filter by topic/format
- Reading time estimates
- "Last updated" dates for living documents
- Related articles suggestions
- RSS feed

**Organization:**
- By theme: Technology, Travel, Productivity, Philosophy, Culture
- By format: Essays, Observations, Notes, Questions
- By location: Insights from specific places
- By recency: Latest thinking

---

### 4. Journey (`/journey`)
**Purpose**: Visual story of your nomadic life

**Integration with Polarsteps:**
- Hero section: "Follow my journey around the world"
- Brief intro about your nomadic lifestyle
- Prominent CTA: "View full journey on Polarsteps" (opens in new tab)
- Official Polarsteps embed (if available) or beautiful link card
- Timeline/stats: Countries visited, longest stays, etc.

**Your Content:**
- **Highlights section** - Curated favorite places
- **What each place taught me** - Mini insights by location
- Links to writing pieces inspired by specific locations
- Photos with context (not just pretty pictures)

**Approach**: Let Polarsteps handle the travel tracking, you add the meaning and insights

---

### 5. Library (`/library` or `/knowledge`)
**Purpose**: Curated resources and knowledge you want to share

**Sections:**
- **Reading** - Books that shaped your thinking (with key takeaways)
- **Bookmarks** - Articles, videos, podcasts you recommend
- **Concepts** - Key ideas and frameworks that influence you
- **Tools** - Software/apps you find valuable (and WHY)
- **Principles** - Personal frameworks and mental models

**Organization**: By theme (productivity, philosophy, technology, travel, culture)

**Format**: Each item should include:
- Title/link
- Why it matters
- Key takeaway or quote
- How it influenced your thinking

---

### 6. Contact (`/contact`)
**Purpose**: Make meaningful connections

**Content:**
- Email and social media links
- HTMX-powered contact form (smooth, no page reload)
- "What kind of conversations I'm interested in"
- Topics you'd love to discuss
- Response time expectations
- Current availability status (open for coffee chats, not looking for work, etc.)
- Optional: "Buy me a coffee" if someone wants to support

**Tone**: Open, friendly, clear boundaries

---

## Optional Pages (Add Later)

### 7. Uses (`/uses`)
**Purpose**: Share your tools and setup with reasoning

**Content:**
- Hardware: Laptop, phone, travel gear
- Software: Development tools, productivity apps
- Why you chose each item
- Minimalist philosophy
- What you tried and rejected

### 8. Ideas (`/ideas` or `/experiments`)
**Purpose**: Half-baked thoughts and ongoing explorations

**Content:**
- Concepts you're playing with
- Questions without answers yet
- Experiments you're running (life, work, productivity)
- "Shower thoughts" worth discussing
- Open for feedback and discussion

**Tone**: Casual, exploratory, unpolished

---

## Technical Implementation

### Tech Stack (Already Set Up)
- **Astro 6** - SSR mode with Netlify adapter
- **HTMX** - For interactive forms and dynamic content
- **Tailwind CSS** - For styling with dark mode support
- **Supabase** - Authentication (if needed for comments/likes later)
- **Content Collections** - For blog posts and knowledge base

### HTMX Interactive Features
1. **Contact form** - Smooth submission without page reload
2. **Writing search/filter** - Instant filtering by topic/format
3. **Newsletter signup** - Inline subscription (if you add newsletter)
4. **Dynamic location badge** - Show current location on homepage
5. **Infinite scroll** - For writing listing page (if many posts)

### Content Management
- **Markdown/MDX files** in `src/content/` folder
- Frontmatter for metadata (title, date, tags, location, format)
- Astro Content Collections for type-safe content queries
- Git-based workflow (write locally, commit, deploy)

### Polarsteps Integration Strategy
**Recommended: Hybrid Approach**
1. **Homepage**: "Currently in..." badge (manual update or API)
2. **Journey page**: Prominent link to Polarsteps + your highlights
3. **Optional**: Use unofficial API to fetch latest location automatically

**Implementation Options:**
- **Simple**: Manual config file for current location
- **Automated**: Fetch from Polarsteps unofficial API
- **Fallback**: Always show link to Polarsteps profile

---

## Content Strategy

### Voice & Tone
- **Professional but approachable** - Technical but not jargon-heavy
- **Thoughtful but not academic** - Accessible and conversational
- **Questioning more than prescriptive** - Invite discussion rather than dictate
- **Specific with examples** - Ground abstract ideas in real situations
- **Vulnerable** - Share uncertainties and failures too
- **Authentic** - Show both the code and the adventure

### Content Pillars
1. **Technology & Software Engineering** (40%)
2. **Digital Nomad Lifestyle** (30%)
3. **Personal Insights & Philosophy** (20%)
4. **Curated Knowledge & Resources** (10%)

### Writing Approach
- Balance technical depth with accessibility
- Use personal experiences to illustrate ideas
- Be honest about challenges (slow WiFi, timezone struggles, loneliness)
- Show the reality, not just highlights
- Connect travel experiences to broader insights
- Ask questions you don't have answers to yet

---

## Launch Plan (MVP)

### Phase 1: Essential Pages (Launch Ready)
1. **Home** - Strong first impression with location badge
2. **About** - Your story and philosophy
3. **Writing** - Start with 5-8 pieces covering different formats:
   - 1-2 long essays
   - 3-4 observations
   - 1-2 notes or questions
4. **Journey** - Polarsteps integration + highlights
5. **Contact** - Simple connection point

**Goal**: Launch with enough content to establish voice and value

### Phase 2: Expand Content (Month 1-3)
- Add 2-4 new pieces per month to Writing
- Build out Library with 20-30 curated resources
- Add more journey highlights
- Iterate on design and UX based on feedback

### Phase 3: Advanced Features (Month 3-6)
- Ideas/Experiments page
- Uses page
- Newsletter (optional)
- Comments or discussion system (optional)
- Analytics to understand what resonates

---

## Design Principles

### Visual Design
- **Clean and minimal** - Let content shine
- **Readable typography** - Generous line height and font size
- **Purposeful whitespace** - Give ideas room to breathe
- **Dark mode support** - Easier on the eyes for long reading
- **Mobile-first** - Many nomads browse on phones
- **Fast loading** - Respect users' potentially slow connections

### User Experience
- **Fast navigation** - Get to content quickly
- **Clear hierarchy** - Easy to scan and find what matters
- **Progressive disclosure** - Don't overwhelm on first visit
- **Accessible** - Semantic HTML, good contrast, keyboard navigation
- **Honest design** - No dark patterns, no tricks, no popups

### Content Presentation
- **Scannable** - Use headings, lists, short paragraphs
- **Visual breaks** - Pull quotes, images, code blocks
- **Context clues** - Reading time, date, format, topic tags
- **Related content** - Help readers go deeper
- **Conversation starters** - End with questions or discussion prompts

---

## Success Metrics (Non-Traditional)

**Not Measuring:**
- Page views or traffic numbers
- Social media followers
- Email list size
- Ad revenue or monetization

**Actually Measuring:**
- Meaningful conversations started (emails, comments)
- Ideas refined through feedback
- Personal clarity gained from writing
- Connections made with like-minded people
- Own learning and growth documented

**Success Looks Like:**
- Writing consistently (without pressure)
- Receiving thoughtful responses from readers
- Using the site as thinking tool
- Connecting with interesting people
- Documenting growth over time

---

## Next Steps

### Immediate Actions
1. Set up content collections structure for writing
2. Create page layouts for core pages
3. Write initial content (5-8 pieces for Writing section)
4. Implement Polarsteps integration on Journey page
5. Set up contact form with HTMX
6. Deploy and test

### Content Preparation Checklist
- [ ] Write About page content
- [ ] Draft 1-2 essays (2000+ words each)
- [ ] Write 3-4 observations (500-1000 words each)
- [ ] Create 1-2 short notes or questions
- [ ] Gather 10-15 items for Library section
- [ ] Collect journey highlights and photos
- [ ] Set up Polarsteps profile (if not already)
- [ ] Choose social links and contact methods

### Technical Setup Checklist
- [ ] Create content collection schema for writing
- [ ] Build page layouts (Home, About, Writing, Journey, Contact)
- [ ] Implement HTMX contact form
- [ ] Add Polarsteps integration
- [ ] Set up RSS feed for writing
- [ ] Test dark mode thoroughly
- [ ] Optimize for mobile
- [ ] Set up analytics (privacy-focused, optional)

---

## Long-Term Vision

This website evolves as you do:
- **Document transformation** - Capture how your thinking changes over time
- **Build in public** - Share the journey, not just the destination
- **Create serendipity** - Attract meaningful opportunities through authentic sharing
- **Leave a trail** - Build a body of work that compounds over time
- **Stay curious** - Let questions drive exploration and content

The goal is not a perfect website, but an honest one that grows with you.

---

*Last updated: June 2, 2026*

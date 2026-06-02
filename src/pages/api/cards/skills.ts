export const prerender = false;

import type { APIRoute } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ExperienceModal from '../../../components/ExperienceModal.astro';
import TimelineItem from '../../../components/TimelineItem.astro';

export const GET: APIRoute = async () => {
  const container = await AstroContainer.create();

  // Timeline data
  const timelineData = [
    {
      title: 'AI-First',
      keywords: ['Claude Code', 'Copilot', 'E2E Testing', 'HTMX + Astro'],
      heading: 'AI-First Development',
      description:
        "I've been following AI-assisted development since GitHub Copilot's early days, but legal constraints limited adoption. Now able to fully harness AI tools, I let them handle complete feature development while I maintain control through comprehensive E2E testing—lessons learned from past production issues taught me that good tests are non-negotiable.",
      color: 'emerald' as const,
      badge: 'Now',
    },
    {
      title: 'Simplification',
      keywords: ['HTMX', 'Server-Side', 'Tailwind CSS', 'GitHub Actions'],
      heading: 'Modern Frameworks',
      description:
        "Working with Spring + React stacks, I realized (like many) it's overcomplicated. The layers, the APIs, the frontend-backend dance—all that ceremony for what? Discovered HTMX + Tailwind: server-side rendering with modern interactions. No separate FE layer, no JSON APIs—backend returns HTML views directly. Simple wins.",
      color: 'blue' as const,
    },
    {
      title: 'Modular',
      keywords: ['Spring Boot', 'Microservices', 'PostgreSQL', 'REST APIs', 'GitLab CI'],
      heading: 'Spring & Modular Monoliths',
      description:
        "After struggling with Liferay's massive monolith, we tried breaking everything into Spring Boot microservices. The service count exploded fast—operational overhead became unsustainable. We pivoted to modular monoliths: monolith benefits with well-defined layer boundaries and module isolation. Best of both worlds.",
      color: 'purple' as const,
    },
    {
      title: 'Enterprise',
      keywords: ['Java', 'Liferay Portal', 'MySQL', 'Maven'],
      heading: 'Liferay Monoliths',
      description:
        "Large-scale enterprise applications needed portals like Liferay—they could do anything. The problem? Making them do what you actually needed meant bending the system constantly. Most work wasn't building exciting features, but figuring out how to force the framework to allow customization. Frustrating way to work.",
      color: 'amber' as const,
      badge: 'Start',
    },
  ];

  // Render timeline items separately
  const timelineItemsHtml = (
    await Promise.all(
      timelineData.map((item) =>
        container.renderToString(TimelineItem, {
          props: {
            title: item.title,
            keywords: item.keywords,
            heading: item.heading,
            description: item.description,
            color: item.color,
            badge: item.badge,
          },
        })
      )
    )
  ).join('\n');

  // Render the modal with pre-rendered timeline items
  const htmlContent = await container.renderToString(ExperienceModal, {
    props: {
      timelineItemsHtml,
    },
  });

  return new Response(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};

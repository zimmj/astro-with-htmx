export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const htmlContent = `
    <div data-modal class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <button
          onclick="this.closest('[data-modal]').remove()"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="mb-6 flex items-center gap-3">
          <div class="rounded-lg bg-emerald-100 p-3 dark:bg-emerald-900">
            <svg class="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Skills</h2>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Frontend</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">JavaScript</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">TypeScript</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">React</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Vue.js</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Astro</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">HTMX</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Tailwind CSS</span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Backend</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Node.js</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Python</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">REST APIs</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">GraphQL</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Express</span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Database & Cloud</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">PostgreSQL</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">MongoDB</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Supabase</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">AWS</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Docker</span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Tools & Workflow</h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Git</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">GitHub</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">VS Code</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">CI/CD</span>
              <span class="px-4 py-2 text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg">Agile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return new Response(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};

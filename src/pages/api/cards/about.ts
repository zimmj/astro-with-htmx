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
          <div class="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
            <svg class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">About Me</h2>
        </div>

        <div class="space-y-4 text-gray-600 dark:text-gray-300">
          <p class="text-lg leading-relaxed">
            Hi! I'm Joel Zimmerli, a Full Stack Developer passionate about building modern, scalable web applications.
          </p>

          <p class="leading-relaxed">
            I specialize in creating elegant solutions to complex problems, with a focus on user experience and performance.
            My approach combines clean code practices with innovative thinking to deliver products that users love.
          </p>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Experience</h3>
            <ul class="space-y-2 list-disc list-inside">
              <li>Full stack web development</li>
              <li>Modern JavaScript frameworks</li>
              <li>Cloud-native applications</li>
              <li>UI/UX design principles</li>
            </ul>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Interests</h3>
            <p class="leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              and staying up-to-date with the latest developments in web development.
            </p>
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

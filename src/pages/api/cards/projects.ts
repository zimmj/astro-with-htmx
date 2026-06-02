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
          <div class="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
            <svg class="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </div>

        <div class="space-y-6">
          <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project One</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              A modern web application built with cutting-edge technologies. Features include real-time updates,
              responsive design, and seamless user experience.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">React</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">TypeScript</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">Node.js</span>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Two</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              An innovative solution for complex data visualization. Built with performance and scalability in mind,
              handling millions of data points with ease.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">Vue.js</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">D3.js</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">Python</span>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project Three</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Open-source library that simplifies complex workflows. Used by developers worldwide to improve
              productivity and code quality.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">JavaScript</span>
              <span class="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">Open Source</span>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href="https://github.com/joelzimmerli"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
          >
            View all projects on GitHub
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
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

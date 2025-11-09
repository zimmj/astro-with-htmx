import { deleteTodo } from '../../../lib/todo';
import type { APIContext } from 'astro';

export const prerender = false;

export async function DELETE({ params }: APIContext): Promise<Response> {
  const id = parseInt(params.id || '', 10);
  if (isNaN(id)) {
    return new Response(null, { status: 400, statusText: 'Invalid ID' });
  }

  await deleteTodo(id);

  return new Response(null, { status: 200 }); // Empty response is sufficient for delete
}


import { deleteTodo, getTodos } from '../../../lib/todo';

export const prerender = false;

export async function DELETE({ params, request }) {
    const id = parseInt(params.id, 10); 
    if (isNaN(id)) {
        return new Response(null, { status: 400, statusText: 'Invalid ID' }); 
    }

    await deleteTodo(id); 

    return new Response(null, { status: 200 }); // Empty response is sufficient for delete
}
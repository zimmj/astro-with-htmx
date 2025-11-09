export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

let todosData: Todo[] = [
    { id: 1, text: "Learn Kung Fu", completed: false },
    { id: 2, text: "Watch Westminster", completed: true },
    { id: 3, text: "Study Vedanta", completed: false },
];

export async function getTodos(): Promise<Todo[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(todosData);
        }, 100); // Simulate a slight delay for fetching
    });
}

export async function deleteTodo(id: number): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            todosData = todosData.filter(todo => todo.id !== id);
            resolve(true);
        }, 100);
    });
}

export async function addTodo(text: string): Promise<Todo> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newTodo: Todo = { id: todosData.length + 1, text, completed: false };
            todosData.push(newTodo);
            resolve(newTodo);
        }, 100);
    });
}

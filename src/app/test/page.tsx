
type TaskStatus = 'completed' | 'pending' | 'canceled';


type Task = {
    name: string;
    status: TaskStatus;
    dueDate?: string | Date;
    dateCompleted?: Date;
};

type ProcessedTasks = {
    completed: Task[];
    pending: Task[];
    overdue: Task[];
};

const tasks: Task[] = [
    { name: 'Task 1', status: 'completed' },
    { name: 'Task 2', status: 'pending', dueDate: '2024-01-01' },
    { name: 'Task 3', status: 'pending' },
    { name: 'Task 4', status: 'canceled' }
];

function myProcessTasks(tasks: Task[]): ProcessedTasks {

    const result: ProcessedTasks = {
        completed: [],
        pending: [],
        overdue: []
    }

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]

        // выносим в отдельную переменную чтоб не пересоздавать для каждой итерации
        const now = new Date()
        const isOverdue = task.dueDate && new Date(task.dueDate) < now

        if (task.status === 'completed') {
            if (!task.dateCompleted) {
                task.dateCompleted = now;
            }
            result.completed.push(task);
        } else if (task.status === 'pending') {
            (isOverdue ? result.overdue : result.pending).push(task);
        }
        console.log(`Task ${task.name} is ${isOverdue ? 'overdue' : task.status}`);

    }

    return result
}


const Page = () => {
    const restasks = myProcessTasks(tasks)

    const sourceCode = `
 type TaskStatus = 'completed' | 'pending' | 'canceled';


type Task = {
    name: string;
    status: TaskStatus;
    dueDate?: string | Date;
    dateCompleted?: Date;
};

type ProcessedTasks = {
    completed: Task[];
    pending: Task[];
    overdue: Task[];
};

const tasks: Task[] = [
    { name: 'Task 1', status: 'completed' },
    { name: 'Task 2', status: 'pending', dueDate: '2024-01-01' },
    { name: 'Task 3', status: 'pending' },
    { name: 'Task 4', status: 'canceled' }
];

function myProcessTasks(tasks: Task[]): ProcessedTasks {

    const result: ProcessedTasks = {
        completed: [],
        pending: [],
        overdue: []
    }

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]

         
        const now = new Date()
        const isOverdue = task.dueDate && new Date(task.dueDate) < now

        if (task.status === 'completed') {
            if (!task.dateCompleted) {
                task.dateCompleted = now;
            }
            result.completed.push(task);
        } else if (task.status === 'pending') {
            (isOverdue ? result.overdue : result.pending).push(task);
        }
 
    }

    return result
}`;
    return (
        <section className={'max-w-3xl mx-auto space-y-5 my-20'}>
            <h2>Рефакторинг</h2>
            <div>
                <p>
                    1. Вынесли объект даты для удобного переиспользования
                </p>
                <p>
                    2. Избавились от бесконечных if else
                </p>
                <p> 3. Добавили типизацию </p>
                <p>
                    4. Объединили 3 массива в один объект для удобства </p>

            </div>
            <div className={'bg-muted/80  text-black p-3 rounded-md'}>
                {/*<pre className={'border p-2'}>*/}
                {/*    {JSON.stringify(restasks, null, 2)}*/}
                {/*</pre>*/}

                <pre className="">
            <code>{sourceCode}</code>
            </pre>
            </div>
        </section>
    );
};
export default Page;

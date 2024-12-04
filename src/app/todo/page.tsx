import Navbar from "@/components/common/navbar/Navbar";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import TodoInput from "@/components/todo/TodoInput";
import TodoItemsList from "@/components/todo/TodoItemsList";


const Page = () => {
    return (
        <main className={'min-h-svh bg-background'}>
            <Navbar/>
            <div className={'container mx-auto space-y-10 py-10'}>
                <section className={'space-y-5'}>
                     <TodoInput/>
                    <Card className={'bg-muted max-w-xl mx-auto'}>
                        <CardHeader>
                            <h3>Ваши задачи</h3>
                        </CardHeader>
                        <CardContent>
                            <TodoItemsList/>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
};
export default Page;

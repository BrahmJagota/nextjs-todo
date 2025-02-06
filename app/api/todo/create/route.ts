import { createTask, listTasks } from "@/actions/todo";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        console.log('this triggers')
        const {todoTitle} = await req.json();
        console.log(todoTitle, typeof todoTitle);

        if(!todoTitle) {
            return new NextResponse("Title required!", {status: 400});
        }
        
        const todo = await createTask(todoTitle);
        console.log("todo", todo);
        // if(todo) {
            // const result = await listTasks();
            
            // console.log("result", result)
            return NextResponse.json({todo}, {status: 200});
        // }
        return new NextResponse("Title required! bro", {status: 400});
    } catch (error: any) {
        console.error(error);
        return new NextResponse("Failed to created todo list", {status: 500});
    }
}
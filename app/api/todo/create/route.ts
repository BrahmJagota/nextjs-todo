import { createTask } from "@/actions/todo";
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
            return NextResponse.json({todo}, {status: 200});

    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to created todo list", {status: 500});
    }
}
import { listTasks } from "@/actions/todo";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const tasks = await listTasks();
        return NextResponse.json(tasks, {status: 200});
    } catch(err) {
         console.error(err);
         return new NextResponse("Something went wrong", {status: 500});
    }
}
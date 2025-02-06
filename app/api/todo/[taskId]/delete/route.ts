import { deleteTask } from "@/actions/todo";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {taskId: string}}) {
    const { taskId } = await params;
    try{
        const isDeleted = await deleteTask(taskId)
        return NextResponse.json({isDeleted}, { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse("something went wrong!", {status: 500})
    }
}
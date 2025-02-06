import { deleteTask } from "@/actions/todo";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: { params: { taskId: string } }) {
    const { taskId } = context.params;
    try{
        const isDeleted = await deleteTask(taskId)
        return NextResponse.json({isDeleted}, { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse("something went wrong!", {status: 500})
    }
}
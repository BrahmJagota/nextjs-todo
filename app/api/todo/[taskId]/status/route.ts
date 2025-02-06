import { changeStatus } from "@/actions/todo";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ taskId: string }>}){
    try {
        const { isCompleted }: { isCompleted: boolean } = await req.json();
        const taskId = (await params).taskId
        // console.log("is com", isCompleted, params.taskId)
      const result = await changeStatus(isCompleted, taskId);
        return NextResponse.json({result}, { status: 200 });
    } catch (err){
        console.error(err);
        return new NextResponse("something went wrong!", {status: 500})
    }
}   
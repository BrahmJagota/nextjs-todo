"use server"

import { auth } from "@clerk/nextjs/server";
import {prisma} from '@/lib/db';
import { redirect } from "next/navigation";
export async function createTask(title: string) {
    try{
      console.log("userid")
    const {userId} = await auth();
    console.log("userid", userId)
    if(!userId) {
        throw new Error("Unauthorized");
    }
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
  });

  if (!user) {
      user = await prisma.user.create({
          data: { clerkId: userId },
      });
  }

    const createTask = await prisma.task.create({
        data: {
            title,
            createdBy: {
              connect: {
                clerkId: userId,
              },
            }
        }
    })

    return { createTask };
} catch(error: any){
  console.log("error buddy create", error.stack)
    throw redirect("/to")
}
}

export async function changeTitle(title: string, id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
          throw new Error("Unauthorized");
        }
    
        prisma.task.update({
            where: { id }, data: {title}
        });

      } catch {
        throw redirect("/signin");
      } 
}

export async function changeStatus(isCompleted: boolean, id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
          throw new Error("Unauthorized");
        }
    
      await prisma.task.update({
            where: { id }, data: {isCompleted}
        });
        return true
      } catch(err: any) {
        // console.error(err.stack)
        throw redirect("/signin");
      } 
}

export async function listTasks() {
    try {
        const { userId } = await auth();
        console.log("userid 2", userId)
        if (!userId) {
          throw new Error("Unauthorized");
        }
        const tasks = await prisma.task.findMany({
          where: {
            createdBy: {
              clerkId: userId, 
            },
          },
        });
        console.log("tasks in todo",tasks)
        return tasks
      } catch (err:any){
        console.log("error is here", err.stack)
        throw redirect("/signin");
      } 
}

export async function deleteTask(taskId: string) {
  try{
    const isDeleted = await prisma.task.delete({
      where: {id: taskId}
    })
    return true
  } catch(err) {
    console.error(err);
  }
}
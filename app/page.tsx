import AddTask from "@/components/addTask";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Task } from "@prisma/client";
import Tasks from "@/components/tasks";


export default function Home() {
  

  return (
    <div  className="h-screen flex justify-center items-center">
      <div className="w-100 p-4 border-2 border-black rounded-md flex flex-col gap-2">
      {/* <AddTask /> */}
      <Tasks  />
      </div>
      {/* <UserButton /> */}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Task } from "@prisma/client";
import { Button } from "./button";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [todoTitle, setTodoTitle] = useState<string>("");
const [isChecking, setIsChecking] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const tasks = await fetch("/api/todo/list");
      const data: Task[] = await tasks.json();
      setTasks(data);
    };
    getData();
  }, []);

  useEffect(()=> {
    const checkAuth = async () => {
        
        await fetch('/api/me')
        .then((res) => res.json())
        .then((data) => {
            setIsChecking(false)
            console.log(data)
            if(!data.isLogin) {
                redirect('/signin')
            }
    })
    .catch(err => redirect('/signin'))
    }
     checkAuth()

  },[])


  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/todo/create", {
        method: "POST",
        body: JSON.stringify({ todoTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTask = await res.json();
      console.log("nw task", newTask)
      setTasks((prevTasks) => [...prevTasks, newTask.todo.createTask]);
      setTodoTitle(""); 
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIsCompleted = async (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: e.target.checked } : task
      )
    );
    setIsUpdating(taskId);
    const isCompleted = e.target.checked;
    try {
      await fetch(`/api/todo/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted }),
      });
    } catch {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, isCompleted: !isCompleted } : task
        )
      );
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const res = await fetch(`/api/todo/${taskId}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className=" flex justify-center items-center">
        {isChecking ? (
<div className="">
    <LoaderIcon />
</div>
        ): (
<div className="w-100 p-4  border-black rounded-md flex flex-col gap-2">
        {/* Add Task */}
        <form
          className="flex gap-1 p-3 border rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            name="todoTitle"
            placeholder="Add a new task"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            className="placeholder-gray-500 outline-none"
          />
          <Button loading={isLoading} onClick={onSubmit}>
            Add Task
          </Button>
        </form>

        {/* Task List */}
        <div className="flex flex-wrap gap-2 flex-col  mt-4">
          {isLoading ? (
            <li className="p-2 w-full list-none flex justify-center items-center">
              <LoaderIcon />
            </li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="relative p-2 w-full list-none border flex justify-between items-center group hover:bg-red-500 hover:bg-opacity-40"
              >
                {task.title}{" "}
                <input
                  type="checkbox"
                  disabled={isUpdating === task.id}
                  onChange={(e) => handleIsCompleted(e, task.id)}
                  checked={task.isCompleted}
                  className="h-4 w-4"
                />

                <button
                  onClick={() => handleDelete(task.id)}
                  className="absolute right-1/2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                >
                  <Trash2Icon className="text-white" size={18} />
                </button>
              </li>
            ))
          )}
        </div>
      </div>
        )}
      
    </div>
  );
}

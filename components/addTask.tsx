"use client"

import { useEffect, useState } from "react"
import { Button } from "./button";

export default function AddTask() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>('');
    const onSubmit = ()=> {
        setIsLoading(true);
        fetch("/api/todo/create", {
            method: "POST",
            body: JSON.stringify({todoTitle}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          })
          .catch(() => {
            alert("Something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    useEffect(()=> {
        console.log('t', todoTitle)
    },[todoTitle])
    return (
        <form className="flex gap-1 p-3 border rounded-lg">
            <input type="text" name="todoTitle" placeholder="add a to-do" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} className="placeholder-gray-500 outline-none" />
            {/* <button className="placeholder-gray-500   rounded-lg">add</button> */}
            <Button loading={isLoading} onClick={onSubmit}>add</Button>
        </form>
    )
}
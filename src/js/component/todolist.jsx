import React, { useState, useEffect } from "react";

const blankTask = {label: "", done: false,}

const urlBase = "http://assets.breatheco.de/apis/fake/todos/user"

const TodoList = () => {

   

    const [task, setTask] = useState(blankTask);

    const [allTask, setAllTask] = useState([]);

    const handleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value,
        })
    };

    const getTask = async () => {
        try {
            let response = await fetch(`${urlBase}/lizu`)
            let data = await response.json()
            if (response.status == "404") {
                createUser()
            }
            else if (response.ok) {
                setAllTask(data)
            }
            else{
                console.log("reza");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const createUser = async () => {
        try {
            let response = await fetch(`${urlBase}/lizu`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([]),
            })
        } catch (error) {
            console.log(error);
        }
    }


    const addTask = async ({key}) => {
        if (key == "Enter") {
            if (task.label.trim() !== "") {
                try {
                    let response = await fetch(`${urlBase}/lizu`, {
                        method: "PUT",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify([...allTask, task]),
                    });
                    if (response.ok) {
                        getTask()
                        setTask(blankTask);
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        }
    };

    const deleteTask = async (id) => {
        let newAllTask = allTask.filter((task, index) => id != index) 
        try {
            let response = await fetch(`${urlBase}/lizu`, {
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(newAllTask),
            });
            if (response.ok) {
                getTask()
            }
        } catch (error) {
            console.log(error);
        }
        
        setAllTask(newAllTask);
        
        console.log(newAllTask);
    };

    useEffect(()=>{
        getTask()
    }, [])

	return (

        <div className="container text-primary text-opacity-50 mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-7">
                    <h1 className="text-center fw-lighter">TodoList</h1>
                     <div className="todo-list shadow">
                            <input
                                className="form-control mb-2 fs-4 fw-lighter border border-0 fst-italic"
                                placeholder="What needs to be done?"
                                name="label"
                                value={task.label}
                                onChange={handleChange} 
                                onKeyDown={addTask}/>
                            <div className="taskList">
                                {allTask.map((task, index) => {
                                    return <div key={index} className="fw-light fs-4 text-secondary p-1 m-1 border-top mx-4" onClick={()=>deleteTask(index)}>
                                        {task.label}</div>;
                                })}
                                <p className="fw-light fs-4 text-secondary p-1 m-1 border-top">{`${allTask.length} items left`}</p>
                           </div>
                    </div>
                </div>
            </div>
        </div>
            
        
	);
};

export default TodoList;

{/* <form onSubmit={handleSubmit}>
    <input
        type="text"
        className=""
        placeholder="What needs to be done?"
        value={task}
        onChange={e => setTask(e.target.value)} />
</form></> */}
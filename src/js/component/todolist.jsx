import React, { useState } from "react";

const blankTask = {label: "", done: false,}

const TodoList = () => {

   

    const [task, setTask] = useState(blankTask);

    const [allTask, setAllTask] = useState([{label: "llorar", done: false,},{label: "si", done: false,}]);

    const handleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value,
        })
    };

    const addTask = ({key}) => {
        if (key == "Enter") {
            if (task.label.trim() !== "") {
                setAllTask([
                    ...allTask,
                    task
                ])
                
                setTask(blankTask)
                


            }
        }
    };

    const deleteTask = (id) => {

        let newAllTask = allTask.filter((task, index) => id != index) 

        setAllTask(newAllTask);
        
        console.log(newAllTask);
    };

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
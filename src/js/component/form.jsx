
import React, { useState } from "react";

const Form = () => {

    const [task, setTask] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        console.log(task);
        setTask("");
      };

	return (
    <><h1>TodoList</h1>
        <form onSubmit={handleSubmit}>
            <div className="todo-list">
                <input
                    type="text"
                    className=""
                    placeholder="What needs to be done?"
                    value={task}
                    onChange={e => setTask(e.target.value)} />
            </div>
        </form></>
        
	);
};

export default Form;



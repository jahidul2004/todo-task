import { FaEdit } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgressHelp } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CgMenuRound } from "react-icons/cg";

const Task = ({ task, moveTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className={`border border-[#ff676734] text-left shadow-md p-2 rounded grid grid-cols-7 bg-white ${isDragging ? "opacity-50" : ""}`}>
            <div className="col-span-6">
                <h1 className="font-bold text-[#ff6867]">{task.title}</h1>
                <p className="text-sm">{task.description}</p>
                <p className="text-[#ff6867] text-sm">{task.timestamp}</p>
            </div>
            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867]">
                <FaEdit title="Edit" />
                <TbProgressHelp title="Make Progress" onClick={() => moveTask(task.id, "inProgress")} />
                <IoCheckmarkDoneCircleOutline title="Make Completed" onClick={() => moveTask(task.id, "done")} />
                <TiDeleteOutline title="Delete" />
            </div>
        </div>
    );
};

const Column = ({ title, tasks, moveTask }) => {
    const [, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => moveTask(item.id, title),
    }));

    return (
        <div ref={drop} className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2">{title}</h2>
            <div className="space-y-3">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} moveTask={moveTask} />
                ))}
            </div>
        </div>
    );
};

const WorkArea = () => {
    const { user } = useAuth();
    console.log(user);
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Hello I am Jahidul Islam Jihad. A fullstack web developer.", timestamp: "01.02.2025", category: "To Do" },
        { id: 2, title: "Task 2", description: "What is Your name. My name is Jahidul Islam Jihad. And I am a CSE student.", timestamp: "02.02.2025", category: "In Progress" },
        { id: 3, title: "Task 3", description: "Who are you? Are you mad? said Sumaiya to his Only one best friend.", timestamp: "03.02.2025", category: "Done" },
        { id: 4, title: "Task 4", description: "Who are you? Are you mad? said Sumaiya to his Only one best friend.", timestamp: "03.02.2025", category: "Done" },
        { id: 5, title: "Task 5", description: "Who are you? Are you mad? said Sumaiya to his Only one best friend.", timestamp: "03.02.2025", category: "Done" },
    ]);

    const moveTask = (taskId, newCategory) => {
        setTasks((prevTasks) => prevTasks.map((task) => task.id === taskId ? { ...task, category: newCategory } : task));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="md:min-h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center p-4">
                <div className="my-2 flex flex-col items-center gap-2">
                    <img className="w-[60px] h-[60px] border-2 border-white rounded-full p-1" src={user?.photoURL
                    } alt="" />
                    <h1 className="font-bold text-white">Welcome, {user?.displayName}</h1>

                    <button className="btn text-[#ff6867] shadow-none border-none">LogOut</button>
                </div>
                <h1 className="text-3xl font-bold text-white mb-6">Your Tasks</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    <Column title="⚒️To Do" tasks={tasks.filter(task => task.category === "To Do")} moveTask={moveTask} />
                    <Column title="🔃In Progress" tasks={tasks.filter(task => task.category === "In Progress")} moveTask={moveTask} />
                    <Column title="✅Done" tasks={tasks.filter(task => task.category === "Done")} moveTask={moveTask} />
                </div>
            </div>
        </DndProvider>
    );
};

export default WorkArea;

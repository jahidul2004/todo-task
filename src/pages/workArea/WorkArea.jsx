import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgressHelp } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Task = ({ task, moveTask, handleDeleteTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task?._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`border border-[#ff676734] text-left shadow-md p-2 rounded grid grid-cols-7 bg-[#e6e1e15d] ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            <div className="col-span-6">
                <h1 className="font-bold text-[#ff6867]">{task?.title}</h1>
                <p className="text-sm">{task?.description}</p>
                <p className="text-[#ff6867] text-sm">{task?.timestamp}</p>
            </div>
            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867] gap-1">
                <FaEdit size={20} title="Edit" />
                <TbProgressHelp
                    size={20}
                    title="Make Progress"
                    onClick={() => moveTask(task?._id, "In Progress")}
                />
                <IoCheckmarkDoneCircleOutline
                    size={20}
                    title="Make Completed"
                    onClick={() => moveTask(task?._id, "Done")}
                />
                <TiDeleteOutline
                    size={20}
                    title="Delete"
                    onClick={() => handleDeleteTask(task?._id)}
                />
            </div>
        </div>
    );
};

const Column = ({ title, tasks, moveTask, handleDeleteTask }) => {
    const [, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => moveTask(item.id, title),
    }));

    return (
        <div
            ref={drop}
            className="bg-gradient-to-tl from-[#ff6867] to-[#fff] bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[500px]"
        >
            <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2">
                {title}
            </h2>

            <div className="space-y-3">
                {tasks?.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        moveTask={moveTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

const WorkArea = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        category: "To Do",
        timestamp: new Date().toISOString(),
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/task/${user?.email}`)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error("Error fetching tasks:", error));
    }, [user?.email, tasks]);

    const moveTask = async (taskId, newCategory) => {
        console.log(`Moving task ${taskId} to ${newCategory}`);

        try {
            const response = await fetch(
                `http://localhost:3000/task/${taskId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ category: newCategory }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log("Task updated successfully:", data);

                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task?._id === taskId
                            ? { ...task, category: newCategory }
                            : task
                    )
                );
            } else {
                console.error("Error updating task:", data.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleNewTaskChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleAddTask = async () => {
        if (!newTask.title || !newTask.description) {
            setError("Title and description are required.");
            return;
        }

        setError("");

        try {
            const response = await fetch("http://localhost:3000/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newTask,
                    email: user?.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setTasks((prevTasks) => [...prevTasks, data]);
                setModalOpen(false);
            } else {
                console.error("Error adding task:", data.message);
                setError("Failed to add task.");
            }
        } catch (error) {
            console.error("Error adding task:", error);
            setError("An error occurred while adding the task.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await fetch(
                `http://localhost:3000/task/${taskId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (response.ok) {
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task._id !== taskId)
                );
                Swal.fire({
                    icon: "success",
                    title: "Task Deleted Successfully",
                    confirmButtonText: "Okay",
                    confirmButtonColor: "#ff6867",
                });
            } else {
                console.error("Error deleting task:", data.message);
                setError("Failed to delete task.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            setError("An error occurred while deleting the task.");
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="md:min-h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center p-4">
                <div className="my-2 flex flex-col items-center gap-2">
                    <img
                        className="w-[60px] h-[60px] border-2 border-white rounded-full p-1"
                        src={user?.photoURL}
                        alt=""
                    />
                    <h1 className="font-bold text-white">
                        Welcome, {user?.displayName}
                    </h1>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={logout}
                            className="btn text-[#ff6867] shadow-none border-none"
                        >
                            LogOut
                        </button>
                        <button
                            className="btn text-[#ff6867] shadow-none border-none"
                            onClick={() => setModalOpen(true)}
                        >
                            Add New Task
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 bg-gradient-to-tl from-[#ff6867] to-[#fff] bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl w-80">
                            <h3 className="text-lg font-semibold mb-4">
                                Add New Task
                            </h3>
                            {error && <p className="text-red-500">{error}</p>}
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newTask.title}
                                onChange={handleNewTaskChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newTask.description}
                                onChange={handleNewTaskChange}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <button
                                onClick={handleAddTask}
                                className="w-full bg-[#ff6867] text-white p-2 rounded"
                            >
                                Add Task
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-full mt-2 p-2 text-[#ff6867] border border-[#ff6867] rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <h1 className="text-3xl font-bold text-white mb-6">
                    Your Tasks
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    <Column
                        title="To Do"
                        tasks={tasks?.filter(
                            (task) => task.category === "To Do"
                        )}
                        moveTask={moveTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                    <Column
                        title="In Progress"
                        tasks={tasks?.filter(
                            (task) => task.category === "In Progress"
                        )}
                        moveTask={moveTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                    <Column
                        title="Done"
                        tasks={tasks?.filter(
                            (task) => task.category === "Done"
                        )}
                        moveTask={moveTask}
                        handleDeleteTask={handleDeleteTask}
                    />
                </div>
            </div>
        </DndProvider>
    );
};

export default WorkArea;

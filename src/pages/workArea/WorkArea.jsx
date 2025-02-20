import { FaEdit } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgressHelp } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";

const WorkArea = () => {
    return (
        <div className="md:min-h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-3xl font-bold text-white mb-6">Your Tasks</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {/* Todo Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[500px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><FaArrowsToDot />To Do</h2>
                        <button className="btn btn-sm bg-[#ff6867] text-white border-none shadow-none">Add New</button>
                    </div>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}

                        <div title="Darg me to re order" className="text-left shadow-md p-2 rounded grid grid-cols-7">
                            <div className="col-span-6">
                                <h1 className="font-bold text-[#ff6867]">Title is here</h1>
                                <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, minima!</p>
                                <p className="text-[#ff6867] text-sm">01.02.2025</p>
                            </div>
                            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867]">
                                <FaEdit title="Edit" />
                                <TbProgressHelp title="Make Progress" />
                                <IoCheckmarkDoneCircleOutline title="Make Completed" />
                                <TiDeleteOutline title="Delete" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* In Progress Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[500px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><TbProgressHelp />In Progress</h2>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}
                        <div title="Darg me to re order" className="text-left shadow-md p-2 rounded grid grid-cols-7">
                            <div className="col-span-6">
                                <h1 className="font-bold text-[#ff6867]">Title is here</h1>
                                <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, minima!</p>
                                <p className="text-[#ff6867] text-sm">01.02.2025</p>
                            </div>
                            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867]">
                                <FaEdit title="Edit" />
                                <TbProgressHelp title="Make Progress" />
                                <IoCheckmarkDoneCircleOutline title="Make Completed" />
                                <TiDeleteOutline title="Delete" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Done Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[500px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><IoCheckmarkDoneCircleOutline />Done</h2>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}
                        <div title="Darg me to re order" className="text-left shadow-md p-2 rounded grid grid-cols-7">
                            <div className="col-span-6">
                                <h1 className="font-bold text-[#ff6867]">Title is here</h1>
                                <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, minima!</p>
                                <p className="text-[#ff6867] text-sm">01.02.2025</p>
                            </div>
                            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867]">
                                <FaEdit title="Edit" />
                                <TbProgressHelp title="Make Progress" />
                                <IoCheckmarkDoneCircleOutline title="Make Completed" />
                                <TiDeleteOutline title="Delete" />
                            </div>
                        </div>
                        <div title="Darg me to re order" className="text-left shadow-md p-2 rounded grid grid-cols-7">
                            <div className="col-span-6">
                                <h1 className="font-bold text-[#ff6867]">Title is here</h1>
                                <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, minima!</p>
                                <p className="text-[#ff6867] text-sm">01.02.2025</p>
                            </div>
                            <div className="col-span-1 text-lg flex flex-col justify-between items-center text-[#ff6867]">
                                <FaEdit title="Edit" />
                                <TbProgressHelp title="Make Progress" />
                                <IoCheckmarkDoneCircleOutline title="Make Completed" />
                                <TiDeleteOutline title="Delete" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkArea;

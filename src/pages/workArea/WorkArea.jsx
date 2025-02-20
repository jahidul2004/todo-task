import { FaArrowsToDot } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { TbProgressHelp } from "react-icons/tb";

const WorkArea = () => {
    return (
        <div className="md:h-screen bg-gradient-to-br from-[#ff6867] flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-3xl font-bold text-white mb-6">Your Tasks</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {/* Todo Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[400px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><FaArrowsToDot />To Do</h2>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}
                    </div>
                </div>

                {/* In Progress Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[400px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><TbProgressHelp />In Progress</h2>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}
                    </div>
                </div>

                {/* Done Section */}
                <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-black min-h-[400px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#ff6867] text-left flex items-center gap-2"><IoCheckmarkDoneCircleOutline />Done</h2>
                    <div className="space-y-3">
                        {/* Task items will be mapped here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkArea;

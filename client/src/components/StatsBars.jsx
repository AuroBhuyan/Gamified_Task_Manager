import React from "react";

function StatsBars(){
    return(
        <div className="space-y-2 p-2">
            <div className="w-full bg-gray-300 h-4">
                <div className="bg-green-500 h-4 w-2/3"></div>
            </div>
            <div className="w-full bg-gray-300 h-4">
                <div className="bg-green-500 h-4 w-2/3"></div>
            </div>
            <div className="w-full bg-gray-300 h-4">
                <div className="bg-green-500 h-4 w-2/3"></div>
            </div>
        </div>
    );
}

export default StatsBars;
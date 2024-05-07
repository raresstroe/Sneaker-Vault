import React from "react";

export default function Content({ children }) {
    return (
        <div className="py-1">
            <div className="max-w-10xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg my-2">
                    <div className="p-4 text-gray-900">{children}</div>
                </div>
            </div>
        </div>
    );
}

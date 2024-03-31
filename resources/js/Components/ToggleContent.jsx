import React, { useState } from "react";

export default function ToggleContent({
    title,
    content,
    maxHeight,
    otherClass,
}) {
    const [show, setShow] = useState(false);

    return (
        <div className={`toggle-content-item ${otherClass}`}>
            <li
                onClick={() => setShow(!show)}
                className="toggle-content-title no-select"
                dangerouslySetInnerHTML={{ __html: title }}
            ></li>
            <div
                style={{
                    maxHeight: show ? maxHeight : "0px",
                }}
                className={`toggle-content ${show ? "open" : ""}`}
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        </div>
    );
}

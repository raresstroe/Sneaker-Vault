import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor(props) {
    const handleEditorChange = (content, editor) => {
        props.onChange(content);
    };

    return (
        <Editor
            apiKey="9kku8jetc1tdm269apyrpfd7070c8ejzpaawy86xdaikiqw0"
            init={{
                plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            value={props.value}
            onEditorChange={handleEditorChange}
        />
    );
}

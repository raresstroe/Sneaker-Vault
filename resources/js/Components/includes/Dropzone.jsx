import React, { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

export default function Dropzone(props) {
    useEffect(() => {
        fetch("/restore");
    }, []);

    return (
        <FilePond
            allowMultiple={true}
            maxFiles={props.maxFiles}
            name={props.name}
            acceptedFileTypes={[
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
                "image/mp4",
            ]}
            maxFileSize="20MB"
            maxParallelUploads={3}
            labelIdle={props.labelIdle}
            labelInvalidField="Fisierul nu este valid"
            labelFileWaitingForSize="Se calculeaza dimensiunea"
            labelFileSizeNotAvailable="Dimensiunea nu este disponibila"
            labelFileLoading="Se incarca"
            labelFileLoadError="Eroare la incarcare"
            labelFileProcessing="Se proceseaza"
            labelFileProcessingComplete="Procesare completa"
            labelFileProcessingAborted="Procesare anulata"
            labelFileProcessingError="Eroare la procesare"
            labelFileRemoveError="Eroare la stergere"
            labelTapToCancel="Apasa pentru a anula"
            labelTapToRetry="Apasa pentru a reincerca"
            labelTapToUndo="Apasa pentru a sterge"
            labelButtonRemoveItem="Sterge"
            labelButtonAbortItemLoad="Anuleaza"
            labelButtonRetryItemLoad="Reincearca"
            labelButtonAbortItemProcessing="Anuleaza"
            labelButtonUndoItemProcessing="Sterge"
            labelButtonRetryItemProcessing="Reincearca"
            labelButtonProcessItem="Incarca"
            server={{
                process: "/upload",
                restore: "/restore",
                revert: "/delete",
                load: "/load",
                remove: "/remove",
                headers: {
                    "X-CSRF-TOKEN": document.head.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
            }}
        />
    );
}

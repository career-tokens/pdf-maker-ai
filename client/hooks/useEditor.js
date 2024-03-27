import { useRef } from "react";

export default function useEditor(setFinalCode) {
    const editorRef = useRef(null);
    function handleChangeInEditor() {
        console.log(editorRef.current?.getValue())
        setFinalCode(editorRef.current?.getValue())
    }

  function handleMount(editor) {
    editorRef.current = editor;
    editorRef.current.onDidChangeModelContent(handleChangeInEditor);
    }
    
    return handleMount;
}
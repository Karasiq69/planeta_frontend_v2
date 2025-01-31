import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {AutosizeTextarea, AutosizeTextAreaRef} from "@/components/ui/autosize-textarea";

interface EditableTextAreaProps {
    initialText: string;
    onSubmit: (text: string) => void;
    title?: string
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({
                                                               initialText,
                                                               onSubmit,
                                                               title = "Добавить"
                                                           }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const textareaRef = useRef<AutosizeTextAreaRef>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.textArea.focus();
        }
    }, [isEditing]);

    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (text === initialText) return;
        onSubmit(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
    };

    if (isEditing) {
        return (
            <AutosizeTextarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    }

    if (!initialText) {
        return (
            <Button onClick={handleTextClick} variant={"secondary"} size={"default"} className={'gap-2'}>
                <PlusCircle size={14}/> {title}
            </Button>
        )
    }

    return (
        <p
            onClick={handleTextClick}
            className="
        cursor-pointer
        hover:border
        text-sm
        transition-all
        duration-200
        hover:bg-background
        hover:shadow-[inset_0_0_23px_1px_rgba(4,4,0,0)]
        rounded-md
        hover:p-3
      "
        >
            {text}
        </p>
    );
};
export default EditableTextArea;

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    FileText,
    Undo,
    Redo,
} from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import MessageHelper from "./MessageHelper";

interface IProps {
    onChange?: (_value: any) => void;
    isHeader?: boolean;
    field?: any;
    helper?: string;
    required?: boolean;
    label?: string;
    className?: string;
}
export default function TextEditor({
    onChange,
    isHeader = false,
    field,
    helper,
    label,
    className,
    required = false,
}: IProps) {
    const [content, setContent] = useState(field?.value ?? "");
    const [fileName, setFileName] = useState("Untitled Document");
    const [fontSize, setFontSize] = useState("16");
    const [fontFamily, setFontFamily] = useState("Arial");
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [history, setHistory] = useState<string[]>([""]);
    const [historyIndex, setHistoryIndex] = useState(0);

    const editorRef = useRef<HTMLDivElement>(null);

    const placeCaretAtEnd = (el: HTMLElement) => {
        if (!el) return;
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    useEffect(() => {
        const text = content.replace(/<[^>]*>/g, "");
        setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
        setCharCount(text.length);
    }, [content]);

    useEffect(() => {
        if (editorRef.current && field?.value !== undefined) {
            editorRef.current.innerHTML = field.value;
            setContent(field.value);
            setHistory([field.value]);
            setHistoryIndex(0);
            placeCaretAtEnd(editorRef.current);
        }
    }, [field?.value]);

    const handleContentChange = useCallback(() => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            onChange?.(newContent);
            field?.onChange?.(newContent);
            if (newContent !== history[historyIndex]) {
                const newHistory = history.slice(0, historyIndex + 1);
                newHistory.push(newContent);
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            }
        }
    }, [field, history, historyIndex, onChange]);

    const formatText = (command: string, value?: string) => {
        if (command === "fontSize") {
            document.execCommand("styleWithCSS", true);
            document.execCommand("fontSize", false, "7");

            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
                const fontElements =
                    editorRef.current?.querySelectorAll("font[size='7']");
                fontElements?.forEach(el => {
                    const span = document.createElement("span");
                    span.style.fontSize = `${value}px`;
                    span.innerHTML = el.innerHTML;
                    el.replaceWith(span);
                });
            }
        } else {
            document.execCommand(command, false, value);
        }

        placeCaretAtEnd(editorRef.current!);
        editorRef.current?.focus();
        handleContentChange();
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const previousContent = history[newIndex];
            setContent(previousContent);
            if (editorRef.current) {
                editorRef.current.innerHTML = previousContent;
                placeCaretAtEnd(editorRef.current);
            }
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextContent = history[newIndex];
            setContent(nextContent);
            if (editorRef.current) {
                editorRef.current.innerHTML = nextContent;
                placeCaretAtEnd(editorRef.current);
            }
        }
    };

    return (
        <div className="w-full">
            <FormLabel className="relative flex pb-[4px]">
                {label}
                {required ? (
                    <span className="text-red-600 text-[16px] pl-0.5 p-0 m-0">
                        *
                    </span>
                ) : null}
                {helper ? (
                    <div className="pl-1">
                        <MessageHelper helper={helper} />
                    </div>
                ) : null}
            </FormLabel>
            {/* Header */}
            {isHeader && (
                <Card className="mb-2">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                <Input
                                    value={fileName}
                                    onChange={e => setFileName(e.target.value)}
                                    className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0"
                                />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {wordCount} words • {charCount} characters
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            )}
            {/* Toolbar */}

            {/* Editor */}

            <Card className={`${className ?? "min-h-[500px]"} p-2`}>
                <Card>
                    <CardContent className="p-3">
                        <div className="flex flex-wrap items-center gap-2">
                            {/* File operations */}

                            {/* History */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={undo}
                                disabled={historyIndex <= 0}
                            >
                                <Undo className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={redo}
                                disabled={historyIndex >= history.length - 1}
                            >
                                <Redo className="h-4 w-4" />
                            </Button>

                            <Separator orientation="vertical" className="h-6" />

                            {/* Font controls */}
                            <Select
                                value={fontFamily}
                                onValueChange={value => {
                                    setFontFamily(value);
                                    formatText("fontName", value);
                                }}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Arial">Arial</SelectItem>
                                    <SelectItem value="Georgia">
                                        Georgia
                                    </SelectItem>
                                    <SelectItem value="Times New Roman">
                                        Times New Roman
                                    </SelectItem>
                                    <SelectItem value="Courier New">
                                        Courier New
                                    </SelectItem>
                                    <SelectItem value="Verdana">
                                        Verdana
                                    </SelectItem>
                                    <SelectItem value="Khmer OS">
                                        Khmer OS
                                    </SelectItem>
                                    <SelectItem value="Khmer UI">
                                        Khmer UI
                                    </SelectItem>
                                    <SelectItem value="Khmer MN">
                                        Khmer MN
                                    </SelectItem>
                                    <SelectItem value="Battambang">
                                        Battambang
                                    </SelectItem>
                                    <SelectItem value="Dangrek">
                                        Dangrek
                                    </SelectItem>
                                    <SelectItem value="Koulen">
                                        Koulen
                                    </SelectItem>
                                    <SelectItem value="Siemreap">
                                        Siemreap
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={fontSize}
                                onValueChange={value => {
                                    setFontSize(value);
                                    formatText("fontSize", value);
                                }}
                            >
                                <SelectTrigger className="w-16">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="12">12</SelectItem>
                                    <SelectItem value="14">14</SelectItem>
                                    <SelectItem value="16">16</SelectItem>
                                    <SelectItem value="18">18</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="24">24</SelectItem>
                                    <SelectItem value="32">32</SelectItem>
                                    <SelectItem value="34">34</SelectItem>
                                    <SelectItem value="36">36</SelectItem>
                                    <SelectItem value="38">38</SelectItem>
                                    <SelectItem value="40">40</SelectItem>
                                </SelectContent>
                            </Select>

                            <Separator orientation="vertical" className="h-6" />

                            {/* Text formatting */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("bold")}
                            >
                                <Bold className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("italic")}
                            >
                                <Italic className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("underline")}
                            >
                                <Underline className="h-4 w-4" />
                            </Button>

                            <Separator orientation="vertical" className="h-6" />

                            {/* Text alignment */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("justifyLeft")}
                            >
                                <AlignLeft className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("justifyCenter")}
                            >
                                <AlignCenter className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => formatText("justifyRight")}
                            >
                                <AlignRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <CardContent className="p-0">
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleContentChange}
                        className="min-h-[100px] p-6 outline-none prose prose-sm max-w-none"
                        style={{
                            fontFamily: fontFamily,
                            fontSize: `${fontSize}px`,
                            lineHeight: "1.6",
                        }}
                        suppressContentEditableWarning={true}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

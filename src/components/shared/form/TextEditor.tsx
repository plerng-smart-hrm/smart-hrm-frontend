"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Palette,
} from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import MessageHelper from "./MessageHelper";

interface EditorState {
  content: string;
  wordCount: number;
  characterCount: number;
}

interface IProps {
  field?: any;
  helper?: string;
  label?: string;
  required?: boolean;
  onChange?: (_value: any) => void;
  className?: string;
}

export default function TextEditor({
  field,
  helper,
  label,
  required,
  onChange,
}: IProps) {
  const [editorState, setEditorState] = useState<EditorState>({
    content: "",
    wordCount: 0,
    characterCount: 0,
  });

  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16");
  const [fontFamily, setFontFamily] = useState("Arial");
  // const [activeFormats, setActiveFormats] = useState({
  //     bold: false,
  //     italic: false,
  //     underline: false,
  //     unorderedList: false,
  //     orderedList: false,
  // });

  const editorRef = useRef<HTMLDivElement>(null);

  // Update word and character count
  const updateCounts = useCallback(
    (content: string) => {
      const text = content.replace(/<[^>]*>/g, "").trim();
      const wordCount = text ? text.split(/\s+/).length : 0;
      const characterCount = text.length;

      setEditorState(prev => ({
        ...prev,
        content,
        wordCount,
        characterCount,
      }));
      onChange?.(content);
      field?.onChange?.(content);
    },
    [field, onChange],
  );

  // const updateActiveFormats = useCallback(() => {
  //     if (document.queryCommandState) {
  //         setActiveFormats({
  //             bold: document.queryCommandState("bold"),
  //             italic: document.queryCommandState("italic"),
  //             underline: document.queryCommandState("underline"),
  //             unorderedList: document.queryCommandState(
  //                 "insertUnorderedList",
  //             ), // Check unordered list state
  //             orderedList: document.queryCommandState("insertOrderedList"),
  //         });
  //     }
  // }, []);

  // Handle content change
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      updateCounts(content);
    }
  }, [updateCounts]);

  // Format text functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };

  // Apply styles to editor
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.color = textColor;
      editorRef.current.style.fontSize = `${fontSize}px`;
      editorRef.current.style.fontFamily = fontFamily;
    }
    if (editorRef.current && field?.value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = field?.value ?? "";
    }
  }, [field?.value, fontFamily, fontSize, textColor]);

  return (
    <div className="w-full mx-auto space-y-0">
      <FormLabel className="relative flex pb-[13px]">
        {label}
        {required ? (
          <span className="text-red-600 text-[16px] pl-0.5 p-0 m-0">*</span>
        ) : null}
        {helper ? (
          <div className="pl-1">
            <MessageHelper helper={helper} />
          </div>
        ) : null}
      </FormLabel>
      <Card>
        <CardContent className="space-y-4">
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 flex-wrap py-4">
            {/* Text Formatting */}
            <div className="flex items-center gap-1">
              <Button
                onClick={() => formatText("bold")}
                variant="outline"
                size="sm"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => formatText("italic")}
                variant="outline"
                size="sm"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => formatText("underline")}
                variant="outline"
                size="sm"
              >
                <Underline className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Alignment */}
            <div className="flex items-center gap-1">
              <Button
                onClick={() => formatText("justifyLeft")}
                variant="outline"
                size="sm"
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => formatText("justifyCenter")}
                variant="outline"
                size="sm"
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => formatText("justifyRight")}
                variant="outline"
                size="sm"
              >
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Lists */}
            {/* <div className="flex items-center gap-1">
                            <Button
                                onClick={() =>
                                    formatText("insertUnorderedList")
                                }
                                variant={
                                    activeFormats.unorderedList
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                className={
                                    activeFormats.unorderedList
                                        ? "bg-blue-600 text-white"
                                        : ""
                                }
                            >
                                <List className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => formatText("insertOrderedList")}
                                variant={
                                    activeFormats.orderedList
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                className={
                                    activeFormats.orderedList
                                        ? "bg-blue-600 text-white"
                                        : ""
                                }
                            >
                                <ListOrdered className="w-4 h-4" />
                            </Button>
                        </div> */}

            <Separator orientation="vertical" className="h-6" />

            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <Button
                onClick={() => formatText("undo")}
                variant="outline"
                size="sm"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => formatText("redo")}
                variant="outline"
                size="sm"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Font Controls */}
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Times New Roman">
                    Times New Roman
                  </SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                  <SelectItem value="Khmer OS">Khmer OS</SelectItem>
                  <SelectItem value="Khmer UI">Khmer UI</SelectItem>
                  <SelectItem value="Khmer MN">Khmer MN</SelectItem>
                  <SelectItem value="Battambang">Battambang</SelectItem>
                  <SelectItem value="Dangrek">Dangrek</SelectItem>
                  <SelectItem value="Koulen">Koulen</SelectItem>
                  <SelectItem value="Siemreap">Siemreap</SelectItem>
                </SelectContent>
              </SelectContent>
            </Select>

            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
                <SelectItem value="20">20px</SelectItem>
                <SelectItem value="24">24px</SelectItem>
                <SelectItem value="32">32px</SelectItem>
              </SelectContent>
            </Select>

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <input
                type="color"
                value={textColor}
                onChange={e => {
                  const newColor = e.target.value;
                  setTextColor(newColor);
                  formatText("foreColor", newColor);
                }}
                className="w-8 h-8 rounded border cursor-pointer"
              />
            </div>
          </div>

          <Separator />

          {/* Editor Area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleContentChange}
            className="min-h-[200px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            style={{
              lineHeight: "1.6",
            }}
            suppressContentEditableWarning={true}
            // placeholder={"Start typing your document here..." as any}
          />

          {/* Status Bar */}
          <div className="flex justify-between items-center text-sm text-muted-foreground bg-muted p-2 rounded">
            <div className="flex gap-4">
              <span>Words: {editorState.wordCount}</span>
              <span>Characters: {editorState.characterCount}</span>
            </div>
            <div>
              Font: {fontFamily} | Size: {fontSize}px
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

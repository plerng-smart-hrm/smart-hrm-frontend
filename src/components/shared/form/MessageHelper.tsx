import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { MessageCircleQuestion } from "lucide-react";

interface IProps {
    helper?: string;
}

const MessageHelper = ({ helper }: IProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <MessageCircleQuestion
                    size={14}
                    className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 hover:text-blue-600"
                />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] p-2 rounded-sm bg-white text-black dark:bg-gray-200 dark:text-gray-800 shadow-md">
                <p className="text-[12px]">{helper}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default MessageHelper;

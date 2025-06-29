import React from "react";
import { BiMailSend } from "react-icons/bi";
import { FormModalProps } from "@/types/types";
import { useTheme } from "@/contexts/ThemeContext";

const FormModal = ({ onClick }: FormModalProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`
        fixed bottom-4 right-5 flex justify-center items-center gap-x-[5px] 
        px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer 
        max-[750px]:w-12 max-[750px]:h-12 max-[750px]:p-0 max-[750px]:rounded-full 
        max-[750px]:text-2xl max-[750px]:gap-0
        ${
          isDarkMode
            ? "text-white bg-[#392849] hover:bg-[#403358] report_dark"
            : "text-gray-900 bg-gray-300 hover:bg-gray-400 report_light"
        }
      `}
    >
      <BiMailSend />
      <span className="max-[750px]:hidden">Report a Bug</span>
    </div>
  );
};

export default FormModal;

"use client";

import { FaTimes } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";

interface ModalProps {
  open: boolean;
  onClose: () => unknown;
}

export default function NewManuscriptModal({ open, onClose }: ModalProps) {
  return (
    <div
      className={`flex items-center justify-center fixed inset-0
        transition-color ${open ? "visible bg-black/30" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded w-[20rem] shadow transition-all
            duration-300 ease-in-out ${
              open ? "scale-100 opacity-100" : "scale-125 opacity-0"
            }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-2 pt-3 
        pb-1 border-b font-semibold"
        >
          <p className="text-[#178e79]">Upload Manuscript</p>
          <div
            className="p-1 text-red-500 hover:bg-red-500 
          hover:text-white cursor-pointer rounded transition-all duration-500 ease-in-out"
          >
            <FaTimes onClick={onClose} />
          </div>
        </div>

        <form className="w-full p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="topic" className="font-semibold">
              Manuscript Title
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              className="border rounded outline-none p-1"
              required
              placeholder="Enter Project Topic"
            />

            <div className="bg-slate-200 flex flex-col items-center justify-center rounded">
              <input type="file" id="file" hidden />
              <SlCloudUpload
                className="text-9xl p-3 cursor-pointer active:text-[#178e79]"
                // onClick={() => document.querySelector("#file").click()}
              />
              <p className="font-semibold mb-4">
                Click here to upload manuscript
              </p>
            </div>
          </div>

          <button
            className="bg-[#1b9c85] text-white font-semibold uppercase w-full p-2 
          rounded hover:bg-[#178e79] transition-all duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

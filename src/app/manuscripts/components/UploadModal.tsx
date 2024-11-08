"use client";

import { uploadManuscriptAction } from "@src/app/api/manuscripts";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";

interface ModalProps {
  open: boolean;
  onClose: () => unknown;
}

export default function Modal({ open, onClose }: ModalProps) {
  const defaultDisplay = "Select document to upload";
  const [manuscriptTitle, setManuscriptTitle] = useState("");
  const [displayFileName, setDisplayFileName] = useState(defaultDisplay);

  const uploadManuscript = async (files: FileList) => {
    if (files.length > 1) {
      alert("Only one file is allowed");
      return;
    }

    if (!manuscriptTitle) {
      alert("Manuscript title is required");
      return;
    }

    const file = files[0];
    if (file) {
      try {
        await uploadManuscriptAction(file, manuscriptTitle || file.name);
        alert("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file");
      }
    } else {
      alert("No file selected");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.querySelector("#upload-file") as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      await uploadManuscript(input.files);
    } else {
      alert("No file selected");
    }
  };

  return (
    <div
      className={`flex items-center justify-center fixed inset-0
        transition-color ${open ? "visible bg-black/30" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-md transition-all
        duration-300 ease-in-out ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          } max-w-full sm:min-w-[500px] mx-4 sm:mx-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-4 border-b font-semibold"
        >
          <p className="text-[#178e79]">Upload Manuscript</p>
          <div
            className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer rounded transition-all duration-500 ease-in-out transform hover:scale-110"
          >
            <FaTimes onClick={onClose} />
          </div>
        </div>

        <form className="w-full px-4 py-8 flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-500">
              Title
            </label>
            <input
              type="text"
              name="manuscript-title"
              id="manuscript-title"
              value={manuscriptTitle}
              onChange={(e) => setManuscriptTitle(e.target.value)}
              className="border rounded outline-none p-3"
              required
              placeholder="Enter Manuscript Title"
            />
          </div>

          <label
            htmlFor="upload-file"
            className="flex flex-col gap-2 cursor-pointer"
          >
            <p className="text-gray-500">Document</p>
            <div className="flex gap-4 justify-between items-center w-full p-4 border border-2 border-dashed rounded">
              <div className="flex gap-4">
                <div className="h-12 w-12 p-3 border rounded">
                  <SlCloudUpload className="h-full w-full text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold max-w-[18rem] text-gray-500">{displayFileName}</p>
                  <p className="text-gray-400">.docx</p>
                </div>
              </div>
              <p className="text-[#1b9c85] cursor-pointer font-semibold">Browse file</p>
              <input type="file" id="upload-file" hidden onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  setDisplayFileName(files[0].name);
                }
              }} />
            </div>
          </label>

          <button
            type="submit"
            className="bg-[#1b9c85] text-white font-semibold uppercase w-full p-4 rounded-md hover:bg-[#178e79] transition-all duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

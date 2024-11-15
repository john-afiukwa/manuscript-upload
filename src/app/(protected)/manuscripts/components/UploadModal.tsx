"use client";

import { useToast } from "@/hooks/use-toast";
import { uploadManuscriptAction } from "@src/app/api/manuscripts";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";

interface ModalProps {
  open: boolean;
  closeModalAction: () => unknown;
}

export default function Modal({ open, closeModalAction }: ModalProps) {
  const defaultDisplay = "Select document to upload";
  const { toast } = useToast()
  const [manuscriptTitle, setManuscriptTitle] = useState("");
  const [displayFileName, setDisplayFileName] = useState(defaultDisplay);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const input = document.querySelector("#upload-file") as HTMLInputElement;
      const files = input.files || [];

      if (files.length === 0) {
        setError("No file selected");
        setLoading(false);
        return;
      }

      if (files.length > 1) {
        setError("Only one file is allowed");
        setLoading(false);
        return;
      }

      if (!manuscriptTitle) {
        setError("Manuscript title is required");
        setLoading(false);
        return;
      }

      const file = files[0];

      if (!(file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        setError("Only Word documents are allowed");
        setLoading(false);
        return;
      }

      await uploadManuscriptAction(file, manuscriptTitle || file.name);
      toast({
        title: "Manuscript uploaded",
        description: "Your manuscript has been uploaded successfully",
        variant: "success",
      });
      closeModalAction();
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      setError("An error occurred. Please try again");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      })
      // closeModalAction();
    }
  };

  return (
    <div
      className={`flex z-10 items-center justify-center fixed inset-0
        transition-color ${open ? "visible bg-black/30" : "invisible"}`}
      onClick={closeModalAction}
    >
      <div
        className={`bg-white rounded-lg shadow-md transition-all
        duration-300 ease-in-out ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          } max-w-[500px] sm:min-w-[500px] mx-4 sm:mx-0`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-4 border-b font-semibold"
        >
          <p className="text-[#178e79]">Upload Manuscript</p>
          <div
            className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer rounded transition-all duration-500 ease-in-out transform hover:scale-110"
          >
            <FaTimes onClick={closeModalAction} />
          </div>
        </div>

        <form className="w-full px-4 py-8 flex flex-col gap-8" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center text-wrap truncate">{error}</p>}

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
                setError(null);
                const files = e.target.files;
                if (files && files[0]) {
                  const fileName = files[0].name;
                  const truncatedFileName = fileName.length > 20 ? fileName.substring(0, 30) + "..." : fileName;
                  setDisplayFileName(truncatedFileName);
                }
              }} />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1b9c85] text-white font-semibold uppercase w-full p-4 rounded-md hover:bg-[#178e79] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

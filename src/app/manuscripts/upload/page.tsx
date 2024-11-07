"use client"

import { uploadManuscriptAction } from "@src/app/api/manuscripts";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdDocument } from "react-icons/io";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";

export default function Page() { 
  const uploadInfo = "No file selected";
  const [displayFileName, setDisplayFileName] = useState(uploadInfo);

  const uploadManuscript = async (files: FileList) => {
    if (files.length > 1) {
      alert("Only one file is allowed");
      return;
    }

    const file = files[0];
    if (file) {
      try {
        await uploadManuscriptAction(file, file.name);
        alert("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file");
      }
    } else {
      alert("No file selected");
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div
          className="bg-white flex flex-col items-center justify-center 
        gap-4 md:gap-0 p-2 py-10 w-[80%] h-1/2 sm:w-[70%] md:w-[60%] md:grid md:grid-cols-2 rounded-xl"
        >
          <form
            className="flex flex-col items-center justify-center
        px-10 py-5 border-dashed border-2 border-[#1b9c85] rounded-xl"
            onSubmit={async (e) => {
              e.preventDefault();
              const input = document.querySelector("#upload-file") as HTMLInputElement;
              if (input && input.files && input.files[0]) {
                await uploadManuscript(input.files);
              } else {
                alert("No file selected");
              }
            }}
          >
            <input
              type="file"
              id="upload-file"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files[0]) {
                  setDisplayFileName(files[0].name);
                }
              }}
              hidden
            />

            {displayFileName === uploadInfo ? (
              <section
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => (document.querySelector("#upload-file") as HTMLInputElement)?.click()}
              >
                <MdOutlineFileUpload className="text-6xl text-[#1b9c85]" />
                <button
                  type="button"
                  className="bg-[#1b9c85] font-semibold text-white py-1 px-4 rounded-2xl
            hover:bg-[#1b9c70] outline-none"
                >
                  Select file
                </button>
                <p className="mt-3 text-slate-300">Drop a file here</p>
              </section>
            ) : (
              <>
                <FaCheck className="text-6xl text-[#1b9c85]" />
                <p className="mt-3 text-slate-300">File Selected</p>
              </>
            )}

            <div className="w-full flex flex-col gap-4 items-center mt-4">
              <div className="w-full bg-[#f7f7f7] h-10 rounded flex items-center justify-between px-2">
                <div className="flex items-center gap-1">
                  {displayFileName !== uploadInfo ? (
                    <IoMdDocument className="text-[#1b9c85]" />
                  ) : null}
                  <p className="text-[14px]">{displayFileName}</p>
                </div>
                {displayFileName !== uploadInfo ? (
                  <MdDelete
                    className="text-red-400 cursor-pointer"
                    onClick={() => setDisplayFileName(uploadInfo)}
                  />
                ) : null}
              </div>

              <button
                type="submit"
                className="bg-[#1b9c85] hover:bg-[#1b9c70] px-4 py-1.5 
          rounded-xl text-white font-semibold outline-none"
              >
                Upload Manuscript
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
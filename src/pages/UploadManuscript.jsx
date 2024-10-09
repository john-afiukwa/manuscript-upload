import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa6";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const UploadManuscript = () => {
  const uploadInfo = "No file selected";
  const [displayFileName, setDisplayFileName] = useState(uploadInfo);

  const manuscriptCollectionRef = collection(db, "manuscripts");

  const currentDate = new Date();

  const uploadManuscript = async () => {
    if (displayFileName === uploadInfo) {
      alert("Please select a file");
    } else {
      try {
        await addDoc(manuscriptCollectionRef, {
          title: displayFileName,
          date: currentDate,
          published: false,
        });
        setDisplayFileName(uploadInfo);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div
          className="bg-white flex flex-col items-center justify-center 
            gap-4 md:gap-0 p-2 py-10 w-[80%] h-1/2 sm:w-[70%] md:w-[60%] md:grid md:grid-cols-2 rounded-xl"
        >
          <div className="flex justify-center items-center">
            <div
              className="flex flex-col items-center justify-center
                px-10 py-5 border-dashed border-2 border-[#1b9c85] rounded-xl"
            >
              <input
                type="file"
                id="upload-file"
                onChange={({ target: { files } }) => {
                  files[0] && setDisplayFileName(files[0].name);
                }}
                hidden
              />
              <div
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => document.querySelector("#upload-file").click()}
              >
                {displayFileName === uploadInfo ? (
                  <>
                    <MdIcons.MdOutlineFileUpload className="text-6xl text-[#1b9c85]" />
                    <button
                      className="bg-[#1b9c85] font-semibold text-white py-1 px-4 rounded-2xl
                hover:bg-[#1b9c70] outline-none"
                    >
                      Select file
                    </button>
                    <p className="mt-3 text-slate-300">Drop a file here</p>
                  </>
                ) : (
                  <>
                    <FaIcons.FaCheck className="text-6xl text-[#1b9c85]" />
                    <p className="mt-3 text-slate-300">File Selected</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            <div className="w-full bg-[#f7f7f7] h-10 rounded flex items-center justify-between px-2">
              <div className="flex items-center gap-1">
                {displayFileName !== uploadInfo ? (
                  <IoIcons.IoMdDocument className="text-[#1b9c85]" />
                ) : null}
                <p className="text-[14px]">{displayFileName}</p>
              </div>
              {displayFileName !== uploadInfo ? (
                <MdIcons.MdDelete
                  className="text-red-400 cursor-pointer"
                  onClick={() => setDisplayFileName(uploadInfo)}
                />
              ) : null}
            </div>

            <button
              className="bg-[#1b9c85] hover:bg-[#1b9c70] px-4 py-1.5 
                rounded-xl text-white font-semibold outline-none"
              onClick={uploadManuscript}
            >
              Upload Manuscript
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadManuscript;

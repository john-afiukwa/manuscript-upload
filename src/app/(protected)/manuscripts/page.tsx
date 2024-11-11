"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import ManuscriptUploadModal from "@src/app/(protected)/manuscripts/components/UploadModal";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section className="w-full">
        {openModal && (
          <ManuscriptUploadModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        )}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 md:gap-5">
            <h2 className="md:text-2xl text-[#0f172a] font-bold">Manuscripts</h2>
          </div>
          <button
            className="bg-[#1b9c85] text-white text-sm p-2 md:p-3 rounded font-bold 
            hover:bg-[#178e79] duration-300"
            onClick={() => setOpenModal(true)}
          >
            Upload Manuscript
          </button>
        </div>

        <div className="bg-slate-200 flex items-center justify-center rounded-lg">
          <input
            type="search"
            className="bg-transparent w-full text-lg outline-none px-3 py-2"
            placeholder="Search"
          />
          <button
            className="py-[.8rem] px-4 cursor-pointer text-black 
            hover:bg-[#1b9c85] hover:text-white transition rounded-r-lg"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>

        {/* <div>Uploaded Manuscripts</div> */}
      </section>
    </>
  );
}

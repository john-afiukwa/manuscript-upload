"use client";

import { useState } from "react";

import ManuscriptUploadModal from "@src/app/(protected)/manuscripts/components/UploadModal";
import { ManuscriptsDataTable } from "./components/ManuscriptsDataTable";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section className="w-full max-w-[50rem] m-auto">
        {openModal && (
          <ManuscriptUploadModal
            open={openModal}
            closeModalAction={() => setOpenModal(false)}
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
        <ManuscriptsDataTable />
      </section>
    </>
  );
}

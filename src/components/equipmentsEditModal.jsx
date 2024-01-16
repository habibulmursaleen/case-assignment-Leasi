import React from "react";
import TextArea from "./ui/TextArea";
import TextInput from "./ui/TextInput";

const EquipmentsEditModal = ({ setShowModal, showModal }) => {
  const handleCancle = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
      {showModal && (
        <div>
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h2 className="mb-8 text-xl font-bold text-center">
              Add/Edit Equipment
            </h2>
            <form method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput type="text" title="name" required />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextInput type="text" title="type" required />
                    </div>

                    <div className="col-span-6">
                      <TextArea type="text" title="date" required />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" className="btn ml-2 mt-3">
                    Save
                  </button>

                  <button className="btn ml-2 mt-3" onClick={handleCancle}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentsEditModal;

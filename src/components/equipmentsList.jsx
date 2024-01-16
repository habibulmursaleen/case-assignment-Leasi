import React, { useEffect, useState } from "react";
import "../style/output.css";
import EquipmentsEditModal from "./equipmentsEditModal";

const EquipmentsTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/equipment/");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result);

        setEquipments(result);
        console.log(equipments);
      } catch (error) {}
    };

    fetchData();
  }, []);
  console.log(equipments);

  const deleteEquipment = async (equipmentId) => {
    console.log(equipmentId);
    try {
      const response = await fetch(
        `http://localhost:9000/equipment/${equipmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete equipment");
      }

      setEquipments((prevEquipments) =>
        prevEquipments.filter((equipment) => equipment.id !== equipmentId)
      );
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  return (
    <div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="btn ml-2 mt-3"
          onClick={() => setShowModal(true)}
        >
          Add new
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Title</th>
              <th className="table-th">Type</th>
              <th className="table-th">Purchase Date</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            <>
              {equipments.map((equipment) => (
                <tr key={equipment.id}>
                  <td className="table-td">{equipment.name}</td>
                  <td className="table-td">{equipment.type} </td>
                  <td className="table-td">{equipment.purchase_date} </td>
                  <td className="table-td flex gap-x-2">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      onClick={() => deleteEquipment(equipment._id)}
                      className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      onClick={() => setShowModal(true)}
                      className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
      {showModal && (
        <EquipmentsEditModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default EquipmentsTable;

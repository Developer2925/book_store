import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [input, setInput] = useState({
    TITLE: "",
    DESCRIPTION: "",
    PRICE: null,
    COVER: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    // e.prevenDefault();
    try {
      await axios.post("http://localhost:8800/books", input);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (e) => {
    // e.prevenDefault();
    try {
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(input);

  return (
    <>
      <div className="form font-serif flex flex-col items-center justify-center gap-10">
        <h1 className="text-[7vw] font-bold">Add new book</h1>
        <div className="flex flex-col gap-3 text-[1vw] w-[20vw]">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Title"
            className="border border-black p-2 rounded-lg outline-none"
            name="TITLE"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Description"
            className="border border-black p-2 rounded-lg outline-none"
            name="DESCRIPTION"
          />
          <input
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="border border-black p-2 rounded-lg outline-none"
            name="PRICE"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Cover"
            className="border border-black p-2 rounded-lg outline-none"
            name="COVER"
          />
        </div>
        <div className="w-[20vw] flex justify-between">
          <button
            onClick={handleClick}
            className="p-3 w-[9vw] bg-sky-500 text-white text-[1vw] font-semibold rounded-lg"
          >
            Add
          </button>
          <button
            onClick={handleCancel}
            className="p-3 w-[9vw] bg-red-500 text-white text-[1vw] font-semibold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Add;

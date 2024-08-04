import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (ID) => {
    try {
      await axios.delete("http://localhost:8800/books/" + ID);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="px-10 font-serif flex flex-col items-center justify-center w-full">
        <h1 className="text-[7vw] font-bold">The Modern Book Shop</h1>
        <div className="w-full flex justify-evenly py-10">
          <div className="w-3/4 flex flex-col items-center justify-center gap-5">
            {books.map((book) => (
              <>
                <div
                  className="book w-full h-[25vw] flex items-start
                gap-5 border border-gray-400 rounded-2xl p-5"
                  key={book.ID}
                >
                  <div className="w-[20vw] h-full flex items-center justify-center border border-gray-400 rounded-xl">
                    {book.COVER && <img src="" alt={book.COVER} />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className=" text-[2vw]">{book.TITLE}</h1>
                    <p className="text-[1.5vw]">{book.DESCRIPTION}</p>
                    <p className="text-[1.5vw]">$ {book.PRICE}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(book.ID)}
                        className="delete px-3 py-2 bg-red-600 rounded-xl text-white"
                      >
                        Delete
                      </button>
                      <Link to={`/update/${book.ID}`}>
                        <button className="update px-3 py-2 bg-orange-400 rounded-xl text-white">
                          Update
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <Link to="/add">
            <button className="p-3 text-[1vw] w-[15vw] h-[3vw] font-semibold bg-red-500 text-white rounded-lg">
              Add New Book
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Books;

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button";
import BookItem from "../../components/BookItem";
import { getBooks } from "@/util/apiHandlers";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("allFilter");
  const { data } = useQuery({ queryKey: ["books"], queryFn: getBooks });

  const handleFilterChange = (filterName: string) => {
    setActiveFilter(filterName);
  };

  let filteredData = data?.filter(
    (book: BookParams) =>
      book.isActive ===
      (activeFilter == "allFilter"
        ? book.isActive
        : activeFilter == "activeFilter"
        ? true
        : false)
  );

  return (
    <main className="flex flex-col items-center">
      <div className="box-border flex w-full justify-center py-4 md:justify-start">
        <Link href={"/book-editor"}>
          <button className="cursor-pointer border-none bg-white p-2 text-2xl hover:border-acidGreen hover:text-black  active:text-acidGreen sm:p-5 sm:text-5xl">
            Add a New Book
          </button>
        </Link>
      </div>

      <div className="w-full border-b border-l-0 border-r-0 border-t-0 border-solid border-black"></div>
      <div className="box-border flex w-full flex-col items-center gap-2 border-b border-l-0 border-r-0 border-t-0 border-solid border-black p-5 md:flex-row">
        <div className="flex gap-2">
          <Button
            onClick={() => handleFilterChange("allFilter")}
            isBorderActive={activeFilter === "allFilter"}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilterChange("activeFilter")}
            isBorderActive={activeFilter === "activeFilter"}
          >
            Active
          </Button>
          <Button
            onClick={() => handleFilterChange("inactiveFilter")}
            isBorderActive={activeFilter === "inactiveFilter"}
          >
            Inactive
          </Button>
        </div>
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-bold text-gray-950">
            {filteredData?.length > 0 ? filteredData?.length : 0}
          </span>{" "}
          records out of{" "}
          <span className="font-bold text-gray-950">
            {data?.length > 0 ? data?.length : 0}
          </span>
          .
        </p>
      </div>

      <div className="w-full">
        {filteredData?.length > 0 ? (
          filteredData?.map((book: BookParams) => (
            <BookItem bookData={book} key={book.id} />
          ))
        ) : (
          <div className="flex items-center gap-10 p-5">
            <h2 className="text-3xl">Nothing to show here...</h2>
            <Link href={"/book-editor"}>
              <Button>Add more</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

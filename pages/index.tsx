import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks, handleActivation, handleDelete } from "@/util/apiHandlers";
import { useState } from "react";

interface BookParams {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
}

const BookItem = ({ bookData }: { bookData: BookParams }) => {
  const client = useQueryClient();

  const activationMutation = useMutation(
    (newStatus: boolean) => handleActivation(bookData.id, newStatus),
    {
      onSuccess: () => {
        client.invalidateQueries(["books"]);
      },
    }
  );

  const deleteMutation = useMutation(() => handleDelete(bookData.id), {
    onSuccess: () => {
      client.invalidateQueries(["books"]);
    },
  });

  return (
    <div className="relative box-border flex flex-col justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-black px-5 py-10">
      {!bookData.isActive ? (
        <div className="frosted-glass absolute inset-0 h-full w-full"></div>
      ) : null}
      <div>
        <div className="flex gap-14">
          <span className="text-xs text-gray-400">{bookData.createdAt}</span>
          <span className="text-xs text-gray-400">
            Last edit: {bookData.modifiedAt}
          </span>
        </div>
        <div className="mt-2 flex gap-2">
          <Chip label={bookData.category} />
        </div>
      </div>

      <div className="h-14"></div>

      <div className="relative">
        <p className="text-xl">{bookData.author}</p>
        <h2 className="text-2xl font-bold sm:text-5xl">{bookData.title}</h2>
      </div>

      <div className="h-4"></div>

      <div className="flex flex-col items-center justify-between sm:flex-row">
        <p className="text-xl text-gray-400">
          <span className="font-bold">ISBN:</span> {bookData.isbn}
        </p>

        {!bookData.isActive ? (
          <div className="relative flex gap-5">
            <Button onClick={() => activationMutation.mutate(true)}>
              Activate
            </Button>
            <Button onClick={() => deleteMutation.mutate()}>Delete</Button>
          </div>
        ) : (
          <div className="flex gap-5">
            <Button onClick={() => activationMutation.mutate(false)}>
              Deactivate
            </Button>
            <Button>Edit</Button>
          </div>
        )}
      </div>
    </div>
  );
};

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
      <div className="box-border flex w-full items-center gap-2 border-b border-l-0 border-r-0 border-t-0 border-solid border-black p-5">
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
            <Button>Add more</Button>
          </div>
        )}
      </div>
    </main>
  );
}

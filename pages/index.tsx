import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";

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
  const handleActivation = (bookId: number, newStatus: boolean) => {
    const url = `http://localhost:3000/books/${bookId}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: newStatus ? false : true }),
    };

    fetch(url, options);
  };

  const handleDelete = (bookId: number) => {
    const url = `http://localhost:3000/books/${bookId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options);
  };

  return (
    <div className="relative h-60 px-14 py-10 flex flex-col justify-between border-t-0 border-l-0 border-r-0 border-b border-solid border-black">
      {!bookData.isActive ? (
        <div className="absolute inset-0 h-full w-full frosted-glass "></div>
      ) : null}
      <div>
        <div className="flex gap-14">
          <span className="text-xs text-gray-400">{bookData.createdAt}</span>
          <span className="text-xs text-gray-400">
            Last edit: {bookData.modifiedAt}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <Chip label="Computer Science" />
          <Chip label="Algorithms" />
          <Chip label="Programming" />
        </div>
      </div>

      <div className="h-4"></div>

      <div className="relative">
        <p className="text-xl">{bookData.author}</p>
        <h2 className="font-bold text-5xl">{bookData.title}</h2>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-xl">
          <span className="font-bold">ISBN:</span> {bookData.isbn}
        </p>

        {!bookData.isActive ? (
          <div className="flex gap-5 relative">
            <Button onClick={() => handleActivation(bookData.id, false)}>
              Activate
            </Button>
            <Button onClick={() => handleDelete(bookData.id)}>Delete</Button>
          </div>
        ) : (
          <div className="flex gap-5">
            <Button onClick={() => handleActivation(bookData.id, true)}>
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
  const {
    data: books,
    error,
    isLoading,
  } = useFetch<BookParams[]>("http://localhost:3000/books");

  return (
    <main>
      <div></div>
      <div>
        {books?.map((book) => (
          <BookItem bookData={book} key={book.id} />
        ))}
      </div>
    </main>
  );
}

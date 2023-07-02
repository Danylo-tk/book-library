import Link from "next/link";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleActivation, handleDelete } from "@/util/apiHandlers";

type BookParams = {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt: string;
  modifiedAt: string;
  isActive: boolean;
};

export const BookItem = ({ bookData }: { bookData: BookParams }) => {
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
    <div className="relative box-border flex flex-col justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-black px-5 py-4 sm:py-10">
      {!bookData.isActive ? (
        <div className="frosted-glass absolute inset-0 h-full w-full"></div>
      ) : null}
      <div>
        <div className="flex flex-col sm:flex-row sm:gap-14">
          <span className="text-xs text-gray-400">{bookData.createdAt}</span>
          <span className="text-xs text-gray-400">
            Last edit: {bookData.modifiedAt}
          </span>
        </div>
        <div className="mt-2 flex gap-2">
          <Chip label={bookData.category} />
        </div>
      </div>

      <div className="h-4 sm:h-14"></div>

      <div className="relative">
        <p className="text-md sm:text-xl">{bookData.author}</p>
        <h2 className="text-3xl font-bold sm:text-5xl">{bookData.title}</h2>
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
            <Link href={`/book-editor/${bookData.id}`}>
              <Button>Edit</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

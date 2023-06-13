import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooks, handleActivation, handleDelete } from "@/util/apiHandlers";

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
  const { data } = useQuery({ queryKey: ["books"], queryFn: getBooks });

  return (
    <main>
      <div></div>
      <div>
        {data?.map((book: BookParams) => (
          <BookItem bookData={book} key={book.id} />
        ))}
      </div>
    </main>
  );
}

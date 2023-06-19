import dayjs from "dayjs";
import CreateBookLogic, { CreateBookFormModel } from "./CreateBookLogic";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "@/components/Loader";
import { getBookById } from "@/util/apiHandlers";

interface CreateBookApiProps {
  editBookId?: string[] | undefined | string;
}

const CreateBookApi = ({ editBookId }: CreateBookApiProps) => {
  const { data: editBookData, isLoading: isLoadingEditBookData } = useQuery(
    ["createBookData"],
    () => getBookById(editBookId),
    {
      enabled: !!editBookId,
      cacheTime: 0,
    }
  );

  const handleSubmit = async (data: CreateBookFormModel) => {
    const submitData = {
      id: editBookId ? editBookId : uuidv4(),
      title: data.title,
      author: data.author,
      category: data.category,
      isbn: data.isbn,
      isActive: true,
      createdAt: dayjs().format("D MMMM YYYY · h:mmA"),
      modifiedAt: dayjs().format("D MMMM YYYY · h:mmA"),
    };

    return fetch(
      `http://localhost:3000/books${editBookId ? `/${editBookId}` : ""}`,
      {
        method: editBookId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      }
    );
  };

  // returning early if initial form data isn't loaded yet
  if (isLoadingEditBookData && editBookId) return <LoadingPage />;

  const defaultValues = {
    title: editBookData?.title ?? "",
    author: editBookData?.author ?? "",
    category: editBookData?.category ?? "",
    isbn: editBookData?.isbn ?? "",
  };

  return (
    <CreateBookLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};

export default CreateBookApi;

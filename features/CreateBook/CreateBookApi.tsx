import dayjs from "dayjs";
import CreateBookLogic, { CreateBookFormModel } from "./CreateBookLogic";
import { v4 as uuidv4 } from "uuid";

const CreateBookApi = () => {
  const handleSubmit = async (data: CreateBookFormModel) => {
    const submitData = {
      id: uuidv4(),
      title: data.title,
      author: data.author,
      category: data.category,
      isbn: data.isbn,
      isActive: true,
      createdAt: dayjs().format("D MMMM YYYY · h:mmA"),
      modifiedAt: dayjs().format("D MMMM YYYY · h:mmA"),
    };

    return fetch(`http://localhost:3000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
  };

  const defaultValues = {
    title: "",
    author: "",
    category: "",
    isbn: "",
  };

  return (
    <CreateBookLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};

export default CreateBookApi;

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateBookView from "./CreateBookView";

export interface CreateBookFormModel {
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const CreateBookFormSchema = z
  .object({
    title: z.string().min(5),
    author: z.string().min(5),
    category: z.string().min(5),
    isbn: z.string().min(5),
  })
  .required();

interface LogicProps {
  defaultValues: CreateBookFormModel;
  onSubmit: (data: CreateBookFormModel) => Promise<Response>;
}

const CreateBookLogic = ({ defaultValues, onSubmit }: LogicProps) => {
  const form = useForm<CreateBookFormModel>({
    mode: "onSubmit",
    defaultValues,
    resolver: zodResolver(CreateBookFormSchema),
  });

  const handleSubmit = async (data: CreateBookFormModel) => {
    await onSubmit(data)
      .then(() => form.reset())
      .catch((err) => console.error(err));
  };

  return <CreateBookView form={form} onSubmit={handleSubmit} />;
};

export default CreateBookLogic;

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CreateBookView from "./CreateBookView";
import { toast } from "react-hot-toast";

export interface CreateBookFormModel {
  title: string;
  author: string;
  category: string;
  isbn: string;
  createdAt?: string;
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
      .then(() => {
        Object.values(defaultValues).some((value) => value === "")
          ? (() => {
              form.reset();
              toast.success(`Created ${data.title}!`);
            })()
          : toast.success(`Edited ${data.title}!`);
      })
      .catch((err) => console.error(err));
  };

  return <CreateBookView form={form} onSubmit={handleSubmit} />;
};

export default CreateBookLogic;

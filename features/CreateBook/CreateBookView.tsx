import { UseFormReturn } from "react-hook-form";
import { CreateBookFormModel } from "./CreateBookLogic";
import { Button } from "@/components/Button";

interface ViewProps {
  form: UseFormReturn<CreateBookFormModel>;
  onSubmit: (data: CreateBookFormModel) => void;
}

const CreateBookView = ({ form, onSubmit }: ViewProps) => {
  const { formState, register, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col gap-4"
    >
      <div className="flex flex-col">
        <label className="text-md text-gray-600">Title</label>
        <input
          type="text"
          placeholder="e.g. Hello World"
          className="border-b border-l-0 border-r-0 border-t-0 border-black px-5 py-3 outline-none"
          {...register("title")}
        />
        <p className="h-5 text-sm text-red-900">{errors?.title?.message}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-md text-gray-600">Author</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          className="border-b border-l-0 border-r-0 border-t-0 border-black px-5 py-3 outline-none"
          {...register("author")}
        />
        <p className="h-5 text-sm text-red-900">{errors?.author?.message}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-md text-gray-600">Category</label>
        <input
          type="text"
          placeholder="e.g. Programming"
          className="border-b border-l-0 border-r-0 border-t-0 border-black px-5 py-3 outline-none"
          {...register("category")}
        />
        <p className="h-5 text-sm text-red-900">{errors?.category?.message}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-md text-gray-600">ISBN</label>
        <input
          type="text"
          placeholder="e.g. 0123456789"
          {...register("isbn")}
          className="border-b border-l-0 border-r-0 border-t-0 border-black px-5 py-3 outline-none"
        />
        <p className="h-5 text-sm text-red-900">{errors?.isbn?.message}</p>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateBookView;

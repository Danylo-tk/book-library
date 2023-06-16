import CreateBookApi from "@/features/CreateBook/CreateBookApi";

export default function Edit() {
  return (
    <div className="w-full">
      <h1 className="flex h-28 items-center justify-center border border-b-0 border-solid border-black text-[12vw] text-acidGreen lg:h-48">
        Add a new book
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center border border-b-0 border-solid border-black lg:border-b lg:border-r-0">
          <p className="p-5 text-3xl lg:p-10">
            Start building your reading collection: Expand your personal library
            by providing details of a new book!📚
          </p>
        </div>
        <div className="flex justify-center border border-solid border-black p-5 lg:py-24">
          <CreateBookApi />
        </div>
      </div>
    </div>
  );
}

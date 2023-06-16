import CreateBookApi from "@/features/CreateBook/CreateBookApi";

export default function Edit() {
  return (
    <main className="flex h-full flex-col border border-solid border-black">
      <h1 className="max-w-proze flex justify-center border-l-0 border-r-0 border-t-0 border-solid border-black py-10 text-[10vw] text-acidGreen">
        Add a new book
      </h1>
      <div className="grid flex-1 grid-cols-1 border-blue-500 lg:grid-cols-2">
        <div className="flex items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid border-black p-5 lg:border-b-0 lg:border-r lg:p-10">
          <p className="text-xl lg:text-3xl">
            Start building personal reading collection: Expand your library by
            providing details of a new book!📚
          </p>
        </div>
        <div className="flex items-center p-5 lg:p-10">
          <CreateBookApi />
        </div>
      </div>
    </main>
  );
}

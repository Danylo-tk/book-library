export const getBooks = async () => {
  const res = await fetch("http://localhost:3000/books");
  return res.json();
};

export const getBookById = async (id: string[] | undefined | string) => {
  const res = await fetch("http://localhost:3000/books/" + id);
  return res.json();
};

export const handleActivation = async (bookId: string, newStatus: boolean) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive: newStatus }),
  };

  fetch(`http://localhost:3000/books/${bookId}`, options);
};

export const handleDelete = async (bookId: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:3000/books/${bookId}`, options);
};

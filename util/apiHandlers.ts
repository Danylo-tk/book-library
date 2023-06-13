export const handleActivation = async (bookId: number, newStatus: boolean) => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive: newStatus }),
  };

  fetch(`http://localhost:3000/books/${bookId}`, options);
};

export const handleDelete = async (bookId: number) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:3000/books/${bookId}`, options);
};

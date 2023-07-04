import dayjs from "dayjs";
import CreateBookLogic, { CreateBookFormModel } from "./CreateBookLogic";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "@/components/Loader";
import { getBookById } from "@/util/apiHandlers";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { initFirebase } from "@/firebase/firebase";
import { useEffect, useState } from "react";

interface CreateBookApiProps {
  editBookId?: string[] | undefined | string;
}

const getDocumentById = async (id: string) => {
  const db = getFirestore();
  const documentRef = doc(db, "books", id);
  const documentSnapshot = await getDoc(documentRef);

  if (documentSnapshot.exists()) {
    const documentData = documentSnapshot.data();
    return documentData;
  } else {
    throw new Error("Document not found");
  }
};

const CreateBookApi = ({ editBookId }: CreateBookApiProps) => {
  initFirebase();
  const db = getFirestore();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [editBookData, setEditBookData] = useState<BookParams>();
  const [isLoadingEditBookData, setIsLoadingEditBookData] = useState(true);

  useEffect(() => {
    if (editBookId) {
      getDocumentById(editBookId[0]).then((data) => {
        setEditBookData({ ...data } as BookParams);
        console.log(data);
        setIsLoadingEditBookData(false);
      });
    }
  }, [editBookId]);

  /* const { data: editBookData, isLoading: isLoadingEditBookData } = useQuery(
    ["createBookData"],
    () => getBookById(editBookId),
    {
      enabled: !!editBookId,
      cacheTime: 0,
    }
  ); */

  const handleSubmit = async (data: CreateBookFormModel) => {
    const submitData = {
      id: editBookId ? editBookId : uuidv4(),
      title: data.title,
      author: data.author,
      category: data.category,
      isbn: data.isbn,
      isActive: true,
      createdAt: editBookId
        ? data.createdAt
        : dayjs().format("D MMMM YYYY · h:mmA"),
      modifiedAt: dayjs().format("D MMMM YYYY · h:mmA"),
      userID: user?.uid,
    };

    /* return fetch(
      `http://localhost:3000/books${editBookId ? `/${editBookId}` : ""}`,
      {
        method: editBookId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      }
    ); */

    return addDoc(collection(db, "books"), submitData);
  };

  // returning early if initial form data isn't loaded yet
  if (isLoadingEditBookData && editBookId) return <LoadingPage />;

  console.log(editBookData?.author);
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

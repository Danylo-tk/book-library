import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import BookItem from "../../components/BookItem";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initFirebase } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  initFirebase();
  const auth = getAuth();
  const [activeFilter, setActiveFilter] = useState("allFilter");
  const [books, setBooks] = useState<BookParams[]>([]);
  const [user] = useAuthState(auth);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const db = getFirestore();
          const getDocumentsByUID = async () => {
            const colRef = query(
              collection(db, "books"),
              where("userID", "==", user?.uid)
            );
            const querySnapshot = await getDocs(colRef);

            const documents = setBooks(
              querySnapshot.docs.map((doc) => {
                return { ...(doc.data() as BookParams) };
              })
            );
            return documents;
          };
          console.log("auth");
          getDocumentsByUID();
        } else {
          router.push("/");
        }
      }),
    []
  );

  /*   useEffect(() => {
    const db = getFirestore();
    const getDocumentsByUID = async () => {
      const colRef = query(
        collection(db, "books"),
        where("userID", "==", user?.uid)
      );
      const querySnapshot = await getDocs(colRef);

      const documents = setBooks(
        querySnapshot.docs.map((doc) => {
          return { ...(doc.data() as BookParams) };
        })
      );
      return documents;
    };

    getDocumentsByUID();

  }, []); */

  const handleFilterChange = (filterName: string) => {
    setActiveFilter(filterName);
  };

  let filteredData = books?.filter(
    (book: BookParams) =>
      book.isActive ===
      (activeFilter == "allFilter"
        ? book.isActive
        : activeFilter == "activeFilter"
        ? true
        : false)
  );

  return (
    <main className="flex flex-col items-center">
      <div className="box-border flex w-full justify-center py-4 md:justify-start">
        <Link href={"/book-editor"}>
          <button className="cursor-pointer border-none bg-white p-2 text-2xl hover:border-acidGreen hover:text-black  active:text-acidGreen sm:p-5 sm:text-5xl">
            Add a New Book
          </button>
        </Link>
      </div>
      <div onClick={() => signOut(auth)}>SignOut</div>

      <div className="w-full border-b border-l-0 border-r-0 border-t-0 border-solid border-black"></div>
      <div className="box-border flex w-full flex-col items-center gap-2 border-b border-l-0 border-r-0 border-t-0 border-solid border-black p-5 md:flex-row">
        <div className="flex gap-2">
          <Button
            onClick={() => handleFilterChange("allFilter")}
            isBorderActive={activeFilter === "allFilter"}
          >
            All
          </Button>
          <Button
            onClick={() => handleFilterChange("activeFilter")}
            isBorderActive={activeFilter === "activeFilter"}
          >
            Active
          </Button>
          <Button
            onClick={() => handleFilterChange("inactiveFilter")}
            isBorderActive={activeFilter === "inactiveFilter"}
          >
            Inactive
          </Button>
        </div>
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-bold text-gray-950">
            {filteredData?.length > 0 ? filteredData?.length : 0}
          </span>{" "}
          records out of{" "}
          <span className="font-bold text-gray-950">
            {books?.length > 0 ? books?.length : 0}
          </span>
          .
        </p>
      </div>

      <div className="w-full">
        {filteredData?.length > 0 ? (
          filteredData?.map((book: BookParams) => (
            <BookItem bookData={book} key={book.id} />
          ))
        ) : (
          <div className="flex items-center gap-10 p-5">
            <h2 className="text-3xl">Nothing to show here...</h2>
            <Link href={"/book-editor"}>
              <Button>Add more</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

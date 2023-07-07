import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import BookItem from "../../components/BookItem";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initFirebase } from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import AccountMenu from "@/components/AccountMenu";

export default function Home() {
  initFirebase();
  const auth = getAuth();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("allFilter");
  const [books, setBooks] = useState<BookParams[]>([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = getFirestore();
        const userQuery = query(
          collection(db, "books"),
          where("userID", "==", user.uid)
        );
        const unsubscribe = onSnapshot(userQuery, (snapshot) => {
          const userDocs = setBooks(
            snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() } as BookParams;
            })
          );
        });

        return () => unsubscribe();
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [user, loading]);

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
      <div className="box-border flex w-full flex-col items-center justify-between gap-4 p-5 sm:flex-row sm:gap-0">
        <AccountMenu />
        <Link href={"/book-editor"}>
          <Button>Add Book</Button>
        </Link>
      </div>

      <div className="sm:h-14"></div>

      <div className="box-border flex w-full flex-col items-center justify-between gap-2 p-5 md:flex-row">
        <div className="flex gap-1">
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

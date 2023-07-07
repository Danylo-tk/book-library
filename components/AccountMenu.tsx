import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { useRouter } from "next/router";

const AccountMenuSkeleton = () => {
  return (
    <div className="flex cursor-pointer items-center gap-4 p-2">
      <div className="h-[50px] w-[50px] rounded-full bg-gray-200"></div>
      <div className="flex flex-col gap-2">
        <span className="h-4 w-24 bg-gray-200"></span>
        <span className="h-4 w-40 bg-gray-200"></span>
      </div>
    </div>
  );
};

const AccountMenu = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const togleMenu = () => setIsOpen(!isOpen);

  if (loading) {
    return <AccountMenuSkeleton />;
  } else {
    return (
      <div className="relative h-16">
        <div
          onClick={togleMenu}
          className="flex cursor-pointer items-center gap-4 p-2 hover:bg-acidGreen"
        >
          {user?.photoURL != undefined && user?.photoURL != null && (
            <Image
              src={user?.photoURL}
              height={50}
              width={50}
              alt="User image"
              className="rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span>{user?.displayName}</span>
            <span className="text-gray-600">{user?.email}</span>
          </div>
        </div>

        {isOpen && (
          <ul className="absolute z-20 w-full list-none border border-solid border-acidGreen bg-white">
            <li
              onClick={() => {
                signOut(auth);
                router.push("/");
              }}
              className="cursor-pointer p-4 hover:text-acidGreen"
            >
              Log out
            </li>
          </ul>
        )}
      </div>
    );
  }
};

export default AccountMenu;

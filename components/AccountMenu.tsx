import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./Loader";
import { useState } from "react";

const AccountMenu = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const togleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div
        onClick={togleMenu}
        className="flex cursor-pointer items-center gap-4 p-2 hover:bg-acidGreen"
      >
        {user?.photoURL != undefined && user?.photoURL != null ? (
          <Image
            src={user?.photoURL}
            height={50}
            width={50}
            alt="User image"
            className="rounded-full"
          />
        ) : (
          <Loader />
        )}
        <div className="flex flex-col">
          <span>Welcome, {user?.displayName}</span>
          <span className="text-gray-600">{user?.email}</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute w-full border border-solid border-acidGreen bg-white">
          <ul className="list-none">
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
            <li>menu item</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;

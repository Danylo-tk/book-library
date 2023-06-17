export const Footer = () => {
  return (
    <div className="flex h-36 items-center border border-solid border-black bg-acidGreen px-10">
      <ul className="flex w-full list-none flex-col items-center justify-between sm:flex-row">
        <li className="flex flex-col items-center sm:flex-row">
          <span>(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</span> Danylo Tkach - 2023
        </li>
        <div className="flex gap-5">
          <li>
            <a
              href="https://github.com/Danylo-tk"
              target="_blank"
              className="text-black no-underline"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/danylo-tkach-255906203/"
              target="_blank"
              className="text-black no-underline"
            >
              LinkedIn
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

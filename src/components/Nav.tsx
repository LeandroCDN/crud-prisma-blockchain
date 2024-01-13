import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex flex-row justify-between bg-black text-whit px-3 py-1">
      <div className="p-1 flex flex-row gap-2 items-center">
        <Link href="/">
          <h3>HOME</h3>
        </Link>
      </div>
      <div>
        <w3m-button />
      </div>
    </nav>
  );
};

export default Nav;

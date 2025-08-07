import { useNavigate } from "react-router-dom";

function Menu({ pages }) {
  const navigate = useNavigate();

  function irPagina(title) {
    navigate(`/${title.toLowerCase()}`);
  }

  return (
    <ul className="mb-6 p-4 flex items-center justify-end flex-row list-none gap-4">
  {pages.map((page) => (
    <li key={page.id} className="flex items-center justify-center text-center">
      <button
        onClick={() => irPagina(page.title)}
        className=" text-white px-4 py-2 rounded w-auto h-10 flex items-center justify-center"
      >
        {page.title}
      </button>
    </li>
  ))}
</ul>
  );
}

export default Menu;

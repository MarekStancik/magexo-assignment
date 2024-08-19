import { NavLink } from "@remix-run/react";

export function Header({ }) {
    return (<header className="bg-zinc-900 w-full sticky text-center top-0 z-10 drop-shadow-md bg-opacity-90 p-8 gap-2 flex text-xl">
        <NavLink to="/collections">
            <strong className={"text-slate-100"}>MageXo Boards</strong>
        </NavLink>
    </header>);
}
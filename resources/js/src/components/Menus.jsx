import { useEffect } from "react";
import menus from "../../menus";
import Menu from "./Menu";

export default function Menus() {
    return (
        <Menu menus={menus} />
    );
}

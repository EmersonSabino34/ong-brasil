/** Item de menu já traduzido (montado no servidor e passado aos componentes de cliente). */
export type MenuLink = { label: string; href: string };
export type MenuItem = MenuLink & { key: string; children?: MenuLink[] };

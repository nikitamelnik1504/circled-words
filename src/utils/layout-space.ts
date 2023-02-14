export function getFreeHeight(): { [key: string]: number } {
  const headerHeight: number = getHeaderHeight();
  const footerHeight: number = getFooterHeight();
  const clientHeight: number = document.documentElement.clientHeight;

  return { headerHeight, footerHeight, clientHeight };
}

function getFooterHeight(): number {
  const footer = document.getElementById("footer");

  if (!footer) {
    return 0;
  }

  return footer.clientHeight + 1; // 1px top border height
}

function getHeaderHeight(): number {
  const header = <HTMLElement>document.getElementById("header");
  const navbar = <HTMLElement>header.getElementsByClassName("navbar")[0];
  return navbar.clientHeight;
}

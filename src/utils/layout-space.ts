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
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbarNav");

  if (!header || !navbar) {
    return 0;
  }

  if (
    navbar.classList.contains("collapsing") ||
    navbar.classList.contains("show")
  ) {
    return header.clientHeight - navbar.clientHeight;
  } else {
    return header.clientHeight;
  }
}

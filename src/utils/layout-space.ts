export function getFreeHeight(footer = false): number {
  const headerHeight = getHeaderHeight();
  const footerHeight = getFooterHeight();

  if (!headerHeight || !footerHeight) {
    return document.documentElement.clientHeight;
  }

  if (footer) {
    return document.documentElement.clientHeight - headerHeight - footerHeight;
  }

  return document.documentElement.clientHeight - headerHeight;
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

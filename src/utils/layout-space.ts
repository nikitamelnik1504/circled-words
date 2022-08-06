export function getFreeHeight(footer = false): number | null {
  const headerHeight = getHeaderHeight();
  const footerHeight = getFooterHeight();

  if (!headerHeight || !footerHeight) {
    return null;
  }

  if (footer) {
    return document.documentElement.clientHeight - headerHeight - footerHeight;
  }

  return document.documentElement.clientHeight - headerHeight;
}

function getFooterHeight(): number | null {
  const footer = document.getElementById("footer");

  if (!footer) {
    return null;
  }

  return footer.clientHeight + 1; // 1px top border height
}

function getHeaderHeight(): number | null {
  const header = document.getElementById("header");
  const navbar = document.getElementById("navbarNav");

  if (!header || !navbar) {
    return null;
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

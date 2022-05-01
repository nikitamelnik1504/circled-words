export function getFreeHeight(footer = false) {
  if (footer) {
    return (
      document.documentElement.clientHeight -
      getHeaderHeight() -
      getFooterHeight()
    );
  }
  return document.documentElement.clientHeight - getHeaderHeight();
}

function getFooterHeight() {
  return document.getElementById("footer").clientHeight + 1; // 1px top border height
}

function getHeaderHeight() {
  let header = document.getElementById("header");
  let navbar = document.getElementById("navbarNav");
  if (
    navbar.classList.contains("collapsing") ||
    navbar.classList.contains("show")
  ) {
    return header.clientHeight - navbar.clientHeight;
  } else {
    return header.clientHeight;
  }
}

export default {};

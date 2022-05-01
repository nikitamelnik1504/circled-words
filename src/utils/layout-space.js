export function getFreeHeight() {
  return document.documentElement.clientHeight - getHeaderHeight();
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

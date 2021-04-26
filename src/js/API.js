function defineSearchType() {
  const searchInput = document.querySelector(".searchInput");
  const regex = new RegExp("^[0-9]+$");
  if (regex.test(searchInput.value)) {
    return `zip=${searchInput.value}`;
  }
  return `q=${searchInput.value}`;
}





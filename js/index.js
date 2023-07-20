document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {
  const listPanel = document.getElementById('list');
  const showPanel = document.getElementById('show-panel');
  const user = { "id": 1, "username": "pouros" }

  function fetchBooks() {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        books.forEach(book => {
          const listItem = document.createElement('li');
          listItem.textContent = book.title;
          listItem.addEventListener('click', () => displayBook(book));
          listPanel.appendChild(listItem);
        });
      });
  }

  function displayBook(book) {
    showPanel.innerHTML = `
      <img src="${book.img_url}">
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <ul>${book.users.map(user => `<li>${user.username}</li>`).join('')}</ul>
      <button>Like</button>
    `;

    const likeButton = showPanel.querySelector('button');
    likeButton.addEventListener('click', () => likeBook(book));
  }

  function likeBook(book) {
    const isLikedByUser = book.users.find(bookUser => bookUser.id === user.id);
    if (isLikedByUser) {
      book.users = book.users.filter(bookUser => bookUser.id !== user.id);
    } else {
      book.users.push(user);
    }

    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ users: book.users })
    }).then(() => displayBook(book));
  }

  fetchBooks();
});

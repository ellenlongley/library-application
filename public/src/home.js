const { findAuthorById } = require("./books");


// getTotalBooksCount returns a _number_ that represents the number of book objects inside the array
function getTotalBooksCount(books) {
  return books.length;
}

// same as above but for accounts
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// returns a _number_ 
/* 
the returned number represents the number of books that are currently checked out.
this number can be found by looking at the first transaction object in the `borrows` array of each book.
if it says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.
*/
// create new array of books with their borrowed status using map() = booksBorrowedStatus
// filter() new array booksBorrowedStatus and find all books that have 'returned = false'
// ? let totalBooksBorrowed = 0;
function getBooksBorrowedCount(books) {
  const booksBorrowedStatus = books.map((book) => book.borrows[0].returned);
  const allBorrowedBooks = booksBorrowedStatus.filter((status) => status == false);
  return allBorrowedBooks.length;
}

// returns an array containing five objects or fewer that represents the most common occurring genres, ordered from most common to least.
// Each object in returned array has two keys:
//- The `name` key which represents the name of the genre.
//- The `count` key which represents the number of times the genre occurs.
//Even if there is a tie, the array should only contain no more than five objects.
/* 
steps to take -
reduce array of books to find genre and count of each
make a new object of genre names & count
sort from highest number to lowest number
only return top 5
return array of book objects with two keys - name: and count:
*/
// {
//   "Nonfiction": 1,
//   "Thriller": 20
// }
function getMostCommonGenres(books) {
  const reducedBookGenres = books.reduce((result, book) => {
    result[book.genre] = (result[book.genre] >= 0)
      ? result[book.genre] + 1
      : 1;
    return result;
  }, {})
  const bookObjects = Object.entries(reducedBookGenres).map((entry) => {
    // entry = ["genre", count]
    const key = entry[0];
    const value = entry[1];
    return {
      name: key,
      count: value,
    }
  })
  bookObjects.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  return bookObjects.filter((book, index) => index <= 4);
}

/*
returns an array containing five objects or fewer that represents the most popular books in the library. 
Popularity is represented by the number of times a book has been borrowed.
Each object in the returned array has two keys:
  - The `name` key which represents the title of the book.
  - The `count` key which represents the number of times the book has been borrowed.
Even if there is a tie, the array should only contain no more than five objects.
*/
// to do - make new array of objects that shape is 'book title: borrows', count length of that new array, sort array by count, return top 5
function getMostPopularBooks(books) {
  const bookBorrowsArray = books.map((book) => {
    return {
      name: book.title, 
      count: book.borrows.length
    }
  });
  bookBorrowsArray.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  return bookBorrowsArray.filter((book, index) => index <= 4);
}

/*
returns an array containing five objects or fewer that represents most popular authors whose books have been checked out the most. 
Popularity is represented by finding all of the books written by the author, then adding up number of times those books have been borrowed.
Each object in the returned array has two keys:
  - The `name` key which represents the first and last name of the author.
  - The `count` key which represents the number of times the author's books have been borrowed.
Even if there is a tie, the array should contain no more than five objects.
*/
// to do - helper function findAuthorById, make array of book title: author id
// similar to our function above, reduce the books list so you get a dictionary with author name as key
// and loop through books and count the borrows and update the value as how many borrows they have
function getMostPopularAuthors(books, authors) {
  const reducedBookAuthors = books.reduce((result, book) => {
    const author = findAuthorById(authors, book.authorId);
    const authorFullName = `${author.name.first} ${author.name.last}`;
    result[authorFullName] = (result[authorFullName] >= 0)
      ? result[authorFullName] + book.borrows.length
      : book.borrows.length;
    return result;
  }, {})
  const authorBooksAmountBorrowed = Object.entries(reducedBookAuthors).map((entry) => {
    // entry = ["author full name", count]
    const key = entry[0];
    const value = entry[1];
    return {
      name: key,
      count: value,
    }
  })
  authorBooksAmountBorrowed.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  return authorBooksAmountBorrowed.filter((author, index) => index <= 4);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

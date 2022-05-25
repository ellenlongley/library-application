/*
each account is an object with the following shape -
 {
  "id": "5f446f2ecfaf0310387c9603",
  "name": {
    "first": "Esther",
    "last": "Tucker"
  },
  "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
  "age": 25,
  "company": "ZILLACON",
  "email": "esther.tucker@zillacon.me",
  "registered": "Thursday, May 28, 2015 2:51 PM"
}
*/

const { findAuthorById } = require("./books");


function findAccountById(accounts, id) {
  let accountFound = accounts.find((account) => account.id == id);
  return accountFound;
}

// sortAccountsByLastName returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1 );
  return accounts;
}

// getTotalNumberOfBorrows returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
// loop through array of books, find all account ids that match account id in parameter
// go to borrows array, if account id is there, add (+) 1 to total in numberOfBorrows variable
function getTotalNumberOfBorrows(account, books) {
  let numberOfBorrows = 0;
  books.forEach((book) => 
    book.borrows.forEach((borrow) => {
      if (borrow.id == account.id) {
        numberOfBorrows += 1;
      }}
    ) 
  )
return numberOfBorrows;
}

/*
returns an array of book objects, including author information, 
that represents all books _currently checked out_ by the given account. 
it's not just the book object; the author object is nested inside of it.
*/
// filter books.borrowed down to just have books borrowed by account
function getBooksPossessedByAccount(account, books, authors) {
  let booksBorrowedByAccount = [];
  books.forEach((book) => {
    let bookBorrowed = book.borrows.some((borrow) => (borrow.id == account.id) && !borrow.returned);
    if (bookBorrowed) booksBorrowedByAccount.push(book);
  });
  // now you have an array of all books returned:false with id that matches account parameter
  const updatedBooks = booksBorrowedByAccount.map((book) => {
    const foundAuthor = findAuthorById(authors, book.authorId);
    const updatedBook = {...book, author: foundAuthor};
    return updatedBook;
  })
  return updatedBooks;
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

/* 
each book in books array is an object w/ this shape -
{
  "id": "5f4471327864ee880caf5afc",
  "title": "reprehenderit quis laboris adipisicing et",
  "genre": "Poetry",
  "authorId": 20,
  "borrows": [
    {
      "id": "5f446f2e2a4fcd687493a775",
      "returned": false
    },
    {
      "id": "5f446f2ebe8314bcec531cc5",
      "returned": true
    },
    {
      "id": "5f446f2ea508b6a99c3e42c6",
      "returned": true
    }
  ]
}
*/

// findAuthorById returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  let authorFound = authors.find((author) => author.id == id);
  return authorFound;
}

// findBookById returns the book object that has the matching ID.
function findBookById(books, id) {
  let bookFound = books.find((book) => book.id == id);
  return bookFound;
}

// partitionBooksByBorrowedStatus returns an array with two arrays inside of it. All books are present in either first or second array
// first array contains books _that are currently checked out_
// second array contains books _that have been returned_
/* 
loop through each book object. if book.borrows.returned = false, add that book to array 1 (currently checked out) 
if book.borrows.returned = true, add to array 2 (returned books)
*/
function partitionBooksByBorrowedStatus(books) {
  // create two arrays
  let currentlyCheckedOutBooks = [];
  let returnedBooks = [];
  // loop
  books.forEach((book) => {
    if (book.borrows[0].returned) {
      returnedBooks.push(book);
    } else {
      currentlyCheckedOutBooks.push(book);
    }
  })
  // combine currentlyCheckOutBooks and returnedBooks into one array; allBooksBorrowedStatus
  // return allBooksBorrowedStatus
  const allBooksBorrowedStatus = [[...currentlyCheckedOutBooks], [...returnedBooks]];
  return allBooksBorrowedStatus;
}

function findAccountById(accounts, id) {
  let accountFound = accounts.find((account) => account.id == id);
  return accountFound;
}

/*
return an array of ten or fewer account objects 
that represents accounts, given by the IDs in the provided book's `borrows` array
each account object should include the `returned` entry from the corresponding transaction object in the `borrows` array.
so basically, find which accounts have borrowed that book. list the 10 accounts, but add line of returned: true or false
*/
function getBorrowersForBook(book, accounts) {
  const {borrows} = book; 
  const borrowedAccounts = borrows.map((borrow) => {
    const account = findAccountById(accounts, borrow.id);
    const updatedAccount = {...account, returned: borrow.returned}
    return updatedAccount;
  })
  return borrowedAccounts.filter((account, index) => index <= 9);
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

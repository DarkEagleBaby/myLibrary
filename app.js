// code for interface show/hide:

const hideButton = document.querySelector('.hide');
const interface = document.querySelector('.interface')
const showInterface = document.querySelector('.showInterface')
const show = document.querySelector('.show')
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')

// function for when to show interface and when to hide. 
// if argument is false - will hide interface. if true will show

function bookAdd(show){
    if(show){interface.classList.remove('hidden');
    overlay.classList.remove('hidden');
    showInterface.classList.add('hideShow')}

    if(!show){
    interface.classList.add('hidden');
    overlay.classList.add('hidden')
    showInterface.classList.remove('hideShow')
    }
}

hideButton.addEventListener('click',()=>{
bookAdd(false);
})

show.addEventListener('click',()=>{
 bookAdd(true)
    body.addEventListener('click',(e)=>{
        if(e.target===overlay){
            bookAdd(false)}})
})

// code for adding and showing new books
const bookshelf = document.querySelector(".bookshelf")
const myLibrary = [];
let bookIndex = 0;

class Book{
constructor(author,title,noPages,beenRead,rating){
this.author = author;
this.title = title;
this.noPages = noPages;
this.beenRead = beenRead;
this.rating=rating;
}
}

function addBookToLibrary(book){
    //creating reference div + delete button
    const delDiv = document.createElement('div');
    delDiv.classList.add('delDiv');
    const newDelButton = document.createElement('button')
    newDelButton.append('Delete')
    newDelButton.dataset.bookIndex = bookIndex;
    //del button logic:
    newDelButton.addEventListener('click',()=>{
        const specRef = document.querySelector(`div[data-book-index='${newDelButton.dataset.bookIndex}']`)
        bookshelf.removeChild(specRef)
    })
    //new book
    const newBookElm = document.createElement('div');
    newBookElm.classList.add('book');
    delDiv.append(newDelButton);
    newBookElm.append(delDiv)
    // author
    const AuthorElm = document.createElement('div');
    AuthorElm.classList.add('Author');
    AuthorElm.append(book.author);
    //Title
    const TitleElm = document.createElement('div');
    TitleElm.classList.add('Title');
    TitleElm.append(book.title);
    //number of pages
    const noPagesElm = document.createElement('div');
    noPagesElm.classList.add('noPages');
    noPagesElm.append(`pages: ${book.noPages}`);
    //rating
    const RatingElm = document.createElement('div');
    RatingElm.classList.add('Rating');
    RatingElm.append(`Rating: ${book.rating}`)
    //Been read or not
    const BeenReadElm = document.createElement('div');
    BeenReadElm.classList.add('beenRead');
    BeenReadElm.dataset.Read = book.beenRead;
    console.log(BeenReadElm.dataset.Read)
    BeenReadElm.addEventListener('click',function(){
    const relElm = document.querySelector(`div[data-book-index='${newBookElm.dataset.bookIndex}'] .beenRead`);
    if (relElm.dataset.Read==='true'){
        console.log('should be not read')
        relElm.innerHTML = 'Not Read';
        relElm.style.backgroundColor = 'rgb(254,156,155)'
        relElm.dataset.Read = 'false'}
    else if (relElm.dataset.Read==='false'){
        relElm.innerHTML = 'Read';
        relElm.style.backgroundColor = 'rgb(158,255,156)'
        relElm.dataset.Read = 'true'}
})
    if(book.beenRead === true){
        BeenReadElm.append('Read');
        BeenReadElm.style.backgroundColor ='rgb(158,255,156)'}else
    {
        BeenReadElm.append('Not Read');
        BeenReadElm.style.backgroundColor = 'rgb(254,156,155)';
    };
    //adding all to newbook element
    newBookElm.append(AuthorElm);
    newBookElm.append(TitleElm);
    newBookElm.append(noPagesElm);
    newBookElm.append(RatingElm);
    newBookElm.append(BeenReadElm);
    //adding new book to reference
    newBookElm.dataset.bookIndex = bookIndex;
    bookIndex++;
    //adding all to shelf
    bookshelf.append(newBookElm)
}


//handling the user form

const subNewBook = document.querySelector('.Submit input');
const newAuthor = document.querySelector('.newAuthor input');
const newTitle = document.querySelector('.newTitle input');
const newNoPages = document.querySelector('.newNoPages input');
const newRating = document.querySelector('.newRating select');
const newHasBeenRead = document.querySelector('.newHasBeenRead input');

subNewBook.addEventListener('click',()=>{
    const newBook = new Book(newAuthor.value, newTitle.value,newNoPages.value,
        newHasBeenRead.checked, newRating.value)
    myLibrary.push(newBook);
    addBookToLibrary(newBook);
    newAuthor.value = '';
    newTitle.value = '';
    newNoPages.value = '';
    newRating.value = 5;
    newHasBeenRead.checked = false;
    interface.classList.add('hidden');
    overlay.classList.add('hidden')
    showInterface.classList.remove('hideShow')
})


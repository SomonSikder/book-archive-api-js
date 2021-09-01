
const loadBookData = () =>{
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value
    if(inputText.length === ''){
        const error = document.getElementById('error-mg')
        error.innerText = 'Please Type Something For Search!'
        return 
    }
    // clear input field
    inputField.value = ''

    // load data from Book Archive API
    const url = ` http://openlibrary.org/search.json?q=${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
}

const displayResult = (data) =>{
    const totalResultNumber = document.getElementById('total-result')
    const bookContainer = document.getElementById('search-result')
    // clear Pervious result
    bookContainer.innerHTML = ''
    totalResultNumber.innerText = data.numFound
    const books = data.docs.slice(0,12)
    books.forEach(book => {
        const img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div')
        div.classList.add('col-lg-4', 'col-md-6','my-2')
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${img}" >
                <div class="card-body">
                    <h5 class="card-title">Book Title: ${book.title}</h5>
                    <p class="card-text">Author Name: ${book.author_name}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                </div>
            </div>

        `
        bookContainer.appendChild(div)

    });
    
}

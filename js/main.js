
const loadBookData = () =>{
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value
    

    // Input text validation 
    const errorMg = document.getElementById('input-empty')
    if(inputText===''){
        errorMg.innerText = 'Please type something for search!'
        return
    }
    else{
        errorMg.innerText = ''
    } 
    // clear input field
    inputField.value = ''
    // load data from Book Archive API
    const url = ` https://openlibrary.org/search.json?q=${inputText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
}

const displayResult = (data) =>{
    // Total search result
    const totalResult = data.numFound
    const totalResultNumber = document.getElementById('total-result')
    totalResultNumber.innerText = totalResult

    // No result found error messege
    const errorMg = document.getElementById('error-noResult')
    if(!totalResult){
        errorMg.innerText = 'No Result Found!'
    }
    else{
        errorMg.innerText = ''
    }

    // result display container
    const bookContainer = document.getElementById('search-result')

    // clear Pervious result
    bookContainer.textContent = ''

    // I want to show Only 12 result From Total result
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
                    <p class="card-text">Publisher Name: ${book.publisher.slice(0,3)}</p>
                    <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                </div>
            </div>

        `
        bookContainer.appendChild(div)

    });
    
}

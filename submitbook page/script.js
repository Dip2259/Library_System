let Id = document.getElementById("IDvalue");
let submitbtn = document.getElementById("submitbtn");
let checkbtn = document.getElementById("checkbtn");
let books = document.getElementsByClassName("books")[0];
let removebtn = document.getElementsByClassName("remove");
let student_arr = JSON.parse(localStorage.getItem("student"))
let book_arr =[]
checkbtn.addEventListener("click",()=>{
    student_arr.forEach(elem=>{
        if(elem.ID == Id.value){
            book_arr = elem.BookList;
        }
    })
    updateBookList()
})
function updateBookList(){
    books.innerHTML = "";
    for(let i = 0; i< book_arr.length;i++){
        books.innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${book_arr[i].BookName}</td>
        <td>${book_arr[i].SubjectCode}</td>
        <td><img src="./circle-xmark-solid.svg" style="vertical-align:middle;cursor: pointer" id = "${i+1}" class="remove" width="15vw" ></td>
        </tr>`;
    }
    deleteop()
}
function deleteop(){
    Array.from(removebtn).forEach(e =>{
        e.addEventListener("click", (elem)=>{
            console.log("clicked")
            index = parseInt(elem.target.id)
            console.log(index)
            book_arr.splice(index-1,1)
            books.innerHTML = ''
            updateBookList()
        })
    })
}
submitbtn.addEventListener("click",()=>{
    student_arr.forEach(elem=>{
        if(elem.ID == Id){
            elem.BookList = book_arr;
        }
    })
    localStorage.setItem("student", JSON.stringify(student_arr))
    location.reload()
})
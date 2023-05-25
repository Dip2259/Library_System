let name =document.getElementById('name');
let roll =document.getElementById('roll');
let Id =document.getElementById('Id');
let sem =document.getElementById('sem');
let scode =document.getElementById('scode');
let bname =document.getElementById('bname');
let plus =document.getElementById('plus');
let submit =document.getElementById('submit');
let check =document.getElementById('check');
let done =document.getElementById('done');
let clearentry =document.getElementById('clear');
let list =document.getElementsByClassName('list')[0];
let student_arr =JSON.parse(localStorage.getItem('student'));
let book_arr = [];
if(student_arr == null){
    student_arr =[];
}
// let roll_remember = localStorage.getItem('roll');
function sudentobj(nm,rl,id,sem,barr){
    let obj = {
        Name: nm,
        Roll: rl,
        ID:id,
        SEM:sem,
        BookList:barr
    }
    return obj;
}
function bookobj(scode,bname){
    let obj = {
        SubjectCode:scode,
        BookName:bname
    }
    return obj;
}
function Check(){
    let bool = false;
    student_arr.forEach((elem)=>{
        if(elem.Roll == roll.value){
            book_arr =  elem.BookList;
            bool = true;
            name.value =elem.Name;
            Id.value =elem.ID;
            sem.value = elem.SEM;
            done.removeAttribute('disabled');
            clearentry.removeAttribute('disabled');
        }
    })
    return bool;
}
plus.addEventListener('click',()=>{
    book_arr.push(bookobj(scode.value,bname.value));
    scode.value = '';
    bname.value = '';
})
submit.addEventListener('click',()=>{
    student_arr.push(sudentobj(name.value,roll.value,Id.value,sem.value,book_arr));
    book_arr = [];
    // roll_remember = roll.value;
    // localStorage.setItem('roll',roll_remember);
    name.value ='';
    roll.value ='';
    Id.value ='';
    sem.value ='';
    scode.value ='';
    bname.value ='';
    localStorage.setItem('student',JSON.stringify(student_arr));
    // localStorage.setItem('books',JSON.stringify(book_arr));
})
check.addEventListener('click',()=>{
    let i = 1;
    if(Check()){
        list.innerHTML= "";
        book_arr.forEach((element)=>{
            let div = document.createElement('div')
            div.setAttribute('class','pad');
            let span1 = document.createElement('span');
            let span2 = document.createElement('span');
            let span3 = document.createElement('span');
            span1.setAttribute('class','listContent');
            span2.setAttribute('class','listContent');
            span3.setAttribute('class','listContent');
            span1.innerHTML = i;
            span2.innerHTML = element.BookName;
            span3.innerHTML = element.SubjectCode;
            div.appendChild(span1);
            div.appendChild(span2);
            div.appendChild(span3);
            i++;
            list.appendChild(div);
        })
    }
    else{
       let no_book = document.createElement('div');
       no_book.class ="pad";
       no_book.innerHTML = "No Books Found"
       list.appendChild(no_book);
    }
})
done.addEventListener('click',()=>{
    student_arr.forEach((elem)=>{
        if(elem.Roll == roll.value){
            elem.BookList = book_arr;
            roll.value ='';
        }
    })
    localStorage.setItem('student',JSON.stringify(student_arr));
    location.reload();
})
clear.addEventListener('click',()=>{
    location.reload()
})
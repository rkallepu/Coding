/**
 * Created by Rashmika on 29-08-2015.
 */
//To check if the DOM is ready for interaction
document.addEventListener('DOMContentLoaded', function(){
    var menuIcon = document.querySelector('.heading'),
        nav = document.querySelector('nav'),
        newbook = document.querySelector('.new_books .block_links .style_color'),
        nonewbook = document.querySelector('.new_books .block_links').firstElementChild,
        new_books = document.querySelector('.new_books'),
        add_newbook = document.getElementById('add_newbook'),
        formaddbook = document.querySelector('#add_newbook .block_links .style_color'),
        formcancel = document.querySelector('#add_newbook .block_links').lastElementChild,
        bookname = document.querySelector('input[name=bookname]'),
        author = document.querySelector('input[name=author]'),
        style = menuIcon.currentStyle || window.getComputedStyle(menuIcon, false),
        menu = new RegExp('menu'),
        newbooksJSON = {'books': []};

    //showing the menu bar in the responsive mode
    menuIcon.addEventListener('click', function () {
        if(style.backgroundImage.match(menu)){
            nav.style.display = 'block';
            menuIcon.style.backgroundImage = 'url(../images/icons/ic_close_24px.svg)';
        }
        else{
            nav.style.display = 'none';
            menuIcon.style.backgroundImage = 'url(../images/icons/ic_menu_24px.svg)';
        }
    });
    //to show the form on click of 'yes' in the 'Welcome back!' container
    newbook.addEventListener('click', function (){
        add_newbook.style.display = 'block';
    });
    //to remove the 'welcome back!' container if the user does not have any new books to add
    nonewbook.addEventListener('click', function(){
        new_books.style.display = 'none';
    });
    //if the user does not wants to add the book once he has the form
    formcancel.addEventListener('click', function(){
        add_newbook.style.display = 'none';
    });
    //adding a new book - first store in the JSON objects
    formaddbook.addEventListener('click', function(){
        if(newbooksJSON['books'].length > 0){
            newbooksJSON['books'].forEach(function(item){
               if(bookname.value === item.bookname && author.value === item.author){
                   alert('This book already exists');
               }
            });
        }else{
            newbooksJSON['books'].push({'bookname': bookname.value,'author':author.value});
            createBookTemplate(newbooksJSON);
        }
    });
});
//function to create the component for new book
function createBookTemplate(json){
    var parentDiv = document.getElementById('content_left');
    json['books'].forEach(function(item){
        console.log(item);
        var bookDiv = createElement('div', parentDiv, 'block_left');
        var imgDiv = createElement('div', bookDiv, 'block_img');
        createElement('img',imgDiv, null,null,{'src':'../images/dog.png', 'alt':'new book'});
        var section = createElement('section', bookDiv);
        createElement('div', section, 'text', item.bookname);
        createElement('div', section, 'subtext', item.author);
        createElement('hr', section);
        var div = createElement('div', section, 'block_links');
        createElement('p', div,null,'FREE SAMPLE');
        createElement('p', div,'style_color','REVIEW');
    });
}
//general function to create a DOM element
function createElement(element, parent, className, textcontent, attributes){
    var element = document.createElement(element);
    if (parent) parent.appendChild(element);
    if (className) element.className = className;
    if (textcontent) element.innerHTML = textcontent;
    if (typeof attributes !== 'undefined') {
        for (var attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
    }
    return element;
}

//Pure Js
console.dir("Hello Js Project.1 - Magic Notes App");
shownotes();
//If a user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
var notesArr;
var notes;

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let text = addTxt.value;
  // add Title textarea element
  let addTitle = document.getElementById('addTitle');
  let title = addTitle.value;
  
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } 
  else {
    notesArr = JSON.parse(notes);
  }
  // This how we take text from user; push into an array and store this array in the local storage as a string which can be later retrieved by parsing it back to an array.
  notesArr.push([title, text]);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  addTxt.value = "";
  addTitle.value = "";
  // console.dir(notesArr);
  // console.dir(e.target);
  // e.target calls upon the element which trigerred the event Listener. And this is a paramenter of the function in the event listener which gets passed onto it, and may be later used in the code by the programmer (if required).
  shownotes();
});
// shownotes sare items ko local storage se read kr ke; notes ki id waale div mei display krwa deta hai. Kind of an update function ruuning.
// function to show elements from local storage.
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let html = "";
  notesArr.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"><b>${element[0]}</b></h5>
                <p class="card-text">${element[1]}</p>
                <button id="${
                  index + 1
                }" onclick="deleteNote(this.id)" class="Delete btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesArr.length != 0) {
    notesElm.innerHTML = html;
  } 
  else {
    notesElm.innerHTML = `Notthing to Show here! <br> Please use 'Add to Note' button to add notes.`;
  }
}

Delete_All.addEventListener("click", function (e) {
  localStorage.clear();
  console.dir("Clearing All Notes .........");
  shownotes();
});

function deleteNote(index) {
  console.dir("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }

  notesArr.splice(index - 1, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  shownotes();
}

let search = document.getElementById("SearchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.dir("Input Event Fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  let NoteArr = Array.from(noteCards);
  NoteArr.forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    // console.dir(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*
Add Further Features:
1. Add a Custom Title
2. Mark a Note as Important
3. Separate Note by user
4. Sync and host to a web server

*/

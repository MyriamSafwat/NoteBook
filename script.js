let add = document.querySelector('.add');
let popApp = document.querySelector('.popApp');
let titleN = document.querySelector('.headerpop h4');
let close = document.getElementById('close');
let textarea = document.querySelector('textarea');
let text = document.querySelector('input');
let btn = document.querySelector("button");
let audio = new Audio("/suc.mp3");

const months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December",
];

let idEdit,
isEdit = false;

const notes = JSON.parse(localStorage.getItem("notes") || "[]");


add.addEventListener('click' , () => {
    popApp.classList.add ("open");
    btn.innerHTML ='Add';
    titleN.innerHTML= 'Add New';
    textarea.value = "";
    text.value = "";
});

close.addEventListener('click' , () => {
    popApp.classList.remove("open");
    isEdit = false;
});

btn.addEventListener('click', addNote);

function addNote(e) {
e.preventDefault();
let title = text.value.trim(),
    description = textarea.value.trim();
if (title && description) {
    let date = new Date(),
    month = months[date.getMonth()],
    day = date.getDate(),
    year = date.getFullYear();
    let noteInfo = {
    title,
    description,
    date: `${month}, ${day}, ${year}`,
    };
    if (isEdit) {
    notes[idEdit] = noteInfo;
    isEdit = false;
    } else {
    notes.push(noteInfo);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    audio.play();
    showNotes();
    close.click();
}
}

function showNotes() {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  if (!notes) return;
  notes.forEach((note, idx) => {

    let card = `
        <div class="cardstyle card">
        <div class="cardCon">
        <h4>${note.title}</h4>
        <p>
        ${note.description}
       </p>
    </div>
        <div class="cardDet">
        <span class="date">${note.date}</span>
        <div class="menuApp">
            <i class='bx bx-menu'></i>
            <ul class="menu">
              <li onclick="editNote(${idx}, '${note.title}', '${note.description}')"><i class="bx bxs-comment-edit"></i> Edit</li>
              <li onclick="removeNote(${idx})"><i class="bx bxs-comment-x"></i> Delet</li>
            </ul>
          </div>
        </div>
      </div>
      `;
    add.insertAdjacentHTML("afterend", card);
  });
}
showNotes();
// handle remove note
function removeNote(idNote) {
  let confrimD = confirm("Are You Sure ?");
  if (!confrimD) return;
  notes.splice(idNote, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// handle edit note
function editNote(idNote, title, description) {
  isEdit = true;
  idEdit = idNote;
  add.click();
  btn.innerHTML ='Edit';
  titleN.innerHTML= 'Edit Note';
  textarea.value = description;
  text.value = title;
}

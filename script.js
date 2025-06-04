// 1. Grab references to the <main> container and the “Add Note” button
const main = document.querySelector('.main');
const addBtn = document.querySelector('.add-btn');


// 2. When the page loads, read “notes” from localStorage (if any) and recreate those cards
window.onload = () => {
  // Try to parse an array from localStorage; if nothing is there, default to []
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  
  // For each saved string, call createNote(text) so we rebuild its card
  savedNotes.forEach(text => createNote(text));
};


// 3. saveNotes(): collect every <textarea>’s content, store that array into localStorage
function saveNotes() {
  // Find all <textarea class="inp-box"> currently in the DOM
  const allTextareas = Array.from(document.querySelectorAll(".inp-box"));
  
  // Build an array of their .value
  const notesArray = allTextareas.map(textarea => textarea.value);
  
  // Serialize and save
  localStorage.setItem("notes", JSON.stringify(notesArray));
}


// 4. createNote(text): builds one <div class="card"> with a <textarea> and a delete <button>
function createNote(text = "") {
  // 4a. Create the elements
  const card = document.createElement("div");
  const input = document.createElement("textarea");
  const delBtn = document.createElement("button");
  
  // 4b. Add classes & initial text
  card.classList.add("card");
  input.classList.add("inp-box");
  delBtn.classList.add("del-btn");
  
  delBtn.textContent = "🗑️";   // the trash icon
  input.value = text;         // if we passed in a saved string, put it here
  
  // 4c. Assemble: <div class="card"> → contains <textarea> + <button>
  card.appendChild(input);
  card.appendChild(delBtn);
  main.appendChild(card);
  
  // 4d. Whenever the user types in this textarea, immediately rewrite localStorage
  input.addEventListener("input", saveNotes);
  
  // 4e. When someone clicks THIS delete-button, remove ONLY its own card
  delBtn.addEventListener("click", (e) => {
    // e.target is the <button>; its parentElement is the <div class="card">
    e.target.parentElement.remove();
    saveNotes(); // and update localStorage right away
  });
}


// 5. Hook up “Add Note” button: create a new empty card + save immediately
addBtn.addEventListener('click', () => {
  createNote();
  saveNotes();
});

function openForm(){
    document.getElementById('noteForm').style.display = 'block';
    document.getElementById('btnSubmit').style.display = 'inline-block';
    document.getElementById('btnSaveEdit').style.display = 'none';
}

function init(){
    document.getElementById('btnCancel').addEventListener('click', reset)
    document.getElementById('btnSubmit').addEventListener('click', createNote)
    document.getElementById('btnSaveEdit').addEventListener('click', saveEdit)
}

document.addEventListener('DOMContentLoaded', init)

function reset(ev){
    ev.preventDefault();
    document.getElementById('form').reset();
    document.getElementById('inputContent').value = '';
    document.getElementById('noteForm').style.display = 'none';
}

function createNote(ev){
    ev.preventDefault();
    let note = JSON.parse(JSON.stringify(exp))
    locStor = JSON.parse(localStorage.getItem('noteList'))
    noteCounter++
    note.noteNum = noteCounter;
    note.name = document.getElementById('inputName').value;
    let date = formatDate(new Date()).split('/');
    date[2] = date[2].slice(-2) 
    note.created = date.join('/');
    note.category = document.getElementById('inputCategory').value;
    note.content = document.getElementById('inputContent').value;
    note.archive = 0;
    locStor.push(note);
    localStorage.setItem('noteList', JSON.stringify(locStor));
    printOutNote(note);
    document.getElementById('form').reset();
    document.getElementById('noteForm').style.display = 'none';
}
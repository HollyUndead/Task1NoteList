let id = 0;

function editNote(parentId){
    let note = JSON.parse(JSON.stringify(exp))
    parentId = '#'+parentId;
    let name = document.querySelector(parentId+' #name').innerText;
    document.getElementById('inputName').value = name;
    let category = document.querySelector(parentId+' #category').innerText;
    document.getElementById('inputCategory').value = category;
    let content = document.querySelector(parentId+' #content').innerText;
    document.getElementById('inputContent').innerText = content;
    openForm()
    document.getElementById('btnSubmit').style.display = 'none';
    document.getElementById('btnSaveEdit').style.display = 'inline-block';
    id = parentId.slice(8);
}

function saveEdit(ev){
    ev.preventDefault();
    document.querySelector('#noteNum'+id).remove();
    let locStor = JSON.parse(localStorage.getItem('noteList'))
    let myIndex = locStor.indexOf(locStor.find(note => note.noteNum == id));
    if (myIndex != -1){
        locStor.splice(myIndex,1)
    }
    localStorage.setItem('noteList', JSON.stringify(locStor))
    createNote(ev);
}



function deleteNote(parentId){
    document.getElementById(parentId).remove();
    let id = parentId.slice(7);
    let locStor = JSON.parse(localStorage.getItem('noteList'))
    let myIndex = locStor.indexOf(locStor.find(note => note.noteNum == id));
    if(locStor[myIndex].archive == 0){
        count = parseInt(document.querySelector('[data-category = "'+locStor[myIndex].category+'"] #activeCounter').innerText);
        count--
        document.querySelector('[data-category = "'+locStor[myIndex].category+'"] #activeCounter').innerText = count;
    }else{
        count = parseInt(document.querySelector('[data-category = "'+locStor[myIndex].category+'"] #archivedCounter').innerText);
        count--
        document.querySelector('[data-category = "'+locStor[myIndex].category+'"] #archivedCounter').innerText = count;
    }
    if (myIndex != -1){
        locStor.splice(myIndex,1)
    }
    localStorage.setItem('noteList', JSON.stringify(locStor))
}



function toArchive(parentId){
    let count, count1;
    document.getElementById(parentId).remove();
    let id = parentId.slice(7);
    let locStor = JSON.parse(localStorage.getItem('noteList'))
    let myIndex = locStor.indexOf(locStor.find(note => note.noteNum == id));
    let note = locStor[myIndex];
    if (note.archive == 0){
        note.archive = 1;
        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText);
        count++
        document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText = count;

        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText);
        count--
        document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText = count;
    }else{
        note.archive = 0;
        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText);
        count++
        document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText = count;

        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText);
        count--
        document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText = count;
    }
    
    localStorage.setItem('noteList', JSON.stringify(locStor))
}




function archiveSwitch(){
    document.getElementById('NoteList').innerHTML = '';
    let locStor = JSON.parse(localStorage.getItem('noteList'))
    clearCounters();
    if (document.getElementById('archiveSwitch').dataset.archived == 1){
        document.getElementById('archiveSwitch').dataset.archived = 0;
        document.getElementById('ArchiveShowState').innerText = 'Active'
        for (let i = 0; i<locStor.length; i++){
            noteCounter++;
            printOutNote(locStor[i], 0)
        }    
    }else{
        document.getElementById('archiveSwitch').dataset.archived = 1;
        document.getElementById('ArchiveShowState').innerText = 'Archived'
        for (let i = 0; i<locStor.length; i++){
            noteCounter++;
            printOutNote(locStor[i], 1)
        }   
    }
}
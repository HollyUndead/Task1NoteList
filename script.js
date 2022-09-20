let exp = {
    name: '',
    created: '',
    category: '',
    content: '',
    dates: '',
    noteNum: '',
    archive: 0
}

let noteCounter = 0;
// set starter notes
let locStor = JSON.parse(localStorage.getItem('noteList'));
if (locStor == null || locStor.length == 0){
    locStor = [
        {
            name: 'Alex',
            created: '5/10/20',
            category: 'Idea',
            content: 'Somthing in this spot',
            dates: '-',
            noteNum: '',
            archive: 0
        },
        {
            name: 'Alex',
            created: '5/10/23',
            category: 'Task',
            content: 'Somthing in this spot 5555',
            dates: '-',
            noteNum: '',
            archive: 1
        },
        {
            name: 'Alex',
            created: '5/11/23',
            category: 'Random thought',
            content: 'Somthing in this spot 5555',
            dates: '-',
            noteNum: '',
            archive: 0
        },
    ];
}

for (let i = 0; i<locStor.length; i++){
    noteCounter++;
    locStor[i].noteNum = noteCounter;
    printOutNote(locStor[i])
}
localStorage.setItem('noteList', JSON.stringify(locStor))

// search for dates
function searchForDates(content){
    const date = /(0?[1-9]|[12][0-9]|3[01])[- \.\/](0[1-9]|1[012])[- \.\/](19|20|\d\d)/;
    let str = content;

    if(date.test(str)!=true){
        return '-'
    }

    let a =[];
    while(date.test(str) == true){
        let res = str.match(date)[0];
        str = str.replace(res, '')
        a.push(res)
    }
    let f = /\.|\-|\s/;
    a.forEach((elemet, index) => {
        if(f.test(elemet)==true){
            let b = elemet.split(f)
            a[index] = b.join('/')
        }
    })
    return a.join(',')
}

//print out function
function printOutNote(note)
{
    let count;
    if (note.archive == 1){
        switch(note.category){
            case 'Idea':
                count = parseInt(document.querySelector('[data-category = "Idea"] #archivedCounter').innerText);
                count++
                document.querySelector('[data-category = "Idea"] #archivedCounter').innerText = count;
                break;
            case 'Random thought':
                count = parseInt(document.querySelector('[data-category = "Random thought"] #archivedCounter').innerText);
                count++
                document.querySelector('[data-category = "Random thought"] #archivedCounter').innerText = count;
                break;
            case 'Task':
                count = parseInt(document.querySelector('[data-category = "Task"] #archivedCounter').innerText);
                count++
                document.querySelector('[data-category = "Task"] #archivedCounter').innerText = count;
                break;
        }
        return 1;
    }
    let div = document.createElement('div')
    div.className = 'note'
    div.id = 'noteNum'+note.noteNum;

    let temp, a;
    temp = document.getElementsByTagName('template')[0];
    
    let img = temp.content.getElementById('categoryIMG')
    let name = temp.content.getElementById('name')
    let created = temp.content.getElementById('created')
    let category = temp.content.getElementById('category')
    let content = temp.content.getElementById('content')
    let dates = temp.content.getElementById('dates')
    let btn = temp.content.querySelectorAll('button')


    a = [];
    let img1 = document.importNode(img, true)
    switch(note.category){
        case 'Idea':
            img1.src = './idea.png'
            count = parseInt(document.querySelector('[data-category = "Idea"] #activeCounter').innerText);
            count++
            document.querySelector('[data-category = "Idea"] #activeCounter').innerText = count;
            break;
        case 'Random thought':
            img1.src = './random thoughts.png'
            count = parseInt(document.querySelector('[data-category = "Random thought"] #activeCounter').innerText);
            count++
            document.querySelector('[data-category = "Random thought"] #activeCounter').innerText = count;
            break;
        case 'Task':
            img1.src = './task.png'
            count = parseInt(document.querySelector('[data-category = "Task"] #activeCounter').innerText);
            count++
            document.querySelector('[data-category = "Task"] #activeCounter').innerText = count;
            break;
    }
    div.appendChild(img1)

    let name1 = document.importNode(name, true)
    name1.textContent = note.name;
    div.appendChild(name1);

    let created1 = document.importNode(created,true);
    created1.textContent = note.created;
    div.appendChild(created1)
    
    let category1 = document.importNode(category,true);
    category1.textContent = note.category;
    div.appendChild(category1);

    let content1 = document.importNode(content,true);
    content1.textContent = note.content;
    div.appendChild(content1)

    let dates1 = document.importNode(dates,true)
    dates1.textContent = searchForDates(note.content);
    div.appendChild(dates1);

    let b = [];
    btn.forEach((a) => {let buttons = document.importNode(a,true); b.push(buttons)})
    b.forEach((c) => {div.appendChild(c)})

    document.getElementById('NoteList').appendChild(div)
}


// create note
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

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

function clearLocal(){
    localStorage.clear(); 
    location.reload();
}

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

    if (document.getElementById('archiveSwitch').dataset.archived == 1){
        document.getElementById('archiveSwitch').dataset.archived = 0;
        document.getElementById('ArchiveShowState').innerText = 'Active'
        for (let i = 0; i<locStor.length; i++){
            noteCounter++;
            printOutNotArchived(locStor[i])
        }    
    }else{
        document.getElementById('archiveSwitch').dataset.archived = 1;
        document.getElementById('ArchiveShowState').innerText = 'Archived'
        for (let i = 0; i<locStor.length; i++){
            noteCounter++;
            printOutArchived(locStor[i])
        }   
    }

    function printOutArchived(note){
        if (note.archive == 0){
            return 1;
        }
        let count;
        let div = document.createElement('div')
        div.className = 'note'
        div.id = 'noteNum'+note.noteNum;

        let temp, a;
        temp = document.getElementsByTagName('template')[0];
        
        let img = temp.content.getElementById('categoryIMG')
        let name = temp.content.getElementById('name')
        let created = temp.content.getElementById('created')
        let category = temp.content.getElementById('category')
        let content = temp.content.getElementById('content')
        let dates = temp.content.getElementById('dates')
        let btn = temp.content.querySelectorAll('button')


        a = [];
        let img1 = document.importNode(img, true)
        switch(note.category){
            case 'Idea':
                img1.src = './idea.png'
                break;
            case 'Random thought':
                img1.src = './random thoughts.png'
                break;
            case 'Task':
                img1.src = './task.png'
                break;
        }
        div.appendChild(img1)

        let name1 = document.importNode(name, true)
        name1.textContent = note.name;
        div.appendChild(name1);

        let created1 = document.importNode(created,true);
        created1.textContent = note.created;
        div.appendChild(created1)
        
        let category1 = document.importNode(category,true);
        category1.textContent = note.category;
        div.appendChild(category1);

        let content1 = document.importNode(content,true);
        content1.textContent = note.content;
        div.appendChild(content1)

        let dates1 = document.importNode(dates,true)
        dates1.textContent = searchForDates(note.content);
        div.appendChild(dates1);

        let b = [];
        btn.forEach((a) => {let buttons = document.importNode(a,true); b.push(buttons)})
        b.forEach((c) => {div.appendChild(c)})

        document.getElementById('NoteList').appendChild(div)
        return 1;
    }
        
        
    function printOutNotArchived(note){
        if (note.archive == 1){
            return 1;
        }
        document.getElementById('archiveSwitch').dataset.archived = "0";
        let count;
        let div = document.createElement('div')
        div.className = 'note'
        div.id = 'noteNum'+note.noteNum;

        let temp, a;
        temp = document.getElementsByTagName('template')[0];
        
        let img = temp.content.getElementById('categoryIMG')
        let name = temp.content.getElementById('name')
        let created = temp.content.getElementById('created')
        let category = temp.content.getElementById('category')
        let content = temp.content.getElementById('content')
        let dates = temp.content.getElementById('dates')
        let btn = temp.content.querySelectorAll('button')


        a = [];
        let img1 = document.importNode(img, true)
        switch(note.category){
            case 'Idea':
                img1.src = './idea.png'
                break;
            case 'Random thought':
                img1.src = './random thoughts.png'
                break;
            case 'Task':
                img1.src = './task.png'
                break;
        }
        div.appendChild(img1)

        let name1 = document.importNode(name, true)
        name1.textContent = note.name;
        div.appendChild(name1);

        let created1 = document.importNode(created,true);
        created1.textContent = note.created;
        div.appendChild(created1)
        
        let category1 = document.importNode(category,true);
        category1.textContent = note.category;
        div.appendChild(category1);

        let content1 = document.importNode(content,true);
        content1.textContent = note.content;
        div.appendChild(content1)

        let dates1 = document.importNode(dates,true)
        dates1.textContent = searchForDates(note.content);
        div.appendChild(dates1);

        let b = [];
        btn.forEach((a) => {let buttons = document.importNode(a,true); b.push(buttons)})
        b.forEach((c) => {div.appendChild(c)})

        document.getElementById('NoteList').appendChild(div)
        return 1;
    }
}
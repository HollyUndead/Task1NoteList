function printOutNote(note, arc)
{
    let count;
    if (note.archive == 1){
        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText);
        count++
        document.querySelector('[data-category = "'+note.category+'"] #archivedCounter').innerText = count;
        if (arc == 0){
            return 1;
        }
    }else{
        count = parseInt(document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText);
        count++
        document.querySelector('[data-category = "'+note.category+'"] #activeCounter').innerText = count;
        if (arc == 1){
            return 1;
        }
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
}

function clearCounters(){
    let active = document.querySelectorAll('#activeCounter')
    active.forEach((a) => {
        a.innerText = '0'
    })
    let archived = document.querySelectorAll('#archivedCounter')
    archived.forEach((a) => {
        a.innerText = '0'
    })
}
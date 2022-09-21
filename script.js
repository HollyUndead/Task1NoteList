const exp = {
    name: '',
    created: '',
    category: '',
    content: '',
    dates: '',
    noteNum: '',
    archive: 0
}

const starterNotes = [
    {
        name: 'Go to the hospital',
        created: '5/10/20',
        category: 'Task',
        content: 'Needed to be in the hospital at 3pm 15/10/20',
        dates: '-',
        noteNum: '',
        archive: 1
    },
    {
        name: 'Do the task',
        created: '17/09/22',
        category: 'Task',
        content: 'Complite first task 20.09.22',
        dates: '-',
        noteNum: '',
        archive: 0
    },
    {
        name: 'Check email',
        created: '5/11/20',
        category: 'Task',
        content: 'Check email evryday at 8am',
        dates: '-',
        noteNum: '',
        archive: 0
    },
    {
        name: 'Finish reading book',
        created: '5/08/22',
        category: 'Random thought',
        content: 'Finish book in a few days',
        dates: '-',
        noteNum: '',
        archive: 1
    },
    {
        name: 'Improve pet-project',
        created: '15/09/22',
        category: 'Idea',
        content: 'Add a new feature to the project. User can click on legend`s portret and look through information about that legend',
        dates: '-',
        noteNum: '',
        archive: 0
    },
    {
        name: 'Rewrite my pet-project in React.js',
        created: '5/09/22',
        category: 'Random thought',
        content: 'Rewrite project in Reactjs',
        dates: '-',
        noteNum: '',
        archive: 0
    },
    {
        name: 'Comlpite walkthrough the game',
        created: '17/09/22',
        category: 'Random thought',
        content: 'Finish the game',
        dates: '-',
        noteNum: '',
        archive: 1
    },
];

let noteCounter = 0;

let locStor = JSON.parse(localStorage.getItem('noteList'));
if (locStor == null || locStor.length == 0){
    locStor = starterNotes.slice(0);
}

for (let i = 0; i<locStor.length; i++){
    noteCounter++;
    locStor[i].noteNum = noteCounter;
    printOutNote(locStor[i], 0)
}
localStorage.setItem('noteList', JSON.stringify(locStor))


function clearLocal(){
    localStorage.clear(); 
    location.reload();
}

export const noteService = {
    query,
    saveNewTxtNote,
    saveNewTodoNote,
    saveNewVideoNote,
    saveNewImgNote,
    deleteNote,
    getNoteById,
    updateNote,
    updateNoteTodo,
    updateNoteColor,
    updateNotePinned
    // getNextCarId test
}

import { storageService } from '../../../services/storage.service.js'
import { _makeId } from '../../../services/util.service.js'

// let gNotes;
const KEY = 'noteDB';
const dafultNotes = [
    {
        id: _makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "Learn Coding",
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: "https://picsum.photos/200/300",
            title: 'Thailand',
            txt: 'this is my photo from my trip in Thailand'
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: _makeId(),
        type: "todos",
        isPinned: true,
        info: {
            title: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: _makeId(),
        type: 'video',
        isPinned: false,
        info: {
            title: "My Crazy Video",
            url: 'https://www.youtube.com/embed/yJyClObyUOs',
            txt: 'I like this video, na na na , more things , na na na and even more things ...'
        },
        style: {
            backgroundColor: "#00d"
        },
        searchKey: 'beatles'
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
            title: 'My Dog',
            txt: 'I love my dog he is very sweet :)'
        },
        style: {
            backgroundColor: "#00d"
        }
    },
];
let gNotes = _loadNotesFromStorage() || dafultNotes;

// LOAD NOTES //

function query() {
    const storageNotes = _loadNotesFromStorage()
    gNotes = (storageNotes) ? storageNotes : dafultNotes;

    // if (filterBy) {
    //     let { vendor, minSpeed, maxSpeed } = filterBy
    //     maxSpeed = maxSpeed ? maxSpeed : Infinity
    //     minSpeed = minSpeed ? minSpeed : 0
    //     const carsToShow = gCars.filter(car => {
    //         return car.vendor.includes(vendor) &&
    //             car.speed >= minSpeed &&
    //             car.speed <= maxSpeed
    //     })
    //     return Promise.resolve(carsToShow)
    // }
    return Promise.resolve(gNotes)
}

//  DELTE NOTE //

function deleteNote(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage()
    return Promise.resolve()
}


function _getNoteIdxById(noteId) {
    console.log('noteId', noteId);
    console.log('gNotes', gNotes);
    return gNotes.findIndex(function (note) {
        return noteId === note.id
    })
}

// UPDATE NOTE //

function updateNote(newNote) {
    const noteIdx = _getNoteIdxById(newNote.id)
    gNotes.splice(noteIdx, 1, newNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNoteColor(noteId, color) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].style.backgroundColor = color
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNotePinned(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].isPinned = !gNotes[noteIdx].isPinned
    _saveNotesToStorage()
    return Promise.resolve()
}

// GET NOTE //

function getNoteById(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    return Promise.resolve(gNotes[noteIdx])
}


// TXT NOTE //

function saveNewTxtNote(info) { // {title, txt, isPinned, backgroundColor}
    const newTxtNote = _createTxtNote(info.title, info.txt)
    gNotes.push(newTxtNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createTxtNote(title, txt, isPinned = false, backgroundColor = '#fff') {
    return {
        id: _makeId(),
        type: 'txt',
        isPinned,
        info: {
            title,
            txt
        },
        style: {
            backgroundColor
        }
    }
}

// TODO NOTE //

function saveNewTodoNote(todo) { // {title, isPinned, backgroundColor, todos}
    todo.id = _makeId()
    gNotes.push(todo)
    _saveNotesToStorage()
    return Promise.resolve()
}

// function _createTodoNote(title, todosStr, isPinned = false, backgroundColor = '#fff') {
//     const todosArray = todosStr.split(',')
//     let todos = [];
//     todosArray.map(todo => {
//         todos.push({ txt: todo, doneAt: null })
//     })
//     return {
//         id: _makeId(),
//         type: "todos",
//         isPinned,
//         info: {
//             title,
//             todos
//         },
//         style: {
//             backgroundColor
//         }
//     }
// }

// UPDATE TODO //

function updateNoteTodo(noteId, todoIdx, newTodo) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].info.todos[todoIdx] = newTodo;
    _saveNotesToStorage()
    return Promise.resolve()
}

// VIDEO TODO //

function saveNewVideoNote(info) {  // info: {title, searchKey, url, isPinned, backgroundColor }
    const newVideoNote = _createVideoNote(info.title, info.url, info.searchKey, info.txt)
    gNotes.push(newVideoNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createVideoNote(title, url, searchKey, txt, isPinned = false, backgroundColor = '#fff') {
    return {
        id: _makeId(),
        type: 'video',
        isPinned,
        info: {
            title,
            url,
            txt
        },
        style: {
            backgroundColor
        },
        searchKey
    }
}

// IMG TODO //

function saveNewImgNote(info) {  // info: {title, url, isPinned, backgroundColor }
    const newVideoNote = _createImgNote(info.title, info.url, info.txt)
    gNotes.push(newVideoNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createImgNote(title, url, txt, isPinned = false, backgroundColor = '#fff') {
    return {
        id: _makeId(),
        type: "img",
        isPinned,
        info: {
            url,
            title,
            txt
        },
        style: {
            backgroundColor
        }
    }
}

// STORAGE - SAVE AND LOAD //

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}



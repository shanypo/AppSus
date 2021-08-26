
export const noteService = {
    query,
    updateNoteTodo,
    saveNewTxtNote,
    saveNewTodoNote,
    saveNewVideoNote,
    deleteNote
    // getNextCarId
}

import { storageService } from '../../../services/storage.service.js'
import { _makeId } from '../../../services/util.service.js'

let gNotes;
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
            title: "Bobi and Me"
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
            url: 'https://www.youtube.com/embed/yJyClObyUOs'
        },
        style: {
            backgroundColor: "#00d"
        }
    }
];

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
    return gNotes.findIndex(function (note) {
        return noteId === note.id
    })
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

function saveNewTodoNote(info) { // {title, isPinned, backgroundColor, todos}
    const newTxtNote = _createTodoNote(info.title, info.todos)
    gNotes.push(newTxtNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createTodoNote(title, todosStr, isPinned = false, backgroundColor = '#fff') {
    const todosArray = todosStr.split(',')
    let todos = [];
    todosArray.map(todo => {
        todos.push({ txt: todo, doneAt: null })
    })
    return {
        id: _makeId(),
        type: "todos",
        isPinned,
        info: {
            title,
            todos
        },
        style: {
            backgroundColor
        }
    }
}

// UPDATE TODO //

function updateNoteTodo(noteId, todoIdx, newTodo) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].info.todos[todoIdx] = newTodo;
    _saveNotesToStorage()
    return Promise.resolve()
}

// VIDEO TODO //

function saveNewVideoNote(info) {  // info: {title, searchKey, url, isPinned, backgroundColor }
    const newVideoNote = _createVideoNote(info.title, info.url)
    gNotes.push(newVideoNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createVideoNote(title, url, isPinned = false, backgroundColor = '#fff') {
    return {
        id: _makeId(),
        type: 'video',
        isPinned,
        info: {
            title,
            url
        },
        style: {
            backgroundColor
        }
    }
}

// IMG TODO //

function saveNewImgNote(info) {  // info: {title, searchKey, url, isPinned, backgroundColor }
    const newVideoNote = _createVideoNote(info.title, info.url)
    gNotes.push(newVideoNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _createVideoNote(title, url, isPinned = false, backgroundColor = '#fff') {
    return {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: "https://picsum.photos/200/300",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
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



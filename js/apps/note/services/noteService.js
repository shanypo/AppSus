
export const noteService = {
    query,
    updateNoteTodo,
    saveNewTxtNote
    // deleteCar,
    // getCarById,
    // getNextCarId
}

import { storageService } from '../../../services/storage.service.js'

let gNotes;
const KEY = 'noteDB';
const dafultNotes = [
    {
        id: "n101",
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
        id: "n102",
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
        id: "n103",
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
    }
];


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

// TODO NOTE //

function _getNoteIdxById(noteId) {
    return gNotes.findIndex(function (note) {
        return noteId === note.id
    })
}

function updateNoteTodo(noteId, todoIdx, newTodo) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].info.todos[todoIdx] = newTodo;
    _saveNotesToStorage()
    return Promise.resolve()
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
        id: "n108888",
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

// STORAGE - SAVE AND LOAD //

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}



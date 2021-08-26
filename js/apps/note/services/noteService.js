
export const noteService = {
    query,
    updateNoteTodo
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

// STORAGE SAVE AND LOAD //

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}
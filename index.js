let x = 0;
let array = [];
const inputEl = document.getElementById('input-el');
const saveEl = document.getElementById('save-el');
const delEl = document.getElementById('del-el');
const tabEl = document.getElementById('tab-el');
const ulEl = document.getElementById('ul-el');
let allList = '';
let leadsFromLocal = JSON.parse(localStorage.getItem('myLeads'));


if (leadsFromLocal && x == 0) {
    array = leadsFromLocal;
    // console.log(array);
    renderPage(false);
}
//  else {
//     console.log("There is no data's here.");
// }


saveEl.addEventListener('click', function() {
    let value = inputEl.value;
    getElement(value);
});

delEl.addEventListener('dblclick', function() {
    if (leadsFromLocal) {
        localStorage.clear();
        leadsFromLocal = JSON.parse(localStorage.getItem('myLeads'));
        array = [];
        allList = '';
        renderPage(false);
    } else {
        console.log('there is no data here.');
        return;
    }
})

tabEl.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        let value = tabs[0].url;
        getElement(value);
    })
})

function getElement(value) {
    // let value = inputEl.value;
    inputEl.value = '';
    inputEl.focus();
    console.log(value);
    if (value.length != 0) {
        if (array.length == 0 || typeof array == 'null') {
            insertElement(value);
        } else {
            if (array.includes(value)) {
                return;
            }
            insertElement(value);
        }
    }
}

function insertElement(element) {
    array.push(element);
    localStorage.setItem('myLeads', JSON.stringify(array));
    if (leadsFromLocal && x == 0) {
        // console.log('already leadsfromlocal is present.');
        renderPage(true);
        return;
    }
    x = 1;
    leadsFromLocal = JSON.parse(localStorage.getItem('myLeads'));
    renderPage(true);
}

function renderPage(check = false) {
    
    if (check) {
        allList += `
            <li> 
                <a target="_blank" href="${leadsFromLocal.at(-1)}" class="link-success link-offset-2
                 link-underline-opacity-25 link-underline-opacity-100-hover text-success">
                    ${leadsFromLocal.at(-1)}
                </a>
            </li>`;
    } else {
        addLists();
    }
    ulEl.innerHTML = allList;
}

function addLists() {
    if (leadsFromLocal) {
        for (const i of leadsFromLocal) {
            allList += `
                <li> 
                    <a target="_blank" href="${i}" class="link-success link-offset-2
                     link-underline-opacity-25 link-underline-opacity-100-hover text-success">
                        ${i}
                    </a>
                </li>`;
        }
    } else {
        return;
    }
}
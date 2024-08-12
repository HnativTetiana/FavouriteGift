import {  dataBaseConnection } from "./common.js";

import { ModalManagement } from "./modal.js";

function showCondition(condition, element) {
    if (condition) {
        element.style.display = "flex";
    } else {
        element.style.display = "none";
    }
};

function findElement(evt, closestClass, array) {
    const elementsListItem = evt.target.closest(closestClass);
    if (elementsListItem) {
        const elementId = elementsListItem.getAttribute("data-id");
        const element = array.find((element) => parseInt(element.id) === parseInt(elementId));
        return element || 0;
    }
    return 0;
}

function saveElementInSession(evt, closestClass, array, sessionStorageName) {
    if (findElement(evt, closestClass, array))
        sessionStorage.setItem(sessionStorageName, JSON.stringify(findElement(evt, closestClass, array)));
}

function searchByName(elementsListItem, elementClass) {
    const search = document.querySelector(".search-input").value.toLowerCase();

    elementsListItem.forEach((element) => {
        const elementName = element.querySelector(elementClass).textContent.toLowerCase();
        showCondition(elementName.includes(search), element);
    });
}

function sortItems(elementsListItem, priceClass, elementsList) {
    const sortValue = document.querySelector(".sort-list").value;
    const elementsArray = Array.from(elementsListItem);

    function sortByPrice() {
        elementsArray.sort(function (a, b) {
            let priceA = parseInt(a.getElementsByClassName(priceClass)[0].innerText) || 0;
            let priceB = parseInt(b.getElementsByClassName(priceClass)[0].innerText) || 0;
            return priceA - priceB;
        });
    }

    if (sortValue === "cheap") {
        sortByPrice();
    } else if (sortValue === "expensive") {
        sortByPrice();
        elementsArray.reverse();
    }

    elementsList.innerHTML = "";
    elementsArray.forEach(function (item) {
        elementsList.appendChild(item);
    });
}

async function addToList(object) {
    const { objectName, objectItemId, user, path, messageItem, messageList } = object;

    const myObject = {
        name: objectName,
        itemId: objectItemId,
        user,
    };

    const itemInTable = await dataBaseConnection("POST", path, myObject);

    const message = itemInTable === "Item is already exist" ? `${messageItem} has already been added to the ${messageList}!` : `${messageItem} added to the ${messageList}!`;

    ModalManagement(message, "#message-modal", "#close-modal-message", 0);

}

function buttonAddToList(object) {
    const { button, user, title } = object;

    if (button) button.addEventListener("click", () => {
        if (user > 0) {
            addToList(object);
        } else {
            ModalManagement(title, "#message-modal", "#close-modal-message", 0);
        }
    });
}

export {
    showCondition, findElement, saveElementInSession, searchByName, sortItems, buttonAddToList
};
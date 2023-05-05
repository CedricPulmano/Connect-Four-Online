// displays connection ID in the 'Connection' div
export function displayConnection(connectionID) {
    const header = document.getElementById("Connection");
    header.textContent = connectionID;
}

// appends new message in the 'Messages' div
export function addText(text, id) {
    const header = document.createElement("h3");
    header.textContent = text;
    const targetDiv = document.getElementById(id);
    targetDiv.append(header);
}

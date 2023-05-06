// displays connection ID in the 'Connection' div
export function displayConnection(connectionID) {
    const header = document.getElementById("Connection");
    header.textContent = connectionID;
}

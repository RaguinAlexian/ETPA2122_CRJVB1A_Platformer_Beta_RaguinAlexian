const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 912,
        height: 492,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
}
 
app.whenReady().then(createWindow)
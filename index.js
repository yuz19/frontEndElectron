const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 768,
        height: 560,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    ipcMain.handle('create-role', (event, data) => {
        if (!data || !data.role) {
            return { success: false, message: 'Invalid form data' };
        }
        const dataRoles=`  
    <Roles>
        <!-- Define your Roles here -->
        <Role name="${data.role}"/>
 `
        console.log(dataRoles)
    }
    )
    ipcMain.handle('create-file', (event, data) => {
        if (!data || !data.taskName || !data.taskType || !data.taskDirection) {
            return { success: false, message: 'Invalid form data' };
        }

        const xmlData = `
<?xml version="1.0" encoding="UTF-8"?>
<ECPMLModel>
    <Tasks>
        <Task name="${data.taskName}" type="${data.taskType}">
            <taskParameters>
                <taskParameter>
                    <direction>${data.taskDirection}</direction>
                    <linkedTask ref="${data.linkedTask}"/> 
                    <product ref="${data.linkedProduct}"/>
                </taskParameter>
            </taskParameters>
            <!-- TaskPerformer -->
            <taskPerformer>
                <Role ref="${data.role}"/>
                <linkedTask ref="${data.linkedTaskPerformer}"/>
            </taskPerformer>
            <!-- Link to Successor -->
            <linkToSuccessor>
                <successor ref="${data.successor}"/>
                <predecessor ref="${data.predecessor}"/>
                <linkKind>${data.linkKind}</linkKind>
            </linkToSuccessor>
        </Task>
    </Tasks>
`;
     
        const filePath = path.join(__dirname, 'notes', `${data.taskName}.xml`);
        fs.writeFile(filePath, xmlData, (err) => {
            if (err) {
                return { success: false, message: 'Error writing file' };
            }
            return { success: true, filePath };
        });
    });

    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

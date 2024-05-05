const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const dataProducts = [];
    const dataRoles = [];
    const taskData = [];
    const toolData = [];
    const useData = [];

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
        dataRoles.push(`<Role name="${data.role}"/>`);
        console.log(dataRoles);
    });
    ipcMain.handle('create-tool', (event, data) => {
        if (!data || !data.tool) {
            return { success: false, message: 'Invalid form data' };
        }
        toolData.push(`<toolDefinition name="${data.tool}"/>`);
        console.log(toolData);
    });
    ipcMain.handle('create-uses', (event, data) => {
        if (!data || !data.use || !data.tool) {
            return { success: false, message: 'Invalid form data' };
        }
        //changedata.use to ref
        useData.push(`<managedTask ref="${data.use}"/>
        <tool ref="${data.tool}"/>`);
        console.log(useData);
    });
    ipcMain.handle('create-product', (event, data) => {
        if (!data || !data.product || data.isComposite===null) {
            return { success: false, message: 'Invalid form data' };
        }
        dataProducts.push(`
            <workProduct name="${data.product}" isComposite="${data.isComposite}">
                <nestedProducts>
                    <nestedProduct>
                        <product></product>
                    </nestedProduct>
                </nestedProducts>
                <impactedProducts>
                    <impactedProduct>
                        <product></product>
                    </impactedProduct>
                </impactedProducts>
            </workProduct>
        `);
        console.log(dataProducts);
    });

    ipcMain.handle('create-task', (event, data) => {
        console.log("intask")
        if (!data || !data.taskName || !data.taskType || !data.taskDirection) {
            return { success: false, message: 'Invalid form data' };
        }
        taskData.push(`
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
        `);
        console.log(taskData);

       
    });
    ipcMain.handle('create-xml',()=>{
        const xmlData = `
        <?xml version="1.0" encoding="UTF-8"?>
        <ECPMLModel>
            <Tasks>
                ${taskData.join('')}
            </Tasks>
            <workProducts>
                ${dataProducts.join('')}
            </workProducts>
            <Roles>
                ${dataRoles.join('')}
            </Roles>
            <toolsDefinition>
                 ${toolData.join('')}
            
            </toolsDefinition>
            <uses>
                ${useData.join('')}

            </uses>
        </ECPMLModel>
    `;
    
    const filePath = path.join(__dirname, 'notes', `output.xml`);
    fs.writeFile(filePath, xmlData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return { success: false, message: 'Error writing file' };
        }
        console.log('File written successfully:', filePath);
        return { success: true, filePath };
    });
    })
    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

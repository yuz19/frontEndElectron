const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    title: "My Notes App",
    createNote: (data) => ipcRenderer.invoke('create-task', data),
    createRole: (data) => ipcRenderer.invoke('create-role', data),
    createProduct: (data) => ipcRenderer.invoke('create-product', data),
    createUse: (data) => ipcRenderer.invoke('create-uses', data),
    createTool: (data) => ipcRenderer.invoke('create-tool', data),
	createxml: () => ipcRenderer.invoke('create-xml'),
});

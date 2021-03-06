var {app, BrowserWindow} = require('electron');

var url = require('url');
var path = require('path');

let win = null;


app.on('ready',() => {
   win = new BrowserWindow({
      width: 760,
      height:490
    });
   // win.loadURL('http://localhost:4200');
    win.loadURL(url.format({
       pathname: path.join(__dirname ,'dist/index.html'),
       protocol: 'file:',
       slashes: true

    }));
    win.on('closed', ()=>{
        win = null;
    } );
   win.webContents.openDevTools();
  });

app.on('activate', () => {
    if (win == null){
      createWindow();
    }
} )

app.on( 'window-all-closed', ()=>{
  if(process.platform != 'darwin' ){
    app.quit();
  }
} )

# squirrelbox
Chrome extension you can use to save important texts you find on the internet. Forget bookmarking the whole link, instead save what you need

##Install the extension
1. Open chrome://extensions/ in chrome browser
2. check Developer mode if not done yet
3. Click on Load unpacked extension

##Start the backend server
1. Go to the server folder and install required dependencies
``npm install``
2. Start the server using pm2 or simply by typing the below command
``npm start``

##Deploy the web client into nginx
1. Open Gruntile.js and change the dist path to point to your systems nginx
``
var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: '/var/www/html/squirrelbox'
  };

``

##How to use the extension. 
1. Select the text you want to save on any page, right click and Save to Squirrel Box. You will not see the option if you do not select any text on the page. 
2. Click the extension icon on the page to your saved texts.


Enjoy!

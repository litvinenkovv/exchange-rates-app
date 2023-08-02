# exchange-rates-app


To build an application in the terminal, select the folder with the application and enter the command
### `npm install`

## Available Scripts
In the project directory, you can run:
to run app in developers mode
### `npm start`

to build an app
### `npm run build`

__How to use__

It is a web application that allows you to convert currencies in real time, available on the fixer.io website.

The implementation is very simple. You choose the currency you want to convert from and the currency you want to convert to.

The amount can be entered either manually or by using the buttons in the box. Once the amount is entered, it is immediately converted and displayed on the form.

You can also freely change currencies and the amounts will be calculated automatically. Access to the site's API requires an access code, which can be entered in the field that appears when the user clicks on the "Settings" button. If the API code is incorrect, the data will not be downloaded and the user will receive a message to that effect.

The API key you enter is saved to local memory and will be read and used to access data from the site the next time the window is refreshed or the application is opened.

---

In the application, I reuse components to display the amount and currency input fields, as well as to display errors.

I should also note that in the example above the currency name is full, but I have a short one because the free licence terms on the fixer.io website don't allow this. 
If this file could be downloaded, then at the start of the application I would load the names into the drop down list, as I do from the main file of exchange rates.
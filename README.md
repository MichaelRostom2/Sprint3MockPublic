## Project Details

**Project Name**: Mock
**Team & Contributions**: Dolaniyi , Mrostom
**Repo**: https://github.com/cs0320-s24/mock-mrostom-dolaniyi.git

## Design Choices

**Components & Interfaces**: Our App file initiates the component "REPL": which in turn displays the Components "REPLInput" and "REPLHistory." The core functionality of our program lies inbetween the functions between these three React components. With "REPL" acting as a center point, it passes a set of props (through the interface "REPLInputProps") into "REPLInput".

"REPLInput" manages the direction of user input to action and is thus responsible for processing commands. A "result" variable is set to the output of each command and this variable is then appending to the History array within REPLInputProps. This same array is then passed into the "REPLHistoryProps" interface to call "REPLHistory".

"REPLHistory" takes the inputed history array, loops through its contents, and creates a unique div element for each item. The contents of the div are set with the "dangerouslySetInnerHTML" attribute as the respective item of the array is used as the new inner HTML value.

**Data Structures**: We used a Record to structure our command map: mapping strings (Keys) to function (Values). As ProcessInput() is called, the inputed text through the input field is broken into an array of strings. The first element of this array is excluded as the Key and is used to retrieve the corresponding function Value. As the rest of the array elements are passed through the retrived function as arguments, the respective function operates based on the inputed values and returns a string value that will be stored in a variable "result".

To mock retrieved CSV files, we stored 2D string arrays in a typescript file titled "mockedJson". These arrays are then stored in a Map to mock our backend.

To mock the retrieval of CSV files for the Load command, we use a Map structure to simulate how our backend will eventually retrieve datasets.

A finite set of filepaths are specified as keys so that when filepaths are inputed for the Load Command, the correct Dataset will be loaded.

The final loaded CSV will be represented in a 2D array. This structure provides us the capacity to loop through its contents and create an HTML table.

## Errors / Bugs

None known.

## Tests

**has title**: Checks if the page title is Mock.
**on page load, i see a login button**: Checks if a login button is visible on the page load.
**on page load, i dont see the input box until login**: Checks if the input box is not visible on the page load and becomes visible after login.
**after log out, i dont see the input box**: Checks if the input box is not visible after logging out.
**after I type into the input box, its text changes**: Checks if the text in the input box changes when the user types.
**on page load and login, i see a submit button**: Checks if a submit button is visible on the page load after login.
**entering mode brief command**: Tests entering the mode brief command displays correct result.
**mode verbose changing command testing**: Tests entering the mode verbose command displays expected result.
**mode verbose output testing**: Tests the output after entering the mode verbose command followed by the load_file command.
**changing mode to something other than brief/vebose**: Tests entering an invalid mode command.
**load_file command testing**: Tests the load_file command with a correct file path.
**load_file incorrect path command testing**: Tests the load_file command with an incorrect file path.
**load_file no path command testing**: Tests the load_file command without a file path.
**view without load command testing**: Tests the view command without loading a file first.
**view command testing on file 1**: Tests the view command on the first data file.
**view command testing on file 2**: Tests the view command on the second data file.
**view command testing with verbose output**: Tests the view command with verbose mode enabled.
**search without load command testing**: Tests the search command without loading a file first.
**search command by index testing**: Tests the search command by index.
**search command by column name testing**: Tests the search command by column name.
**search command without arguments**: Tests the search command without arguments.
**search command with verbose output**: Tests the search command with verbose mode enabled.

## How-To

After starting the program through the Terminal with **npm run start**, the program can be interacted with as expected via the User Stories. A space must seperate each keyword:

[mode] + ([brief] or [verbose]): changes the way the output is displayed to the user
EG: **mode brief**

[load_file] + [(FILEPATH)]: loads a specific file, can be viewed with the next command
EG: **load_file ./data/1.csv**

[view]: displays the loaded file
EG: **view**

[search] + ([(COLUMN_NAME)] or [COLUMN_INDEX]) + [(VALUE)]: displays the loaded file
EG: **search earnings 2020**

For developers: In order to add your own commands. Modify the REPLInput by adding your own function and then add that function to the commandMap where instructed. You can remove any of the built-in commands by removing them from the addition to the commandMap.

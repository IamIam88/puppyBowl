const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2310-FTB-ET-WEB-WE';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        //API call response and result here
        const response = await fetch(APIURL);
        const result = await response.json();
        console.log(result);
        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};


const fetchSinglePlayer = async (playerId) => {
    try {
        console.log(playerId)
        const url = APIURL  + `/${playerId}`
        console.log(url)

        const response = await fetch(url)
        const result = await response.json()
        console.log(result)

        renderSinglePlayer(result.data.player)

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const removePlayer = async (playerId) => {
    try {
        await fetch(APIURL + `/${playerId}` , {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
        })
        const playerList = await fetchAllPlayers()
        renderAllPlayers(playerList)
        renderNewPlayerForm()
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        playerContainer.textContent = ""
        const playerElements = playerList.map(player => {

            const playerDiv = document.createElement("div")
            playerDiv.classList.add("playerDiv")
            
            const playerId = document.createElement("p")
            playerId.textContent = player.id

            const playerName = document.createElement("p")
            playerName.textContent = player.name

    
            const playerBreed = document.createElement("p")
            playerName.textContent = player.breed

            const playerStatus = document.createElement("p")
            playerStatus.textContent = player.status

            const playerImageUrl = document.createElement("img")
            playerImageUrl.src = player.imageUrl

            const viewButton = document.createElement("button")
            viewButton.textContent = "View Player"
            viewButton.addEventListener("click", ()=> {fetchSinglePlayer(player.id)})

            const deleteButton = document.createElement("button")
            deleteButton.textContent = "Delete Player"
            deleteButton.addEventListener("click", () => {removePlayer(player.id)})

            playerDiv.append(playerId, playerName, playerBreed, playerStatus, playerImageUrl, viewButton, deleteButton);
            return playerDiv                
            
            });

            playerContainer.append(...playerElements);

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

const renderSinglePlayer = (player) => {
    try {
        newPlayerFormContainer.textContent = ""

        const playerDiv = document.createElement("div")
        playerDiv.classList.add("singleView")

        const puppyId = document.createElement("p")
        puppyId.textContent = player.id

        const playerName = document.createElement("p")
        playerName.textContent = player.name
    
        const playerBreed = document.createElement("p")
        playerBreed.textContent = player.breed

        const playerStatus = document.createElement("p")
        playerStatus.textContent = player.status

        const playerImageUrl = document.createElement("img")
        playerImageUrl.src = player.imageUrl

        playerDiv.append(puppyId, playerName, playerBreed, playerStatus, playerImageUrl)
        playerContainer.append(playerDiv)
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const renderNewPlayerForm = () => {
    try {
        //rendering whatever the api form is asking for (DOM manipulation)
        //whatever we created in renderAllPlayers can be copied to this section (will be very very similiar)
        //BUILD FORM WITH DOM MANIUPULATION
        //append it to the page
        const addForm = document.createElement("form")
        const puppyName = document.createElement("input")
        const submitButton = document.createElement("button")
        submitButton.textContent = "submit"
        submitButton.addEventListener("click", () => {
            if(addNewPlayer.playerName.value === "") {
                alert("Please enter a name")
            } else {
                const newPlayerFormContainer ={
                    id: addForm.playerId.value,
                    name: addForm.playerName.value,
                    breed: addForm.playerBreed.value,
                    status: addForm.playerStatus.value
                }
            }
        })
        addForm.append(puppyName, submitButton)
        playerContainer.prepend(addForm)

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}


const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();
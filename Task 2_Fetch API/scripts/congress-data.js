var url = "https://api.propublica.org/congress/v1/113/senate/members.json"

function loadData(){

    fetch(url,{ headers:{
        "x-api-key": "br9Tx0TAtdk9PJDYJrXXes2QZ8zB5JFSAGiPjBn8"
    }})
    .then(response => response.json())
    .then(data =>{
        let members = data.results["0"].members;
        document.getElementById("filter-state").innerHTML = createStateMenu(members);
        document.getElementById("filter-party").addEventListener("click", function(){updateTable(members)});
        document.getElementById("filter-state").addEventListener("change", function(){updateTable(members)});
        updateTable(members);
    })  
    .catch(err => console.log(err));
}


//Create State Dropdown Menu:
function createStateMenu(votants){
    let states = votants.map(votant => votant.state).sort();
    let dropdownMenu = `<option class="dropdown-item" name="filter-states" value="default"=> Filter by state </option>`;
    let unique = [...new Set(states)].forEach(state => {
        const dropdownItem =`<option class="dropdown-item" name="filter-states" value=`+ state + `>`+ state +`</option>`;
        dropdownMenu += dropdownItem;
    })
    return dropdownMenu;   
}

//Filter by checkboxes:
function filterByParty(votants){
    let checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')).map(checkbox => checkbox.value);
    let filterParty = votants.filter(member => checkedBoxes.includes(member.party));
    if (checkedBoxes.length === 0) {return votants;}
    else {return filterParty;}
}

//Filter by Dropdown Menu:
function filterByState(votants){
    var statesDropdown = document.getElementById('filter-state');
    var value= statesDropdown[statesDropdown.selectedIndex].value;
    let filterState = votants.filter (member => member.state === value);
    if (value === "default"){return votants;}
    else {return filterState;}
}

//Create table:
function createTable(votants){
    var tableHTML =[];
    for (const member of votants) {
        const rowHTML = 
        `<tr> <td><a href="${member.url}"> ${member.last_name}, ${member.first_name} ${member.middle_name || ""}</a></td>
        <td>${member.party}</td>
        <td> ${member.state}</td>
        <td>${member.seniority}</td>
        <td>${member.votes_with_party_pct}% </td></tr>`;
        tableHTML += rowHTML;
    }
    document.getElementById("senate-data").innerHTML = tableHTML;
}

function updateTable(votants){
    var filterParty = filterByParty(votants);
    var filterState = filterByState(filterParty);
    var filterResults = filterState;
    if (filterResults === 0) {createTable(votants);}
    else {createTable(filterResults);}      
}

loadData()
 
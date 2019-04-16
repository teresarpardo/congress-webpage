const members = data.results[0].members;

//Create State Dropdown Menu:
function CreateStateMenu(votants){
    let states = votants.map(votant => votant.state).sort();
    let dropdownMenu = `<option class="dropdown-item" name="filter-states" value="default"=> Filter by state </option>`;
    let unique = [...new Set(states)].forEach(state => {
        const dropdownItem =`<option class="dropdown-item" name="filter-states" value=`+ state + `>`+ state +`</option>`;
        dropdownMenu += dropdownItem;
    })
    return dropdownMenu;   
}

//Filter by checkboxes:
function filterByParty(){
    let checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')).map(checkbox => checkbox.value);
    let filterParty = members.filter(member => checkedBoxes.includes(member.party));
    if (checkedBoxes.length === 0) {return members;}
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

function updateTable(){
    var filterParty = filterByParty();
    var filterState = filterByState(filterParty);
    var filterResults = filterState;
    if (filterResults === 0) {createTable(members);}
    else {createTable(filterResults);}      
}

// Event Listener:
document.getElementById("filter-state").innerHTML = CreateStateMenu(members);
document.getElementById("filter-party").addEventListener("click", updateTable);
document.getElementById("filter-state").addEventListener("change", updateTable);
updateTable();
 

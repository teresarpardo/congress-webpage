const members = data.results[0].members;
let partyMembers = findPartyMembers();


//Order Members by party:
function findPartyMembers(){
    var orderedMembers = {
        democrats: [],
        republicans:[],
        independents:[]
    };

    for (const member of members){
        if (member.party === "R"){
            totalDemocrats = orderedMembers.democrats.push(member);
        } else if (member.party === "D"){
            totalRepublicans = orderedMembers.republicans.push(member);
        } else {
            totalIndependents = orderedMembers.independents.push(member);
        }
    }
    return orderedMembers;   
}

//Suma de la cantidad de miembros de cada partido:
function findTotalMembers(votantsType) {
    return votantsType.length;
}

//Porcentages de cada partido:
function findAvgVotes(votantsType) {
    let values = votantsType.map(a => a.votes_with_party_pct);
    let sum = values.reduce (function(a, b) { return a + b; }, 0);
    if (sum ===0){return "0"}
    else {return (sum/values.length).toFixed(2);}
}

// Least Loyal and Most Engaged:
function findLlMe(votants, property) {
    let ordVotants = votants.sort((a, b) => a[property] - b[property]);
    let values = ordVotants.map(a => a[property]);
    let maxValue = Math.round(values.length/10-1);
    const result = ordVotants.filter(a => a[property] <= values[maxValue]);
    return result;
}

// Least Engaged and Most Loyal:
function findLeMl(votants, property) {
    let ordVotants = votants.sort((a, b) => b[property] - a[property]);
    let values = ordVotants.map(a => a[property]);
    let minValue = Math.round(values.length/10-1);
    const result = ordVotants.filter(a => a[property] >= values[minValue]);
    return result;
}

//Create Vote Table:
function createTableAttendance(votants){
  
    var tableHTML =[];

    for (const member of votants) {
        const rowHTML = 
      `<tr><td><a href="${member.url}">${member.last_name}, ${member.first_name} ${member.middle_name || ""}</a></td>
       <td>${member.missed_votes}</td>
       <td>${member.missed_votes_pct}</td></tr>`;

        tableHTML += rowHTML;
    }
    return tableHTML;
}
function createTableLoyalty(votants){

    var tableHTML =[];

    for (const member of votants) {
        const rowHTML = 
      `<tr> <td><a href="${member.url}">${member.last_name}, ${member.first_name} ${member.middle_name || ""}</a></td>
       <td>${member.total_votes}</td>
       <td>${member.votes_with_party_pct}</td></tr>`;

        tableHTML += rowHTML;
    }
    return tableHTML;
}

//Tabla 1:
document.getElementById("dem-number").innerHTML = findTotalMembers(partyMembers.democrats);
document.getElementById("rep-number").innerHTML = findTotalMembers(partyMembers.republicans);
document.getElementById("ind-number").innerHTML = findTotalMembers(partyMembers.independents);
document.getElementById("total-number").innerHTML = findTotalMembers(members);
document.getElementById("dem-pct").innerHTML = findAvgVotes(partyMembers.democrats);
document.getElementById("rep-pct").innerHTML = findAvgVotes(partyMembers.republicans);
document.getElementById("ind-pct").innerHTML = findAvgVotes(partyMembers.independents);
document.getElementById("total-pct").innerHTML = findAvgVotes(members);

//Tabla 2 y 3:
if(document.getElementById("least-engaged")!= null){
    document.getElementById("least-engaged").innerHTML = createTableAttendance(findLeMl(members, "missed_votes_pct"))}
if(document.getElementById("most-engaged")!= null){
    document.getElementById("most-engaged").innerHTML = createTableAttendance(findLlMe(members, "missed_votes_pct"))}
if(document.getElementById("least-loyal")!= null){
    document.getElementById("least-loyal").innerHTML = createTableLoyalty(findLlMe(members, "votes_with_party_pct"))}
if(document.getElementById("most-loyal")!= null){
    document.getElementById("most-loyal").innerHTML = createTableLoyalty(findLeMl(members,"votes_with_party_pct"))}
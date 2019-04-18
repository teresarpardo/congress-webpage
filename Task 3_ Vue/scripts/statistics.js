var app = new Vue({
    el: "#app",
    data: {
        members: {},
        republicans: {}

    },
    computed: {
        democrats(){
            return this.members.filter(member => member.party === "D")
        },
        independents(){
            return this.members.filter(member => member.party === "I")
        }
    },
    methods: {
        fetchData: function(){
            fetch(url,{ headers:{
                "x-api-key": "br9Tx0TAtdk9PJDYJrXXes2QZ8zB5JFSAGiPjBn8"
            }})
            .then(response => response.json())
            .then(data => data.results["0"].members)
            .then(members => {
                this.members = members;
                this.republicans = members.filter(member => member.party === "R") 
            })  
            .catch(err => console.log(err));
        },
        findAvgVotes(votantsType) {
            let values = votantsType.map(a => a.votes_with_party_pct);
            let sum = values.reduce (function(a, b) { return a + b; }, 0);
            if (sum ===0){return "0"}
            else {return (sum/values.length).toFixed(2);}
        },
        // Most Engaged and Least Loyal:
        findLlMe(property) {
            this.members.sort((a, b) => a[property] - b[property]);
            let values = this.members.map(member => member[property]);
            let maxValue = Math.round(values.length/10-1);
            const result = this.members.filter(member => member[property] <= values[maxValue]);
            return result;
        },
        // Least Engaged and Most Loyal:
        findLeMl(property) {
            this.members.sort((a, b) => b[property] - a[property]);
            let values = this.members.map(member => member[property]);
            let minValue = Math.round(values.length/10-1);
            const result = this.members.filter(member => member[property] >= values[minValue]);
            return result;
        }
    },
    created: function(){
        this.fetchData()
    }
})

var app = new Vue ({
    el: "#app",
    data: {
        apiUrl: "https://api.propublica.org/congress/v1/113/senate/members.json",
        members: {},
        states: {}, 
        filterByParty: [], 
        filterByState: "All states",
    },
    computed: {
        filterMembers: function(){
            let filterArr = this.members

            if(this.filterByParty != ""){
               filterArr = filterArr.filter(member => this.filterByParty.includes(member.party))
            } 
            if(this.filterByState != "All states"){
                filterArr = filterArr.filter(member => member.state === this.filterByState)
            } 

            return filterArr;
        }

    },
    methods: {
        fetchData: function(){
            let url = this.apiUrl;
        
            fetch(url,{ headers:{
                "x-api-key": "br9Tx0TAtdk9PJDYJrXXes2QZ8zB5JFSAGiPjBn8"
            }})
            .then(response => response.json())
            .then(data => data.results["0"].members)
            .then(members => {
                this.members = members;
                this.states = [...new Set(members.map(member => member.state).sort())]
            })  
            .catch(err => console.log(err));
        }
    },
    created: function(){
        this.fetchData()
    }

})
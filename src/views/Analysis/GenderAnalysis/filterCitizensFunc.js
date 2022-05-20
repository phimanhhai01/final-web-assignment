export const filterCitizensFunc = (citizens, filterListAnalysis) => {
    let filteredCitizens = [];
        let filterListId = filterListAnalysis.map(e => e.id);
        filteredCitizens = citizens.filter(e => {
            for(let i = 0 ; i<filterListId.length ; i++){
                if(e.village_id.search(filterListId[i]) !== -1){
                    return true;
                }
            }
        });
    return filteredCitizens;
}
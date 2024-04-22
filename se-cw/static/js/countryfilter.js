document.addEventListener('DOMContentLoaded', function() {
    const continentSelect = document.getElementById('continent-select');
    const regionSelect = document.getElementById('region-select');
    const regionsByContinent = {
        "Asia": [
            "Southern and Central Asia", 
            "Middle East", 
            "Southeast Asia"
        ],
        "Europe": [
            "Western Europe", 
            "Eastern Europe", 
            "Baltic Countries", 
            "Nordic Countries", 
            "British Islands"
        ],
        "Africa": [
            "Eastern Africa", 
            "Northern Africa", 
            "Central Africa"
        ],
        "Oceania": [
            "Australia and New Zealand", 
            "Melanesia", 
            "Polynesia", 
            "Micronesia"
        ],
        "North America": [
            "North America", 
            "Caribbean"
        ],
        "South America": [
            "South America"
        ],
        "Antarctica": [
            "Antarctica"
        ]
    };

    // Function to create a reverse lookup to find continent from region
    const continentFromRegion = {};
    for (const [continent, regions] of Object.entries(regionsByContinent)) {
        regions.forEach(region => {
            continentFromRegion[region] = continent;
        });
    }

    // Function to update regions based on the selected continent
    function updateRegionsForContinent(selectedContinent) {
        let regions = [];
        if (selectedContinent === "All Continents") {
            // Aggregate all regions if "All Continents" is selected
            for (let regionList of Object.values(regionsByContinent)) {
                regions = regions.concat(regionList);
            }
        } else {
            regions = regionsByContinent[selectedContinent] || [];
        }

        regionSelect.innerHTML = '<option value="" disabled selected>Select a Region</option>';
        if (selectedContinent === "All Continents") {
            regionSelect.innerHTML += '<option value="All Regions" selected>All Regions</option>';
        }
        regions.forEach(function(region) {
            const option = new Option(region, region);
            regionSelect.add(option);
        });
    }

    // Function to update continent based on the selected region
    function updateContinentForRegion(selectedRegion) {
        const continent = continentFromRegion[selectedRegion];
        continentSelect.value = continent || "All Continents";
    }

    continentSelect.addEventListener('change', function() {
        updateRegionsForContinent(this.value);
    });

    regionSelect.addEventListener('change', function() {
        updateContinentForRegion(this.value);
    });

    // Initialize regions based on the default selected continent
    updateRegionsForContinent(continentSelect.value);
});

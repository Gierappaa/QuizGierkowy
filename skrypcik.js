const axios = require('axios');
const fs = require('fs');

function groupDataByPlatform(data) {
    return data.reduce((memo, entry) => {
        console.log(entry);

        const platforms = entry.platforms;
        if (platforms && platforms.length) {
            platforms.forEach((platform) => {
                let platformData = memo[platform.abbreviation];

                if (platformData) {
                    platformData = {
                        ...platformData,
                        ...platform,
                        games: [
                            ...platformData.games,
                            entry
                        ]
                    }
                } else {
                    platformData = {
                        ...platform,
                        games: [
                            entry,
                        ]
                    }
                }

                memo[platform.abbreviation] = platformData;
            });
        } else {
            memo['UNKNOWN'] = {
                name: 'Unknown',
                games: [
                    entry,
                ]
            }
        }

        return memo;
    }, {});
}

// Make a request for a user with a given ID
axios.get('https://www.giantbomb.com/api/games/?format=json&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232')
    .then(function (response) {
        // handle success
        fs.writeFileSync('data.json',
            JSON.stringify(groupDataByPlatform(response.data && response.data.results || []), null, 4),
        );
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });

// Make a request for a user with a given ID
axios.get('https://www.giantbomb.com/api/game/3030-68742/?format=json&api_key=564595a22fe0a85a71f47b1e8a6644fc66e80232')
    .then(function (response) {
        // handle success
        console.log(response);
        // console.log(JSON.stringify(response, null, 4));
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });

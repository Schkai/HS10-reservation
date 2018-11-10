const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    /*const urls = [
        'http://www.heimspiel-filmfest.de/programm/',
        'http://www.heimspiel-filmfest.de/filme/jusqua-la-garde/',
        'http://www.heimspiel-filmfest.de/filme/get-out-2/',
    ];

    for (let i = 0; i < urls.length; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url = urls[i];
        await page.goto(`${url}`);

        const result = await page.evaluate(() => {
            Array.from(document.querySelectorAll('tr.timetable-item')).map(
                timetable => ({
                    time: timetable
                        .querySelector('td.film-uhrzeit')
                        .innerText.trim(),
                    location: timetable
                        .querySelector('td.film-ort')
                        .innerText.trim(),
                    title: timetable
                        .querySelector('td.film-titel')
                        .innerText.trim(),
                    omu: timetable
                        .querySelector('td.film-audio')
                        .innerText.trim(),
                })
            );
        });

        console.log(urls[i]);
        console.log(result);
        await browser.close();
    }

    */
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    const url = 'http://www.heimspiel-filmfest.de/filme/jusqua-la-garde/';
    await page.goto(url);

    // TODO: Automatisch einen Key für React erstellen. Am besten direkt im Mapping
    // Scrapes the programm page for all entries and saves their time, location, title and omu

    const entries = await page.evaluate(() => {
        Array.from(document.querySelectorAll('h3')).map(query => ({
            data: query.innerText.trim(),
        }));
    });

    console.log(entries);

    /*
    const entries = await page.evaluate(() =>
        Array.from(document.querySelectorAll('tr.timetable-item')).map(
            timetable => ({
                time: timetable
                    .querySelector('td.film-uhrzeit')
                    .innerText.trim(),
                location: timetable
                    .querySelector('td.film-ort')
                    .innerText.trim(),
                title: timetable
                    .querySelector('td.film-titel')
                    .innerText.trim(),
                omu: timetable.querySelector('td.film-audio').innerText.trim(),
            })
        )
    );*/
    console.log(entries);

    await browser.close();

    //  getTickets(entries);
    // function getTickets(data) {
    //     console.log(data);
    /*  const screeningData = Array.from(
            data.map(data => ({
                title: data.title,
                time: data.time,
                location: data.location,
                omu: data.omu,
                tickets: switch(data.location){
                    case data.location = "Akademiesalon":
                    return 20;
                    break;
                }

            }))
        );
        console.log(screeningData);
        return screeningData;
        */
    //}
    //TODO: Scrape all sites of the program section and extract the exact time and picture.
    // combine this with the affore scraped data
    // Write the scraped data to a json file
    /* fs.writeFile('./data2.json', JSON.stringify(entries), 'utf8', function(
        err
    ) {
        if (err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    });
*/
})();

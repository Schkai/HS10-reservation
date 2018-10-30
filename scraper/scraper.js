const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    const url = 'http://www.heimspiel-filmfest.de/programm/';
    await page.goto(url);

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
    );

    console.log(entries);

    await browser.close();
})();

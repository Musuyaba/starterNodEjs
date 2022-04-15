exports.index = function (req, res) {
    var exampleJson = [
        { name: 'Sammy', organization: "Test A", birth_year: 2012 },
        { name: 'Tux', organization: "Test B", birth_year: 1996 },
        { name: 'Moby Dock', organization: "Test C", birth_year: 2013 }
    ];

    res.render('pages/index', {
        exampleTeks: "Teks Index",
        exampleJson: exampleJson,
        exampleTitle: 'Judul',
    });
}

exports.about = function (req, res) {
    res.render('pages/about', {
        exampleTitle: 'Judul',
    });
}
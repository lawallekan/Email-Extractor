document.getElementById('extractBtn').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var extractedEmails = extractEmails(inputText);
    var validatedEmails = validateEmails(extractedEmails);
    var filteredEmails = applyFilters(validatedEmails);
    var uniqueEmails = removeDuplicates(filteredEmails);
    displayExtractedEmails(uniqueEmails);
});

document.getElementById('sortAlphabeticallyBtn').addEventListener('click', function() {
    sortEmails('alphabetically');
});

document.getElementById('sortByDomainBtn').addEventListener('click', function() {
    sortEmails('domain');
});

document.getElementById('sortByLengthBtn').addEventListener('click', function() {
    sortEmails('length');
});

// Rest of the code...

function applyFilters(emails) {
    var domainFilter = document.getElementById('domainFilter').value.toLowerCase();
    var keywordFilter = document.getElementById('keywordFilter').value.toLowerCase();

    return emails.filter(function(email) {
        return (domainFilter === '' || email.toLowerCase().includes(domainFilter)) &&
               (keywordFilter === '' || email.toLowerCase().includes(keywordFilter));
    });
}

function removeDuplicates(emails) {
    return [...new Set(emails)];
}

function sortEmails(sortBy) {
    var outputText = document.getElementById('outputText');
    var emails = outputText.value.split('\n');

    if (sortBy === 'alphabetically') {
        emails.sort();
    } else if (sortBy === 'domain') {
        emails.sort(function(a, b) {
            var domainA = a.split('@')[1].toLowerCase();
            var domainB = b.split('@')[1].toLowerCase();
            return domainA.localeCompare(domainB);
        });
    } else if (sortBy === 'length') {
        emails.sort(function(a, b) {
            return a.length - b.length;
        });
    }

    outputText.value = emails.join('\n');
}

document.getElementById('extractBtn').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var extractedEmails = extractEmails(inputText);
    displayExtractedEmails(extractedEmails);
});

document.getElementById('csvBtn').addEventListener('click', function() {
    downloadEmails('csv');
});

document.getElementById('txtBtn').addEventListener('click', function() {
    downloadEmails('txt');
});

function extractEmails(text) {
    var regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    return text.match(regex) || [];
}

function displayExtractedEmails(emails) {
    var outputText = document.getElementById('outputText');
    outputText.value = emails.join('\n');
    document.getElementById('outputContainer').style.display = 'block';
}

function downloadEmails(format) {
    var outputText = document.getElementById('outputText').value;
    var filename = 'extracted_emails.' + format;
    var element = document.createElement('a');
  
    if (format === 'csv') {
        outputText = 'Email\n' + outputText;
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(outputText));
    } else {
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputText));
    }
  
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function generateSprintName() {

    var sprintPrefix = $("#sprint-prefix").val();
    var sprintNumber = parseInt($("#sprint-number").val());

    var sprintStartDate = moment($("#sprint-start-date").val());
    var sprintEndDate = moment($("#sprint-end-date").val());
    var sprintDurationWeeks = moment.duration($("#sprint-duration").val(), 'weeks');

    if (sprintPrefix && sprintStartDate && sprintEndDate && sprintStartDate.isBefore(sprintEndDate) && sprintDurationWeeks) {

        var currentDate = sprintStartDate.clone();
        var sprintList = [];

        while (currentDate.isBefore(sprintEndDate)) {

            var sprint = {
                name: sprintPrefix + "Q" + currentDate.format('QYY') + "SP" + (sprintNumber++),
                startDate: currentDate.clone().startOf('day'),
                endDate: currentDate.clone().add(sprintDurationWeeks).subtract(1, 'day').endOf('day')
            }

            sprintList.push(sprint);
            currentDate.add(sprintDurationWeeks);

        }


        // add sprint list to .sprint-list as li
        var sprintListElement = $(".sprint-list");
        sprintListElement.empty();
        sprintList.forEach(function (sprint) {
            sprintListElement.append(
                '<li class="flex justify-between gap-x-6 px-7 py-5">' +
                '<div class="flex min-w-0 gap-x-4">' +
                '<div class="min-w-0 flex-auto"> Sprint Name' +
                '<pre class="language-text">' + sprint.name + '</pre>' +
                '<small>' + sprint.endDate.diff(sprint.startDate, 'days') + ' days</small>' +
                '</div>' +
                '</div>' +
                '<div class="flex min-w-0 gap-x-4">' +
                '<div class="min-w-0 flex-auto"> Start Date' +
                '<pre class="language-text">' + sprint.startDate.format("DD/MMM/YY hh:mm A") + '</pre>' +
                '<small>' + sprint.endDate.format("dddd") + '</small>' +
                '</div>' +
                '</div>' +
                '<div class="flex min-w-0 gap-x-4">' +
                '<div class="min-w-0 flex-auto"> End Date' +
                '<pre class="language-text">' + sprint.endDate.format("DD/MMM/YY hh:mm A") + '</pre>' +
                '<small>' + sprint.endDate.format("dddd") + '</small>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>'
            );
        });

    } else {
        alert("Please enter all the fields");
    }

    return false
}

function writeSampleURL() {
    $("#sample-url").text(window.location.origin + window.location.pathname + "?prefix=" + $("#sprint-prefix").val() + "&number=" + $("#sprint-number").val() + "&duration=" + $("#sprint-duration").val());
}

// On page load
$(document).ready(function () {

    // read url params and set sprint prefix and sprint number
    var urlParams = new URLSearchParams(window.location.search);
    var sprintPrefix = urlParams.get('prefix');
    var sprintNumber = urlParams.get('number');
    var sprintDuration = urlParams.get('duration');
    var sprintStartDate = moment(urlParams.get('start'));
    var sprintEndDate = moment(urlParams.get('end'));

    // if sprintStartDate is not valid then set to today
    if (!sprintStartDate.isValid()) {
        sprintStartDate = moment().startOf('day');
    }

    // if sprintEndDate is not valid then set to today + 8 weeks
    if (!sprintEndDate.isValid()) {
        sprintEndDate = moment().startOf('day').add(8, 'weeks');
    }

    // sprintPrefix validate if not null and then set
    if (sprintPrefix) {
        $("#sprint-prefix").val(sprintPrefix);
    } else {
        $("#sprint-prefix").val("SPRINT");
    }

    // sprintNumber validate if number grater than 0 and then set
    if (sprintNumber && parseInt(sprintNumber) > 0) {
        $("#sprint-number").val(sprintNumber);
    } else {
        $("#sprint-number").val(1);
    }

    // sprintDuration validate if number grater than 0 and then set
    if (sprintDuration && parseInt(sprintDuration) > 0) {
        $("#sprint-duration").val(sprintDuration);
    } else {
        $("#sprint-duration").val(2);
    }


    // sprintStartDate validate if valid date and then set
    if (sprintStartDate.isValid()) {
        $("#sprint-start-date").val(sprintStartDate.format('YYYY-MM-DD'));
    }

    // sprintEndDate validate if valid date and then set
    if (sprintEndDate.isValid() && sprintEndDate.isAfter(sprintStartDate)) {
        $("#sprint-end-date").val(sprintEndDate.format('YYYY-MM-DD'));
    }

    writeSampleURL();

    // generate sprint name
    generateSprintName();

    // on form input change using jquery call function
    $(".sprint-config :input").change(writeSampleURL);

})


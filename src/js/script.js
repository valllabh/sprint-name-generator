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
                endDate: currentDate.clone().add(sprintDurationWeeks).endOf('day')
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
                '</div>' +
                '</div>' +
                '<div class="flex min-w-0 gap-x-4">' +
                '<div class="min-w-0 flex-auto"> Start Date' +
                '<pre class="language-text">' + sprint.startDate.format("DD/MMM/YY hh:mm A") + '</pre>' +
                '</div>' +
                '</div>' +
                '<div class="flex min-w-0 gap-x-4">' +
                '<div class="min-w-0 flex-auto"> End Date' +
                '<pre class="language-text">' + sprint.endDate.format("DD/MMM/YY hh:mm A") + '</pre>' +
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

$(document).ready(function () {
    // set start date form element to today's date
    $("#sprint-start-date").val(moment().format("YYYY-MM-DD"));
})
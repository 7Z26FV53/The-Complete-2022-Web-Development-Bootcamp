// console.log(module) // output the information of this file(module)

module.exports.getDate = getDate;
function getDate() {
    const today = new Date();
    // const currentDay = today.getDay();

    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         day = "oof";
    // }

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = getDay;
function getDay() {
    const today = new Date();
    const options = {
        weekday: "long",
    };
    return today.toLocaleDateString("en-US", options);
}

// alternative ways to export~~~

// module.exports.getDay = getDay;
// var getDay = function() { // anonymous func
//     const today = new Date();
//     let options = {
//         weekday: "long",
//     };
//     return today.toLocaleDateString("en-US", options);
// }

// module.exports.getDay = function() { // anonymous func
//     const today = new Date();
//     let options = {
//         weekday: "long",
//     };
//     return today.toLocaleDateString("en-US", options);
// }

// exports.getDay = function() { // anonymous func
//     const today = new Date();
//     let options = {
//         weekday: "long",
//     };
//     return today.toLocaleDateString("en-US", options);
// }
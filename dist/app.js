import inquirer from "inquirer";
let currencyRate = [{ name: "Euro", rate: 0.936156 },
    { name: "USD", rate: 1 },
    { name: "British Pound", rate: 0.807301 },
    { name: "Australian Dollar", rate: 1.549412 },
    { name: "Canadian Dollar", rate: 1.344215 },
    { name: "Singapore Dollar", rate: 1.364589 },
    { name: "Swiss Franc", rate: 0.898035 },
    { name: "Malaysian Ringgit", rate: 4.695095 },
    { name: "Japanese Yen", rate: 147.833373 },
    { name: "Chinese Yuan", rate: 7.273002 },
    { name: "Pakistani Rupee", rate: 294.771368 },
];
class currencyConversion {
    name;
    rate;
    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }
}
let getRate = (curency) => {
    let rate = currencyRate.find((obj) => { return obj.name == curency[0]; });
    if (rate != undefined)
        return rate.rate;
    return 0;
};
let calculateConversion = (from, to, amount) => {
    let rateFrom = getRate(from);
    let rateTo = getRate(to);
    return (amount / rateFrom) * rateTo;
};
let executeConversion = async () => {
    let curency = await inquirer.prompt([{
            name: "fromcurrency",
            type: 'checkbox',
            message: "Please Select Currency",
            choices: [
                "Euro", "USD", "British Pound", "Australian Dollar", "Canadian Dollar", "Singapore Dollar", "Swiss Franc", "Malaysian Ringgit", "Japanese Yen", "Chinese Yuan", "Pakistani Rupee",
            ],
        },
        {
            name: "tocuurrency",
            type: 'checkbox',
            message: "Please Select Conversion Currency",
            choices: [
                "Euro", "USD", "British Pound", "Australian Dollar", "Canadian Dollar", "Singapore Dollar", "Swiss Franc", "Malaysian Ringgit", "Japanese Yen", "Chinese Yuan", "Pakistani Rupee",
            ]
        },
        {
            name: "amoount",
            type: "input",
            message: "Please add Amount"
        },
    ]);
    if (curency.fromcurrency != "" && curency.tocuurrency != "") {
        console.log(`Conversion from ${curency.fromcurrency[0]} to ${curency.tocuurrency[0]}`, calculateConversion(curency.fromcurrency, curency.tocuurrency, curency.amoount));
        let { again } = await inquirer.prompt([{
                name: "again",
                type: 'checkbox',
                message: "Do you want to perform other transaction?",
                choices: [
                    "Yes", "No"
                ],
                default: false,
            }]);
        if (again == "Yes") {
            executeConversion();
        }
    }
};
//console.log(curency);
executeConversion();

export const formatNumber = (x: string): string => {
    return x?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const hideBidderName = (str: string) => {
    let char = "*";
    let lastWhiteSpaceIdx = str.lastIndexOf(" ");
    let replacedString = str.substring(0, str.lastIndexOf(" "));
    let replaceString = new Array(replacedString.length).join(char);
    return replaceString + str.substring(lastWhiteSpaceIdx);
};

export const formatPrice = (price: number) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
    ];
    const item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return price >= item.value;
        });
    return item ? (price / item.value).toFixed(1) + item.symbol + " VND" : "N/A";
};

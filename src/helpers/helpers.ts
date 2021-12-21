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

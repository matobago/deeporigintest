const STRINGSIZE = 6;

export function shorten(inputField: string): string {

    	let shortenText = '';
	for(let i = 0; i < STRINGSIZE; i++) {
		shortenText += getRandomCharacter();
    	} 

        return shortenText;  
}

function getRandomCharacter(): string {
	let upper = Math.floor(Math.random() * (90 - 65) + 65);   //randomize ASCII code for uppercase characters
	let lower = Math.floor(Math.random() * (122 - 97) + 97);   //randomize ASCII code for lowercase characters 
	let number = Math.floor(Math.random() * 9) + 1; // randomize digits
	let chartypes = [String.fromCharCode(upper),String.fromCharCode(lower),number.toString()];
	let index = Math.floor(Math.random() * 3);    //randomize either lower, upper or digit
	return chartypes[index];
}

import { WORDS } from "./words";

// monica.dev: The handler will call a function generateLoremIpsum to actually handle generating the text, it takes in whether or not multiple paragraphs or just words should be returned. By default if there are no queryStringParameters it will return 4 generated paragraphs.

export function handler(event, context, callback) {
  const { queryStringParameters } = event;
  const { paragraphs = 0, words = 0 } = queryStringParameters;

  let isParagraph = Boolean(paragraphs);
  let count;

  if (paragraphs > 1) {
    count = paragraphs;
  } else if (words > 0) {
    count = words;
  } else {
    isParagraph = true;
    count = 4;
  }

  let response;
  try {
    response = isParagraph
      ? generateLoremIpsum(isParagraph, count).join(" ")
      : generateLoremIpsum(isParagraph, count);
  } catch (error) {
    console.log(error);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: response })
  });
}

// generateLoremIpsum() is a function called by the handler() and used as a fork in the road to determine if multiple paragraphs should be generated or just one based on if isParagraph is true or false.

export function generateLoremIpsum(isParagraph, count) {
  if (isParagraph) {
    console.log(`Trying to construct ${count} paragraphs`);
    return generateParagraphs(count);
  } else {
    console.log(`Trying to return ${count} words`);
    return generateWords(count);
  }
}

// If we are generating a single paragraph the generateWords() will be called directly. This function creates an array of random words (based on getting a randomInt and adding the word at that index to the array until we reach the desired wordCount. In order to format the words once we have all of the words the words are formatted like const formattedWords = <p>${words.join(" ")}</p>;` in order to easily be able to transform the function’s response into an HTML paragraph later.
export function generateWords(wordCount) {
  let words = [];
  console.log(wordCount);

  for (var i = 0; i < wordCount; i++) {
    words.push(WORDS[getRandomInt()]);
  }
  const capitalized = words.join(" ")
  const formattedWords = `<p>${capitalized}</p>`;

  return formattedWords;
}

// In the case where we are generating paragraphs we need the function generateParagraphs(). This function will generate X paragraphs with 50 words until it reaches the paragraphCount. It does this by calling the generateWords() function X times where X equals the paragraphCount that was passed in.
export function generateParagraphs(paragraphCount) {
  let paragraphs = [];
  for (var i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateWords(50));
  }
  return paragraphs;
}

export function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(WORDS.length));
}

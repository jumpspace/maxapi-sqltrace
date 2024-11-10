// Node.JS program to extract content from an element inside an XML document

const fs = require('fs/promises');
const xml2js = require('xml2js');

async function readXmlFile(filename) {
	try {
		const xmlData = await fs.readFile(filename, { encoding: 'utf16le' });
		return xmlData;
	} catch (error) {
		console.error("FILE ERROR! " + error);
	}
}

async function parseXmlFile(xml) {
	try {
		const parser = xml2js.Parser();
		const parseData = await parser.parseStringPromise(xml);
		return parseData;
	} catch (error) {
		console.error("PARSE ERROR! " + error);
	}
}

function extractSql(xmlJsonDoc) {
	for (let ev = 0; ev < xmlJsonDoc.TraceData.Events[0].Event.length; ev++) {
		if (xmlJsonDoc.TraceData.Events[0].Event[ev].$.name == "SQL:BatchCompleted" || 
		xmlJsonDoc.TraceData.Events[0].Event[ev].$.name == "RPC:Completed" || 
		xmlJsonDoc.TraceData.Events[0].Event[ev].$.name == "SP:Completed") {
			console.log(xmlJsonDoc.TraceData.Events[0].Event[ev].Column[0]._);
			console.log("--...");
		}
	}
}

readXmlFile('windremfin.xml').then((xml) => parseXmlFile(xml)).then((xjDoc) => extractSql(xjDoc));

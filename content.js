function clickOnXpath(xpath) {
  var el = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if( el !== null ) { 
    el.click();
  }
  return el; 
}

let wait = async ms => new Promise((resolve, reject)=>setTimeout(resolve, ms));

async function removeAllLabels() {
  // keep going until there is no more remove link
  while( clickOnXpath("//span[text()='remove']") ) { 
    await wait(3000);
    // confirm removal
    clickOnXpath("//button[@name='ok']");
    await wait(3000);
  }
}

removeAllLabels();

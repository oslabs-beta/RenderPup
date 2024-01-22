metricsController = {}

metricsController.timeToFirstByte = async (req, res, next) => {

  function Utf8ArrayToStr(array) {
    console.log('hello')
    var out, i, len, c;
    var char2, char3;
  
    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }
  
    return out;
  }

  let totalTime = 0
  for (let i = 0; i < 1; i++) {
    const startTime = new Date()
    await fetch(req.body.url)
    .then((response => response.blob()))
    .then(async (blobData) => {
      totalTime += new Date() - startTime
      blobData = blobData.stream()
      const reader = blobData.getReader()
      await reader.read()
      .then(data => {
        const integerStrings = data.value.toString().split(',');
        const integers = integerStrings.map(value => parseInt(value, 10));
        const characters = integers.map(code => String.fromCharCode(code));
        const resultHtml = characters.join('');
        res.locals.data = resultHtml
      })
    })
  }
  res.locals.ttfb = totalTime / 1
  next()
}

module.exports = metricsController;
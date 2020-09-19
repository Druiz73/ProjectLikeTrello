export const wrapText = (context, text, maxWidth) => {
  let words = text.split(' ');
  let lines = [];
  let line = '';
  if(context.measureText(text).width < maxWidth) {
    return [text]
  }
  while(words.length > 0) {
    while(context.measureText(words[0]).width >= maxWidth) {
      let tmp = words[0];
      words[0] = tmp.slice(0, -1);
      if(words.length > 1) {
        words[1] = tmp.slice(-1) + words[1];
      } else {
        words.push(tmp.slice(-1));
      }
    }
    if(context.measureText(line + words[0]).width < maxWidth) {
      line += words.shift() + " ";
    } else {
      lines.push(line);
      line = "";
    }
    if(words.length === 0) {
      lines.push(line);
    }
  }
  return lines
}

export const drawText = (context, text, x, y) => {
  //context.save();
  const width = 150;
  const height = 75;
  context.clearRect(x, y, width, height);
  context.font = '14px Arial';
  context.textAlign = 'center';
  let lines = wrapText(context, text, width - 14);
  lines.forEach((line, i) => {
    context.fillText(line, width / 2, ((i + 1) * 14) + y);
  })
  //context.restore();
}


export const drawAvatar = (context, img, x, y, username) => {
  context.drawImage(img, x, y);
  context.font = 'bold 14pt Calibri';
  context.fillText(username, x, y + 100);
  context.textAlign = 'center';
}
